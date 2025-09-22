import apiService from './api';

// Fallback data for when backend is not available
const fallbackGallery = [
  {
    id: 1,
    title: "Training Session 1",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-07-20 at 8.53.52 PM.jpeg",
    description: "Early training session"
  },
  {
    id: 2,
    title: "Training Session 2",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.21.30 AM.jpeg",
    description: "High-intensity training session"
  },
  {
    id: 3,
    title: "Training Session 3",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.21.31 AM.jpeg",
    description: "Strength training workout"
  },
  {
    id: 4,
    title: "Training Session 4",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.21.33 AM.jpeg",
    description: "Functional fitness training"
  },
  {
    id: 5,
    title: "Training Session 5",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.21.33 AM-2.jpeg",
    description: "Advanced functional training"
  },
  {
    id: 6,
    title: "Training Session 6",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.21.34 AM.jpeg",
    description: "Core strength workout"
  },
  {
    id: 7,
    title: "Training Session 7",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.21.34 AM-2.jpeg",
    description: "Core strength progression"
  },
  {
    id: 8,
    title: "Training Session 8",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.21.35 AM.jpeg",
    description: "Balance and coordination"
  },
  {
    id: 9,
    title: "Training Session 9",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.21.35 AM-2.jpeg",
    description: "Advanced balance training"
  },
  {
    id: 10,
    title: "Training Session 10",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.21.36 AM.jpeg",
    description: "Endurance training"
  },
  {
    id: 11,
    title: "Training Session 11",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.21.37 AM.jpeg",
    description: "Power and speed training"
  },
  {
    id: 12,
    title: "Training Session 12",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.21.38 AM.jpeg",
    description: "Flexibility and mobility"
  },
  {
    id: 13,
    title: "Training Session 13",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.21.39 AM.jpeg",
    description: "Sport-specific training"
  },
  {
    id: 14,
    title: "Training Session 14",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.21.40 AM.jpeg",
    description: "Recovery and rehabilitation"
  },
  {
    id: 15,
    title: "Training Session 15",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.21.40 AM-2.jpeg",
    description: "Recovery techniques"
  },
  {
    id: 16,
    title: "Training Session 16",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.21.41 AM.jpeg",
    description: "Advanced recovery methods"
  },
  {
    id: 17,
    title: "Training Session 17",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.21.41 AM-2.jpeg",
    description: "Recovery progression"
  },
  {
    id: 18,
    title: "Training Session 18",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.21.43 AM.jpeg",
    description: "Specialized training"
  },
  {
    id: 19,
    title: "Training Session 19",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.21.46 AM.jpeg",
    description: "Performance training"
  },
  {
    id: 20,
    title: "Training Session 20",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.21.47 AM.jpeg",
    description: "Elite performance training"
  },
  {
    id: 21,
    title: "Training Session 21",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.23.32 AM.jpeg",
    description: "Morning training session"
  },
  {
    id: 22,
    title: "Training Session 22",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.23.32 AM-2.jpeg",
    description: "Morning training continuation"
  },
  {
    id: 23,
    title: "Training Session 23",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.23.34 AM.jpeg",
    description: "Intensive morning workout"
  },
  {
    id: 24,
    title: "Training Session 24",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.23.37 AM.jpeg",
    description: "Advanced morning training"
  },
  {
    id: 25,
    title: "Training Session 25",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.23.40 AM.jpeg",
    description: "Peak performance training"
  },
  {
    id: 26,
    title: "Training Session 26",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.23.42 AM.jpeg",
    description: "Elite athlete training"
  },
  {
    id: 27,
    title: "Training Session 27",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.23.45 AM.jpeg",
    description: "Professional training session"
  },
  {
    id: 28,
    title: "Training Session 28",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.23.48 AM.jpeg",
    description: "Expert-level training"
  },
  {
    id: 29,
    title: "Training Session 29",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.26.48 AM.jpeg",
    description: "Final training session"
  },
  {
    id: 30,
    title: "Training Session 30",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.26.50 AM.jpeg",
    description: "Training completion"
  },
  {
    id: 31,
    title: "Training Session 31",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.26.54 AM.jpeg",
    description: "Post-training analysis"
  },
  {
    id: 32,
    title: "Training Session 32",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.26.58 AM.jpeg",
    description: "Training documentation"
  },
  {
    id: 33,
    title: "Training Session 33",
    category: "training",
    imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.26.59 AM.jpeg",
    description: "Training summary"
  },
  {
    id: 34,
    title: "Team Member",
    category: "team",
    imageUrl: "/images/team/chloe-headshot.jpg",
    description: "Chloe Barrett - Head Instructor"
  },
  {
    id: 35,
    title: "MPT Logo",
    category: "logos",
    imageUrl: "/images/logos/mpt-logo.jpeg",
    description: "Movement Performance Training Logo"
  }
];

const fallbackCategories = ["training", "team", "logos"];

export const galleryService = {
  // Get all gallery items
  async getAllItems() {
    try {
      console.log('Fetching gallery data from backend...');
      const timestamp = Date.now();
      const apiUrl = `/gallery`;
      console.log('API URL:', apiUrl);
      const response = await apiService.get(apiUrl);
      console.log('Gallery API response:', response);
      console.log('Gallery API response length:', response?.length);
      console.log('Gallery API response type:', typeof response);
      
      // Backend returns object with data property
      if (response && response.success && Array.isArray(response.data)) {
        console.log(`Successfully loaded ${response.data.length} gallery items from backend`);
        return { success: true, data: response.data };
      } else if (Array.isArray(response)) {
        console.log(`Successfully loaded ${response.length} gallery items from backend (direct array)`);
        return { success: true, data: response };
      } else {
        console.log('Unexpected response format:', response);
        return { success: true, data: response };
      }
    } catch (error) {
      console.error('Gallery API error:', error);
      console.log('Using fallback gallery data due to API error:', error.message);
      console.log('Error details:', error);
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




