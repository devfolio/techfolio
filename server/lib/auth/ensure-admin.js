module.exports = function getEnsureAdmin() {

  return function ensureAdmin(req, res, next) {
    if(req.user.roles.indexOf('admin') === -1) {
      return next({
        code: 401,
        error: 'Unauthorized.'
      });
    }
    next();
  };

};
