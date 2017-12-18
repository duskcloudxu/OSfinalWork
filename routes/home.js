var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log(req.body);
});
router.get('/nonSJB', function(req, res, next) {
    res.render('nonSJB', { title: 'Express' });
    console.log(req.body);
});
router.get('/banker',function (res,res,next) {
    res.render('banker',{title:'Express'});
});
router.get(function (req,res,next) {
   res.render('<div>cannot find corresponding page!</div>')
});

module.exports = router;
