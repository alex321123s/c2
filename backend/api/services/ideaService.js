// /backend/api/services/ideaService.js

const Idea = require('../models/Idea');

exports.getAllIdeas = async () => {
  try {
    const ideas = await Idea.find();
    return ideas;
  } catch (error) {
    throw new Error('Error fetching ideas: ' + error.message);
  }
};

exports.createIdea = async (ideaData) => {
  try {
    const newIdea = new Idea(ideaData);
    await newIdea.save();
    return newIdea;
  } catch (error) {
    throw new Error('Error creating idea: ' + error.message);
  }
};

exports.getIdeaById = async (id) => {
  try {
    const idea = await Idea.findById(id);
    if (!idea) {
      throw new Error('Idea not found');
    }
    return idea;
  } catch (error) {
    throw new Error('Error fetching idea: ' + error.message);
  }
};

exports.updateIdea = async (id, updateData) => {
  try {
    const updatedIdea = await Idea.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedIdea) {
      throw new Error('Idea not found');
    }
    return updatedIdea;
  } catch (error) {
    throw new Error('Error updating idea: ' + error.message);
  }
};

exports.deleteIdea = async (id) => {
  try {
    const deletedIdea = await Idea.findByIdAndDelete(id);
    if (!deletedIdea) {
      throw new Error('Idea not found');
    }
    return deletedIdea;
  } catch (error) {
    throw new Error('Error deleting idea: ' + error.message);
  }
};
