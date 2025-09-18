import React, { useState } from 'react';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import stripePromise from '../config/stripe';
import './PaymentForm.css';

const PaymentForm = ({ bookingData, onPaymentSuccess, onPaymentError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Create payment intent on backend
      const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8081';
      
      // Debug bookingData
      console.log('Full bookingData:', bookingData);
      
      if (!bookingData) {
        throw new Error('No booking data available');
      }
      
      if (!bookingData.amount) {
        throw new Error('Booking amount is missing');
      }
      
      const requestData = {
        amount: Math.round(bookingData.amount * 100), // Convert to cents and ensure integer
        currency: 'aud',
        bookingId: bookingData.id ? String(bookingData.id) : 'pending', // Handle case where booking doesn't exist yet
        serviceType: bookingData.serviceType,
        customerEmail: bookingData.email,
        customerName: bookingData.name
      };
      
      console.log('Sending payment request:', requestData);
      console.log('API Base URL:', apiBaseUrl);
      
      const response = await fetch(`${apiBaseUrl}/api/payments/create-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          console.log('Could not parse error response as JSON');
        }
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      console.log('Payment intent response:', responseData);
      
      const { clientSecret } = responseData;

      if (!clientSecret) {
        throw new Error('No client secret received from server');
      }

      // Check if this is a mock client secret (for testing)
      if (clientSecret && clientSecret.includes('mock')) {
        // Mock payment - simulate success
        console.log('Using mock payment mode');
        setTimeout(() => {
          const mockPaymentIntent = {
            id: 'pi_mock_' + Date.now(),
            status: 'succeeded',
            amount: bookingData.amount * 100,
            currency: 'aud'
          };
          onPaymentSuccess(mockPaymentIntent);
        }, 1000);
        return;
      }

      // Real Stripe payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: bookingData.name,
            email: bookingData.email,
          },
        },
      });

      if (stripeError) {
        setError(stripeError.message);
        onPaymentError(stripeError);
      } else if (paymentIntent.status === 'succeeded') {
        onPaymentSuccess(paymentIntent);
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
      onPaymentError(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-form-container">
      <div className="payment-form-header">
        <h3>Complete Your Booking</h3>
        <div className="booking-summary">
          <p><strong>Service:</strong> {bookingData.serviceType}</p>
          <p><strong>Amount:</strong> ${bookingData.amount}</p>
          <p><strong>Date:</strong> {bookingData.date}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="payment-form">
        <div className="card-element-container">
          <label htmlFor="card-element">Card Details</label>
          <CardElement
            id="card-element"
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>

        {error && <div className="payment-error">{error}</div>}

        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="payment-button"
        >
          {isProcessing ? 'Processing...' : `Pay $${bookingData.amount}`}
        </button>
      </form>

      <div className="payment-security">
        <p>🔒 Your payment information is secure and encrypted</p>
        <p>Powered by Stripe</p>
      </div>
    </div>
  );
};

const PaymentFormWrapper = ({ bookingData, onPaymentSuccess, onPaymentError }) => {
  if (!stripePromise) {
    return (
      <div className="payment-form-container">
        <div className="payment-error">
          <h3>Payment System Unavailable</h3>
          <p>Stripe configuration is missing. Please contact support.</p>
        </div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm
        bookingData={bookingData}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
      />
    </Elements>
  );
};

export default PaymentFormWrapper;
