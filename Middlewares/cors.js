const express = require("express");

const cors = require("cors");


const config = require('../config');

const whiteList = [config.config.webURL,config.config.url,config.config.https];

const loggerController = require('../Controllers/Logger/logger.controller');

var corsOptionsDelegate = (req, callback) => {
  var corsOptions;
  const index = whiteList.indexOf(req.header("Origin"));  
  if (true ) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
    loggerController.insertServerLogger({level:'ERROR',type:'CORS',msg:'ERORR CORS,' + req.header("Origin") + ',' + new Error('Not allowed by CORS')});
    callback(new Error('Not allowed by CORS'),corsOptions)
  }
  callback(null,corsOptions);
};

var corsOptionsDeletePut = (req, callback) => {
    var corsOptions;
    if (whiteList.indexOf(req.header("Origin")) !== -1) {
      corsOptions = { origin: true };
    } else {
      corsOptions = { origin: false };
    }
    callback(null, corsOptions);
  };

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
