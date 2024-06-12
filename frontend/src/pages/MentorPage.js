// /frontend/src/pages/MentorPage.js

import React, { useEffect, useState } from 'react';
import { getMentors } from '../services/mentorService';
import MentorCard from '../components/MentorCard';
import './MentorPage.css'; // Assuming you have a CSS file for styling

const MentorPage = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const mentorData = await getMentors();
        setMentors(mentorData);
      } catch (err) {
        setError('Error fetching mentors');
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="mentor-page">
      <div className="mentor-container">
        <h2>Mentors</h2>
        <div className="mentor-list">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorPage;
