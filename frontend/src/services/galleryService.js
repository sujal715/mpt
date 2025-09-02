import apiService from './api';

// Fallback data for when backend is not available
const fallbackGallery = [
  {
    id: 1,
    title: "Training Session 1",
    category: "training",
    imageUrl: "https://via.placeholder.com/300x200",
    description: "High-intensity training session"
  },
  {
    id: 2,
    title: "Training Session 2",
    category: "training",
    imageUrl: "https://via.placeholder.com/300x200",
    description: "Strength training workout"
  },
  {
    id: 3,
    title: "Facility Tour",
    category: "facility",
    imageUrl: "https://via.placeholder.com/300x200",
    description: "State-of-the-art fitness equipment"
  }
];

const fallbackCategories = ["training", "facility", "nutrition", "wellness"];

export const galleryService = {
  // Get all gallery items
  async getAllItems() {
    try {
      return await apiService.get('/gallery');
    } catch (error) {
      console.log('Using fallback gallery data due to API error:', error.message);
      return { success: true, data: fallbackGallery };
    }
  },

  // Get items by category
  async getItemsByCategory(category) {
    try {
      return await apiService.get(`/gallery/category/${category}`);
    } catch (error) {
      console.log('Using fallback gallery data by category due to API error:', error.message);
      const filteredItems = fallbackGallery.filter(item => item.category === category);
      return { success: true, data: filteredItems };
    }
  },

  // Get item by ID
  async getItemById(id) {
    try {
      return await apiService.get(`/gallery/${id}`);
    } catch (error) {
      console.log('Using fallback gallery item due to API error:', error.message);
      const item = fallbackGallery.find(item => item.id === parseInt(id));
      return item ? { success: true, data: item } : { success: false, error: 'Item not found' };
    }
  },

  // Create new item
  async createItem(itemData) {
    try {
      return await apiService.post('/gallery', itemData);
    } catch (error) {
      console.log('Gallery item creation failed due to API error:', error.message);
      return { success: false, error: 'Item creation failed - using fallback mode' };
    }
  },

  // Update item
  async updateItem(id, itemData) {
    try {
      return await apiService.put(`/gallery/${id}`, itemData);
    } catch (error) {
      console.log('Gallery item update failed due to API error:', error.message);
      return { success: false, error: 'Item update failed - using fallback mode' };
    }
  },

  // Delete item
  async deleteItem(id) {
    try {
      return await apiService.delete(`/gallery/${id}`);
    } catch (error) {
      console.log('Gallery item deletion failed due to API error:', error.message);
      return { success: false, error: 'Item deletion failed - using fallback mode' };
    }
  },

  // Upload file
  async uploadFile(endpoint, file, metadata) {
    try {
      return await apiService.uploadFile(endpoint, file, metadata);
    } catch (error) {
      console.log('File upload failed due to API error:', error.message);
      return { success: false, error: 'File upload failed - using fallback mode' };
    }
  },

  // Get categories
  async getCategories() {
    try {
      return await apiService.get('/gallery/categories');
    } catch (error) {
      console.log('Using fallback gallery categories due to API error:', error.message);
      return { success: true, data: fallbackCategories };
    }
  }
};




