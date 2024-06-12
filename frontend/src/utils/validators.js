// /frontend/src/utils/validators.js

/**
 * Validate an email address format
 * @param {string} email - The email address to validate
 * @returns {boolean} - True if the email is valid, otherwise false
 */
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  /**
   * Validate a password strength
   * @param {string} password - The password to validate
   * @returns {boolean} - True if the password meets strength criteria, otherwise false
   */
  export const validatePassword = (password) => {
    // Example criteria: at least 8 characters long, contains at least one number and one special character
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };
  
  /**
   * Validate if a required field is not empty
   * @param {string} value - The value to check
   * @returns {boolean} - True if the value is not empty, otherwise false
   */
  export const validateRequired = (value) => {
    return value.trim().length > 0;
  };
  
  /**
   * Validate if a string is a valid URL
   * @param {string} url - The URL to validate
   * @returns {boolean} - True if the URL is valid, otherwise false
   */
  export const validateURL = (url) => {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(url);
  };
  
  /**
   * Validate if a string is a valid phone number
   * @param {string} phone - The phone number to validate
   * @returns {boolean} - True if the phone number is valid, otherwise false
   */
  export const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
    return phoneRegex.test(phone);
  };
  