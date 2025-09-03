import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <img src={process.env.PUBLIC_URL + '/mpt-logo.jpeg'} alt="MPT Logo" className="logo-image" />
          </div>
          <div className="logo-text">
            MOVEMENT PERFORMANCE TRAINING
          </div>
        </Link>
        
        <nav className="navigation">
          <Link to="/" className="nav-link">HOME</Link>
          <Link to="/services" className="nav-link">SERVICES</Link>
          <Link to="/resources" className="nav-link">RESOURCES</Link>
          <Link to="/gallery" className="nav-link">GALLERY</Link>
          <Link to="/about" className="nav-link">ABOUT</Link>
        </nav>
        
        <Link to="/contact" className="contact-button">
          CONTACT
        </Link>
      </div>
    </header>
  );
};

export default Header; 