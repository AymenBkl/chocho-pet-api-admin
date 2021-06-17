const mongoose = require('mongoose');



const Schema = mongoose.Schema;

const productLoggerSchema = new Schema({
    level: {
        type: String,
        required: true,
        enum: ['ERROR', 'SUCCESS','WARNING']
    },
    type:{
        type: String,
        required: true,
        enum: ['CREATE', 'UPDATE','DELETE','DESCRIPTION','GET PRODUCT','BADGES','SHIPPING BADGES']
    },
    msg:{
        type:String,
        required:true
    },
    user:{
        type: String, 
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('productLogger', productLoggerSchema);