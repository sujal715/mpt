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
              <p>Founded in 2000, Movement Performance Training has been at the forefront of water sports education in Australia. What started as a small kitesurfing school has grown into a comprehensive training facility offering instruction in kitesurfing, hydrofoiling, and wing foiling.</p>
              <p>Our mission is to provide safe, professional, and enjoyable water sports training to people of all skill levels. We believe that everyone deserves the opportunity to experience the thrill and freedom of water sports.</p>
              <p>With over 20 years of experience, we've helped thousands of students master the art of water sports and discover their passion for adventure on the water.</p>
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
            <div className="team-member">
              <div className="member-image">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" alt="Mike - Senior Instructor" />
              </div>
              <h3>Mike</h3>
              <p className="member-title">Senior Instructor</p>
              <p>Mike brings 10 years of experience in wing foiling and advanced kitesurfing techniques. He's passionate about helping students master advanced maneuvers.</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop" alt="Sarah - Safety Coordinator" />
              </div>
              <h3>Sarah</h3>
              <p className="member-title">Safety Coordinator</p>
              <p>Sarah ensures all our programs meet the highest safety standards. She's certified in water rescue and emergency response.</p>
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
            <div className="location-info">
              <h3>Ezyfit Health Club, Birtinya</h3>
              <p>Located in the beautiful Sunshine Coast region, our facility offers perfect conditions for water sports training year-round.</p>
              <ul>
                <li>Prime location for water sports</li>
                <li>Excellent wind and wave conditions</li>
                <li>Modern training facilities</li>
                <li>Easy access and parking</li>
              </ul>
            </div>
            <InteractiveMap 
              location={{
                name: 'Ezyfit Health Club',
                address: 'Birtinya, QLD 4575',
                city: 'Sunshine Coast, Queensland, Australia',
                coordinates: { lat: -26.7500, lng: 153.1167 }
              }}
            />
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="about-cta">
        <div className="container">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join our community and discover the thrill of water sports with our expert team.</p>
          <button className="cta-btn">Contact Us Today</button>
        </div>
      </section>
    </div>
  );
}

export default About; 