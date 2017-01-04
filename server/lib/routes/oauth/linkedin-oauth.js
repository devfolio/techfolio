const router = require('express').Router();
const User = require('../../models/user');
// const ensureToken = require('../../auth/ensure-token')();
const request = require('request');
const cookieParser = require('cookie-parser')();
// const qs = require('qs');
const token = require('../../auth/token');

const LINKEDIN_SECRET = process.env.LINKEDIN_SECRET;

router.post('/', cookieParser, function(req, res) {
  var accessTokenUrl = 'https://www.linkedin.com/uas/oauth2/accessToken';
  var params = {
    code: req.body.code,
    client_id: '86xdssak7j3wxb',
    client_secret: LINKEDIN_SECRET,
    grant_type: 'authorization_code'
  };

  // Exchange authorization code for access token.
  request.post(accessTokenUrl, {form: params, json:true}, function(err, response, body) {
    if (response.statusCode !== 200) {
      return res.status(response.statusCode).send({message: body.error_description});
    }
    var params = {
      oauth2_access_token: body.access_token,
      format: 'json'
    };
    console.log(req.headers)
    //Token hack until we can pass token through headers in Satellizer
    token.verify(req.cookies.token)
      .then(({id}) => User.findById(id) )
      .then(user => {
        user.liAccess.oauth2_access_token = params.oauth2_access_token;
        user.liAccess.format = params.format;
        res.send({token: params});
      });

  });

});

module.exports = router;