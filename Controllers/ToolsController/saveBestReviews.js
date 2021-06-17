const bestReviewModel = require('../../Models/reviews-best');

const toolsResponse = require('../../ToolsResponse/response.controller');

const mongoose = require('mongoose');

const loggerController = require('../Logger/logger.controller');

module.exports.saveBestReview = (reviewBody,res) => {
    let reviewId = reviewBody._id;
    if (!reviewId || reviewId == ''){
        console.log('here');
        reviewId = new mongoose.Types.ObjectId();
    }
    delete reviewBody._id;
    bestReviewModel.findByIdAndUpdate(reviewId,reviewBody,{new:true,upsert:true})
        .then((reviewUpdated) => {
            if (reviewUpdated) {
                toolsResponse.response('success',res,'BEST REVIEW UPDATED SUCCESSFULY',200,reviewUpdated);
            }
            else {
                loggerController.insertToolsLogger({level:'ERROR',type:'UPDATE REVIEWS',msg:'ERROR ON UPDATE BEST REVIEWS,'});
                toolsResponse.response('error',res,'SOMETHING WENT WRONG !',500);
            }
        })
        .catch(err => {
            console.log(err);
            loggerController.insertToolsLogger({level:'ERROR',type:'UPDATE REVIEWS',msg:'ERROR ON UPDATE BEST REVIEWS,' + new Error(err)});
            toolsResponse.response('error',res,'SOMETHING WENT WRONG !',500);
        })
}

module.exports.getBestReview = (res) => {
    bestReviewModel.find()
        .then((reviews) => {
            console.log(reviews);
            if (reviews && reviews.length > 0) {
                toolsResponse.response('success',res,'BEST REVIEW UPDATED SUCCESSFULY',200,reviews);
            }
            else if (reviews && reviews.length == 0) {
                toolsResponse.response('error',res,'YOU HAVE NO REVIEWS',404);
            }
            else {
                loggerController.insertToolsLogger({level:'ERROR',type:'GET REVIEWS',msg:'ERROR ON GET BEST REVIEWS,'});
                toolsResponse.response('error',res,'SOMETHING WENT WRONG !',500);
            }
        })
        .catch(err => {
            console.log(err);
            loggerController.insertToolsLogger({level:'ERROR',type:'GET REVIEWS',msg:'ERROR ON GET BEST REVIEWS,' + new Error(err)});
            toolsResponse.response('error',res,'SOMETHING WENT WRONG !',500);
        })
}