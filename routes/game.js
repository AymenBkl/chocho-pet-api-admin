var express = require('express');
var router = express.Router();
const gameController = require('../Controllers/gameController/game.controller');
const cors = require('../Middlewares/cors');
/* GET users listing. */

const jwt = require('../Middlewares/jwt/jwt');

router.all('/', function(req, res, next) {
    next();
})
.options('/',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin,function(req, res, next) {
    next();
})
.get('/gamedashboard',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin,gameController.getGameDashboard)

.get('/withdraws',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin,gameController.getWithdraws)


.get('/depositdashboard',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin,gameController.getDepositDashboard)

.get('/gamehashstate/:hashId',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin,gameController.getGameDashboardHash)

.get('/deposithashstate/:addressId',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin,gameController.getDepositDashboardHash);

//.post('/creategame',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin,gameController.createGame)
//.post('/clickcel',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin,gameController.clickCel)
//.post('/cashout',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin,gameController.cashOut)
//.post('/checkgame',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin,gameController.checkGame);

module.exports = router;
