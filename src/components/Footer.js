import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo and Branding Section */}
        <div className="footer-section">
          <Link to="/" className="footer-logo">
            <div className="footer-logo-icon">🌊</div>
            <div className="footer-logo-text">
              Movement Performance Training
            </div>
          </Link>
          <div className="tripadvisor-badge">
            2021 Travellers' Choice Tripadvisor
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="footer-section">
          <h3 className="footer-title">GET IN TOUCH</h3>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span className="contact-text">Ezyfit Health Club, Birtinya, QLD 4575</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <span className="contact-text">04 98 471 509</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <span className="contact-text">chloebarrettraining@icloud.com</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">🕒</span>
              <span className="contact-text">Mon-Sun: 08:00-18:00</span>
            </div>
          </div>
        </div>

        {/* Navigation Links Section */}
        <div className="footer-section">
          <h3 className="footer-title">USEFUL LINKS</h3>
          <div className="footer-links">
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/about" className="footer-link">About Us</Link>
            <Link to="/resources" className="footer-link">Blog</Link>
            <Link to="/services" className="footer-link">Services</Link>
            <Link to="/privacy" className="footer-link">Privacy Policies</Link>
            <Link to="/faqs" className="footer-link">FAQs</Link>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="footer-section">
          <h3 className="footer-title">FOLLOW US</h3>
          <div className="footer-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-link">
              <span className="social-icon">f</span>Facebook
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-link">
              <span className="social-icon">📷</span>Instagram
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-link">
              <span className="social-icon">𝕏</span>Twitter
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-link">
              <span className="social-icon">in</span>LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 