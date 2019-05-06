var express = require('express');
var path = require('path');
var logger = require('morgan');
var config = require('config');
var fs = require("fs");
const https = require("https");


var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var deviceRouter = require('./routes/devices');
var helloRouter = require('./routes/hello');
var holaRouter = require('./routes/hola'); //handles asyn request
var pingRouter = require('./routes/ping');

var port = config.get('server.port');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/service', indexRouter);
app.use('/service/users', userRouter);
app.use('/service/devices',deviceRouter);
app.use('/service/hello',helloRouter);
app.use('/service/hola',holaRouter);
app.use('/service/ping',pingRouter);


var server = app.listen(port, function () {

    var  port = server.address().port;
    console.log("mytest service listening on port: %s",port)
 })

// setup for secure connection
/*
 var ssloptions = {
    key: fs.readFileSync('./sec/server.key'),
    cert: fs.readFileSync('./sec/server.cert'),
    
 }; 

const server = https.createServer(ssloptions,app).listen(port, function(){
    console.log("mytest service listening on port: %s",port);
});*/

module.exports = app;
