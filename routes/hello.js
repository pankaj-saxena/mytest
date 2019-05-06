var express = require('express');
var request = require('request');
var config = require('config');

var router = express.Router();
var backendhost = config.get('backend.host');
var backendport = config.get('backend.port');
var backendprotocol = config.get('backend.protocol');
var backendapikey = config.get('backend.apikey');

var backendURI = config.get('backend.uri');
var proxyurl = config.get('server.proxy');

var backendurl = backendprotocol + "://" + backendhost + ":"+ backendport + backendURI;
console.log ('URL to invoke in the backend', backendurl);


router.get('/',  function(req, res, next) {
   var options = {
      method: 'GET',
      url: backendurl,
      qs: {
        channel: '1',
        locale: 'en-GB'
      },
      //proxy : proxyurl,
      headers: {
        Authorization: backendapikey
      }
    };

    request(options, function(error, response, body) {
      if (error) {
         
          console.log('!!!Error occured!!! ***%s*** while connecting to the server...%s', error, options.url);  
                

      } else {               
          res.set('Content-Type', 'application/json');                
          //let jsonData = JSON.parse(body);
          res.send(body);
          //console.log('Response:'+body);   
        
      }
    });  
 });


module.exports = router;

