module.exports = function(err, req, res, next) {
  console.error(err.stack);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      message: messages.join(', ')
    });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    return res.status(400).json({
      message: 'Duplicate field value entered'
    });
  }

  res.status(500).json({
    message: 'Server Error',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
};