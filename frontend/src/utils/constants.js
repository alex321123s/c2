// /frontend/src/utils/constants.js

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
export const TOKEN_KEY = 'authToken';
export const USER_INFO_KEY = 'userInfo';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  IDEA: '/ideas',
  PROFILE: '/profile',
  MENTOR: '/mentors',
  EVENT: '/events',
  RESOURCE: '/resources',
  FEEDBACK: '/feedback',
};

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MENTOR: 'mentor',
};
