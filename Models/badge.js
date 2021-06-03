const mongoose = require('mongoose');



const Schema = mongoose.Schema;

const badgeSchema = new Schema({
    mainImgUrl:{
        type:String,
        required:true,
        default:''
    },
    name:{
        type:String,
        required:true,
        unique:true,
        default:''
    },

}, {
    timestamps: true
})



module.exports = mongoose.model('badge', badgeSchema);