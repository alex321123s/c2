// /backend/api/services/resourceService.js

const Resource = require('../models/Resource');

exports.addResource = async (resourceData) => {
  try {
    const newResource = new Resource(resourceData);
    await newResource.save();
    return newResource;
  } catch (error) {
    throw new Error('Error adding resource: ' + error.message);
  }
};

exports.getResources = async () => {
  try {
    const resources = await Resource.find();
    return resources;
  } catch (error) {
    throw new Error('Error fetching resources: ' + error.message);
  }
};

exports.getResourceById = async (resourceId) => {
  try {
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      throw new Error('Resource not found');
    }
    return resource;
  } catch (error) {
    throw new Error('Error fetching resource: ' + error.message);
  }
};

exports.updateResource = async (resourceId, updateData) => {
  try {
    const updatedResource = await Resource.findByIdAndUpdate(resourceId, updateData, { new: true });
    if (!updatedResource) {
      throw new Error('Resource not found');
    }
    return updatedResource;
  } catch (error) {
    throw new Error('Error updating resource: ' + error.message);
  }
};

exports.deleteResource = async (resourceId) => {
  try {
    const deletedResource = await Resource.findByIdAndDelete(resourceId);
    if (!deletedResource) {
      throw new Error('Resource not found');
    }
    return deletedResource;
  } catch (error) {
    throw new Error('Error deleting resource: ' + error.message);
  }
};
