module.exports = function getEnsureLogin() {

  return function ensureLogin(req, res, next){
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    if(!email || !password || !firstName || !lastName) {
      return next({
        code: 400,
        error: 'Email, password, and name are required to sign up.'
      });
    }
    next();
  };

};