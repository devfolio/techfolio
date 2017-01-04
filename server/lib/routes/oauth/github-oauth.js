const router = require('express').Router();
const User = require('../../models/user');
// const ensureToken = require('../../auth/ensure-token')();
const request = require('request');
const cookieParser = require('cookie-parser')();
const qs = require('qs');
const token = require('../../auth/token')


const GITHUB_SECRET = process.env.GITHUB_SECRET;

router.get('/', cookieParser, function(req, res) {
  var accessTokenUrl = 'https://github.com/login/oauth/access_token';
  // var userApiUrl = 'https://api.github.com/user';
  var params = {
    code: req.query.code,
    client_id: '19c715da69eda6573929',
    client_secret: GITHUB_SECRET,
    // redirect_uri: req.body.redirectUri
  };

  // Exchange authorization code for access token.
  request.get({ url: accessTokenUrl, qs: params }, function(err, response, accessToken) {
    let userToken = req.cookies.token;
    accessToken = qs.parse(accessToken);
    //Token hack until we can pass token through headers in Satellizer
    token.verify(userToken)
      .then(({id}) => User.findById(id) )
      .then(user => {
        user.ghaccess = accessToken.access_token;
        user.save();
        res.send('Thanks for Linking');
      })
        .catch(console.log(err));

  });

});

module.exports = router;
