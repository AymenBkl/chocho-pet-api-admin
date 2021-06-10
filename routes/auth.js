var express = require('express');
var router = express.Router();
const authController = require('../Controllers/AuthController/authController');
const cors = require('../Middlewares/cors');
/* GET users listing. */
const jwt = require('../Middlewares/jwt/jwt');

const upload = require('../Middlewares/multer').upload;

var helmet = require('helmet');

router.use(helmet());

router.all('/', function(req, res, next) {
    next();
})
.options('/',cors.corsWithOptions, function(req, res, next) {
    next();
})
.get('/checkJWT',cors.corsWithOptions,authController.checkJWT)

.post('/changepassword',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin,authController.changePassword)

.post('/login',cors.corsWithOptions,authController.login)

.post('/updateadmin',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin,authController.updateAdmin)

.post('/postimage',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin,upload.single('file'),authController.uploadImage)


.post('/register',cors.corsWithOptions,authController.register);


module.exports = router;
