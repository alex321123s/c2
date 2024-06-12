// /frontend/src/pages/IdeaPage.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getIdeaById } from '../services/ideaService';
import './IdeaPage.css'; // Assuming you have a CSS file for styling

const IdeaPage = () => {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        const ideaData = await getIdeaById(id);
        setIdea(ideaData);
      } catch (err) {
        setError('Error fetching idea data');
      } finally {
        setLoading(false);
      }
    };

    fetchIdea();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!idea) {
    return <div className="no-idea">Idea not found</div>;
  }

  return (
    <div className="idea-page">
      <div className="idea-container">
        <h2>{idea.title}</h2>
        <p><strong>Author:</strong> {idea.author}</p>
        <p><strong>Description:</strong> {idea.description}</p>
        <p><strong>Status:</strong> {idea.status}</p>
        <p><strong>Submitted on:</strong> {new Date(idea.submittedDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default IdeaPage;
