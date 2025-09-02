import apiService from './api';

// Fallback data for when backend is not available
const fallbackPackages = [
  {
    packageId: 1,
    packageName: "Basic Package",
    price: 99.99,
    duration: "1 hour",
    description: "Perfect for beginners",
    features: ["Personal training session", "Fitness assessment", "Basic workout plan"]
  },
  {
    packageId: 2,
    packageName: "Premium Package",
    price: 199.99,
    duration: "2 hours",
    description: "Great for regular fitness enthusiasts",
    features: ["Extended training session", "Nutrition guidance", "Progress tracking"]
  },
  {
    packageId: 3,
    packageName: "Deluxe Package",
    price: 299.99,
    duration: "3 hours",
    description: "Comprehensive fitness solution",
    features: ["Full day program", "Meal planning", "24/7 support"]
  }
];

export const packagesService = {
  // Get all packages
  async getAllPackages() {
    try {
      return await apiService.get('/packages');
    } catch (error) {
      console.log('Using fallback packages data due to API error:', error.message);
      return { success: true, data: fallbackPackages };
    }
  },

  // Get package by ID
  async getPackageById(id) {
    try {
      return await apiService.get(`/packages/${id}`);
    } catch (error) {
      console.log('Using fallback package data due to API error:', error.message);
      const pkg = fallbackPackages.find(p => p.packageId === parseInt(id));
      return pkg ? { success: true, data: pkg } : { success: false, error: 'Package not found' };
    }
  },

  // Create new package
  async createPackage(packageData) {
    try {
      return await apiService.post('/packages', packageData);
    } catch (error) {
      console.log('Package creation failed due to API error:', error.message);
      return { success: false, error: 'Package creation failed - using fallback mode' };
    }
  },

  // Update package
  async updatePackage(id, packageData) {
    try {
      return await apiService.put(`/packages/${id}`, packageData);
    } catch (error) {
      console.log('Package update failed due to API error:', error.message);
      return { success: false, error: 'Package update failed - using fallback mode' };
    }
  },

  // Delete package
  async deletePackage(id) {
    try {
      return await apiService.delete(`/packages/${id}`);
    } catch (error) {
      console.log('Package deletion failed due to API error:', error.message);
      return { success: false, error: 'Package deletion failed - using fallback mode' };
    }
  },

  // Get packages by category
  async getPackagesByCategory(category) {
    try {
      return await apiService.get(`/packages/category/${category}`);
    } catch (error) {
      console.log('Using fallback packages by category due to API error:', error.message);
      // For now, return all packages since we don't have category filtering in fallback
      return { success: true, data: fallbackPackages };
    }
  }
};
