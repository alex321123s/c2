// /backend/api/utils/responseHandler.js

const successResponse = (res, message, data = {}, statusCode = 200) => {
    return res.status(statusCode).json({
      status: 'success',
      message,
      data,
    });
  };
  
  const errorResponse = (res, message, error = {}, statusCode = 400) => {
    return res.status(statusCode).json({
      status: 'error',
      message,
      error,
    });
  };
  
  const notFoundResponse = (res, message = 'Resource not found', statusCode = 404) => {
    return res.status(statusCode).json({
      status: 'error',
      message,
    });
  };
  
  const validationErrorResponse = (res, errors, statusCode = 422) => {
    return res.status(statusCode).json({
      status: 'fail',
      message: 'Validation errors',
      errors,
    });
  };
  
  module.exports = {
    successResponse,
    errorResponse,
    notFoundResponse,
    validationErrorResponse,
  };
  