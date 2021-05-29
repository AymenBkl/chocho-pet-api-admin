const productModel = require('../../Models/product');

module.exports.createProducts = (products) => {
    console.log(products.length);
    productModel.bulkWrite(
        products.map((product) =>
        ({
            updateOne: {
                filter: { productId: product.id },
                update: {
                    
                    $set: {
                        title: product.productUnitPrice,
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
                console.log("createdSuccesfully");
            }
            else if (product && product.upsertedIds) {
                console.log("createdSuccesfully");
            }
            else {
                console.log("createdSuccesfully");
            }
        })
        .catch(err => {
            console.log(err);
        })
}