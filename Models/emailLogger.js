const mongoose = require('mongoose');



const Schema = mongoose.Schema;

const emailLoggerSchema = new Schema({
    level: {
        type: String,
        required: true,
        enum: ['ERROR', 'SUCCESS','WARNING']
    },
    type:{
        type: String,
        required: true,
        enum: ['CREATE', 'UPDATE','SEND COUPON','SEND EMAIL','CONTACT','REPLY','CREATE DISCOUNT','SUBS']
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

module.exports = mongoose.model('emailLogger', emailLoggerSchema);