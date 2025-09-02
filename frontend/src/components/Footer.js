import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Main Column */}
        <div className="footer-section">
          <h3 className="footer-title">Main</h3>
          <div className="footer-links">
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
            <Link to="/about" className="footer-link">Work With Us</Link>
            <Link to="/gallery" className="footer-link">My Gear</Link>
          </div>
        </div>

        {/* Learn Column */}
        <div className="footer-section">
          <h3 className="footer-title">Learn</h3>
          <div className="footer-links">
            <Link to="/services" className="footer-link">Courses</Link>
            <Link to="/resources" className="footer-link">Tutorials</Link>
            <Link to="/about" className="footer-link">Notes</Link>
          </div>
        </div>

        {/* Legal Column */}
        <div className="footer-section">
          <h3 className="footer-title">Legal</h3>
          <div className="footer-links">
            <Link to="/privacy" className="footer-link">Terms</Link>
            <Link to="/privacy" className="footer-link">Privacy</Link>
            <Link to="/contact" className="footer-link">Refund</Link>
          </div>
        </div>

        {/* Social Column */}
        <div className="footer-section">
          <h3 className="footer-title">Social</h3>
          <div className="footer-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link">
              <span className="social-icon">?</span>GitHub
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-link">
              <span className="social-icon">𝕏</span>Twitter (X)
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer-link">
              <span className="social-icon">?</span>YouTube
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-link">
              <span className="social-icon">?</span>Facebook
            </a>
          </div>
        </div>
      </div>
      
      {/* Attribution Line */}
      <div className="footer-attribution">
        Made with ❤️ and ☕ in India
      </div>
    </footer>
  );
};

export default Footer; 