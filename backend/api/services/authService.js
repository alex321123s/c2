// /backend/api/services/authService.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.register = async (userData) => {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = new User({ ...userData, password: hashedPassword });
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error('Error registering user: ' + error.message);
  }
};

exports.login = async (email, password) => {
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
    throw new Error('Error logging in user: ' + error.message);
  }
};

exports.verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token: ' + error.message);
  }
};

exports.changePassword = async (userId, newPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
    if (!updatedUser) {
      throw new Error('User not found');
    }
    return updatedUser;
  } catch (error) {
    throw new Error('Error changing password: ' + error.message);
  }
};
