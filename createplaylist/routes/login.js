var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var client_id = 'ec14769e2b854873b9bb4331c5f2ce29';
var redirect_uri = 'http://localhost:3000/users';

router.get('/', function(req,res) {

    var state = 'parthprajapatibmw1234567';
    var scope = 'user-read-private user-read-email';

    res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

module.exports = router;