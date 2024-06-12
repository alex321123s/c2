// /frontend/src/pages/ResourcePage.js

import React, { useEffect, useState } from 'react';
import { getResources } from '../services/resourceService';
import ResourceCard from '../components/ResourceCard';
import './ResourcePage.css'; // Assuming you have a CSS file for styling

const ResourcePage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const resourceData = await getResources();
        setResources(resourceData);
      } catch (err) {
        setError('Error fetching resources');
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="resource-page">
      <div className="resource-container">
        <h2>Resource Library</h2>
        <div className="resource-list">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcePage;
