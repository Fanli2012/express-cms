var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');                                          //引入index.js路由配置文件
var users = require('./routes/users');                                          //引入users.js路由配置文件

var app = express();                                                            //用express创建一个app应用

// view engine setup
app.set('views', path.join(__dirname, 'views'));                                //指定视图文件夹 views/
app.set('view engine', 'ejs');                                                  //指定模板引擎 ejs

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());                                                        //使用cookie
app.use(express.static(path.join(__dirname, 'public')));                        //指定公共资源文件夹 为public/

app.use('/', index);                                                            //当路径为'/'，即'http://localhost:3000/'时，匹配index.js
app.use('/users', users);                                                       //当路径为'/users',即'http://localhost:3000/users'时，匹配data.js
app.use('/admin', require('./routes/admin'));

// catch 404 and forward to error handler(匹配404，即路径未匹配时)
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler(当路径匹配错误时)
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
