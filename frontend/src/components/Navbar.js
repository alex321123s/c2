// /frontend/src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assuming you have a CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          C2
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/ideas" className="nav-links">
              Ideen
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/community" className="nav-links">
              Community
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/resources" className="nav-links">
              Ressourcen
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/mentors" className="nav-links">
              Mentoren
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/events" className="nav-links">
              Veranstaltungen
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-links">
              Profil
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/feedback" className="nav-links">
              Feedback
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
