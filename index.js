const express = require('express');
const server = express();
const port = process.env.PORT || 8080;

const mealsRouter = require('./routers/meals.router');

server.use(mealsRouter);

server.get('/', (request, response) => {
  response.send('It works!');
});

server.listen(port, () => {
  console.log('Now listening on port:', port);
});