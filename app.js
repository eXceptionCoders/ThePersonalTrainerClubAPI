/**
 * @description The Personal Trainer Club Reestful API
 * @version 1.0.0
 */

'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const BaseResponse = require('./schema/BaseResponse');
const DataResponse = require('./schema/DataResponse');
const PaginatedResponse = require('./schema/PaginatedResponse');

const CustomError = require('./schema/CustomError');
const ErrorResponse = require('./schema/ErrorResponse');

// Routes
const index = require('./routes/index');
const users = require('./routes/api/v1/users');
const datauser = require('./routes/api/v1/datauser');
const classes = require('./routes/api/v1/class');
const location = require('./routes/api/v1/location')
const sports = require('./routes/api/v1/sports')

const app = express();

// DB connector
require('./lib/mongooseConnection');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev', {
  skip: (req, res) => {
    return res.statusCode < 400; 
  }
}));
app.use(bodyParser.json());
// support encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// standardized responses for API
app.use((req, res, next) => {

  res.ptcResponse = () => {
    res.status(200).json(new BaseResponse());
  };

  res.ptcDataResponse = (data) => {
    res.status(200).json(new DataResponse(data));
  };

  res.ptcPaginatedResponse = (rows, total) => {
    res.status(200).json(new PaginatedResponse(rows, total));
  };

  next();
});

app.use('/', index);
app.use('/api/v1/:lang(en|es)/users', language, users);
app.use('/api/v1/:lang(en|es)/datauser', language, datauser);
app.use('/api/v1/:lang(en|es)/class', language, classes);
app.use('/api/v1/:lang(en|es)/location', language, location);
app.use('/api/v1/:lang(en|es)/sports', language, sports);

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  const customError = new CustomError(err, req.language, isAPI(req));

  res.status(customError.status || 500);

  if (isAPI(req)) {
    res.json(new ErrorResponse(customError));
    return;
  }
  
  // set locals, only providing error in development
  res.locals.message = customError.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.render('error');
});

//#region Helpers

/**
 * Checks if the current request is a API request.
 * @param {Request} req 
 * @return {bool} 
 */
function isAPI(req) {
  return req.originalUrl.indexOf('/api/v') === 0;
}

/**
 * Middleware to set the language.
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
function language(req, res, next) {
  req.language = req.params.lang; 
  next(); 
}

//#endregion

module.exports = app;