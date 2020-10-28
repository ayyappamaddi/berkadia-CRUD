
const express = require('express');
const { config } = require('./config');
const routers = require('./v1/routes');
const { middlewares } = require('./middleware');
const mongo = require('./mongodb');
const logger = require('./logger');
const app = express();

connect();

function startHttpServer() {
    app.listen(config.PORT);
    console.log('Express app started on port ' + config.PORT);
}

function errorHandler(err, req, res, next){
    console.error(err.stack)
    res.status(500).send('Something broke!')
}
function initializeExpress() {
    app.use(middlewares);
    app.use('/v1/', routers.routes);
    app.use(errorHandler);
}

function globalErrorHandler(){
    process.on('UncaughtException', ((err) => {
        logger.fatal('Uncaught Exception %s', err);
        process.exit(1);
    }));
}

async function connect() {
    try {
        await mongo.initialiseMongo();
        initializeExpress();
        startHttpServer();
        globalErrorHandler();
    } catch (err) {
        console.log('error while starting application');
    };
}