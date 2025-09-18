import apiService from './api';

// Fallback data for when backend is not available
const fallbackTestimonials = [
  {
    testimonialId: 1,
    content: "Amazing experience! The trainers are professional and the facilities are top-notch.",
    rating: 5,
    author: "John Doe",
    date: "2024-08-27"
  },
  {
    testimonialId: 2,
    content: "Great workout session, really pushed my limits in a safe way.",
    rating: 4,
    author: "Jane Smith",
    date: "2024-08-26"
  },
  {
    testimonialId: 3,
    content: "Excellent service and very knowledgeable staff.",
    rating: 5,
    author: "Mike Johnson",
    date: "2024-08-25"
  },
  {
    testimonialId: 4,
    content: "The premium package was worth every penny. Highly recommend!",
    rating: 5,
    author: "Sarah Wilson",
    date: "2024-08-24"
  },
  {
    testimonialId: 5,
    content: "Corporate package exceeded our expectations. Perfect for team building.",
    rating: 4,
    author: "David Brown",
    date: "2024-08-23"
  }
];

export const testimonialsService = {
  // Get all testimonials
  async getAllTestimonials() {
    try {
      return await apiService.get('/public/testimonials');
    } catch (error) {
      console.log('Using fallback testimonials data due to API error:', error.message);
      return { success: true, data: fallbackTestimonials };
    }
  },

  // Get testimonial by ID
  async getTestimonialById(id) {
    try {
      return await apiService.get(`/public/testimonials/${id}`);
    } catch (error) {
      console.log('Using fallback testimonial data due to API error:', error.message);
      const testimonial = fallbackTestimonials.find(t => t.testimonialId === parseInt(id));
      return testimonial ? { success: true, data: testimonial } : { success: false, error: 'Testimonial not found' };
    }
  },

  // Create new testimonial
  async createTestimonial(testimonialData) {
    try {
      return await apiService.post('/public/testimonials', testimonialData);
    } catch (error) {
      console.log('Testimonial creation failed due to API error:', error.message);
      return { success: false, error: 'Testimonial creation failed - using fallback mode' };
    }
  },

  // Update testimonial
  async updateTestimonial(id, testimonialData) {
    try {
      return await apiService.put(`/public/testimonials/${id}`, testimonialData);
    } catch (error) {
      console.log('Testimonial update failed due to API error:', error.message);
      return { success: false, error: 'Testimonial update failed - using fallback mode' };
    }
  },

  // Delete testimonial
  async deleteTestimonial(id) {
    try {
      return await apiService.delete(`/public/testimonials/${id}`);
    } catch (error) {
      console.log('Testimonial deletion failed due to API error:', error.message);
      return { success: false, error: 'Testimonial deletion failed - using fallback mode' };
    }
  },

  // Get featured testimonials
  async getFeaturedTestimonials() {
    try {
      return await apiService.get('/public/testimonials/featured');
    } catch (error) {
      console.log('Using fallback featured testimonials due to API error:', error.message);
      const featured = fallbackTestimonials.filter(t => t.rating === 5).slice(0, 3);
      return { success: true, data: featured };
    }
  },

  // Get testimonials by rating
  async getTestimonialsByRating(rating) {
    try {
      return await apiService.get(`/public/testimonials/rating/${rating}`);
    } catch (error) {
      console.log('Using fallback testimonials by rating due to API error:', error.message);
      const filtered = fallbackTestimonials.filter(t => t.rating === parseInt(rating));
      return { success: true, data: filtered };
    }
  }
};




