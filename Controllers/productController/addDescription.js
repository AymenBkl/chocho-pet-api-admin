const productDescription = require('../../Models/descriptionProduct');

const updateProduct = require('./updateProduct');
const productResponse = require('../../HandlerProducts/response.controller');

const mongoose = require('mongoose');
module.exports.addDescription = (description,productId,productMainId,res) => {
    description.productId = productId;
    if (!description._id){
        description._id = mongoose.Types.ObjectId();
    }
    productDescription.findById(description._id,{_id:0})
        .select('-_id')
        .then((descriptionFound) => {
            delete description._id;
            if (descriptionFound){
                productDescription.findOneAndUpdate({},description,{new:true,upsert:true})
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
                                productResponse.response('error',res,'Failed Created Description',500);
                            }
                        }
                    })
                    .catch(err => {
                        productResponse.response('error',res,'Failed Created Description',500);
                        console.log(err);
                    })
            }
            else {
                productDescription.create(description)
                    .then(descriptionCreated => {
                        console.log("description created",descriptionCreated);
                        if (descriptionCreated){
                            const query = {
                                $addToSet: {
                                    description: descriptionCreated,
                                }
                            };
                            updateProduct.updateProduct(res,productMainId,query);
                        }
                        else {
                            productResponse.response('error',res,'Failed Created Description',500);
                        }
                    })
                    .catch(err => {
                        productResponse.response('error',res,'Failed Created Description',500);
            console.log(err);
                    })
            }
        })
        
}