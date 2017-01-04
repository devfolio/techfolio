const express = require('express');
const morgan = require('morgan');
const auth = require('./routes/auth-router');
const github = require('./routes/oauth/github-oauth');
const linkedin = require('./routes/oauth/linkedin-oauth');
const admin = require('./routes/admin-router');
const errorHandler = require('./error-handler');

const app = express();

app.use(morgan('dev'));

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    // if they request with https don't do anything special
    if (req.get['x-forwarded-proto'] === 'https') next();  //aka res.headers
    // if just http, redirect to https
    else res.redirect(`https://${req.hostname}${req.url}`);
  });
}

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*'); //aka res.headers, url
  res.set('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
  res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(express.static('./public'));

app.use('/github', github);
app.use('/linkedin', linkedin);
app.use('/auth', auth);
app.use('/admin', admin);
app.use(errorHandler);

module.exports = app;