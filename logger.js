const log4js = require("log4js");
const getNamespace = require('continuation-local-storage').getNamespace;
const moment = require('moment');
const os = require('os');

function constructLogMessage(dataObj) {
    let message = '';
    dataObj.forEach((data) => { message = `${message} ${data}`; });
    return JSON.stringify(message.replace(/[\r\n]/g, ' | ').trim());
}

function logLayout() {
    return (logEvent) => {
        const message = constructLogMessage(logEvent.data);
        const xRequestId = logEvent.context && logEvent.context.xReqId ? logEvent.context.xReqId : '-';
        const statusCode = logEvent.context && logEvent.context.statusCode ? logEvent.context.statusCode : '';
        const method = logEvent.context && logEvent.context.method ? logEvent.context.method : '';
        const uri = logEvent.context && logEvent.context.uri ? logEvent.context.uri : '';
        const host = os && os.hostname() ? os.hostname() : '';
        const dateTime = moment(logEvent.startTime).format('YYYY-MM-DD HH:mm:ss');

        let logMessage = `${dateTime} ${host} Berkadia CRUD ${logEvent.pid}  ${logEvent.level.levelStr} `;
        logMessage = `${logMessage} ${xRequestId} `;
        logMessage = statusCode.toString().trim().length > 0 ? `${logMessage} ${method} ${uri} ${statusCode}` : logMessage;
        logMessage = statusCode.toString().trim().length === 0 ? `${logMessage} ${message}` : logMessage;

        return logMessage;
    };
}



log4js.addLayout('json', logLayout);
log4js.configure({
    appenders: {
        app_logger: {
            type: "console",
            layout: {
                type: "json"
            }
        }
    },
    categories: { default: { appenders: ["app_logger"], level: "info" } }
});

const log = log4js.getLogger("app_logger");

const formatMessage = () => {
    const myRequest = getNamespace('app-log-nameSpace');
    let reqParam;
    if (myRequest) {
        reqParam = myRequest.get('reqParam');
        if (reqParam) {
            log.addContext('xReqId', reqParam.xReqId);
            log.addContext('host', reqParam.host);
            log.addContext('appName', 'Basic CRUD');
            log.addContext('method', reqParam.method);
            log.addContext('uri', reqParam.uri);
        }
    }
};
const logger = {
    fatal: (...message) => {
        formatMessage();
        log.fatal(...message);
    },
    error: (...message) => {
        formatMessage();
        log.error(...message);
    },
    warn: (...message) => {
        formatMessage();
        log.warn(...message);
    },
    all: (...message) => {
        formatMessage();
        log.all(...message);
    },
    info: (...message) => {
        formatMessage();
        log.info(...message);
    },
    debug: (...message) => {
        formatMessage();
        console.log('console logger debug', ...message);
        log.debug(...message);
    },
    trace: (...message) => {
        formatMessage();
        log.trace(...message);
    },
    off: (...message) => {
        formatMessage();
        log.off(...message);
    },
    create: () => {
        formatMessage();
    },
    responseStatusCode: (statusCode) => {
        formatMessage();
        log.addContext('statusCode', statusCode);
        log.info('');
        log.removeContext('statusCode');
    }
};

module.exports = logger;
