const router = require('express').Router();
const bodyParser = require('body-parser').json();
const User = require('../models/user');
const PersonalInfo = require('../models/personal-info');
const token = require('../auth/token');
const ensureLogin = require('../auth/ensure-login')();
const ensureToken = require('../auth/ensure-token')();


router
  .get('/', ensureToken, (req, res, next) => {
    User.findById(req.user.id)
      .select('-ghaccess -liAccess -_id -password')
      .populate({ path: 'github' })
      .populate({ path: 'linkedIn' })
      .lean()
      .then(user => {
        res.send(user);
      })
      .catch(next);
  })

  .post('/validate', (req, res, next) => {  // eslint-disable-line no-unused-vars
    res.send({ valid: true });
  })

  .post('/signup', bodyParser, ensureLogin, (req, res, next) => {

    const { email, password } = req.body;
    delete req.body.password;

    User.find({ email })
    .count()
    .then(count => {
      if(count > 0) throw {
        code: 400,
        error: `Username ${email} already taken.`
      };
      const user = new User(req.body);
      user.generateHash(password);
      return user.save();
    })
    .then(user => {
      return token.sign(user);
    })
    .then(token => {
      res.send({ token });
    })
    .catch(next);
  })

  .post('/signin', bodyParser, (req, res, next) => {
    const { email, password } = req.body;
    delete req.body.password;
    User.findOne({ email })
      .then(user => {
        if (!user || !user.compareHash(password)) {
          throw {
            code: 400,
            error: 'Invalid email address or password. Please try again.'
          };
        }
        return token.sign(user);
      })
      .then(token => res.send({ token }))
      .catch(next);
  })

  .post('/personal', ensureToken, bodyParser, (req, res, next) => {
    User.findById(req.user.id)
      .then(user => {
        if(user.personalInfo) {
          PersonalInfo.findByIdAndUpdate(user.personalInfo, req.body)
            .then(() => res.send(user));
        } else {
          new PersonalInfo(req.body)
            .save()
            .then(profile => {
              user.personalInfo = profile._id;
              return user.save();
            })
            .then(user => {
              res.send(user);
            });
        }
      })
      .catch(err => next(err));
  });

module.exports = router; 
