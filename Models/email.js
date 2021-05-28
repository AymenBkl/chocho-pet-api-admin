const mongoose = require('mongoose');


const emailUniqueValidator = require('./validators/emailUniqueValidator');

const Schema = mongoose.Schema;

const emailSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    sentCoupon:{
        type:Boolean,
        required:true,
        default:false
    },
    status:{
        type: String, 
        default: 'active' 
    }
}, {
    timestamps: true
})

emailUniqueValidator.validators.emailValidator(emailSchema);
module.exports = mongoose.model('email', emailSchema);