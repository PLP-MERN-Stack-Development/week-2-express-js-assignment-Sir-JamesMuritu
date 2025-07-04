// ...existing code...
module.exports = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    error: err.name || 'Error',
    message: err.message || 'Internal Server Error'
  });
};

// ...existing code...

