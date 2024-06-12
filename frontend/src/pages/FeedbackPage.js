// /frontend/src/pages/FeedbackPage.js

import React, { useState } from 'react';
import FeedbackForm from '../components/FeedbackForm';
import './FeedbackPage.css'; // Assuming you have a CSS file for styling

const FeedbackPage = () => {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleFeedbackSubmit = () => {
    setFeedbackSubmitted(true);
  };

  return (
    <div className="feedback-page">
      <div className="feedback-container">
        <h2>Feedback</h2>
        {feedbackSubmitted ? (
          <div className="thank-you-message">
            <h3>Thank you for your feedback!</h3>
            <p>We appreciate your input and will use it to improve our platform.</p>
          </div>
        ) : (
          <FeedbackForm onSubmit={handleFeedbackSubmit} />
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
