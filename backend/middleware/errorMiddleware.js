// /backend/middleware/errorMiddleware.js

const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
  
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message,
    });
  };
  
  module.exports = errorMiddleware;
  