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

.get('/refreshProducts',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin, products.createProduct)

.put('/updateproduct',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin, products.updateProduct);





module.exports = router;


