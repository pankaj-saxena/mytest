var express = require('express');
var request = require('request');
var config = require('config');
var url = require('url');

var router = express.Router();
var backendhost = config.get('backend.host');
var backendport = config.get('backend.port');
var backendprotocol = config.get('backend.protocol');
var backendapikey = config.get('backend.apikey');

var backendURI = config.get('backend.uri');
var proxyurl = config.get('server.proxy');

var backendurl = backendprotocol + "://" + backendhost + ":"+ backendport + backendURI;
console.log ('URL to invoke in the backend', backendurl);

var getStore = async function(req,action){
  return new Promise((resolve, reject) => {
    let channel = 0;
    let locale = 'blank';
    if(action == 'GET') {
      var query = url.parse(req.url,true).query;
      if (query.channel == null || query.locale == null){
        let jsonData = { "statusCode":"VE001", "Content-Type":"channel and locale are mandtory fields" };
        resolve(jsonData);
      } else {
        channel=query.channel;
        locale=query.locale;
      }     
     
    }
    else
      {
      channel = req.body.channel;
      locale = req.body.locale;
      //backendurl = backendurl+'/'+ req.body.strNumber;
    }
   
    var options = {
      method: 'GET',
      url: backendurl,
      qs: {
        channel: channel,
        locale: locale
      },
      //proxy : proxyurl,  
      headers: {
        Authorization: backendapikey
      }
    };
    console.log(options);
    request(options, function(error, response, body) {
      if (error) {
          console.log('!!!Error occured!!! ***%s*** while connecting to the server...%s', error, options.url)
          reject(error);
          
      } else {       
          let jsonData = JSON.parse(body);
          jsonData ? resolve(jsonData) : reject();
      }
    });
   
  });
}

router.get('/', async function(req, res, next) {
  console.log('GET request /v1/service/store received')
  var responseData = await getStore(req,'GET');
  res.send(responseData)
});

router.post('/', async function(req, res, next) {
  console.log('POST request /v1/service/store received')
  var responseData = await getStore(req, 'POST');
  res.send(responseData)
});


module.exports = router;
module.exports.getStore = getStore;


