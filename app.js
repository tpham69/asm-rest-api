var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//Mongoose
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongoDB = 'mongodb+srv://binc0meback1111:0ZpvnzzmKCUIrNv3@cluster0.x7trh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var carRouter = require('./routes/carRoute');

var app = express();

// Kết nối MongoDB
mongoose.connect(mongoDB)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch(err => {
    console.error('Connection error', err);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cars', carRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
