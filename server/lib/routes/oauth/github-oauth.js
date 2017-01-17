const router = require('express').Router();
const User = require('../../models/user');
const Github = require('../../models/github');
const ensureToken = require('../../auth/ensure-token')();
const request = require('request');
const jsonParser = require('body-parser').json();
const qs = require('qs');
const token = require('../../auth/token');

const GITHUB_SECRET = process.env.GITHUB_SECRET;
const GITHUB_CLIENTID = process.env.GITHUB_CLIENTID;
const ghUrl = 'https://api.github.com';

router

.get('/', (req, res) => {
  res.send('Successful - Redirecting...');
})

.get('/profile', ensureToken, (req, res, next) => {
  User.findById(req.user.id)
    .select('ghaccess')
    .then(user => {
      return new Promise((resolve, reject) => {
        request.get({
          url: `${ghUrl}/user?access_token=${user.ghaccess}`,
          headers: { 'User-Agent': 'Devfolio' }
        },
          (err, response, body) => {
            if(err) return reject({'error': err});
            resolve(body);
          });
      });
    })
    .then(body => { res.send(body); })
    .catch(err => next(err));
})

.get('/repos', ensureToken, (req, res, next) => {
  User.findById(req.user.id)
    .select('ghaccess')
    .then(user => {
      return new Promise((resolve, reject) => {
        request.get({
          url: `${ghUrl}/user/repos?access_token=${user.ghaccess}`,
          headers: { 'User-Agent': 'Devfolio' }
        },
          (err, response, body) => {
            if(err) return reject({'error': err});
            resolve(body);
          });
      });
    })
    .then(body => { res.send(body); })
    .catch(err => next(err));
})

.post('/repos', ensureToken, jsonParser, (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if(user.github) {
        Github.findByIdAndUpdate(user.github, req.body)
          .then(() => res.send(user));
      } else {
        new Github(req.body)
          .save()
          .then(profile => {
            user.github = profile._id;
            return user.save();
          })
          .then(user => {
            res.send(user);
          });
      }
    })
    .catch(err => next(err));
})

.post('/', jsonParser, function(req, res, next) {
  var accessTokenUrl = 'https://github.com/login/oauth/access_token';
  var params = {
    code: req.body.code,
    client_id: GITHUB_CLIENTID,
    client_secret: GITHUB_SECRET
  };

  // Exchange authorization code for access token.
  request.get({ url: accessTokenUrl, qs: params }, (err, response, accessToken) => {
    if(err) return next(err);
    
    let userToken = req.headers.authorization;
    accessToken = qs.parse(accessToken);

    token.verify(userToken)
      .then(({id}) => User.findById(id) )
      .then(user => {
        user.ghaccess = accessToken.access_token;
        user.save();
        res.send();
      })
      .catch(err => next(err));

  });

});

module.exports = router;
