import apiService from './api';

// Fallback data for when backend is not available
const fallbackServices = [
  {
    id: 1,
    name: "Personal Training",
    description: "One-on-one training sessions with certified trainers",
    price: "$99/hour",
    duration: "1 hour",
    category: "training"
  },
  {
    id: 2,
    name: "Group Classes",
    description: "High-energy group fitness classes for all levels",
    price: "$99/class",
    duration: "45 minutes",
    category: "group"
  },
  {
    id: 3,
    name: "Nutrition Coaching",
    description: "Personalized diet and nutrition guidance",
    price: "$99/month",
    duration: "Monthly program",
    category: "nutrition"
  }
];

export const servicesService = {
  // Get all services
  async getAllServices() {
    try {
      return await apiService.get('/services');
    } catch (error) {
      console.log('Using fallback services data due to API error:', error.message);
      return { success: true, data: fallbackServices };
    }
  },

  // Get service by ID
  async getServiceById(id) {
    try {
      return await apiService.get(`/services/${id}`);
    } catch (error) {
      console.log('Using fallback service data due to API error:', error.message);
      const service = fallbackServices.find(s => s.id === parseInt(id));
      return service ? { success: true, data: service } : { success: false, error: 'Service not found' };
    }
  },

  // Create new service
  async createService(serviceData) {
    try {
      return await apiService.post('/services', serviceData);
    } catch (error) {
      console.log('Service creation failed due to API error:', error.message);
      return { success: false, error: 'Service creation failed - using fallback mode' };
    }
  },

  // Update service
  async updateService(id, serviceData) {
    try {
      return await apiService.put(`/services/${id}`, serviceData);
    } catch (error) {
      console.log('Service update failed due to API error:', error.message);
      return { success: false, error: 'Service update failed - using fallback mode' };
    }
  },

  // Delete service
  async deleteService(id) {
    try {
      return await apiService.delete(`/services/${id}`);
    } catch (error) {
      console.log('Service deletion failed due to API error:', error.message);
      return { success: false, error: 'Service deletion failed - using fallback mode' };
    }
  },

  // Get services by category
  async getServicesByCategory(category) {
    try {
      return await apiService.get(`/services/category/${category}`);
    } catch (error) {
      console.log('Using fallback services by category due to API error:', error.message);
      const filteredServices = fallbackServices.filter(s => s.category === category);
      return { success: true, data: filteredServices };
    }
  },

  // Get service categories
  async getServiceCategories() {
    try {
      return await apiService.get('/services/categories');
    } catch (error) {
      console.log('Using fallback categories due to API error:', error.message);
      const categories = [...new Set(fallbackServices.map(s => s.category))];
      return { success: true, data: categories };
    }
  }
};




