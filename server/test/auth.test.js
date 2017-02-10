// Set up testing env
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

// Set up mongoDB
const dbURI = 'mongodb://localhost/testDB';
const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(dbURI);
const connection = mongoose.connection;

const app = require('../lib/app');
const request = chai.request(app);


describe('User authentication routes', () => {

  let token = '';
  let adminToken = '';
  const tokenUser = {
    email: 'user@email.com',
    password: 'Password',
    firstName: 'First',
    lastName: 'Last'
  };
  const admin = {
    email: 'admin@email.com',
    password: 'Password',
    firstName: 'Ad',
    lastName: 'Min',
    roles: ['admin']
  };

  before(done => {
    // Check for the test db before running, drop if exists
    function dropCollection() {
      connection.db.dropDatabase('testDB', done);
    }
    const CONNECTED = 1;
    if (connection.readyState === CONNECTED) dropCollection();
    else (connection.on('open', dropCollection));
  });

  before(done => {
    // Set up a tokened user for later tests
    request
      .post('/auth/signup')
      .send(tokenUser)
      .end((err, res) => {
        if (err) done(err);
        let response = JSON.parse(res.text);
        console.log('User token: ', response.token);
        assert.isOk(token = response.token);
        done();
      });
  });

  before(done => {
    // Set up a admin for later tests
    request
      .post('/auth/signup')
      .send(admin)
      .end((err, res) => {
        if (err) done(err);
        let response = JSON.parse(res.text);
        adminToken = response.token;
        console.log('Admin token: ', adminToken);
        assert.isOk(adminToken);
        done();
      });
  });




});

// describe('auth routes', () => {
//   it('should sign a user up', done => {
//     request
//       .post('/auth/signup')
//       .send(user)
//       .then(res => {
//         assert.isOk(res.body.token);
//         done();
//       })
//      .catch(done);
//   });
// });