const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');


before( done => {
  const drop = () => connection.db.dropDatabase(done);
  if (connection.readyState === 1) drop();
  else connection.on( 'open', drop );
});

after( done => {
  const drop = () => connection.db.dropDatabase(done);
  if (connection.readyState === 1) drop();
  else connection.on( 'open', drop );
});