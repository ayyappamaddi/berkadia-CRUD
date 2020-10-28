const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: String,
    productType: String,
    productCategory: String,
    price: Number,
    productId: Number
});

const counterSchema = new mongoose.Schema({
    productSeq: Number
});


module.exports = {
    products: productSchema,
    counter: counterSchema
}