import React, { useState } from 'react';
import './Booking.css';

const Booking = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    packageId: 1,
    selectedDate: '',
    selectedTime: '10:00',
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setBookingResult(null);

    // Simulate form submission (no server connection needed)
    setTimeout(() => {
      setBookingResult({
        success: true,
        message: 'Thank you! Your consultation has been booked successfully. We will contact you soon to confirm your appointment.'
      });
      
      // Reset form on success
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        packageId: 1,
        selectedDate: '',
        selectedTime: '10:00',
        specialRequests: ''
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="booking-page">
      <div className="booking-container">
        {/* Left Side - Consultation Details */}
        <div className="consultation-details">
          <h1>Book your free 15-minute consultation.</h1>
          <h2>Your First Step to Better Performance on the Water! 🌊</h2>
          
          <p className="consultation-intro">
            In this quick, personalized 15-minute consultation, we'll dive into your kitesurfing or wing foiling goals and assess your current mobility, strength, and balance. Here's what you can expect:
          </p>
          
          <ul className="consultation-benefits">
            <li>
              <strong>Personalized Assessment</strong> – We'll discuss any challenges you're facing, from flexibility to injury concerns, and pinpoint key areas for improvement.
            </li>
            <li>
              <strong>Goal Setting</strong> – Together, we'll outline specific goals that will enhance your performance, whether it's boosting your stamina or perfecting your technique.
            </li>
            <li>
              <strong>Actionable Next Steps</strong> – Leave with clear, tailored advice on how to kickstart your training journey, with exercises or programs that fit your lifestyle.
            </li>
          </ul>
          
          <p className="consultation-conclusion">
            This is your opportunity to ask questions and learn how our expert training can help you maximize your potential. Let's take the first step together toward becoming stronger, more flexible, and unstoppable on the water! 🏄‍♀️💪
          </p>
          
          <p className="cta-text">
            Book your free 15-minute consultation now!
          </p>
        </div>

        {/* Right Side - Booking Form */}
        <div className="booking-widget">
          <h3>Book Your Session</h3>
          
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
              <label htmlFor="customerName">Full Name *</label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="customerEmail">Email Address *</label>
              <input
                type="email"
                id="customerEmail"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleInputChange}
                required
                placeholder="Enter your email address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="customerPhone">Phone Number</label>
              <input
                type="tel"
                id="customerPhone"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="packageId">Training Package</label>
              <select
                id="packageId"
                name="packageId"
                value={formData.packageId}
                onChange={handleInputChange}
              >
                <option value={1}>Free 15-Minute Consultation</option>
                <option value={2}>Kitesurfing Training</option>
                <option value={3}>Hydrofoil Training</option>
                <option value={4}>Wing Foil Training</option>
                <option value={5}>Performance Training</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="selectedDate">Preferred Date *</label>
              <input
                type="date"
                id="selectedDate"
                name="selectedDate"
                value={formData.selectedDate}
                onChange={handleInputChange}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="selectedTime">Preferred Time *</label>
              <select
                id="selectedTime"
                name="selectedTime"
                value={formData.selectedTime}
                onChange={handleInputChange}
                required
              >
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="specialRequests">Special Requests or Questions</label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                rows="4"
                placeholder="Any specific questions or requests for your consultation?"
              />
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Booking...' : 'Book Consultation'}
            </button>
          </form>

          {/* Success/Error Message */}
          {bookingResult && (
            <div className={`booking-result ${bookingResult.success ? 'success' : 'error'}`}>
              <p>{bookingResult.message}</p>
            </div>
          )}

          <div className="booking-info">
            <p><strong>Note:</strong> This is a demo booking form. In a real application, this would connect to your backend server.</p>
            <p>Your consultation will be confirmed via email within 24 hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking; 