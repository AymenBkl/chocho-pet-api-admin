const productDescription = require('../../Models/descriptionProduct');

const updateProduct = require('./updateProduct');
const productResponse = require('../../HandlerProducts/response.controller');

const mongoose = require('mongoose');

const loggerController = require('../Logger/logger.controller');

module.exports.addDescription = (description,productId,productMainId,res) => {
    description.productId = productId;
    if (!description._id){
        description._id = mongoose.Types.ObjectId();
    }
    productDescription.findById(description._id,{_id:0})
        .select('-_id')
        .then((descriptionFound) => {
            let productId = description._id;
            delete description._id;
            if (descriptionFound){
                console.log(description);
                productDescription.findByIdAndUpdate(productId,description,{new:true,upsert:true})
                    .then((descriptionCreated) => {
                        if (descriptionCreated){
                            if (descriptionCreated){
                                const query = {
                                    $addToSet: {
                                        description: descriptionCreated,
                                    }
                                };
                                updateProduct.updateProduct(res,productMainId,query);
                            }
                            else {
                                loggerController.insertProductLogger({level:'ERROR',type:'DESCRIPTION',msg:'ERROR CREATING DESCRIPTION'});
                                productResponse.response('error',res,'Failed Created Description',500);
                            }
                        }
                    })
                    .catch(err => {
                        loggerController.insertProductLogger({level:'ERROR',type:'DESCRIPTION',msg:'ERROR UPDATING DESCRIPTION' + new Error(err)});
                        productResponse.response('error',res,'Failed Created Description',500);
                    })
            }
            else {
                productDescription.create(description)
                    .then(descriptionCreated => {
                        if (descriptionCreated){
                            const query = {
                                $addToSet: {
                                    description: descriptionCreated,
                                }
                            };
                            updateProduct.updateProduct(res,productMainId,query);
                        }
                        else {
                            loggerController.insertProductLogger({level:'ERROR',type:'DESCRIPTION',msg:'ERROR CREATING DESCRIPTION'});
                            productResponse.response('error',res,'Failed Created Description',500);
                        }
                    })
                    .catch(err => {
                        loggerController.insertProductLogger({level:'ERROR',type:'DESCRIPTION',msg:'ERROR CREATING DESCRIPTION' + new Error(err)});
                        productResponse.response('error',res,'Failed Created Description',500);
                    })
            }
        })
        
}