var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('<h1>This is a index page.</h1>');
});

module.exports = router;