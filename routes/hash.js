var express = require('express');
var router = express.Router();
const hashController = require('../Controllers/hashController/hash.controller');
const cors = require('../Middlewares/cors');
/* GET users listing. */
const jwt = require('../Middlewares/jwt/jwt');

router.all('/', function(req, res, next) {
    next();
})

.options('/',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin, function(req, res, next) {
    next();
})

//.post('/createhash',cors.corsWithOptions,hashController.createHash)

.get('/checkhash',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin,hashController.checkHash)

.get('/hashdashboard',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin,hashController.getHashDashboard)

.put('/updatehash',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin,hashController.updateHashStatus)

.put('/updatecomplaint',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin,hashController.updateCompliant)


.get('/gethashes',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin,hashController.getHashes)

.get('/complaints',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin,hashController.getComplaints);



module.exports = router;
