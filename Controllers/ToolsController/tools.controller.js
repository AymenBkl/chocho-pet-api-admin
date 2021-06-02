const bestReview = require('./saveBestReviews');


module.exports.toolsController = {
    saveBestReview : (req,res,next) => {
        bestReview.saveBestReview(req.body.review,res);
    },

    getBestReviews : (req,res,next) => {
        bestReview.getBestReview(res);
    }
}