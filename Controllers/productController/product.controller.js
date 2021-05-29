const createProduct = require('./createProduct');

const getProducts = require('./getProducts');

const updateProduct = require('./updateProduct');

const uplaodImage = require('./uploadImage');


module.exports = {
    createProduct: (products) => {
        createProduct.createProducts(products);
    },

    getProducts: (req, res, next) => {
        getProducts.getProduct(res);
    },

    updateProduct: (req, res, next) => {
        const query = {
            $set: {
                productBadge: req.body.newBadge,

            }
        }
        updateProduct.updateProduct(res,req.body.ean, query);
    },

    postImage : (req,res,next) => {
        uplaodImage.upload(req,res);
    }


}