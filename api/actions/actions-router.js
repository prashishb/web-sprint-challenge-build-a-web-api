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

module.exports = router;
