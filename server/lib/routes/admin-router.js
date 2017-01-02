const express = require('express');
const router = express.Router();
const User = require('../models/user');

router
  .get('/', (req,res,next) => {
    User.find({})
    .then(users => res.send(users))
    .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    User.findByIdAndRemove(req.params.id)
    .then(deleted => res.send(deleted))
    .catch(next);
  });

module.exports = router;
