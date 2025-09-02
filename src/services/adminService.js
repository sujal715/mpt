import apiService from './api';

class AdminService {
  // Get admin dashboard data
  async getDashboardData() {
    return await apiService.get('/admin/dashboard');
  }

  // Get system statistics
  async getSystemStats() {
    return await apiService.get('/admin/stats');
  }

  // Get user management data
  async getUsers() {
    return await apiService.get('/admin/users');
  }

  // Update user role
  async updateUserRole(userId, role) {
    return await apiService.put(`/admin/users/${userId}/role`, { role });
  }

  // Delete user
  async deleteUser(userId) {
    return await apiService.delete(`/admin/users/${userId}`);
  }
}

export default new AdminService();
