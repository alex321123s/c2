// /frontend/src/components/EventCalendar.js

import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Fehler beim Laden der Events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const eventsOnSelectedDate = events.filter(event =>
    new Date(event.date).toDateString() === selectedDate.toDateString()
  );

  return (
    <div>
      <h2>Eventkalender</h2>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
      />
      <h3>Events am {selectedDate.toDateString()}</h3>
      {eventsOnSelectedDate.length === 0 ? (
        <p>Keine Events an diesem Datum.</p>
      ) : (
        <ul>
          {eventsOnSelectedDate.map((event) => (
            <li key={event.id}>
              <h4>{event.title}</h4>
              <p>{event.description}</p>
              <p><strong>Uhrzeit:</strong> {new Date(event.date).toLocaleTimeString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventCalendar;
