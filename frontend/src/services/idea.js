// /frontend/src/services/idea.js

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getIdeas = async () => {
  try {
    const response = await api.get('/ideas');
    return response.data;
  } catch (error) {
    console.error('Error fetching ideas:', error);
    throw error;
  }
};

export const getIdeaById = async (ideaId) => {
  try {
    const response = await api.get(`/ideas/${ideaId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching idea:', error);
    throw error;
  }
};

export const createIdea = async (ideaData) => {
  try {
    const response = await api.post('/ideas', ideaData);
    return response.data;
  } catch (error) {
    console.error('Error creating idea:', error);
    throw error;
  }
};

export const updateIdea = async (ideaId, updatedData) => {
  try {
    const response = await api.put(`/ideas/${ideaId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating idea:', error);
    throw error;
  }
};

export const deleteIdea = async (ideaId) => {
  try {
    const response = await api.delete(`/ideas/${ideaId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting idea:', error);
    throw error;
  }
};
