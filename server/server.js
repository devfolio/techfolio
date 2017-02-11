require('dotenv').load({ silent: true });
require('./lib/setup-mongoose');

const app = require('./lib/app');
const http = require('http');

const server = http.createServer(app);
const port = process.env.PORT || 3500;

server.listen(port, () => {
  console.log('server up on port ', server.address());
});