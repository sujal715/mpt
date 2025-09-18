// API Configuration for Java Spring Boot Backend
// Updated to use local Java backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';

// API Service Class
class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('authToken');
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  // Remove authentication token
  removeToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  // Get headers for requests
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const config = {
        headers: this.getHeaders(),
        ...options,
      };

      const response = await fetch(url, config);
      
      // Handle different response statuses
      if (response.status === 401) {
        // Unauthorized - clear token and redirect to login
        this.removeToken();
        window.location.href = '/admin';
        throw new Error('Authentication required');
      }
      
      if (response.status === 403) {
        throw new Error('Access denied');
      }
      
      if (response.status === 404) {
        throw new Error('Resource not found');
      }
      
      if (response.status >= 500) {
        throw new Error('Server error');
      }

      // Parse response (handle empty responses)
      let data = null;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else if (response.status === 200 && response.statusText === 'OK') {
        // For successful requests with no body (like DELETE), return success
        data = { success: true };
      }
      
      if (!response.ok) {
        throw new Error(data?.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // File upload
  async uploadFile(endpoint, file, additionalData = {}) {
    const formData = new FormData();
    formData.append('file', file);
    
    // Add additional data
    Object.keys(additionalData).forEach(key => {
      formData.append(key, additionalData[key]);
    });

    try {
      const url = `${this.baseURL}${endpoint}`;
      console.log('Upload URL:', url);
      console.log('Base URL:', this.baseURL);
      console.log('Endpoint:', endpoint);
      console.log('FormData contents:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      
      const config = {
        method: 'POST',
        body: formData,
      };

      console.log('Making upload request...');
      const response = await fetch(url, config);
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      const data = await response.json();
      console.log('Response data:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      return data;
    } catch (error) {
      console.error('File Upload Error:', error);
      throw error;
    }
  }
}

// Create and export API service instance
const apiService = new ApiService();
export default apiService;




