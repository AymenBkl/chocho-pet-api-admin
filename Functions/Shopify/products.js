const prepareRequest = require('./prepareRequest');

const createProduct = require('../../Controllers/productController/createProduct').createProducts;

module.exports.getProducts = () => {
    setInterval(async () => {
        await getProducts();
    },5000);
    
}


function getProducts() {
    return new Promise(resolve => {
        prepareRequest.prepareRequest('GET', 'products.json?limit=250&fields=id,images,title')
            .then((result) => {
                createProduct(result.body.products);
                resolve(result);
            })
            .catch(err => {
                resolve(err);
            })
    })
}

