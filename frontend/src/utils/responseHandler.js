// /frontend/src/utils/responseHandler.js

/**
 * Handle API responses
 * @param {Response} response - The fetch API response object
 * @returns {Promise} - Resolves to the response data if successful, otherwise throws an error
 */
export const handleResponse = async (response) => {
    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      const error = new Error(response.statusText);
      error.data = errorData;
      throw error;
    }
  };
  
  /**
   * Handle API errors
   * @param {Error} error - The error object
   * @returns {Object} - The error data with a custom message
   */
  export const handleError = (error) => {
    let errorMessage = 'An unexpected error occurred';
  
    if (error.data && error.data.message) {
      errorMessage = error.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
  
    return { message: errorMessage, data: error.data || null };
  };
  