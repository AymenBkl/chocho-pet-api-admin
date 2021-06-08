var express = require('express');

var router = express.Router();

const products = require('../Controllers/productController/product.controller');

const cors = require('../Middlewares/cors');

const jwt = require('../Middlewares/jwt/jwt');


router.all('/', function(req, res, next) {
    next();
})
.options('/',cors.corsWithOptions,  function(req, res, next) {
    next();
})
.get('/getproducts',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin, products.getProducts)

.get('/getproduct/:productId',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin, products.getProduct)

.get('/refreshProducts',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin, products.createProduct)

.post('/adddescription',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin, products.addDescription)

.get('/getbadges',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin, products.getBadges)

.get('/getbadgesshiping',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin, products.getBadgesShiping)

.get('/producturls',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin, products.getURLS)

.post('/savebadge',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin, products.saveBadge)

.post('/savebadgeshiping',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin, products.saveBadgeShiping)

.put('/updateproducttabledescription',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin, products.updateTableDescription)

.put('/updateproduct',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin, products.updateProduct);





module.exports = router;


