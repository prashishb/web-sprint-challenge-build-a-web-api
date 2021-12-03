const express = require('express');
const { logger } = require('../api/projects/projects-middleware');

const server = express();

server.use(express.json());
server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Build a Web API Sprint Challenge</h2>`);
});

module.exports = server;
