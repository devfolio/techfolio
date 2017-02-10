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
        assert.isOk(adminToken);
        done();
      });
  });


  /***************  SIGN IN TESTS ***************************/

  it('requires an email address to sign up', done => {

    const noName = { password: 'Password', firstName: 'Name', lastName: 'Last' };
    const error = '{"error":"Email, password, and full name are required to sign up."}';

    request
      .post('/auth/signup') // expecting an error, don't catch err
      .send(noName)
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(res.text, error);
        done();
      });
  });

  it('requires a password to signup', done => {

    const noPass = { email: 'Whats@ina.name', firstName: 'Name', lastName: 'Last' };
    const error = '{"error":"Email, password, and full name are required to sign up."}';

    request
      .post('/auth/signup') // expecting an error, don't catch err
      .send(noPass)
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(res.text, error);
        done();
      });
  });

  it('requires a first name to signup', done => {

    const noPass = { email: 'Whats@ina.name', password: 'Password', lastName: 'Last' };
    const error = '{"error":"Email, password, and full name are required to sign up."}';

    request
      .post('/auth/signup') // expecting an error, don't catch err
      .send(noPass)
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(res.text, error);
        done();
      });
  });

  it('requires a last name to signup', done => {

    const noPass = { email: 'Whats@ina.name', password: 'Password', firstName: 'Name' };
    const error = '{"error":"Email, password, and full name are required to sign up."}';

    request
      .post('/auth/signup') // expecting an error, don't catch err
      .send(noPass)
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(res.text, error);
        done();
      });
  });

  it('requires a unique email to signup', done => {

    const duplicateUser = {
      email: 'user@email.com',
      password: 'Password',
      firstName: 'Already',
      lastName: 'SignedUp'
    };

    const error = `{"error":"Username ${duplicateUser.email} already taken."}`;

    request
      .post('/auth/signup') // expecting an error
      .send(duplicateUser)
      .end(err => {
        assert.equal(err.status, 400);
        assert.equal(err.response.text, error);
        done();
      });
  });

  /***************  TOKEN TESTS ***************************/

  it('receives a token when signing up', done => {

    const firstUser = {
      email: 'first@email.com',
      password: 'Password',
      firstName: 'First',
      lastName: 'Last'
    };

    const jwtHeader = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

    request
      .post('/auth/signup')
      .send(firstUser)
      .end((err, res) => {
        let tokenBody = JSON.parse(res.text).token;
        let tokenArray = tokenBody.split('.');
        let receivedToken = tokenArray[0];
        assert.equal(receivedToken, jwtHeader);
        done();
      });
  });

  it('validates a token using validation route', done => {

    request
      .post('/auth/validate')
      .set('Authorization', token)
      .then(res => {
        assert.equal(res.text, '{"valid":true}');
        done();
      })
      .catch(done);
  });

  it('requires a token to hit the /auth route', done => {

    request
      .get('/auth')
      .set('Authorization', token)
      .then(res => {
        const user = JSON.parse(res.text);
        assert.equal(user.email, tokenUser.email);
        assert.equal(user.firstName, tokenUser.firstName);
        assert.equal(user.lastName, tokenUser.lastName);
        assert.deepEqual(user.roles, []); // roles wasn't added to original token user
        done();
      })
      .catch(done);
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