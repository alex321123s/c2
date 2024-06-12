// /frontend/src/pages/EventPage.js

import React, { useEffect, useState } from 'react';
import { getEvents } from '../services/eventService';
import EventCard from '../components/EventCard';
import './EventPage.css'; // Assuming you have a CSS file for styling

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventData = await getEvents();
        setEvents(eventData);
      } catch (err) {
        setError('Error fetching events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="event-page">
      <div className="event-container">
        <h2>Upcoming Events</h2>
        <div className="event-list">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
