var express = require('express');
var url = require('url');
var fs = require('fs');
var router = express.Router();

/* GET devices listing. */
router.get('/', function(req, res, next) {
  res.send('respond with devices');
});

router.post('/', function(req, res, next) {
  var q = url.parse(req.url,true).query;
  if (q != null) {
    filename = "./data/" + q.filepath;
    console.log (filename);

    fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });

  } else
      res.send('file name not provided.');
});

module.exports = router;
