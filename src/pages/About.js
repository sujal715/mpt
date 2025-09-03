import React from 'react';
import './About.css';
import InteractiveMap from '../components/InteractiveMap';

function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>About Us</h1>
          <p>Learn about our passion for water sports and our commitment to helping you achieve your goals.</p>
        </div>
      </section>

      {/* Company Story */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>With 14 years of experience in sports and fitness, Chloe paused her personal training journey in 2021 to educate the next generation of trainers on the Sunshine Coast while pursuing a Bachelor of Clinical Exercise Physiology.</p>
              <p>An extreme sports enthusiast, Chloe's passion extends beyond the gym. When not coaching, you'll find her mastering waves through kitesurfing, wing foiling, or preparing for triathlons when conditions allow.</p>
              <p>Before personal training, Chloe was a scuba diving and kitesurfing instructor. Today, she channels this diverse experience into helping clients achieve their fitness goals, with a mission to create a healthier, happier world.</p>
            </div>
            <div className="story-image">
              <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" alt="Our Story" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🏆</div>
              <h3>Excellence</h3>
              <p>We strive for excellence in everything we do, from instruction quality to equipment maintenance.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🛡️</div>
              <h3>Safety</h3>
              <p>Safety is our top priority. We maintain the highest safety standards in all our programs.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Community</h3>
              <p>We build and support a strong water sports community through events and shared experiences.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌊</div>
              <h3>Adventure</h3>
              <p>We inspire a sense of adventure and exploration in all our students and programs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team-section">
        <div className="container">
          <h2>Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop" alt="Chloe - Head Instructor" />
              </div>
              <h3>Chloe</h3>
              <p className="member-title">Head Instructor</p>
              <p>With 14 years of experience in water sports, Chloe leads our training programs with passion and expertise. She specializes in kitesurfing and hydrofoiling instruction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="achievements-section">
        <div className="container">
          <h2>Our Achievements</h2>
          <div className="achievements-grid">
            <div className="achievement-card">
              <div className="achievement-number">20+</div>
              <h3>Years Experience</h3>
              <p>Over two decades of water sports instruction excellence</p>
            </div>
            <div className="achievement-card">
              <div className="achievement-number">5000+</div>
              <h3>Students Trained</h3>
              <p>Thousands of successful students across all skill levels</p>
            </div>
            <div className="achievement-card">
              <div className="achievement-number">100%</div>
              <h3>Safety Record</h3>
              <p>Perfect safety record with zero major incidents</p>
            </div>
            <div className="achievement-card">
              <div className="achievement-number">50+</div>
              <h3>Certified Instructors</h3>
              <p>Team of highly qualified and certified instructors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="location-section">
        <div className="container">
          <h2>Our Location</h2>
          <div className="location-content">
            <div className="location-sidebar">
              <div className="location-header">
                <h3>Ezyfit Health Club</h3>
                <p className="location-address">📍 Birtinya, QLD 4575</p>
                <p className="location-region">Sunshine Coast, Queensland, Australia</p>
              </div>
              
              <div className="location-description">
                <p>Our facility provides the perfect environment for movement performance training and development.</p>
              </div>
            </div>
            
            <div className="location-banner">
              <div className="banner-icon">🌍</div>
              <div className="banner-title">Ezyfit Health Club</div>
              <div className="banner-pin">📍</div>
            </div>
            
            <div className="location-main">
              <div className="location-section-item">
                <div className="section-header">
                  <span className="section-icon">📍</span>
                  <h4>Our Location</h4>
                </div>
                <div className="section-content">
                  <h5>Ezyfit Health Club</h5>
                  <p>Birtinya, QLD 4575</p>
                  <p>Sunshine Coast, Queensland, Australia</p>
                </div>
              </div>
              
              <div className="transport-directions-row">
                <div className="location-section-item">
                  <div className="section-header">
                    <span className="section-icon">🚗</span>
                    <h4>How to get here:</h4>
                  </div>
                  <div className="transport-options">
                    <button className="transport-btn active">
                      <span className="btn-icon">🚗</span>
                      <span>Driving</span>
                    </button>
                    <button className="transport-btn">
                      <span className="btn-icon">🚶</span>
                      <span>Walking</span>
                    </button>
                    <button className="transport-btn">
                      <span className="btn-icon">🚲</span>
                      <span>Cycling</span>
                    </button>
                  </div>
                </div>
                
                <div className="location-section-item">
                  <div className="section-header">
                    <span className="section-icon">🔍</span>
                    <h4>Get directions from:</h4>
                  </div>
                  <div className="directions-input">
                    <div className="input-wrapper">
                      <span className="input-icon">🔍</span>
                      <input 
                        type="text" 
                        placeholder="Start typing your address..." 
                        className="directions-field"
                      />
                    </div>
                    <button className="directions-btn">Get Directions</button>
                    <p className="directions-hint">
                      <span className="hint-icon">💡</span>
                      Type to see suggestions • Select from dropdown
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About; 