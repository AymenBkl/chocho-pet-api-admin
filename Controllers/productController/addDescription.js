const productDescription = require('../../Models/descriptionProduct');

const updateProduct = require('./updateProduct');
const productResponse = require('../../HandlerProducts/response.controller');

module.exports.addDescription = (description,productId,res) => {
    description.productId = productId;
    productDescription.findOneAndUpdate({},description,{upsert: true, new: true, setDefaultsOnInsert: true})
        .then((descriptionCreated) => {
            console.log(descriptionCreated);
            if (descriptionCreated){
                const query = {
                    $push: {
                        description: descriptionCreated,
                    }
                };
                updateProduct.updateProduct(res,productId,query);
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