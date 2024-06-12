// /frontend/src/components/FeedbackForm.js

import React, { useState } from 'react';
import axios from 'axios';
import './FeedbackForm.css'; // Assuming you have a CSS file for styling

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/feedback', { name, email, message });
      if (response.status === 200) {
        setSuccessMessage('Feedback erfolgreich gesendet!');
        setName('');
        setEmail('');
        setMessage('');
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage('Fehler beim Senden des Feedbacks. Bitte versuchen Sie es später erneut.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="feedback-form">
      <h2>Feedback Formular</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Nachricht:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Absenden</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
