const createProduct = require('./createProduct');

const getProducts = require('./getProducts');

const updateProduct = require('./updateProduct');

const uplaodImage = require('./uploadImage');

const refreshProducts = require('../../Functions/Shopify/products');

const addDescription = require('./addDescription');

const badges = require('./badges');

const getURLS = require('./getUrls').getURLs;

const shipingBadges = require('./shipingBadges');

module.exports = {
    createProduct: (req,res,next) => {
        refreshProducts.getProducts(res);
    },

    getProducts: (req, res, next) => {
        getProducts.getProducts(res);
    },

    getProduct: (req, res, next) => {
        getProducts.getProduct(res,req.params.productId);
    },

    updateProduct: (req, res, next) => {
        console.log(req.body.badgeId)
        let query;
        if (req.query && req.query.type && req.query.type == 'badge-shiping'){
            query = {
                $set: {
                    productShipingBadge: req.body.badgeId,
                }
            }
        }
        else if (req.query && req.query.type && req.query.type == 'product-recomend'){
            query = {
                $set: {
                    recomendedProduct : req.body.badgeId,
                }
            }
        }
        else {
            query = {
                $set: {
                    productBadge : req.body.badgeId,
                }
            }
        }
                updateProduct.updateProduct(res,req.body.id, query);
    },

    postImage : (req,res,next) => {
        uplaodImage.upload(req,res);
    },

    addDescription: (req,res,next) => {
        addDescription.addDescription(req.body.description,req.body.productId,req.body.productMainId,res);
    },

    updateTableDescription: (req,res,next) => {
        let tableDescription = {}
        Object.keys(req.body.dataToSave).map(key => {
            tableDescription['tableDescription.' +key] = req.body.dataToSave[key];
        })
        
        updateProduct.updateProduct(res,req.body.productId, tableDescription);
    },

    saveBadge: (req,res,next) => {
        badges.saveBadge(req.body.badgeBody,res);
    },

    getBadges : (req,res,next) => {
        badges.getBadges(res);
    },

    getURLS: (req,res,next) => {
        getURLS(res);
    },

    saveBadgeShiping: (req,res,next) => {
        shipingBadges.saveBadgeShiping(req.body.badgeBody,res);
    },

    getBadgesShiping : (req,res,next) => {
        shipingBadges.getBadgesShiping(res);
    },




}