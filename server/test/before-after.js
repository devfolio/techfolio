const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

// Set up mongoDB
const dbURI = 'mongodb://localhost:27017/testDB';
const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(dbURI);
const connection = mongoose.connection;

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