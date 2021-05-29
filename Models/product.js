const mongoose = require('mongoose');



const Schema = mongoose.Schema;

const productSchema = new Schema({
    productId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    title:{
        type:String,
        required:true,
        default:''
    },
    images:[{
        src:{
            type:String,
        } 
    }],
    productBadge:{
        type:String,
        default:'none'
    }
}, {
    timestamps: true
})



module.exports = mongoose.model('product', productSchema);