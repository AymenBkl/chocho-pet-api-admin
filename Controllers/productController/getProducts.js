const productModel = require('../../Models/product');

const productResponse = require('../../HandlerProducts/response.controller');

const loggerController = require('../Logger/logger.controller');

module.exports.getProducts = (res) => {
    productModel.find({})
    .populate([{path:'description'},{path:'productBadge'},{path:'productShipingBadge'},{path:'recomendedProduct.product'}])
        .then(products => {
            if (products && products.length > 0){
                productResponse.response('success',res,'PRODUCTS LOADDED',200,products,'GET PRODUCTS');
            }
            else if (products && products.length == 0 ){
                loggerController.insertProductLogger({level:'WARNING',type:'GET PRODUCT',msg:'NO PRODUCT FOUND'});
                productResponse.response('error',res,'NO PRODUCTS FOUND',404,null,'GET PRODUCT','PRODCT NOT FOUND');
            }
            else {
                loggerController.insertProductLogger({level:'ERROR',type:'GET PRODUCT',msg:'ERROR ON GET PRODUCT'});
                productResponse.response('error',res,'Something Went Wrong !',500,null,'GET PRODUCT','Something Went Wrong !');
            }
        })
        .catch(err => {
            loggerController.insertProductLogger({level:'ERROR',type:'GET PRODUCT',msg:'ERROR ON GET PRODUCT' + new Error(err)});
            productResponse.response('error',res,'Something Went Wrong !',500,null,'GET PRODUCT',err);
        })
}

module.exports.getProduct = (res,id) => {
    productModel.findById(id)
    .populate([{path:'description'},{path:'productBadge'},{path:'productShipingBadge'}])
        .then(products => {
            if (products){
                productResponse.response('success',res,'PRODUCTS LOADDED',200,products,'GET PRODUCTS');
            }
            else if (products && products.length == 0 ){
                loggerController.insertProductLogger({level:'WARNING',type:'GET PRODUCT',msg:'NO PRODUCT FOUND'});
                productResponse.response('error',res,'NO PRODUCTS FOUND',404,null,'GET PRODUCT','PRODCT NOT FOUND');
            }
            else {
                loggerController.insertProductLogger({level:'ERROR',type:'GET PRODUCT',msg:'ERROR ON GET PRODUCT'});
                productResponse.response('error',res,'Something Went Wrong !',500,null,'GET PRODUCT','Something Went Wrong !');
            }
        })
        .catch(err => {
            loggerController.insertProductLogger({level:'ERROR',type:'GET PRODUCT',msg:'ERROR ON GET PRODUCT' + new Error(err)});
            productResponse.response('error',res,'Something Went Wrong !',500,null,'GET PRODUCT',err);
        })
}