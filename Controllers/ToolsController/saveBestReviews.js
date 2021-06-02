const bestReviewModel = require('../../Models/reviews-best');

const toolsResponse = require('../../ToolsResponse/response.controller');

const moongose = require('mongoose');

module.exports.saveBestReview = (reviewBody,res) => {
    let reviewId = reviewBody._id;
    if (reviewId && reviewId != ''){
        reviewId = moongose.Types.ObjectId;
    }
    delete reviewBody._id;
    console.log(reviewId);
    bestReviewModel.findByIdAndUpdate(reviewBody,reviewBody,{new:true,upsert:true})
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
            if (reviews) {
                toolsResponse.response('success',res,'BEST REVIEW UPDATED SUCCESSFULY',200,reviews);
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