// This page contains the app structure for the server

// Use strict javascript
"use strict";

// Import express JS packages
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

// Import parsers for different objects
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Require the routing pages
var index = require('./routes/index');
var api = require('./routes/api');
var scripts = require('./routes/scripts');

// Start express
var app = express();

// Static web server

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Set the application to use all routing pages
app.use('/scripts', scripts);
app.use('/api', api);

// Use the static files generated when the react files have been built to a web packed package
app.use(express.static('client/build'));
app.use('/', index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

// Export the app
module.exports = app;
