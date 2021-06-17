const productModel = require('../../Models/product');

const productHandler = require('../../HandlerProducts/response.controller');
const loggerController = require('../Logger/logger.controller');


module.exports.createProducts = (products,res) => {
    productModel.updateMany({},{$set: {status:'deleted'}},{new:true,upsert:true})
    .then((result) => {
        console.log(result);
        loggerController.insertProductLogger({level:'SUCCESS',type:'DELETE',msg:'PRODUCT DELETED' + JSON.stringify(result)});
        deleteAllProduct(products,res);
    })
    .catch(err => {
        console.log(err);
        loggerController.insertProductLogger({level:'ERROR',type:'DELETE',msg:'ERROR DELETING PRODUCT' + new Error(err)});
        productHandler.response('err',res,'ERROR WHILE CREATING PRODUCTS',500);
    })
}


function deleteAllProduct(products,res) {
        productModel.bulkWrite(
            products.map((product) =>
            ({
                updateOne: {
                    filter: { productId: product.id },
                    update: {
                        
                        $set: {
                            title: product.title,
                            images: product.images,
                            status:'active',
                            price:product.variants[0].price,
                            variant_id:product.variants[0].id
                        },
                        $setOnInsert: {
                            productId: product.id,
                         }
                    },
                    upsert: true,
                    new: true, setDefaultsOnInsert: true
                }
            })
            )
        )
            .then(product => {
                console.log(product);
                if (product && product.upsertedIds) {
                    productHandler.response('success',res,'PRODUCTS CREATED SUCCESFULLY',200);
                }
                else if (product && product.upsertedIds) {
                    productHandler.response('success',res,'PRODUCTS CREATED SUCCESFULLY',200);
                }
                else {
                    loggerController.insertProductLogger({level:'ERROR',type:'CREATE',msg:'ERROR CREATING PRODUCT'});
                    productHandler.response('err',res,'ERROR WHILE CREATING PRODUCTS',500);
                }
            })
            .catch(err => {
                productHandler.response('err',res,'ERROR WHILE CREATING PRODUCTS',500);
                loggerController.insertProductLogger({level:'ERROR',type:'CREATE',msg:'ERROR CREATING PRODUCT' + new Error(err)});
                console.log(err);
            })
}