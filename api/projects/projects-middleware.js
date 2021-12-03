const Projects = require('./projects-model');

function logger(req, res, next) {
  const reqMethod = req.method;
  const reqUrl = req.originalUrl;
  const timestamp = new Date().toLocaleString();

  console.log(`This is a ${reqMethod} request for ${reqUrl} at ${timestamp}`);
  next();
}

async function validateProjectId(req, res, next) {
  try {
    const project = await Projects.get(req.params.id);
    if (project) {
      req.project = project;
      next();
    } else {
      res.status(404).json({ message: 'Invalid project ID' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get project' });
  }
}

function validateProject(req, res, next) {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400).json({ message: 'Missing required fields' });
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
  logger,
  validateProjectId,
  validateProject,
  errorHandling,
};
