import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

function Services() {
  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="hero-content">
          <h1>Our Services</h1>
          <p>Comprehensive water sports training and coaching services designed to help you master the art of kitesurfing, hydrofoiling, and wing foiling.</p>
        </div>
      </section>

      {/* Training Services */}
      <section className="services-section">
        <div className="container">
          <h2>Training Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🏄‍♂️</div>
              <h3>Kitesurfing Training</h3>
              <p>Comprehensive kitesurfing lessons for all skill levels, from complete beginners to advanced riders.</p>
              <ul>
                <li>Beginner to advanced levels</li>
                <li>Safety training and certification</li>
                <li>Equipment provided</li>
                <li>Progress tracking</li>
              </ul>
              <Link to="/booking" className="service-btn">Book Consultation</Link>
            </div>

            <div className="service-card">
              <div className="service-icon">🪁</div>
              <h3>Hydrofoil Training</h3>
              <p>Master the art of hydrofoiling with our expert instructors and state-of-the-art equipment.</p>
              <ul>
                <li>Foil balance and control</li>
                <li>Advanced foil techniques</li>
                <li>Wave riding skills</li>
                <li>Performance analysis</li>
                </ul>
              <Link to="/booking" className="service-btn">Book Consultation</Link>
            </div>

            <div className="service-card">
              <div className="service-icon">🌊</div>
              <h3>Wing Foil Training</h3>
              <p>Discover the exciting world of wing foiling with our comprehensive training programs.</p>
              <ul>
                <li>Wing control fundamentals</li>
                <li>Foil board riding</li>
                <li>Advanced wing techniques</li>
                <li>Wave riding instruction</li>
              </ul>
              <Link to="/booking" className="service-btn">Book Consultation</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Programs */}
      <section className="programs-section">
        <div className="container">
          <h2>Specialized Programs</h2>
          <div className="programs-grid">
            <div className="program-card">
              <div className="program-image">
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop" alt="Youth Program" />
              </div>
              <div className="program-content">
                <h3>Youth Development Program</h3>
                <p>Specialized training programs designed for young athletes aged 12-18, focusing on skill development and safety.</p>
                <div className="program-features">
                  <span>Age 12-18</span>
                  <span>Group sessions</span>
                  <span>Safety focused</span>
                </div>
              </div>
            </div>

            <div className="program-card">
              <div className="program-image">
                <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop" alt="Competition Training" />
              </div>
              <div className="program-content">
                <h3>Competition Training</h3>
                <p>Advanced training for competitive riders looking to excel in competitions and events.</p>
                <div className="program-features">
                  <span>Advanced techniques</span>
                  <span>Competition prep</span>
                  <span>Video analysis</span>
                </div>
              </div>
            </div>

            <div className="program-card">
              <div className="program-image">
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop" alt="Corporate Events" />
              </div>
              <div className="program-content">
                <h3>Corporate Events</h3>
                <p>Team building and corporate events featuring water sports activities and training sessions.</p>
                <div className="program-features">
                  <span>Team building</span>
                  <span>Group activities</span>
                  <span>Custom packages</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Certification */}
      <section className="safety-section">
        <div className="container">
          <h2>Safety & Certification</h2>
          <div className="safety-content">
            <div className="safety-info">
              <h3>Safety First Approach</h3>
              <p>Your safety is our top priority. All our instructors are certified and follow strict safety protocols.</p>
              <ul>
                <li>Certified instructors</li>
                <li>Safety equipment provided</li>
                <li>Weather monitoring</li>
                <li>Emergency procedures</li>
                <li>Insurance coverage</li>
              </ul>
            </div>
            <div className="certification-info">
              <h3>Certification Programs</h3>
              <p>Complete certification programs recognized by international water sports organizations.</p>
              <ul>
                <li>IKO certification</li>
                <li>Safety training</li>
                <li>Progress tracking</li>
                <li>International recognition</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services; 