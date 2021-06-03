const mongoose = require('mongoose');



const Schema = mongoose.Schema;

const bestTipsSchema = new Schema({
    mainImageUrl:{
        type:String,
        required:true,
        default:''
    },
    description:{
        type:String,
        required:true,
        default:''
    },

    title:{
        type:String,
        required:true,
        default:''
    },
    status : {
        type:String,
        required:true,
        default:'active'
    },
    position : {
        type:Number,
        required:true,
    },
}, {
    timestamps: true
})



module.exports = mongoose.model('besttips', bestTipsSchema);