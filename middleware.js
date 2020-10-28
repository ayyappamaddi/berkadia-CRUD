const cors = require('cors');
const bodyParser = require('body-parser');
const { HEADERS } = require('./constants');
const response = require('./response');

const createNamespace = require('continuation-local-storage').createNamespace;
const logger = require('./logger');

function appLogs(req, res, next) {
    const myRequest = createNamespace('app-log-nameSpace');
    const reqParam = {
        xReqId: req.headers[HEADERS.XREQUESTID],
        host: req.headers.host,
        method: req.method,
        uri: req.headers.referer
    };
    myRequest.run(() => {
        myRequest.set('reqParam', reqParam);
        logger.create();
        next();
    });
};



function noCacheMiddleware(req, res, next) {
    res.setHeader('Surrogate-Control', 'no-store');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
};

function hasMinimumRequiredHeaders(req, res, next) {
    if (req.headers[HEADERS.XREQUESTID]) {
        next();
    } else {
        response.badRequest(res);
    }
}

function globalMiddleware() {
    const middlewareList = [];
    middlewareList.push(cors());
    // middlewareList.push(errorHandler);
    middlewareList.push(noCacheMiddleware);
    middlewareList.push(bodyParser.json());
    middlewareList.push(hasMinimumRequiredHeaders);
    middlewareList.push(appLogs);
    return middlewareList;
}

function catchAsync(fn) {
    return function (req, res, next) {
        const routePromise = fn(req, res, next);
        if (routePromise.catch) {
            routePromise.catch(err => next(err));
        }
    }
};

module.exports = {
    middlewares: globalMiddleware(),
    catchAsync
};
