const Actions = require('./actions-model');

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

function validateAction(req, res, next) {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    next({
      status: 400,
      message: function () {
        if (!project_id && !description && !notes) {
          return 'Project ID, description, and notes are required';
        } else if (!project_id) {
          return 'Project ID is required';
        } else if (!description) {
          return 'Description is required';
        } else if (!notes) {
          return 'Notes is required';
        }
      },
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
