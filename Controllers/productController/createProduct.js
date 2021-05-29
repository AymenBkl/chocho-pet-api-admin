const productModel = require('../../Models/product');

const productHandler = require('../../HandlerProducts/response.controller');


module.exports.createProducts = (products,res) => {
    console.log(products.length);
    productModel.bulkWrite(
        products.map((product) =>
        ({
            updateOne: {
                filter: { productId: product.id },
                update: {
                    
                    $set: {
                        title: product.title,
                        images: product.images,
                    },
                    $setOnInsert: {
                        productId: product.id,
                     }
                },
                upsert: true,
                new: true, setDefaultsOnInsert: true
            }
        })
        )
    )
        .then(product => {
            console.log(product);
            if (product && product.upsertedIds) {
                productHandler.response('success',res,'PRODUCTS CREATED SUCCESFULLY',200);
            }
            else if (product && product.upsertedIds) {
                productHandler.response('success',res,'PRODUCTS CREATED SUCCESFULLY',200);
            }
            else {
                productHandler.response('err',res,'ERROR WHILE CREATING PRODUCTS',500);
            }
        })
        .catch(err => {
            productHandler.response('err',res,'ERROR WHILE CREATING PRODUCTS',500);
            console.log(err);
        })
}