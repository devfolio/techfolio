const router = require('express').Router();
const User = require('../../models/user');
const request = require('request');
const jsonParser = require('body-parser').json();
const token = require('../../auth/token');
const ensureToken = require('../../auth/ensure-token');

const LINKEDIN_SECRET = process.env.LINKEDIN_SECRET;
const LINKEDIN_CLIENTID = process.env.LINKEDIN_CLIENTID;

router.get('/', (req, res) => {
  res.send('Successful - Redirecting...');
});

router.post('/', jsonParser, function(req, res) {
  var accessTokenUrl = 'https://www.linkedin.com/oauth/v2/accessToken';
  var params = {
    code: req.body.code,
    client_id: LINKEDIN_CLIENTID,
    client_secret: LINKEDIN_SECRET,
    redirect_uri: 'http://localhost:8080/linkedin/',
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
    let userToken = req.headers.authorization;

    token.verify(userToken)
      .then(({id}) => User.findById(id))
      .then(user => {
        user.liAccess.oauth2_access_token = params.oauth2_access_token;
        user.liAccess.format = params.format;
        user.save();
        res.send({token: params});
      });

  });

});

router.get('/:token', ensureToken, (req, res) => {
  let user = User.findById(req.user.id);
  let fields = [
    'first-name',
    'last-name',
    'headline',
    'picture-url',
    'positions',
    'specialties',
    'public-profile-url',
    'summary',
    'num-connections'
  ];
  let profileUrl = `https://api.linkedin.com/v1/people/~:(${fields.join()})`;
  let params = {
    oauth2_access_token: user.liAccess.oauth2_access_token,
    format: user.liAccess.format
  };

  request.get({url: profileUrl, qs: params, json: true}, (err, response, profile) => {
    res.send(profile);
  });
});

module.exports = router;
