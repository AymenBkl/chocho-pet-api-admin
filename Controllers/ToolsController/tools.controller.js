const bestReview = require('./saveBestReviews');

const bestTips = require('./bestTips');

module.exports.toolsController = {
    saveBestReview : (req,res,next) => {
        bestReview.saveBestReview(req.body.reviewBody,res);
    },

    getBestReviews : (req,res,next) => {
        bestReview.getBestReview(res);
    },

    saveBestTip : (req,res,next) => {
        bestTips.saveBestTip(req.body.tipBody,res);
    },

    getBestTips : (req,res,next) => {
        bestTips.getBestTip(res);
    }


}