var express = require('express');
var router = express.Router();
const emails = require('../Controllers/EmailsController/emails.controller');
const cors = require('../Middlewares/cors');
const jwt = require('../Middlewares/jwt/jwt');
router.all('/', function(req, res, next) {
    next();
})
.options('/',cors.corsWithOptions,  function(req, res, next) {
    next();
})
.get('/getemails',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin, emails.getEmails)

.get('/getcontacts',cors.corsWithOptions,jwt.verifyUser,jwt.verifyAdmin, emails.getContacts);



module.exports = router;


