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

module.exports = router;
