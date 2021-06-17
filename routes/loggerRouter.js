var express = require('express');
var router = express.Router();
const loggers = require('../Controllers/Logger/logger.controller');
const cors = require('../Middlewares/cors');
const jwt = require('../Middlewares/jwt/jwt');
var helmet = require('helmet');
router.use(helmet());
router.all('/', function(req, res, next) {
    next();
})
.options('/',cors.corsWithOptions,  function(req, res, next) {
    next();
})
.get('/authlogger',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin, loggers.getAuthLogger)

.get('/productlogger',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin, loggers.getProductLogger)

.get('/emaillogger',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin, loggers.getEmailLogger);







module.exports = router;


