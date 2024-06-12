// /backend/api/services/feedbackService.js

const Feedback = require('../models/Feedback');

exports.addFeedback = async (feedbackData) => {
  try {
    const newFeedback = new Feedback(feedbackData);
    await newFeedback.save();
    return newFeedback;
  } catch (error) {
    throw new Error('Error adding feedback: ' + error.message);
  }
};

exports.getFeedbacks = async () => {
  try {
    const feedbacks = await Feedback.find();
    return feedbacks;
  } catch (error) {
    throw new Error('Error fetching feedbacks: ' + error.message);
  }
};

exports.getFeedbackById = async (feedbackId) => {
  try {
    const feedback = await Feedback.findById(feedbackId);
    if (!feedback) {
      throw new Error('Feedback not found');
    }
    return feedback;
  } catch (error) {
    throw new Error('Error fetching feedback: ' + error.message);
  }
};

exports.updateFeedback = async (feedbackId, updateData) => {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(feedbackId, updateData, { new: true });
    if (!updatedFeedback) {
      throw new Error('Feedback not found');
    }
    return updatedFeedback;
  } catch (error) {
    throw new Error('Error updating feedback: ' + error.message);
  }
};

exports.deleteFeedback = async (feedbackId) => {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(feedbackId);
    if (!deletedFeedback) {
      throw new Error('Feedback not found');
    }
    return deletedFeedback;
  } catch (error) {
    throw new Error('Error deleting feedback: ' + error.message);
  }
};
