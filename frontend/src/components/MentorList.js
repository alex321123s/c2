// /frontend/src/components/MentorList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MentorList = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get('/api/mentors');
        setMentors(response.data);
      } catch (error) {
        console.error('Fehler beim Laden der Mentorenliste:', error);
      }
    };

    fetchMentors();
  }, []);

  return (
    <div>
      <h2>Mentorenliste</h2>
      {mentors.length === 0 ? (
        <p>Keine Mentoren gefunden.</p>
      ) : (
        <ul>
          {mentors.map((mentor) => (
            <li key={mentor.id}>
              <h3>{mentor.name}</h3>
              <p>{mentor.bio}</p>
              <p><strong>Fachgebiete:</strong> {mentor.expertise.join(', ')}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MentorList;
