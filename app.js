var createError = require('http-errors');
var express = require('express');
var path = require('path');

// for parsing cookie values
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// for routing
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var xc3Router = require('./routes/xc3');
var searchRouter = require('./routes/search');
var giveMeTheFileRouter = require('./routes/giveMeTheFile');
var apiRouter = require('./routes/api');
var aboutRouter = require('./routes/about');
var buildRouter = require('./routes/build');

var app = express();

// view engine setup
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'views/api')]);
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/xc3', xc3Router);
app.use('/search', searchRouter);
app.use('/givemethefile', giveMeTheFileRouter);
app.use('/api', apiRouter);
app.use('/about', aboutRouter);
app.use('/build', buildRouter);

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
