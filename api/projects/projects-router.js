const express = require('express');
const {
  validateProjectId,
  validateProject,
  errorHandling,
  validateProjectUpdate,
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

// [PUT] /api/projects/:id (Returns the updated project as the body of the response)
// If there is no project with the given id it responds with a status code 404
// If the request body is missing any of the required fields it responds with a status code 400
router.put(
  '/:id',
  validateProjectId,
  validateProjectUpdate,
  (req, res, next) => {
    Projects.update(req.params.id, req.body)
      .then((project) => {
        res.json(project);
      })
      .catch(next);
  }
);

// [DELETE] /api/projects/:id (Returns no response body)
// If there is no project with the given id it responds with a status code 404
router.delete('/:id', validateProjectId, async (req, res, next) => {
  try {
    const deleted = await Projects.remove(req.params.id);
    if (deleted) {
      res.json(req.project);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
});

// [GET] /api/projects/:id/actions (Returns an array of actions (could be empty) belonging to a project with the given id)
// If there is no project with the given id it responds with a status code 404
router.get('/:id/actions', validateProjectId, async (req, res, next) => {
  try {
    const actions = await Projects.getProjectActions(req.params.id);
    res.json(actions);
  } catch (err) {
    next(err);
  }
});

router.use(errorHandling);

module.exports = router;
