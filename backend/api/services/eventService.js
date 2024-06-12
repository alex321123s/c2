// /backend/api/services/eventService.js

const Event = require('../models/Event');

exports.addEvent = async (eventData) => {
  try {
    const newEvent = new Event(eventData);
    await newEvent.save();
    return newEvent;
  } catch (error) {
    throw new Error('Error adding event: ' + error.message);
  }
};

exports.getEvents = async () => {
  try {
    const events = await Event.find();
    return events;
  } catch (error) {
    throw new Error('Error fetching events: ' + error.message);
  }
};

exports.getEventById = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }
    return event;
  } catch (error) {
    throw new Error('Error fetching event: ' + error.message);
  }
};

exports.updateEvent = async (eventId, updateData) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(eventId, updateData, { new: true });
    if (!updatedEvent) {
      throw new Error('Event not found');
    }
    return updatedEvent;
  } catch (error) {
    throw new Error('Error updating event: ' + error.message);
  }
};

exports.deleteEvent = async (eventId) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      throw new Error('Event not found');
    }
    return deletedEvent;
  } catch (error) {
    throw new Error('Error deleting event: ' + error.message);
  }
};
