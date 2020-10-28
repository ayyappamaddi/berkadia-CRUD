const { createValidator } = require('express-joi-validation');
const Joi = require('joi');

const validator = createValidator()
const productIdSchema = Joi.object({
    productId:Joi.number().integer().required()
});
const produtShema = Joi.object({
    name: Joi.string().required() ,
    productType: Joi.string().required(),
    productCategory: Joi.string(),
    price: Joi.number(),
});


function bodyValidator(){
    return validator.body(produtShema);
}
function prarameterValidator() {
    return validator.params(productIdSchema);
}

module.exports = {
    prarameterValidator,
    bodyValidator
}