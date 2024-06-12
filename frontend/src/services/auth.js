// /frontend/src/services/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchIdeas = async () => {
  try {
    const response = await api.get('/ideas');
    return response.data;
  } catch (error) {
    console.error('Error fetching ideas:', error);
    throw error;
  }
};

export const submitIdea = async (ideaData) => {
  try {
    const response = await api.post('/ideas', ideaData);
    return response.data;
  } catch (error) {
    console.error('Error submitting idea:', error);
    throw error;
  }
};

export const fetchUser = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const fetchMentors = async () => {
  try {
    const response = await api.get('/mentors');
    return response.data;
  } catch (error) {
    console.error('Error fetching mentors:', error);
    throw error;
  }
};

export const fetchEvents = async () => {
  try {
    const response = await api.get('/events');
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const fetchResources = async () => {
  try {
    const response = await api.get('/resources');
    return response.data;
  } catch (error) {
    console.error('Error fetching resources:', error);
    throw error;
  }
};

export const submitFeedback = async (feedbackData) => {
  try {
    const response = await api.post('/feedback', feedbackData);
    return response.data;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
};
