let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let lessMiddleware = require('less-middleware');
let fs = require('fs');
let index = require('./routes/home');
let users = require('./routes/users');
let exec = require('child_process').execFile;
const iconv = require('iconv-lite');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));//使用相对路径注明views在哪里
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/public", express.static(__dirname + "/public"));//添加public目录
app.use("/node_modules", express.static(__dirname + "/node_modules"));//添加node_modules
app.use('/home', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use("/home", function (req, res, next) {
  console.log(req.body);
  fs.writeFile(path.join(__dirname, 'inData.txt'), req.body.res, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
  let read = function () {
    let p1 = function (callback) {
      fs.readFile('outData.txt', function (err, data) {
        if (err) {
          return console.error(err);
        }
        data = iconv.decode(data, "gbk");//使用插件消除乱码
        callback(data.toString());
      });
    };

    let p2 = function(formerData){
      fs.readFile('putseq.txt', function (err, data) {
        if (err) {
          return console.error(err);
        }
        data = iconv.decode(data, "gbk");//使用插件消除乱码
        let resArr={
          text:formerData,
          seq:data.toString(),
        };
        res.send(resArr).toString();
      });
    }
    p1(p2);
  };
  let fun = function (read) {//执行exe文件
    console.log("fun() start");
    exec('start SJB.exe', [], {shell: process.env.ComSpec, encoding: 'gbk'}, (error, stdout, stderr) => {
      stdout = iconv.decode(stdout, "gbk");
      stderr = iconv.decode(stderr, "gbk");
      console.log(stderr);
      console.log(stdout);
      read();
    });
  };
  fun(read);


});

app.use(function (req, res, next) {
  let err = new Error('Not Found');
  console.log(req.body);
  err.status = 404;
  next(err);
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
