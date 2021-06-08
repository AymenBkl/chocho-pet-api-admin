const prepareRequest = require('./prepareRequest');

const createProduct = require('../../Controllers/productController/createProduct').createProducts;

module.exports.getProducts = (res) => {
    return new Promise(resolve => {
        prepareRequest.prepareRequest('GET', 'products.json?limit=250&fields=id,images,title')
            .then((result) => {
                createProduct(result.body.products,res);
                resolve(result);
            })
            .catch(err => {
                resolve(err);
            })
    })
    
}




