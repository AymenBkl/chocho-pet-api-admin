const mongoose = require('mongoose');



const Schema = mongoose.Schema;

const descriptionSchema = new Schema({
    productId: {
        type: String,
        required: true,
        unique: true,
        index: true
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
    }
}, {
    timestamps: true
})



module.exports = mongoose.model('productdescription', descriptionSchema);