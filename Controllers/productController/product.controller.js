const createProduct = require('./createProduct');

const getProducts = require('./getProducts');

const updateProduct = require('./updateProduct');

const uplaodImage = require('./uploadImage');

const refreshProducts = require('../../Functions/Shopify/products');

module.exports = {
    createProduct: (req,res,next) => {
        refreshProducts.getProducts(res);
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