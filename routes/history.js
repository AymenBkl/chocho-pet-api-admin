var express = require('express');
var router = express.Router();
const historyController = require('../Controllers/historyController/histroy.controller');
const cors = require('../Middlewares/cors');
/* GET users listing. */
const jwt = require('../Middlewares/jwt/jwt');

router.all('/', function(req, res, next) {
    next();
})

.options('/',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin, function(req, res, next) {
    next();
})

.get('/getallhistory',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin,historyController.getHistory)


module.exports = router;
