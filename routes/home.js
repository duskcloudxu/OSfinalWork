var express = require('express');
var router = express.Router();

let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let lessMiddleware = require('less-middleware');
let fs = require('fs');
let exec = require('child_process').execFile;
let iconv = require('iconv-lite');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
    console.log(req.body);

});
router.get('/nonSJB', function (req, res, next) {
    res.render('nonSJB', {title: 'Express'});
    console.log(req.body);
});
router.get('/RR', function (req, res, next) {
  res.render('RR', {title: 'Express'});
  console.log(req.body);
});
router.get('/banker', function (req, res, next) {
    res.render('banker', {title: 'Express'});
});
router.post('/banker', function (req, res, next) {

});
router.get(function (req, res, next) {
    res.render('<div>cannot find corresponding page!</div>')
});

module.exports = router;
