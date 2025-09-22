// API Configuration for both local and production environments
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (window.location.hostname === 'localhost' ? 'http://localhost:8081' : `${window.location.origin}`);

// API Service Class
class ApiService {
  static async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    const config = { ...defaultOptions, ...options };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Booking endpoints
  static async getBookings() {
    return this.request('/api/bookings');
  }

  static async createBooking(bookingData) {
    return this.request('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  static async deleteBookings() {
    return this.request('/api/bookings', {
      method: 'DELETE',
    });
  }

  // Health check
  static async healthCheck() {
    return this.request('/api/health');
  }
}

export default ApiService;
