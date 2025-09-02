// Backend API Configuration
export const API_BASE_URL = 'https://mp-xkhc.onrender.com';

// API Endpoints
export const API_ENDPOINTS = {
  HEALTH: '/api/health',
  BOOKINGS: '/api/bookings',
  PACKAGES: '/api/packages',
  SERVICES: '/api/services',
  TESTIMONIALS: '/api/testimonials',
  ADMIN: '/api/admin',
  GALLERY: '/api/gallery'
};

// Full API URLs
export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

// API Headers
export const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json'
});
