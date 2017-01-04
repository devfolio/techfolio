const router = require('express').Router();
const bodyParser = require('body-parser').json();
const User = require('../models/user');


router
  .get('/:userUrl', bodyParser, (req, res, next) => {
    User.find({userUrl: req.body.userUrl})
      .select('-ghaccess -liAccess -_id')
      .populate({ path: 'Github' })
      .populate({ path: 'LinkedIn' })
      .lean()
      .then(user => {
        res.send(user);
      })
      .catch(next);
  });

module.exports = router;
