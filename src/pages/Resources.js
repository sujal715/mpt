import React, { useState } from 'react';
import './Resources.css';
import WeatherWidget from '../components/WeatherWidget';
import resourcesService from '../services/resourcesService';

function Resources() {
  const [isWeatherOpen, setIsWeatherOpen] = useState(false);
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);
  const [downloadStates, setDownloadStates] = useState({
    kitesurfing: false,
    hydrofoil: false,
    wingFoil: false
  });
  const [downloadSuccess, setDownloadSuccess] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pendingDownload, setPendingDownload] = useState(null);

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

    if (!validateEmail(emailInput)) {
      setEmailError('Please enter a valid email address');
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
      // Log the download with user email
      console.log(`Download requested for ${resourceKey} by ${userEmail}`);
      
      await resourcesService.downloadResource(resourceKey, userEmail);
      
      // Show success message
      const resourceName = resourcesService.getResource(resourceKey).title;
      setDownloadSuccess({
        message: `✅ ${resourceName} downloaded successfully! Check your email for additional resources.`,
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
      <section className="resources-hero">
        <div className="hero-content">
          <h1>Resources</h1>
          <p>Helpful guides, tips, and information to enhance your water sports journey and improve your skills.</p>
        </div>
      </section>

      {/* Safety Guides */}
      <section className="resources-section">
        <div className="container">
          <h2>Safety Guides</h2>
          <div className="resources-grid">
            <div className="resource-card">
              <h3>Kitesurfing Safety</h3>
              <p>Essential safety guidelines for kitesurfing, including weather conditions, equipment checks, and emergency procedures.</p>
              <button 
                className={`resource-btn ${downloadStates.kitesurfing ? 'downloading' : ''}`}
                onClick={() => handleDownloadClick('kitesurfing')}
                disabled={downloadStates.kitesurfing}
              >
                {downloadStates.kitesurfing ? '📥 Downloading...' : '📥 Download Guide'}
              </button>
            </div>
            <div className="resource-card">
              <h3>Hydrofoil Safety</h3>
              <p>Safety protocols for hydrofoiling, including foil handling, launch techniques, and emergency procedures.</p>
              <button 
                className={`resource-btn ${downloadStates.hydrofoil ? 'downloading' : ''}`}
                onClick={() => handleDownloadClick('hydrofoil')}
                disabled={downloadStates.hydrofoil}
              >
                {downloadStates.hydrofoil ? '📥 Downloading...' : '📥 Download Guide'}
              </button>
            </div>
            <div className="resource-card">
              <h3>Wing Foil Safety</h3>
              <p>Comprehensive safety guide for wing foiling, covering wing control, foil safety, and rescue procedures.</p>
              <button 
                className={`resource-btn ${downloadStates.wingFoil ? 'downloading' : ''}`}
                onClick={() => handleDownloadClick('wingFoil')}
                disabled={downloadStates.wingFoil}
              >
                {downloadStates.wingFoil ? '📥 Downloading...' : '📥 Download Guide'}
              </button>
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
              <p>Learn about optimal weather conditions for different water sports activities.</p>
              <ul>
                <li>Wind speed and direction</li>
                <li>Wave conditions</li>
                <li>Temperature considerations</li>
                <li>Seasonal variations</li>
              </ul>
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
                  {isWeatherLoading ? 'Loading...' : 'View Live Weather'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>What equipment do I need to start?</h3>
              <p>We provide all necessary equipment for beginners. As you progress, you may want to invest in your own gear.</p>
            </div>
            <div className="faq-item">
              <h3>How long does it take to learn?</h3>
              <p>Most students see significant progress within 5-10 lessons, depending on their athletic background and dedication.</p>
            </div>
            <div className="faq-item">
              <h3>What age can you start?</h3>
              <p>We offer programs for ages 12 and up, with special youth programs designed for younger athletes.</p>
            </div>
            <div className="faq-item">
              <h3>Do you offer group lessons?</h3>
              <p>Yes, we offer both private and group lessons. Group lessons are great for friends and families.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="contact-resources">
        <div className="container">
          <h2>Need More Information?</h2>
          <p>Contact our team for personalized advice and recommendations.</p>
          <button className="contact-btn">Get in Touch</button>
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