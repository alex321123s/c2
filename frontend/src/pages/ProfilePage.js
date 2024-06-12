// /frontend/src/pages/ProfilePage.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../services/userService';
import './ProfilePage.css'; // Assuming you have a CSS file for styling

const ProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(id);
        setUser(userData);
      } catch (err) {
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!user) {
    return <div className="no-user">User not found</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2>{user.name}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Joined on:</strong> {new Date(user.joinedDate).toLocaleDateString()}</p>
        <p><strong>Bio:</strong> {user.bio}</p>
        <div className="projects">
          <h3>Projects</h3>
          <ul>
            {user.projects.map(project => (
              <li key={project.id}>{project.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
