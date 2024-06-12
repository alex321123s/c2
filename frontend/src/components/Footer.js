// /frontend/src/components/Footer.js

import React from 'react';
import './Footer.css'; // Assuming you have a CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <a href="/about" className="footer-link">
            Über uns
          </a>
          <a href="/contact" className="footer-link">
            Kontakt
          </a>
          <a href="/privacy" className="footer-link">
            Datenschutz
          </a>
          <a href="/terms" className="footer-link">
            Nutzungsbedingungen
          </a>
        </div>
        <div className="footer-socials">
          <a href="https://www.facebook.com" className="social-link" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <a href="https://www.twitter.com" className="social-link" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          <a href="https://www.linkedin.com" className="social-link" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
        <p className="footer-text">
          &copy; {new Date().getFullYear()} C2. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
