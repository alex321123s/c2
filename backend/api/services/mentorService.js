// /backend/api/services/mentorService.js

const Mentor = require('../models/Mentor');
const User = require('../models/User');

exports.addMentor = async (mentorData) => {
  try {
    const newMentor = new Mentor(mentorData);
    await newMentor.save();
    return newMentor;
  } catch (error) {
    throw new Error('Error adding mentor: ' + error.message);
  }
};

exports.getMentors = async () => {
  try {
    const mentors = await Mentor.find().populate('user', 'name email');
    return mentors;
  } catch (error) {
    throw new Error('Error fetching mentors: ' + error.message);
  }
};

exports.getMentorById = async (mentorId) => {
  try {
    const mentor = await Mentor.findById(mentorId).populate('user', 'name email');
    if (!mentor) {
      throw new Error('Mentor not found');
    }
    return mentor;
  } catch (error) {
    throw new Error('Error fetching mentor: ' + error.message);
  }
};

exports.updateMentor = async (mentorId, updateData) => {
  try {
    const updatedMentor = await Mentor.findByIdAndUpdate(mentorId, updateData, { new: true });
    if (!updatedMentor) {
      throw new Error('Mentor not found');
    }
    return updatedMentor;
  } catch (error) {
    throw new Error('Error updating mentor: ' + error.message);
  }
};

exports.deleteMentor = async (mentorId) => {
  try {
    const deletedMentor = await Mentor.findByIdAndDelete(mentorId);
    if (!deletedMentor) {
      throw new Error('Mentor not found');
    }
    return deletedMentor;
  } catch (error) {
    throw new Error('Error deleting mentor: ' + error.message);
  }
};
