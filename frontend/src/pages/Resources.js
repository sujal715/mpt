import React, { useState } from 'react';
import './Resources.css';
import WeatherWidget from '../components/WeatherWidget';
import PDFViewer from '../components/PDFViewer';
import resourcesService from '../services/resourcesService';
import apiService from '../services/api';
import { FaCheck } from 'react-icons/fa';

function Resources() {
  const [isWeatherOpen, setIsWeatherOpen] = useState(false);
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);
  const [downloadStates, setDownloadStates] = useState({
    kitesurfing: false,
    uscRecipes: false,
    mealPlans: false
  });
  const [downloadSuccess, setDownloadSuccess] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pendingDownload, setPendingDownload] = useState(null);
  const [selectedPDF, setSelectedPDF] = useState(null);

  const openWeather = async () => {
    setIsWeatherLoading(true);
    // Small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsWeatherLoading(false);
    setIsWeatherOpen(true);
  };
  
  const closeWeather = () => setIsWeatherOpen(false);

  // Email validation function
  const validateEmail = (email) => {
    // Basic email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, error: 'Please enter a valid email address format' };
    }

    // Check for disposable email providers
    const disposableDomains = [
      '10minutemail.com', '10minutemail.net', '10minutemail.org',
      'guerrillamail.com', 'guerrillamail.net', 'guerrillamail.org',
      'tempmail.org', 'temp-mail.org', 'temp-mail.com',
      'mailinator.com', 'mailinator.net', 'mailinator.org',
      'yopmail.com', 'yopmail.net', 'yopmail.org',
      'throwaway.email', 'disposablemail.com', 'disposablemail.net',
      'fakeinbox.com', 'fakeinbox.net', 'fakeinbox.org',
      'temp-mail.ru', 'tempmail.ru', 'temp-mail.com',
      'sharklasers.com', 'grr.la', 'guerrillamailblock.com',
      'pokemail.net', 'spam4.me', 'bccto.me',
      'chacuo.net', 'dispostable.com', 'fake-mail.net',
      'mailnesia.com', 'mintemail.com', 'mohmal.com',
      'nwldx.com', 'pookmail.com', 'spamgourmet.com',
      'spammotel.com', 'spamspot.com', 'spam.la',
      'trashmail.com', 'trashmail.net', 'trashmail.org',
      'wegwerfemail.de', 'wegwerfemail.net', 'wegwerfemail.org',
      'getairmail.com', 'getairmail.net', 'getairmail.org',
      'maildrop.cc', 'maildrop.net', 'maildrop.org',
      'tempr.email', 'tmpeml.com', 'tmpmail.net',
      'tmpmail.org', 'tmpeml.net', 'tmpeml.org',
      'test.com', 'test.net', 'test.org',
      'example.com', 'example.net', 'example.org',
      'fake.com', 'fake.net', 'fake.org',
      'dummy.com', 'dummy.net', 'dummy.org'
    ];

    const domain = email.split('@')[1].toLowerCase();
    if (disposableDomains.includes(domain)) {
      return { isValid: false, error: 'Please use a real email address, not a temporary one' };
    }

    // Check for common real email providers (whitelist approach)
    const realEmailProviders = [
      'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
      'icloud.com', 'me.com', 'mac.com', 'live.com',
      'msn.com', 'aol.com', 'protonmail.com', 'tutanota.com',
      'zoho.com', 'fastmail.com', 'mail.com', 'gmx.com',
      'yandex.com', 'mail.ru', 'qq.com', '163.com',
      '126.com', 'sina.com', 'sohu.com', 'naver.com',
      'daum.net', 'hanmail.net', 'rediffmail.com', 'sify.com',
      'indiatimes.com', 'rediff.com', 'timesmail.com',
      'company.com', 'business.com', 'corporate.com',
      'enterprise.com', 'organization.com', 'institution.com',
      'university.com', 'college.com', 'school.com',
      'education.com', 'academy.com', 'institute.com'
    ];

    // Allow real providers and custom domains (domains with more than 2 parts)
    const domainParts = domain.split('.');
    const isCustomDomain = domainParts.length > 2;
    const isRealProvider = realEmailProviders.includes(domain);

    if (!isRealProvider && !isCustomDomain) {
      return { isValid: false, error: 'Please use a recognized email provider or your company email' };
    }

    return { isValid: true, error: null };
  };

  // Handle download button click
  const handleDownloadClick = (resourceKey) => {
    setPendingDownload(resourceKey);
    setShowEmailModal(true);
    setEmailInput('');
    setEmailError('');
  };

  // Handle email submission
  const handleEmailSubmit = async () => {
    if (!emailInput.trim()) {
      setEmailError('Please enter your email address');
      return;
    }

    const validationResult = validateEmail(emailInput);
    if (!validationResult.isValid) {
      setEmailError(validationResult.error);
      return;
    }

    // Close modal and proceed with download
    setShowEmailModal(false);
    setEmailError('');
    
    // Proceed with the actual download
    await handleDownload(pendingDownload, emailInput);
  };

  // Handle modal close
  const handleModalClose = () => {
    setShowEmailModal(false);
    setPendingDownload(null);
    setEmailInput('');
    setEmailError('');
  };

  const handleDownload = async (resourceKey, userEmail) => {
    setDownloadStates(prev => ({ ...prev, [resourceKey]: true }));
    setDownloadSuccess(null);
    
    try {
      // Log email capture locally (no backend call needed)
      console.log(`Email captured for ${resourceKey} download: ${userEmail}`);
      
      // Store email in localStorage for tracking
      const emailData = {
        email: userEmail,
        resourceType: resourceKey,
        timestamp: new Date().toISOString(),
        source: 'resources'
      };
      
      // Save to localStorage
      const existingEmails = JSON.parse(localStorage.getItem('capturedEmails') || '[]');
      existingEmails.push(emailData);
      localStorage.setItem('capturedEmails', JSON.stringify(existingEmails));
      
      // Proceed with the download
      resourcesService.downloadResource(resourceKey, userEmail);
      
      // Show success message
      const resourceName = resourcesService.getResource(resourceKey).title;
      setDownloadSuccess({
        message: `✅ ${resourceName} downloaded successfully! Thank you for providing your email.`,
        resourceKey
      });
      
      // Reset download state
      setTimeout(() => {
        setDownloadStates(prev => ({ ...prev, [resourceKey]: false }));
      }, 1000);
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setDownloadSuccess(null);
      }, 5000);
      
    } catch (error) {
      console.error('Download failed:', error);
      setDownloadSuccess({
        message: `❌ Download failed: ${error.message}`,
        resourceKey,
        isError: true
      });
      setDownloadStates(prev => ({ ...prev, [resourceKey]: false }));
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setDownloadSuccess(null);
      }, 5000);
    }
  };

  return (
    <div className="resources-page">
      {/* Hero Section */}
      <section className="resources-hero" style={{
        background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/images/hero/homepage.jpeg') center/cover",
        height: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white"
      }}>
        <div className="hero-content">
          <h1>Resources</h1>
          <p>Helpful guides, tips, and information to enhance your water sports journey and improve your skills.</p>
        </div>
      </section>

      {/* Nutrition Resources - Luxury Animation */}
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
              key={`nutrition-sparkle-${i}`}
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
            <h2 className="luxury-features-title" style={{color: "#0891b2", fontSize: "2.5rem", fontWeight: "800", textAlign: "center", marginBottom: "1rem"}}>✨ Nutrition Resources ✨</h2>
            <p className="luxury-features-description">Essential nutrition guides and meal plans to fuel your water sports performance and recovery</p>
          </div>
          
          <div className="luxury-features-grid">
            <div className="feature-card luxury-feature-card scroll-fade-in">
              <h3 className="luxury-feature-title">Kitesurfing Safety</h3>
              <p className="luxury-feature-description">Essential safety guidelines for kitesurfing, including weather conditions, equipment checks, and emergency procedures.</p>
              <div className="feature-benefits luxury-benefits">
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>Weather condition guidelines</span>
                </div>
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>Equipment safety checks</span>
                </div>
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>Emergency procedures</span>
                </div>
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>Best practices guide</span>
                </div>
              </div>
              <button 
                className={`resource-btn ${downloadStates.kitesurfing ? 'downloading' : ''}`}
                onClick={() => handleDownloadClick('kitesurfing')}
                disabled={downloadStates.kitesurfing}
                style={{marginTop: "1rem", width: "100%"}}
              >
                {downloadStates.kitesurfing ? '📥 Downloading...' : '📥 Download Guide'}
              </button>
              <div className="feature-luxury-border" />
            </div>

            <div className="feature-card luxury-feature-card scroll-fade-in">
              <h3 className="luxury-feature-title">USC Recipes</h3>
              <p className="luxury-feature-description">Delicious and nutritious recipes designed for optimal sports performance and recovery.</p>
              <div className="feature-benefits luxury-benefits">
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>Performance-focused meals</span>
                </div>
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>Recovery nutrition</span>
                </div>
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>Easy preparation</span>
                </div>
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>Nutrient-dense ingredients</span>
                </div>
              </div>
              <button 
                className={`resource-btn ${downloadStates.uscRecipes ? 'downloading' : ''}`}
                onClick={() => handleDownloadClick('uscRecipes')}
                disabled={downloadStates.uscRecipes}
                style={{marginTop: "1rem", width: "100%"}}
              >
                {downloadStates.uscRecipes ? '📥 Downloading...' : '📥 Download Guide'}
              </button>
              <div className="feature-luxury-border" />
            </div>

            <div className="feature-card luxury-feature-card scroll-fade-in">
              <h3 className="luxury-feature-title">Meal Plans</h3>
              <p className="luxury-feature-description">Structured meal plans to fuel your training and optimize your water sports performance.</p>
              <div className="feature-benefits luxury-benefits">
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>Training day nutrition</span>
                </div>
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>Competition preparation</span>
                </div>
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>Recovery optimization</span>
                </div>
                <div className="benefit-item luxury-benefit-item">
                  <FaCheck />
                  <span>Macro balancing</span>
                </div>
              </div>
              <button 
                className={`resource-btn ${downloadStates.mealPlans ? 'downloading' : ''}`}
                onClick={() => handleDownloadClick('mealPlans')}
                disabled={downloadStates.mealPlans}
                style={{marginTop: "1rem", width: "100%"}}
              >
                {downloadStates.mealPlans ? '📥 Downloading...' : '📥 Download Guide'}
              </button>
              <div className="feature-luxury-border" />
            </div>
          </div>
        </div>
      </section>

      {/* Tips & Tricks */}
      <section className="tips-section">
        <div className="container">
          <h2>Tips & Tricks</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <h3>Beginner Tips</h3>
              <ul>
                <li>Start with proper instruction</li>
                <li>Practice kite control on land</li>
                <li>Always check weather conditions</li>
                <li>Use appropriate safety gear</li>
              </ul>
            </div>
            <div className="tip-card">
              <h3>Advanced Techniques</h3>
              <ul>
                <li>Master wave riding</li>
                <li>Perfect your jumps</li>
                <li>Learn advanced maneuvers</li>
                <li>Improve board control</li>
              </ul>
            </div>
            <div className="tip-card">
              <h3>Equipment Care</h3>
              <ul>
                <li>Regular equipment inspection</li>
                <li>Proper storage techniques</li>
                <li>Maintenance schedules</li>
                <li>Repair best practices</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Weather Information */}
      <section className="weather-section">
        <div className="container">
          <h2>Weather & Conditions</h2>
          <div className="weather-content">
            <div className="weather-info">
              <h3>Best Conditions</h3>
              <p>Optimal weather conditions for water sports activities:</p>
              <ul>
                <li><strong>Wind Speed:</strong> 15-25 km/h (ideal for kitesurfing)</li>
                <li><strong>Temperature:</strong> 20-30°C (comfortable for water activities)</li>
                <li><strong>Visibility:</strong> 10+ km (clear conditions)</li>
                <li><strong>Weather:</strong> Clear to partly cloudy skies</li>
                <li><strong>Wind Direction:</strong> Onshore or cross-shore winds</li>
                <li><strong>Wave Height:</strong> 0.5-1.5m (manageable for beginners)</li>
              </ul>
              <div className="best-conditions-rating">
                <div className="rating-badge excellent">
                  <span className="rating-icon">🌊</span>
                  <span className="rating-text">Excellent: 8-10/10</span>
                </div>
                <div className="rating-badge good">
                  <span className="rating-icon">🌤️</span>
                  <span className="rating-text">Good: 6-7/10</span>
                </div>
                <div className="rating-badge moderate">
                  <span className="rating-icon">🌫️</span>
                  <span className="rating-text">Moderate: 4-5/10</span>
                </div>
              </div>
            </div>
            <div className="weather-widget">
              <h3>Current Conditions</h3>
              <div className="weather-display">
                <p>Check our live weather feed for real-time conditions</p>
                <button 
                  className={`weather-btn ${isWeatherLoading ? 'loading' : ''}`} 
                  onClick={openWeather}
                  disabled={isWeatherLoading}
                >
                  {isWeatherLoading ? (
                    <>
                      <span>⏳</span>
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <span>🌊</span>
                      <span>View Live Weather</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Success Notification */}
      {downloadSuccess && (
        <div className={`download-notification ${downloadSuccess.isError ? 'error' : 'success'}`}>
          <span className="notification-message">{downloadSuccess.message}</span>
          <button 
            className="notification-close" 
            onClick={() => setDownloadSuccess(null)}
          >
            ×
          </button>
        </div>
      )}

      {/* Email Validation Modal */}
      {showEmailModal && (
        <div className="email-modal-overlay">
          <div className="email-modal">
            <div className="email-modal-header">
              <h3>📧 Enter Your Email</h3>
              <button className="modal-close" onClick={handleModalClose}>×</button>
            </div>
            <div className="email-modal-content">
              <p>Please enter your email address to download the safety guide. We'll also send you additional resources and tips!</p>
              <div className="email-input-group">
                <input
                  type="email"
                  id="resource-email-input"
                  name="resourceEmail"
                  placeholder="your.email@example.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className={`email-input ${emailError ? 'error' : ''}`}
                  onKeyPress={(e) => e.key === 'Enter' && handleEmailSubmit()}
                />
                {emailError && <span className="email-error">{emailError}</span>}
              </div>
              <div className="email-modal-actions">
                <button className="btn-cancel" onClick={handleModalClose}>
                  Cancel
                </button>
                <button className="btn-download" onClick={handleEmailSubmit}>
                  Download Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Weather Widget Modal */}
      <WeatherWidget isOpen={isWeatherOpen} onClose={closeWeather} />
    </div>
  );
}

export default Resources; 