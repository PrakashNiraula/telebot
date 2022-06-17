var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//const db=require('./db')
var auth=require('./auth/auth')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const categoryrouter=require("./routes/category")
const subcatrouter=require('./routes/subcategory');
const productrouter=require('./routes/product');
const orderrouter=require('./routes/order');
var testrouter=require('./routes/test');

require('./telereply')
const cors = require('cors');
var app = express();
app.use(cors('*'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/category',categoryrouter);
app.use('/subcategory', subcatrouter);
app.use('/product', productrouter);
app.use('/orders', orderrouter);
app.use('/testtoken',testrouter);

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
