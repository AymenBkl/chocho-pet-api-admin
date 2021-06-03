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

    status:{
        type:String,
        default:'active'
    }
}, {
    timestamps: true
})



module.exports = mongoose.model('badge', badgeSchema);