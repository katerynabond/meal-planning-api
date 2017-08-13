const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const server = express();
const port = process.env.PORT || 9080;
const cors = require('cors');
const mealsRouter = require('./routers/meals.router');

const { mongoUri } = require('./credentials');
mongoose.connect(mongoUri, {
  useMongoClient: true
});

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(mealsRouter);

server.get('/', (request, response) => {
  response.send('It works!');
});

server.listen(port, () => {
  console.log('Now listening on port:', port);
});