// Set up testing env
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const app = require('../lib/app');
const request = chai.request(app);


describe('User authentication routes', () => {

  let adminToken = null;
  const admin = {
    email: 'admin@email.com',
    password: 'Password',
    firstName: 'Ad',
    lastName: 'Min',
    roles: ['admin']
  };

  let token = null;
  const tokenUser = {
    email: 'unauth@email.com',
    password: 'Password',
    firstName: 'First',
    lastName: 'Last'
  };

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
        assert.isOk(adminToken = response.token);
        done();
      });
  });

  /***************  ADMIN TESTS ***************************/

  it('requires admin access to hit the /admin route', done => {

    request
      .get('/admin')
      .set('Authorization', adminToken)
      .then(res => {
        assert.isAbove(res.text.length, 0); // admin should get an array of all users back
        done();
      })
      .catch(done);

  });

  it('errors if you hit the /admin route as a normal user', done => {

    request
      .get('/admin')
      .set('Authorization', token)
      .catch(err => {
        assert.equal(err.status, 401);
        assert.equal(err.response.text, '{"error":"Unauthorized."}');
        done();
      });

  });

});
