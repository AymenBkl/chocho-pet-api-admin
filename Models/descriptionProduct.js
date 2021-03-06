const mongoose = require('mongoose');



const Schema = mongoose.Schema;

const descriptionSchema = new Schema({
    productId: {
        type: String,
        required: true,
    },
    header:{
        type:String,
        required:true,
        default:''
    },
    description:{
        type:String,
        required:true,
        default:''
    },

    imageURL:{
        type:String,
        required:true,
        default:''
    },
    imageBadgeURL : {
        type:String,
        required:true,
        default:''
    },
    status:{
        type:String,
        default:'active'
    },
    position : {
        type:Number,
        required:true,
    },
}, {
    timestamps: true
})



module.exports = mongoose.model('productdescription', descriptionSchema);