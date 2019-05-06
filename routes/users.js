var express = require('express');
var url = require('url');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var q = url.parse(req.url, true).query;
  var txt = q.locale + " " + q.channel;
  res.send('responded with users via GET:' + txt);

});

/* POST user. */
router.post('/', function(req, res, next) {
  var q = url.parse(req.url, true); // http://grpssgautt01.corp.internal:3000/service/users?locale=eng&channel=1
  console.log(q.host);  //returns grpssgautt01.corp.internal:3000
  console.log(q.pathname);  //returns http://grpssgautt01.corp.internal:3000/service/users?locale=eng&channel=1
  console.log(q.search);  //returns ?locale=eng&channel=1
  res.send('responded with users via POST:'+ req.url);
});


module.exports = router;
