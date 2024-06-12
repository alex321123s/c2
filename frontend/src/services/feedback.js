// /frontend/src/services/feedback.js

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getFeedbacks = async () => {
  try {
    const response = await api.get('/feedback');
    return response.data;
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    throw error;
  }
};

export const getFeedbackById = async (feedbackId) => {
  try {
    const response = await api.get(`/feedback/${feedbackId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching feedback:', error);
    throw error;
  }
};

export const createFeedback = async (feedbackData) => {
  try {
    const response = await api.post('/feedback', feedbackData);
    return response.data;
  } catch (error) {
    console.error('Error creating feedback:', error);
    throw error;
  }
};

export const updateFeedback = async (feedbackId, updatedData) => {
  try {
    const response = await api.put(`/feedback/${feedbackId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating feedback:', error);
    throw error;
  }
};

export const deleteFeedback = async (feedbackId) => {
  try {
    const response = await api.delete(`/feedback/${feedbackId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting feedback:', error);
    throw error;
  }
};
