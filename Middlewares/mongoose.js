const mongoose = require("mongoose");
const fs = require('fs');



const config = require('../config');

var key = fs.readFileSync(process.mainModule.path + '\\mongoSSL\\mongodb.pem');

var ca = fs.readFileSync(process.mainModule.path + '\\mongoSSL\\rootCA.pem');

const loggerController = require('../Controllers/Logger/logger.controller');

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    sslValidate:false,
    sslCA: ca,
    sslCert:key,
    sslKey:key,
};


module.exports = mongoose
  .connect(config.config.mongoDB.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    sslValidate:false,
    sslCA: ca,
    sslCert:key,
    sslKey:key,
    user:config.config.mongoDB.user,
    pass: config.config.mongoDB.pwd
})
  .then((db) => {
    console.log("connected to db");
    loggerController.insertServerLogger({level:'SUCCESS',type:'DATABASE',msg:'CONNECTED TO DATABASE'});
  }) 
  .catch((err) => {
    console.log(err);
    loggerController.insertServerLogger({level:'ERROR',type:'DATABASE',msg:'ERROR WHILE CONNECTING TO DATABASE' + new Error(err)});
  });
