const prepareRequest = require('./prepareRequest');

const createProduct = require('../../Controllers/productController/createProduct').createProducts;

const loggerController = require('../../Controllers/Logger/logger.controller');

module.exports.getProducts = (res) => {
    return new Promise(resolve => {
        prepareRequest.prepareRequest('GET', 'products.json?limit=250&fields=id,images,title,variants')
            .then((result) => {
                createProduct(result.body.products,res);
                resolve(result);
            })
            .catch(err => {
                loggerController.insertProductLogger({level:'ERROR',type:'SHOPIFY PRODUCT',msg:'ERORR WHILE GETTING PRODUCT SHOPIFY' + new Error(err)});
                resolve(err);
            })
    })
    
}




