import apiService from './api';

class AuthService {
  // Login user
  async login(credentials) {
    try {
      const response = await apiService.post('/auth/login', credentials);
      
      if (response.token) {
        apiService.setToken(response.token);
        return response;
      }
      
      throw new Error('Login failed - no token received');
    } catch (error) {
      throw error;
    }
  }

  // Logout user
  async logout() {
    try {
      // Call logout endpoint if your backend has one
      await apiService.post('/auth/logout');
    } catch (error) {
      console.log('Logout error:', error);
    } finally {
      // Always clear local token
      apiService.removeToken();
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!apiService.token;
  }

  // Get current user info
  async getCurrentUser() {
    try {
      return await apiService.get('/auth/me');
    } catch (error) {
      throw error;
    }
  }

  // Refresh token
  async refreshToken() {
    try {
      const response = await apiService.post('/auth/refresh');
      if (response.token) {
        apiService.setToken(response.token);
        return response;
      }
      throw new Error('Token refresh failed');
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;




