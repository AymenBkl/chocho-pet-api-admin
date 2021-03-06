var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var errorHandler = require('strong-error-handler');

var authRouter = require('./routes/auth');
var emailsRouter = require('./routes/emailsRoute');
var productRouter = require('./routes/productRouter');
var toolsRouter = require('./routes/toolsRouter');
var loggerRouter = require('./routes/loggerRouter');
var driverRouter = require('./routes/driveRouter');
var app = express();

const cors = require('./Middlewares/cors');
const httpsRedirect = require('./Middlewares/https.redirect');
const limiter = require('./Middlewares/ddos.limiter');
const mongoose = require('./Middlewares/mongoose');
var passport = require('passport');
const loggerController = require('./Controllers/Logger/logger.controller');

const driveBackup = require('./Middlewares/mongoDBBackup');
// view engine setup
app.use('/api',express.static(path.join(__dirname, '/public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('aymenxyzbkl12345678910'));
app.use(passport.initialize());
app.use(passport.session());
app.use(httpsRedirect);
app.use(cors.corsWithOptions);
app.use(limiter.limiter);
app.use('/api/adminchochopet/auth', authRouter);
app.use('/api/adminchochopet/emails', emailsRouter);
app.use('/api/adminchochopet/products', productRouter);
app.use('/api/adminchochopet/tools', toolsRouter);
app.use('/api/adminchochopet/logger', loggerRouter);
app.use('/api/adminchochopet/drive', driverRouter);
const sendEmail = require('./Middlewares/nodemailer');
sendEmail.createTransporter();
var mongoBackup = require('./Middlewares/mongoDBBackup');
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  loggerController.insertServerLogger({level:'WARNING',type:'NOT FOUND',msg:'NOT FOUND ENDPOINT 404'});
  next(createError(404)); 
});


app.use(errorHandler({log: false}));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  loggerController.insertServerLogger({level:'ERROR',type:'INTERNAL ERROR',msg:'ERROR,' + new Error(err)});
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
