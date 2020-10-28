

const { getModel, getSequence } = require('../../mongodb');
const logger = require('../../logger');
const productSchema = require('./app-schema').products;
async function preSaveHook(next) {
    try {
        const seqName = 'productSeq';
        const result = await getSequence(seqName, this);
        this.productId = result[seqName];
        next();
    } catch (ex) {
        next(ex);
    }
}
productSchema.pre('save', preSaveHook);

async function getProducts() {
    const productModel = getModel('products');
    return productModel.find({}, { _id: 0, __v: 0 });
}

async function saveProduct(context, product) {
    try {
        logger.info("product::model::saveProduct");
        const productModel = getModel('products');
        const newProduct = new productModel(product);
        return newProduct.save()
            .then(res => {
                const data = res.toJSON();
                delete data._id;
                delete data.__v;
              return  data;
            })
    } catch (err) {
        logger.error('products::model saveProduct  Error occured while saveing the product', err.stack)
        throw err;
    }
}
async function updateProduct(context, productId, product) {
    const productModel = getModel('products');
    return productModel.findOneAndUpdate({ productId }, { $set: product }, { new: true, fields: { _id: 0, __v: 0 } });
}
async function getProductById(productId) {
    try {
        logger.info('info products::model getProductById ');
        const productModel = getModel('products');
        return productModel.findOne({ productId }, { _id: 0, __v: 0 });
    } catch (err) {
        logger.error('products::model getProductById  Error occured while fetching the product', err)
        throw err;
    }
}
async function deleteProduct(context, productId) {
    const productModel = getModel('products');
    return productModel.findOneAndDelete({ productId });
}
module.exports = {
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct,
    getProductById
}