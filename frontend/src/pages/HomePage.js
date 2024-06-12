// /frontend/src/pages/HomePage.js

import React from 'react';
import Navbar from '../components/Navbar';
import IdeaList from '../components/IdeaList';
import EventCalendar from '../components/EventCalendar';
import ResourceLibrary from '../components/ResourceLibrary';
import Footer from '../components/Footer';
import './HomePage.css'; // Assuming you have a CSS file for styling

const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />
      <header className="hero-section">
        <div className="hero-content">
          <h1>Willkommen bei C2</h1>
          <p>Die Plattform für Innovation und Zusammenarbeit</p>
          <a href="/submit-idea" className="hero-button">Idee einreichen</a>
        </div>
      </header>
      <main className="main-content">
        <section className="ideas-section">
          <h2>Aktuelle Ideen</h2>
          <IdeaList />
        </section>
        <section className="events-section">
          <h2>Kommende Veranstaltungen</h2>
          <EventCalendar />
        </section>
        <section className="resources-section">
          <h2>Ressourcenbibliothek</h2>
          <ResourceLibrary />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
