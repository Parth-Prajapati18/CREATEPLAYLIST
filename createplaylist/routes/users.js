var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var request = require('request');

var client_id = 'ec14769e2b854873b9bb4331c5f2ce29';
var client_secret = 'a2a74d843cfe449a98a9d3c02deb1310';
var redirect_uri = 'http://localhost:3000/';

router.get('/', function(req, res) {

  var code = req.query.code || null;
  var state = req.query.state || null;

  if (state === null) {
    res.redirect('/#' +
      querystring.stringify({
        error: "State_mistMatch"
      })
    )
  } else {
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      from: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'autherization_code'
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function (error, response, body) {

      console.log(response);

      if (!error && response.statusCode === 200) {
        var access_token = body.access_token;
        var refresh_token = body.refresh_token; 

        res.redirect('/' + querystring.stringify({
          access_token: access_token,
          refresh_token: refresh_token 
        }));
      } else {
        res.redirect('/' + querystring.stringify({
          error: 'invalid_token'
        }));
      }
    });
  }
});

module.exports = router;

