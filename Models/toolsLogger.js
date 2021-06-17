const mongoose = require('mongoose');



const Schema = mongoose.Schema;

const toolLoggerSchema = new Schema({
    level: {
        type: String,
        required: true,
        enum: ['ERROR', 'SUCCESS','WARNING']
    },
    type:{
        type: String,
        required: true,
        enum: ['UPDATE REVIEWS','UPDATE TIPS','GET REVIEWS','GET TIPS']
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

module.exports = mongoose.model('toolLogger', toolLoggerSchema);