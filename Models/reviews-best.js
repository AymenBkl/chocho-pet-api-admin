const mongoose = require('mongoose');



const Schema = mongoose.Schema;

const bestReviewsSchema = new Schema({
    mainImgUrl:{
        type:String,
        required:true,
        default:''
    },
    descriptionReview:{
        type:String,
        required:true,
        default:''
    },

    authorReview:{
        type:String,
        required:true,
        default:''
    },
    status : {
        type:String,
        required:true,
        default:''
    },
}, {
    timestamps: true
})



module.exports = mongoose.model('bestreview', bestReviewsSchema);