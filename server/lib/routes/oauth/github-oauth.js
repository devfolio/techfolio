const router = require('express').Router();
const User = require('../../models/user');
// const ensureToken = require('../../auth/ensure-token')();
const request = require('request');
const jsonParser = require('body-parser').json();
const qs = require('qs');
const token = require('../../auth/token');


const GITHUB_SECRET = process.env.GITHUB_SECRET;

router.get('/', (req, res) => {
  res.send('Successful - Redirecting...');
});

router.post('/', jsonParser, function(req, res, next) {
  var accessTokenUrl = 'https://github.com/login/oauth/access_token';
  var params = {
    code: req.body.code,
    client_id: '19c715da69eda6573929',
    client_secret: GITHUB_SECRET
  };

  // Exchange authorization code for access token.
  request.get({ url: accessTokenUrl, qs: params }, function(err, response, accessToken) {
    if(err) return next(err);
    
    let userToken = req.headers.authorization;
    accessToken = qs.parse(accessToken);

    //Token hack until we can pass token through headers in Satellizer
    token.verify(userToken)
      .then(({id}) => User.findById(id) )
      .then(user => {
        // console.log(userToken);
        user.ghaccess = accessToken.access_token;
        user.save();
        res.send();
      })
      .catch(err => console.log(err));

  });

});

module.exports = router;
