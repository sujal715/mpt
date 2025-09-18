import React, { useState } from 'react';
import './Booking.css';
import apiService from '../services/api';
import PaymentForm from '../components/PaymentForm';

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
  const [showPayment, setShowPayment] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'packageId' ? parseInt(value, 10) : value
    }));
  };

  const getPackagePrice = (packageId) => {
    const prices = {
      1: 99.99,
      2: 199.99,
      3: 299.99,
      4: 499.99,
      5: 799.99
    };
    return prices[packageId] || 99.99;
  };

  const getPackageName = (packageId) => {
    const names = {
      1: 'Basic Package (1 hour)',
      2: 'Premium Package (2 hours)',
      3: 'Deluxe Package (3 hours)',
      4: 'VIP Package (4 hours)',
      5: 'Corporate Package (6 hours)'
    };
    return names[packageId] || 'Basic Package';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setBookingResult(null);

    try {
      // Validate form data first
      if (!formData.customerName || !formData.customerEmail || !formData.customerPhone) {
        setBookingResult({
          success: false,
          message: 'Please fill in all required fields'
        });
        return;
      }

      // Prepare booking data for payment (don't create booking yet)
      const packagePrice = getPackagePrice(formData.packageId);
      const packageName = getPackageName(formData.packageId);
      
      setBookingData({
        id: null, // No booking ID yet - will be created after payment
        name: formData.customerName,
        email: formData.customerEmail,
        phone: formData.customerPhone,
        amount: packagePrice,
        serviceType: packageName,
        date: formData.selectedDate,
        time: formData.selectedTime,
        packageId: formData.packageId,
        specialRequests: formData.specialRequests
      });
      
      setShowPayment(true);
    } catch (error) {
      setBookingResult({
        success: false,
        message: 'Error preparing booking: ' + error.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      // Now create the booking after successful payment
      const bookingPayload = {
        customerName: bookingData.name,
        customerEmail: bookingData.email,
        customerPhone: bookingData.phone,
        packageId: bookingData.packageId,
        selectedDate: bookingData.date,
        selectedTime: bookingData.time,
        specialRequests: bookingData.specialRequests,
        paymentId: paymentIntent.id,
        paymentStatus: 'completed'
      };

      const result = await apiService.post('/bookings/create', bookingPayload);
      
      if (result.success) {
        setShowPayment(false);
        setBookingResult({
          success: true,
          message: 'Payment successful! Your booking has been confirmed.',
          data: {
            bookingId: result.data.bookingId,
            totalAmount: bookingData.amount,
            customerName: bookingData.name,
            customerEmail: bookingData.email,
            selectedDate: bookingData.date,
            selectedTime: bookingData.time,
            serviceType: bookingData.serviceType,
            paymentId: paymentIntent.id,
            status: 'confirmed'
          }
        });
        
        // Reset form
        setFormData({
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          packageId: 1,
          selectedDate: '',
          selectedTime: '10:00',
          specialRequests: ''
        });
        setBookingData(null);
      } else {
        // Payment succeeded but booking creation failed
        setBookingResult({
          success: false,
          message: 'Payment successful but booking creation failed. Please contact support with payment ID: ' + paymentIntent.id
        });
      }
    } catch (error) {
      // Payment succeeded but booking creation failed
      setBookingResult({
        success: false,
        message: 'Payment successful but booking creation failed. Please contact support with payment ID: ' + paymentIntent.id + '. Error: ' + error.message
      });
    }
  };

  const handlePaymentError = (error) => {
    setShowPayment(false);
    setBookingResult({
      success: false,
      message: 'Payment failed: ' + error.message
    });
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
          
          {!showPayment ? (
            <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
              <label htmlFor="customerName">Full Name <span className="required-asterisk">*</span></label>
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
              <label htmlFor="customerEmail">Email <span className="required-asterisk">*</span></label>
              <input
                type="email"
                id="customerEmail"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="customerPhone">Phone Number <span className="required-asterisk">*</span></label>
              <input
                type="tel"
                id="customerPhone"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleInputChange}
                required
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="packageId">Training Package <span className="required-asterisk">*</span></label>
              <select
                id="packageId"
                name="packageId"
                value={formData.packageId}
                onChange={handleInputChange}
                required
              >
                <option value={1}>Basic Package - $99.99 (1 hour)</option>
                <option value={2}>Premium Package - $199.99 (2 hours)</option>
                <option value={3}>Deluxe Package - $299.99 (3 hours)</option>
                <option value={4}>VIP Package - $499.99 (4 hours)</option>
                <option value={5}>Corporate Package - $799.99 (6 hours)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="selectedDate">Preferred Date <span className="required-asterisk">*</span></label>
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
              <label htmlFor="selectedTime">Preferred Time <span className="required-asterisk">*</span></label>
              <input
                type="time"
                id="selectedTime"
                name="selectedTime"
                value={formData.selectedTime}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="specialRequests">Special Requests</label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                placeholder="Any special requirements or notes..."
                rows="3"
              />
            </div>

            <button 
              type="submit" 
              className="book-now-btn" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Proceed to Payment →'}
            </button>
          </form>
          ) : (
            <div className="payment-section">
              <PaymentForm
                bookingData={bookingData}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
              />
              <button 
                className="back-to-booking-btn"
                onClick={() => setShowPayment(false)}
              >
                ← Back to Booking Form
              </button>
            </div>
          )}

          {/* Booking Result */}
          {bookingResult && (
            <div className={`booking-result ${bookingResult.success ? 'success' : 'error'}`}>
              <h4>{bookingResult.success ? '✅ Success!' : '❌ Error'}</h4>
              <p>{bookingResult.message}</p>
              {bookingResult.success && bookingResult.data && (
                <div className="booking-details">
                  <p><strong>Booking ID:</strong> {bookingResult.data.bookingId}</p>
                  <p><strong>Service:</strong> {bookingResult.data.serviceType}</p>
                  <p><strong>Total Amount:</strong> ${bookingResult.data.totalAmount}</p>
                  <p><strong>Status:</strong> {bookingResult.data.status}</p>
                  <p><strong>Customer:</strong> {bookingResult.data.customerName}</p>
                  <p><strong>Email:</strong> {bookingResult.data.customerEmail}</p>
                  <p><strong>Date:</strong> {bookingResult.data.selectedDate}</p>
                  <p><strong>Time:</strong> {bookingResult.data.selectedTime}</p>
                  <p><strong>Payment ID:</strong> {bookingResult.data.paymentId}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking; 