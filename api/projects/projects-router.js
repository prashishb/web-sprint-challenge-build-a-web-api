const express = require('express');
const {
  validateProjectId,
  validateProject,
  errorHandling,
} = require('./projects-middleware');

const Projects = require('./projects-model');

const router = express.Router();

// [GET] /api/projects (Returns an array of projects as the body of the response)
// If there are no projects it responds with an empty array
router.get('/', (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(next);
});

// [GET] /api/projects/:id (Returns a project with the given id as the body of the response)
// If there is no project with the given id it responds with a status code 404
router.get('/:id', validateProjectId, (req, res) => {
  res.json(req.project);
});

// [POST] /api/projects (Returns the newly created project as the body of the response)
// If the request body is missing any of the required fields it responds with a status code 400
router.post('/', validateProject, (req, res, next) => {
  Projects.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch(next);
});

router.use(errorHandling);

module.exports = router;
