const express = require('express');
const server = express();
const port = process.env.PORT || 8080;


server.get('/', (request, response) => {
  response.send('It works!');
});

server.listen(port, () => {
  console.log('Now listening on port:', port);
});