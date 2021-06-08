const descriptionModel = require('../../Models/descriptionProduct');

const productHandler = require('../../HandlerProducts/response.controller');

module.exports.getURLs = (res) => {
    descriptionModel.find({})
    .select('imageBadgeURL imageURL')
        .then((urls) => {
            if (urls && urls.length > 0){
                productHandler.response('success',res,'URLS',200,urls);
            }
            else {
                productHandler.response('error',res,'Something Went Wrong !',500);
            }
        })
        .catch(err => {
            productHandler.response('error',res,'Something Went Wrong !',500);
        })
}