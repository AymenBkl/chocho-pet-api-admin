const productModel = require('../../Models/product');
const productResponse = require('../../HandlerProducts/response.controller');
const loggerController = require('../Logger/logger.controller');
module.exports.updateProduct = (res,id,query) => {
    productModel.findOneAndUpdate({productId:id},query,{upsert: true, new: true})
        .then((updated) => {
            if (updated) {
                productResponse.response('success',res,'PRODUCTS UPDATED',200,updated,'UPDATE PRODUCT');
            }
            else {
                loggerController.insertProductLogger({level:'ERROR',type:'UPDATE',msg:'ERROR UPDATING PRODUCT'});
                productResponse.response('error',res,'Something Went Wrong !',500,null,'UPDATE PRODUCT','SOMETHING WENT WRONG !');
            }
        })
        .catch(err => {
            console.log(err);
            loggerController.insertProductLogger({level:'ERROR',type:'UPDATE',msg:'ERROR UPDATING PRODUCT' + new Error(err)});

            productResponse.response('error',res,'Something Went Wrong !',500,null,'UPDATE PRODUCT',err);
        })
}