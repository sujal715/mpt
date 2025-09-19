import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import './Services.css';

function Services() {
  // Debug logging
  console.log("Services component rendering with luxury animations");
  
  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero" style={{
        background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/images/hero/homepage.jpeg') center/cover",
        height: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white"
      }}>
        <div className="hero-content">
          <h1>Our Services</h1>
          <p>Comprehensive water sports training and coaching services designed to help you master the art of kitesurfing, hydrofoiling, and wing foiling.</p>
        </div>
      </section>

      {/* Training Services - Exact Luxury Feature Cards */}
      <section className="safety-section" style={{position: "relative", background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)", padding: "4rem 0"}}>
        {/* Millionaire-Level Golden sparkles - Exact from Home page */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none"
        }}>
          {[...Array(15)].map((_, i) => (
            <div
              key={`training-sparkle-${i}`}
              style={{
                position: "absolute",
                width: `${3 + Math.random() * 5}px`,
                height: `${3 + Math.random() * 5}px`,
                background: `linear-gradient(45deg, 
                  rgba(255, 215, 0, ${0.9 + Math.random() * 0.1}), 
                  rgba(255, 255, 255, ${0.6 + Math.random() * 0.3}),
                  rgba(255, 215, 0, ${0.7 + Math.random() * 0.2}))`,
                borderRadius: "2px",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `goldenSparkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 4}s`,
                transform: "rotate(45deg)",
                filter: `drop-shadow(0 0 ${8 + Math.random() * 12}px rgba(255, 215, 0, ${0.5 + Math.random() * 0.4}))`
              }}
            />
          ))}
        </div>
        
        <div className="container">
          <div className="thrill-text">
            <h2 className="luxury-features-title" style={{color: "#0891b2", fontSize: "2.5rem", fontWeight: "800", textAlign: "center", marginBottom: "1rem"}}>✨ Training Services ✨</h2>
            <p className="luxury-features-description" style={{color: "#64748b", fontSize: "1.2rem", textAlign: "center", marginBottom: "3rem"}}>Comprehensive water sports training and coaching services designed to help you master the art of kitesurfing, hydrofoiling, and wing foiling</p>
          </div>
          
          <div className="features-grid luxury-features-grid">
            <div className="feature-card luxury-feature-card scroll-fade-in" id="kitesurfing-feature">
              <h3 className="luxury-feature-title">Kitesurfing Training</h3>
              <p className="luxury-feature-description">Comprehensive kitesurfing lessons for all skill levels, from complete beginners to advanced riders.</p>
              <div className="feature-benefits luxury-benefits">
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>Beginner to advanced levels</span>
                </div>
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>Safety training and certification</span>
                </div>
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>Equipment provided</span>
                </div>
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>Progress tracking</span>
                </div>
              </div>
              <div className="feature-luxury-border" />
            </div>

            <div className="feature-card luxury-feature-card scroll-fade-in" id="recovery-feature">
              <h3 className="luxury-feature-title">Injury Recovery</h3>
              <p className="luxury-feature-description">Specialized rehabilitation and recovery programs to help you get back to peak performance after injuries.</p>
              <div className="feature-benefits luxury-benefits">
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>Post-injury rehabilitation</span>
                </div>
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>Movement restoration</span>
                </div>
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>Strength rebuilding</span>
                </div>
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>Return-to-sport protocols</span>
                </div>
              </div>
              <div className="feature-luxury-border" />
            </div>

            <div className="feature-card luxury-feature-card scroll-fade-in" id="wingfoil-feature">
              <h3 className="luxury-feature-title">Nutrition Coaching</h3>
              <p className="luxury-feature-description">Discover the power of proper nutrition with our comprehensive coaching programs.</p>
              <div className="feature-benefits luxury-benefits">
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>Meal planning strategies</span>
                </div>
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>Macro and micronutrient balance</span>
                </div>
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>Performance nutrition</span>
                </div>
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>Hydration protocols</span>
                </div>
              </div>
              <div className="feature-luxury-border" />
            </div>
          </div>
        </div>
      </section>

      {/* My Expertise */}
      <section className="expertise-section">
        <div className="container">
          <div className="expertise-header">
            <h2>My Expertise</h2>
          </div>
          
          <div className="expertise-tags">
            <div className="expertise-tag">
              <span>Sports Performance</span>
            </div>
            <div className="expertise-tag">
              <span>Strength Training</span>
            </div>
            <div className="expertise-tag">
              <span>Nutrition & Wellness</span>
            </div>
            <div className="expertise-tag">
              <span>Injury Recovery</span>
            </div>
            <div className="expertise-tag">
              <span>Movement Analysis</span>
            </div>
            <div className="expertise-tag">
              <span>Competition Prep</span>
            </div>
            <div className="expertise-tag">
              <span>Functional Training</span>
            </div>
            <div className="expertise-tag">
              <span>Rehabilitation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Certification - Exact Luxury Feature Cards */}
      <section className="safety-section">
        {/* Millionaire-Level Golden sparkles - Exact from Home page */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none"
        }}>
          {[...Array(15)].map((_, i) => (
            <div
              key={`luxury-sparkle-${i}`}
              style={{
                position: "absolute",
                width: `${3 + Math.random() * 5}px`,
                height: `${3 + Math.random() * 5}px`,
                background: `linear-gradient(45deg, 
                  rgba(255, 215, 0, ${0.9 + Math.random() * 0.1}), 
                  rgba(255, 255, 255, ${0.6 + Math.random() * 0.3}),
                  rgba(255, 215, 0, ${0.7 + Math.random() * 0.2}))`,
                borderRadius: "2px",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `goldenSparkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 4}s`,
                transform: "rotate(45deg)",
                filter: `drop-shadow(0 0 ${8 + Math.random() * 12}px rgba(255, 215, 0, ${0.5 + Math.random() * 0.4}))`
              }}
            />
          ))}
        </div>
        
        <div className="container">
          <div className="thrill-text">
            <h2 className="luxury-features-title">Safety & Certification</h2>
            <p className="luxury-features-description">Comprehensive safety protocols and certification programs designed to ensure your security and success</p>
          </div>
          
          <div className="features-grid luxury-features-grid">
            <div className="feature-card luxury-feature-card scroll-fade-in" id="safety-feature">
              <h3 className="luxury-feature-title">Safety First Approach</h3>
              <p className="luxury-feature-description">Your safety is our top priority. All our instructors are certified and follow strict safety protocols.</p>
              <div className="feature-benefits luxury-benefits">
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>Certified instructors</span>
                </div>
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>Safety equipment provided</span>
                </div>
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>Weather monitoring</span>
                </div>
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>Emergency procedures</span>
                </div>
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>Insurance coverage</span>
                </div>
              </div>
              <div className="feature-luxury-border" />
            </div>
            
            <div className="feature-card luxury-feature-card scroll-fade-in" id="certification-feature">
              <h3 className="luxury-feature-title">Certification Programs</h3>
              <p className="luxury-feature-description">Complete certification programs recognized by international water sports organizations.</p>
              <div className="feature-benefits luxury-benefits">
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>IKO certification</span>
                </div>
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>Safety training</span>
                </div>
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>Progress tracking</span>
                </div>
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>International recognition</span>
                </div>
              </div>
              <div className="feature-luxury-border" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services; 