const app = require('express').Router();
const User = require('../../models/user');
const request = require('request');
const qs = require('qs');

const GITHUB_SECRET = process.env.GITHUB_SECRET;



app.post('/auth/github', function(req) {
  var accessTokenUrl = 'https://github.com/login/oauth/access_token';
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: GITHUB_SECRET,
    redirect_uri: req.body.redirectUri
  };

  // Step 1. Exchange authorization code for access token.
  request.get({ url: accessTokenUrl, qs: params }, function(err, response, accessToken) {
    accessToken = qs.parse(accessToken);
    User.findById(req.user.id)
      .then(user => {
        user.ghAccess = accessToken;
        response.send(user);
      });

  });

});