const logger = require('./logger');
/**
 * Something is wrong, at a quite basic level, no https, no security to an endpoint requiring it.
 * @param res
 */
function badRequest(res) {
    logger.responseStatusCode(400);
    return res.status(400).json({});
}

/**
 * All good lets pass the results back now.
 * @param res
 * @param data
 */
function success(res, data) {
    logger.responseStatusCode(200);
    return res.status(200).json(data);
}

/**
 * Api action has failed
 * @param res
 * @param err
 */
function serverError(res, err) {
    logger.responseStatusCode(500);
    res.status(500).json(err);
}

/**
 * Request lacks valid authentication credentials for the target resource.
 * or not permitted.
 * @param res
 */
function unauthorized(res) {
    logger.responseStatusCode(401);
    res.status(401).json({});
}

/**
 * Request was being processed, but was failed due to validation,
 * or disallowed security permissions.
 * @param res
 */
function forbidden(res) {
    // logger.responseStatusCode(403);
    res.status(403).json({});
}
module.exports = {
    badRequest,
    unauthorized,
    forbidden,
    success,
    serverError
}