const express = require('express');
const {
  validateActionId,
  validateAction,
  errorHandling,
} = require('./actions-middlware');

const Actions = require('./actions-model');

const router = express.Router();

// [GET] /api/actions (Returns an array of actions (or an empty array) as the body of the response)
router.get('/', (req, res, next) => {
  Actions.get()
    .then((actions) => {
      res.json(actions);
    })
    .catch(next);
});

// [GET] /api/actions/:id (Returns an action with the given id as the body of the response)
// If there is no action with the given id it responds with a status code 404
router.get('/:id', validateActionId, (req, res) => {
  res.json(req.action);
});

// [POST] /api/actions (Returns the newly created action as the body of the response)
// If the request body is missing any of the required fields it responds with a status code 400
// When adding an action make sure the project_id provided belongs to an existing project
router.post('/', validateAction, (req, res, next) => {
  Actions.insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch(next);
});

// [PUT] /api/actions/:id (Returns the updated action as the body of the response)
// If there is no action with the given id it responds with a status code 404
// If the request body is missing any of the required fields it responds with a status code 400
router.put('/:id', validateActionId, validateAction, (req, res, next) => {
  Actions.update(req.params.id, req.body)
    .then((action) => {
      res.json(action);
    })
    .catch(next);
});

// [DELETE] /api/actions/:id (Returns no response body)
// If there is no action with the given id it responds with a status code 404
router.delete('/:id', validateActionId, async (req, res, next) => {
  try {
    const deleted = await Actions.remove(req.params.id);
    if (deleted) {
      res.json(req.action);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
});

router.use(errorHandling);

module.exports = router;
