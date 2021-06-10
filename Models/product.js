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
        type:mongoose.Types.ObjectId,
        ref:'badge',
    },
    productShipingBadge:{
        type:mongoose.Types.ObjectId,
        ref:'shipingbadge',
    },
    recomendedProduct:[
        {
            product:{
                type: mongoose.Types.ObjectId,
                ref: 'product' 
            },
            status:{
                type:String,
                default:'active'
            }
        }
    ],
    description:[{
        type: mongoose.Types.ObjectId,
        ref: 'productdescription'
    }],
    tableDescription:{
        imageSizeChartUrl:{
            type:String,
            default:''
        },
        imageBuyUrl:{
            type:String,
            default:''

        },
        imageColorUrl:{
            type:String,
            default:''

        },
        mainBenifts:{
            type:String,
            default:''

        },
        imageMainBeniftsUrl:{
            type:String,
            default:''

        }
    },
    status:{
        type:String,
        default:'active'
    }
}, {
    timestamps: true
})



module.exports = mongoose.model('product', productSchema);