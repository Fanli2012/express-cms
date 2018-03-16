var express = require('express');
var router = express.Router();

// 一个中间件栈，显示任何指向 /about 的 HTTP 请求的信息
router.use('/about', function(req, res, next) {
  res.send('respond 1');
  next();
});

//路由
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/about', function(req, res, next) {
  res.send('respond 2');
});

module.exports = router;
