// /frontend/src/services/resource.js

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getResources = async () => {
  try {
    const response = await api.get('/resources');
    return response.data;
  } catch (error) {
    console.error('Error fetching resources:', error);
    throw error;
  }
};

export const getResourceById = async (resourceId) => {
  try {
    const response = await api.get(`/resources/${resourceId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching resource:', error);
    throw error;
  }
};

export const createResource = async (resourceData) => {
  try {
    const response = await api.post('/resources', resourceData);
    return response.data;
  } catch (error) {
    console.error('Error creating resource:', error);
    throw error;
  }
};

export const updateResource = async (resourceId, updatedData) => {
  try {
    const response = await api.put(`/resources/${resourceId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating resource:', error);
    throw error;
  }
};

export const deleteResource = async (resourceId) => {
  try {
    const response = await api.delete(`/resources/${resourceId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting resource:', error);
    throw error;
  }
};
