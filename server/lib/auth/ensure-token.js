const tokenValidator = require('./token');

module.exports = function getEnsureAuth() {

  return function ensureAuth(req, res, next) {
    // grabs token off headers
    const header = req.headers.authorization || req.headers.Authorization;

    // calls token validator with token
    tokenValidator.verify(header)
      .then(payload => {
        req.user = payload;
        next();
      })
      .catch(error => {
        // If an error, returns custom error message
        console.error('Token error: ', error);
        return next({
          code: 403,
          error:'Sign In Error: Please log in again.'
        });
      });
  };

};
