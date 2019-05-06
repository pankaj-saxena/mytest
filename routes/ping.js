var express = require('express');
var pingRouter = express.Router();
var config = require('config');

console.log ('entering ping service');

pingRouter.get('/', function(req, res, next) {
  console.log('GET request /service/ping received');
  jsonData = '{ "status": "ok", "apiname": "hello", "apiversion": "v1_0_0"}';
  res.status(200);
  res.type('json'); 
  res.send(jsonData);
  });


module.exports = pingRouter;
