import React from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaClock } from 'react-icons/fa';
import InteractiveMap from '../components/InteractiveMap';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-content">
          <h1>Contact Us</h1>
          <p>Get in touch with our team for any questions, bookings, or inquiries about our water sports training programs.</p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="contact-info-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon">
                <FaMapMarkerAlt />
              </div>
              <h3>Our Location</h3>
              <a 
                href="https://maps.google.com/maps?q=Birtinya+QLD+4575+Australia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="location-link"
              >
                <p>📍 Birtinya, QLD 4575</p>
                <p>Sunshine Coast, Queensland, Australia</p>
                <span className="directions-hint">Click to get directions from your location</span>
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <FaPhone />
              </div>
              <h3>Phone</h3>
              <p>0404 445 000</p>
              <p>Available during business hours</p>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <h3>Email</h3>
              <p>info@goldcoastwatersports.com.au</p>
              <p>We'll respond within 24 hours</p>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <FaClock />
              </div>
              <h3>Business Hours</h3>
              <p>Monday - Sunday</p>
              <p>08:00 - 18:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section">
        <div className="container">
          <div className="form-content">
            <div className="form-info">
              <h2>Send us a Message</h2>
              <p>Fill out the form below and we'll get back to you as soon as possible. Whether you're interested in lessons, equipment, or just have questions, we're here to help!</p>
              
              <div className="form-features">
                <div className="feature">
                  <h4>Quick Response</h4>
                  <p>We typically respond within 24 hours</p>
                </div>
                <div className="feature">
                  <h4>Expert Advice</h4>
                  <p>Get personalized recommendations from our team</p>
                </div>
                <div className="feature">
                  <h4>Flexible Booking</h4>
                  <p>We'll work with your schedule</p>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <form>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input type="text" id="firstName" name="firstName" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input type="text" id="lastName" name="lastName" required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input type="email" id="email" name="email" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" id="phone" name="phone" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select id="subject" name="subject" required>
                    <option value="">Select a subject</option>
                    <option value="booking">Lesson Booking</option>
                    <option value="equipment">Equipment Rental</option>
                    <option value="pricing">Pricing Information</option>
                    <option value="safety">Safety Questions</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea id="message" name="message" rows="6" required placeholder="Tell us about your inquiry..."></textarea>
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input type="checkbox" name="newsletter" />
                    <span>Subscribe to our newsletter for updates and special offers</span>
                  </label>
                </div>

                <button type="submit" className="submit-btn">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Location Map */}
      <section className="location-section">
        <div className="container">
          <h2>Find Us</h2>
          <div className="location-content">
            <InteractiveMap 
              location={{
                name: 'Ezyfit Health Club',
                address: 'Birtinya, QLD 4575',
                city: 'Sunshine Coast, Queensland, Australia',
                coordinates: { lat: -26.7500, lng: 153.1167 }
              }}
            />
            <div className="location-details">
              <h3>Getting Here</h3>
              <a 
                href="https://maps.google.com/maps?q=Birtinya+QLD+4575+Australia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="location-link-large"
              >
                <div className="location-info">
                  <h4>📍 Our Location</h4>
                  <p>Birtinya, QLD 4575, Sunshine Coast, Queensland, Australia</p>
                  <span className="directions-hint">Click to get directions from your location</span>
                </div>
              </a>
              <div className="transport-options">
                <div className="transport-option">
                  <h4>🚗 By Car</h4>
                  <p>Free parking available on-site</p>
                </div>
                <div className="transport-option">
                  <h4>🚌 By Bus</h4>
                  <p>Bus routes 600 and 601 stop nearby</p>
                </div>
                <div className="transport-option">
                  <h4>🚴 By Bike</h4>
                  <p>Bike racks available for cyclists</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="emergency-section">
        <div className="container">
          <h2>Emergency Contact</h2>
          <div className="emergency-content">
            <div className="emergency-card">
              <h3>During Business Hours</h3>
              <p>Call us directly at <strong>0404 445 000</strong></p>
            </div>
            <div className="emergency-card">
              <h3>After Hours</h3>
              <p>For urgent matters, contact our emergency line</p>
              <p><strong>Emergency: 000</strong></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact; 