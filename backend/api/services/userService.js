// /backend/api/services/userService.js

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error('Error fetching users: ' + error.message);
  }
};

exports.createUser = async (userData) => {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = new User({ ...userData, password: hashedPassword });
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error('Error creating user: ' + error.message);
  }
};

exports.getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error('Error fetching user: ' + error.message);
  }
};

exports.updateUser = async (id, updateData) => {
  try {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedUser) {
      throw new Error('User not found');
    }
    return updatedUser;
  } catch (error) {
    throw new Error('Error updating user: ' + error.message);
  }
};

exports.deleteUser = async (id) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new Error('User not found');
    }
    return deletedUser;
  } catch (error) {
    throw new Error('Error deleting user: ' + error.message);
  }
};

exports.authenticateUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { user, token };
  } catch (error) {
    throw new Error('Error authenticating user: ' + error.message);
  }
};
