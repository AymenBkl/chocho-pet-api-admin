const createProduct = require('./createProduct');

const getProducts = require('./getProducts');

const updateProduct = require('./updateProduct');

const uplaodImage = require('./uploadImage');

const refreshProducts = require('../../Functions/Shopify/products');

const addDescription = require('./addDescription');

module.exports = {
    createProduct: (req,res,next) => {
        refreshProducts.getProducts(res);
    },

    getProducts: (req, res, next) => {
        getProducts.getProduct(res);
    },

    updateProduct: (req, res, next) => {
        console.log(req.body.newBadge);
        const query = {
            $set: {
                productBadge: req.body.newBadge,

            }
        }
        updateProduct.updateProduct(res,req.body.id, query);
    },

    postImage : (req,res,next) => {
        uplaodImage.upload(req,res);
    },

    addDescription: (req,res,next) => {
        addDescription.addDescription(req.body.description,req.body.productId,res);
    }


}