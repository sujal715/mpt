import React from 'react';
import './About.css';
import InteractiveMap from '../components/InteractiveMap';

function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero" style={{
        background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/images/hero/homepage.jpeg') center/cover",
        height: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white"
      }}>
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
              <p>An extreme sports enthusiast and strength training expert, Chloe's passion extends beyond traditional fitness. When not coaching, you'll find her mastering waves through kitesurfing, wing foiling, or pushing her limits in the gym with heavy deadlifts and functional training.</p>
              <p>Before personal training, Chloe was a scuba diving and kitesurfing instructor. Today, she channels this diverse experience into helping clients achieve their fitness goals, combining water sports expertise with strength training mastery to create a healthier, happier world.</p>
            </div>
            <div className="story-image">
              <img src="/images/story/deadlift-story.jpg" alt="Chloe performing deadlift - Our Story" />
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
          <h2>Meet Our Founder</h2>
          <div className="team-grid">
            <div className="team-member featured">
              <div className="member-image">
                <img src="/images/team/chloe-headshot.jpg" alt="Chloe Barrett - Founder & Head Instructor" />
              </div>
              <div className="member-info">
                <h3>Chloe Barrett</h3>
                <p className="member-title">Founder & Head Instructor</p>
                <p className="member-description">With 14 years of experience in sports and fitness, Chloe leads Movement Performance Training with passion and expertise. An extreme sports enthusiast, she specializes in kitesurfing, wing foiling, and movement performance training.</p>
                <div className="member-credentials">
                  <span className="credential">Bachelor of Clinical Exercise Physiology</span>
                  <span className="credential">Certified Personal Trainer</span>
                  <span className="credential">Scuba Diving & Kitesurfing Instructor</span>
                </div>
              </div>
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


    </div>
  );
}

export default About; 