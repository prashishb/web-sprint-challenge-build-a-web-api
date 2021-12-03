const Actions = require('./actions-model');
const Projects = require('../projects/projects-model');

async function validateActionId(req, res, next) {
  try {
    const action = await Actions.get(req.params.id);
    if (!action) {
      next({ status: 404, message: 'Action not found' });
    } else {
      req.action = action;
      next();
    }
  } catch (error) {
    next(error);
  }
}

async function validateAction(req, res, next) {
  const { project_id, description, notes } = req.body;
  const validProjectId = await Projects.get(project_id);
  if (
    !validProjectId ||
    !description ||
    description.trim().length > 128 ||
    !notes
  ) {
    next({
      status: 400,
      message: (function () {
        if (!validProjectId && !description && !notes) {
          return 'Project ID, description, and notes are required';
        } else if (!validProjectId) {
          return 'Project ID missing or invalid';
        } else if (!description) {
          return 'Description is required';
        } else if (description.trim().length > 128) {
          console.log(description.trim().length);
          return 'Description cannot exceed 128 characters';
        } else if (!notes) {
          return 'Notes is required';
        } else {
          return 'One or more fields are missing or invalid';
        }
      })(),
    });
  } else {
    next();
  }
}

function errorHandling(err, req, res, next) {
  res.status(err.status || 500).json({
    message: `ERROR: ${err.message}`,
    stack: err.stack,
  });
}

module.exports = {
  validateActionId,
  validateAction,
  errorHandling,
};
