// /frontend/src/components/IdeaList.js

import React from 'react';

const IdeaList = ({ ideas }) => {
  if (ideas.length === 0) {
    return <p>Es sind noch keine Ideen eingereicht worden.</p>;
  }

  return (
    <div>
      <h2>Liste der Ideen</h2>
      <ul>
        {ideas.map((idea) => (
          <li key={idea.id}>
            <h3>{idea.title}</h3>
            <p>{idea.description}</p>
            <p><strong>Kategorie:</strong> {idea.category}</p>
            <p><strong>Tags:</strong> {idea.tags.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IdeaList;
