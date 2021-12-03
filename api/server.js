const express = require('express');
const { logger } = require('./projects/projects-middleware');
const projectsRouter = require('./projects/projects-router');

const server = express();

server.use(express.json());
server.use(logger);

server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Build a Web API Sprint Challenge</h2>`);
});

module.exports = server;
