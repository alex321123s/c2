// /frontend/src/components/ResourceLibrary.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ResourceLibrary.css'; // Assuming you have a CSS file for styling

const ResourceLibrary = () => {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('/api/resources');
        setResources(response.data);
      } catch (error) {
        console.error('Fehler beim Laden der Ressourcen:', error);
      }
    };

    fetchResources();
  }, []);

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="resource-library">
      <h2>Ressourcenbibliothek</h2>
      <input
        type="text"
        placeholder="Nach Ressourcen suchen..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {filteredResources.length === 0 ? (
        <p>Keine Ressourcen gefunden.</p>
      ) : (
        <ul className="resource-list">
          {filteredResources.map((resource) => (
            <li key={resource.id} className="resource-item">
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <a href={resource.link} target="_blank" rel="noopener noreferrer" className="resource-link">
                Mehr erfahren
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResourceLibrary;
