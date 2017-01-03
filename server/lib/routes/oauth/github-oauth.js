const router = require('express').Router();
const User = require('../../models/user');
const ensureToken = require('../../auth/ensure-token')();
const request = require('request');
const qs = require('qs');

const GITHUB_SECRET = process.env.GITHUB_SECRET;

router.get('/', ensureToken, function(req) {
  var accessTokenUrl = 'https://github.com/login/oauth/access_token';
  var params = {
    code: req.query.code,
    client_id: '19c715da69eda6573929',
    client_secret: GITHUB_SECRET,
    // redirect_uri: req.body.redirectUri
  };

  // Exchange authorization code for access token.
  request.get({ url: accessTokenUrl, qs: params }, function(err, response, accessToken) {
    console.log('User', req.user);
    accessToken = qs.parse(accessToken);
    User.findById(req.user.id)
      .then(user => {
        user.ghAccess = accessToken;
        response.send(user);
      });

  });

});

module.exports = router;
