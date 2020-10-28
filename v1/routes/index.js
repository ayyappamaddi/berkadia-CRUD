const app = require('express');
const products= require('./products');
const router = app.Router();

router.use(`/${products.uri}`, products.router);
module.exports = {
    routes: router
};