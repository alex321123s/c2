// /frontend/src/components/UserProfile.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Fehler beim Laden des Benutzerprofils:', error);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <p>Laden...</p>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Rolle:</strong> {user.role}</p>
      <p><strong>Projekte:</strong></p>
      <ul>
        {user.projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
