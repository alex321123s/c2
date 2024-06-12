// /frontend/src/services/mentor.js

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getMentors = async () => {
  try {
    const response = await api.get('/mentors');
    return response.data;
  } catch (error) {
    console.error('Error fetching mentors:', error);
    throw error;
  }
};

export const getMentorById = async (mentorId) => {
  try {
    const response = await api.get(`/mentors/${mentorId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching mentor:', error);
    throw error;
  }
};

export const createMentor = async (mentorData) => {
  try {
    const response = await api.post('/mentors', mentorData);
    return response.data;
  } catch (error) {
    console.error('Error creating mentor:', error);
    throw error;
  }
};

export const updateMentor = async (mentorId, updatedData) => {
  try {
    const response = await api.put(`/mentors/${mentorId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating mentor:', error);
    throw error;
  }
};

export const deleteMentor = async (mentorId) => {
  try {
    const response = await api.delete(`/mentors/${mentorId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting mentor:', error);
    throw error;
  }
};
