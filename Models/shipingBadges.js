const mongoose = require('mongoose');



const Schema = mongoose.Schema;

const shipingBadgesSchema = new Schema({
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
    color:{
        type:String,
        required:true,
        default:'#000'
    },
    status:{
        type:String,
        default:'active'
    }
}, {
    timestamps: true
})



module.exports = mongoose.model('shipingbadge', shipingBadgesSchema);