const mongoose = require('mongoose');



const Schema = mongoose.Schema;

const serverLoggerSchema = new Schema({
    level: {
        type: String,
        required: true,
        enum: ['ERROR', 'SUCCESS','WARNING','INFO']
    },
    type:{
        type: String,
        required: true,
        enum: ['STARTED', 'DATABASE','BACKUP','RESTORE','NOT FOUND','INTERNAL ERROR','CRASHED','CORS','DRIVE','FILE DELETE']
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

module.exports = mongoose.model('serverLogger', serverLoggerSchema);