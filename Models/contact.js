const mongoose = require('mongoose');



const Schema = mongoose.Schema;

const contactSchema = new Schema({
    email: {
        type: String,
        required: true,
        index: true
    },
    name:{
        type:String,
        required:true,
    },
    subject:{
        type: String, 
        required:true,
    },
    message:{
        type: String, 
        required:true,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('contact',contactSchema);