const router = require('express').Router();
const bodyParser = require('body-parser').json();
const User = require('../models/user');


router
  .get('/:userUrl', bodyParser, (req, res, next) => {
    User.findById(req.params.userUrl)
      .select('-ghaccess -liAccess -_id -password')
      .populate('github')
      .populate('linkedIn')
      .lean()
      .then(user => {
        res.send(user);
      })
      .catch(next);
  });

module.exports = router;
