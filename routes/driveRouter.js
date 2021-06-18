var express = require('express');
var router = express.Router();
const loggers = require('../Controllers/Logger/logger.controller');
const cors = require('../Middlewares/cors');
const jwt = require('../Middlewares/jwt/jwt');
const drive = require('../Middlewares/mongoDBBackup');
var helmet = require('helmet');
router.use(helmet());
router.all('/', function(req, res, next) {
    next();
})
.options('/',cors.corsWithOptions,  function(req, res, next) {
    next();
})
.get('/drivefile',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin, drive.loadFilesDrive)

.post('/restoredatabase',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin, drive.downloadFile)

.get('/backupdatabase',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin, drive.backUp);









module.exports = router;


