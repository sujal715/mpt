import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <div className="wave-icon">🌊</div>
          </div>
          <div className="logo-text">
            MOVEMENT PERFORMANCE TRAINING
          </div>
        </Link>

        <nav className="navigation">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            HOME
          </Link>
          <Link to="/services" className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}>
            SERVICES
          </Link>
          <Link to="/resources" className={`nav-link ${location.pathname === '/resources' ? 'active' : ''}`}>
            RESOURCES
          </Link>
          <Link to="/gallery" className={`nav-link ${location.pathname === '/gallery' ? 'active' : ''}`}>
            GALLERY
          </Link>
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
            ABOUT
          </Link>
        </nav>

        <Link to="/contact" className="contact-button">
          CONTACT
        </Link>
      </div>
    </header>
  );
};

export default Header; 