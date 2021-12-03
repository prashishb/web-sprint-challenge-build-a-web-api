const express = require('express');
const { reset } = require('nodemon');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  reset.send(`<h2>Build a Web API Sprint Challenge</h2>`);
});

module.exports = server;
