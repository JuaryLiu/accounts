var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//导入session的包
const session = require('express-session')
const MongoStore = require('connect-mongo')

var indexRouter = require('./routes/web/index');
// var usersRouter = require('./routes/users');
// 导入accounts路由
const accountsRouter = require('./routes/api/accounts')

// 导入 reg 路由
const authRouter = require('./routes/web/auth')

//导入配置文件
const {DBHOST,DBPORT,DBNAME} = require('./config/config')

//导入api信息登录路由
const authApiRouter = require('./routes/api/auth')

var app = express();

//使用session
app.use(session({
  name:'sid',// 设置cookie的name 默认值是 connect.sid
  secret: 'keyboard cat', //参与加密的字符串(又称签名) 加盐
resave: false, // 是否在每次请求时重新保存session
saveUninitialized: false, // 是否每次请求都设置一个cookie用来存储session的id
store:MongoStore.create({
  mongoUrl:`mongodb://${DBHOST}:${DBPORT}/${DBNAME}` // 数据库连接配置
}),
cookie: { 
  httpOnly:true, // 开启后前端无法通过js操作
  maxAge:1000 * 60 * 60 *24  // 这一条 是控制 sessionID的过去时间的！！！
 }
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api',accountsRouter)
app.use('/api',authApiRouter)

app.use('/',authRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // 响应404
  res.render('404')
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
