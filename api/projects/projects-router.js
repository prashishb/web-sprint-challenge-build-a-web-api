const express = require('express');
const {
  validateProjectId,
  validateProject,
  errorHandling,
} = require('./projects-middleware');

const Projects = require('./projects-model');

const router = express.Router();

// GET /api/projects (Returns an array of projects as the body of the response)
// If there are no projects it responds with an empty array
router.get('/', (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(next);
});

module.exports = router;
