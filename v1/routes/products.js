const ROUTE_URI = 'products';
const express = require('express');
const products = require('../models/products');
const { prarameterValidator, bodyValidator } = require('../validators/product-validator');
const logger = require('../../logger');
const response = require('../../response');
const { catchAsync } = require('../../middleware');
const router = express.Router();

const routes = {
    async getAllProducts(req, res) {
        try {
            logger.info("product::route::getAllProducts");
            const productList = await products.getProducts();
            response.success(res, productList);
        } catch (err) {
            logger.error("product::route::getAllProducts something went wrong", err.stack);
            response.serverError(res);
        }
    },
    async getProductById(req, res) {
        try {
            logger.info("product::route::getProductById");
            const productId = +req.params.productId;
            const product = await products.getProductById(productId);
            if (product) {
                response.success(res, product);
            } else {
                response.badRequest(res);
            }
        } catch (err) {
            logger.error("product::route::getProductById something went wrong in getPrdouctById", err.stack);
            response.serverError(res);
        }
    },
    async updateProduct(req, res) {
        try {
            logger.info("product::route::updateProduct");
            const context = req.userContext;
            const productId = +req.params.productId;
            const product = req.body;
            const updatedProduct = await products.updateProduct(context, productId, product);
            if (updatedProduct) {
                response.success(res, updatedProduct);
            } else {
                response.badRequest(res);
            }

        } catch (err) {
            logger.error("product::route::updateProduct something went wrong ", err.stack);
            response.serverError(res);
        }

    },
    async saveProduct(req, res) {
        try {
            logger.info("product::route::saveProduct");
            const context = req.userContext;
            const product = req.body;
            const newProduct = await products.saveProduct(context, product);
            if (newProduct) {
                response.success(res, newProduct);
            } else {
                response.badRequest(res);
            }
        } catch (err) {
            logger.error("product::route::saveProduct something went wrong", err.stack);
            response.serverError(res);
        }
    },
    async deleteProduct(req, res) {
        try {
            logger.info("product::route::deleteProduct");
            const context = req.userContext;
            const productId = +req.params.productId;
            const deletedProduct = await products.deleteProduct(context, productId);
            if (deletedProduct) {
                response.success(res);
            } else {
                response.badRequest(res);
            }

        } catch (err) {
            logger.error("product::route::deleteProduct something went wrong ", err.stack);
            response.serverError(res);
        }
    }
};

router.get('/', catchAsync(routes.getAllProducts));
router.get('/:productId', prarameterValidator(), catchAsync(routes.getProductById));
router.put('/:productId', prarameterValidator(), catchAsync(routes.updateProduct));
router.delete('/:productId', prarameterValidator(), catchAsync(routes.deleteProduct));
router.post('/', bodyValidator(), catchAsync(routes.saveProduct));
module.exports = {
    uri: ROUTE_URI,
    routes,
    router
};
