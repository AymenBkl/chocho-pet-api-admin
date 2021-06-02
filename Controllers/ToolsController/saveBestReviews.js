const bestReviewModel = require('../../Models/reviews-best');

const toolsResponse = require('../../ToolsResponse/response.controller');

const mongoose = require('mongoose');

module.exports.saveBestReview = (reviewBody,res) => {
    console.log('id',reviewBody._id)
    let reviewId = reviewBody._id;
    if (!reviewId || reviewId == ''){
        console.log('here');
        reviewId = new mongoose.Types.ObjectId();
    }
    delete reviewBody._id;
    console.log('id',reviewId);
    bestReviewModel.findByIdAndUpdate(reviewId,reviewBody,{new:true,upsert:true})
        .then((reviewUpdated) => {
            console.log(reviewUpdated);
            if (reviewUpdated) {
                toolsResponse.response('success',res,'BEST REVIEW UPDATED SUCCESSFULY',200);
            }
            else {
                toolsResponse.response('error',res,'SOMETHING WENT WRONG !',500);
            }
        })
        .catch(err => {
            console.log(err);
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
                toolsResponse.response('error',res,'SOMETHING WENT WRONG !',500);
            }
        })
        .catch(err => {
            console.log(err);
            toolsResponse.response('error',res,'SOMETHING WENT WRONG !',500);
        })
}