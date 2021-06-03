var express = require('express');

var router = express.Router();

const toolsControler = require('../Controllers/ToolsController/tools.controller').toolsController;

const cors = require('../Middlewares/cors');

const jwt = require('../Middlewares/jwt/jwt');


router.all('/', function(req, res, next) {
    next();
})
.options('/',cors.corsWithOptions,  function(req, res, next) {
    next();
})

.get('/getbestreviews',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin, toolsControler.getBestReviews)

.post('/savereview',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin, toolsControler.saveBestReview)

.get('/getbesttips',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin, toolsControler.getBestTips)

.post('/savetip',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin, toolsControler.saveBestTip);









module.exports = router;


