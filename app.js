var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var authRouter = require('./routes/auth');
var emailsRouter = require('./routes/emailsRoute');
var app = express();

const cors = require('./Middlewares/cors');
const httpsRedirect = require('./Middlewares/https.redirect');
const limiter = require('./Middlewares/ddos.limiter');
const mongoose = require('./Middlewares/mongoose');
var passport = require('passport');


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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
