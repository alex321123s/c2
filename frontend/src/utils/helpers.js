// /frontend/src/utils/helpers.js

/**
 * Format a date string to a more readable format
 * @param {string} dateString - The date string to format
 * @returns {string} - The formatted date string
 */
export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  /**
   * Capitalize the first letter of a string
   * @param {string} str - The string to capitalize
   * @returns {string} - The capitalized string
   */
  export const capitalizeFirstLetter = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  /**
   * Check if the user is authenticated
   * @returns {boolean} - True if the user is authenticated, otherwise false
   */
  export const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');
  };
  
  /**
   * Get user information from local storage
   * @returns {object|null} - The user information object, or null if not found
   */
  export const getUserInfo = () => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  };
  
  /**
   * Save user information to local storage
   * @param {object} userInfo - The user information object to save
   */
  export const saveUserInfo = (userInfo) => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  };
  
  /**
   * Remove user information from local storage
   */
  export const removeUserInfo = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('authToken');
  };
  