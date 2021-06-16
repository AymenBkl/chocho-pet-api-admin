const mongoose = require('mongoose');



const Schema = mongoose.Schema;

const authLoggerSchema = new Schema({
    level: {
        type: String,
        required: true,
        enum: ['ERROR', 'SUCCESS','WARNING']
    },
    type:{
        type: String,
        required: true,
        enum: ['LOGIN', 'UPDATE','CHANGE PASSWORD','REGISTER']
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

module.exports = mongoose.model('authlogger', authLogger);