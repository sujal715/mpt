import apiService from './api';

class BookingsService {
  // Get all bookings (admin only)
  async getAllBookings() {
    try {
      return await apiService.get('/bookings');
    } catch (error) {
      throw error;
    }
  }

  // Get booking by ID
  async getBooking(id) {
    try {
      return await apiService.get(`/bookings/${id}`);
    } catch (error) {
      throw error;
    }
  }

  // Create new booking
  async createBooking(bookingData) {
    try {
      return await apiService.post('/bookings', bookingData);
    } catch (error) {
      throw error;
    }
  }

  // Update booking (admin only)
  async updateBooking(id, bookingData) {
    try {
      return await apiService.put(`/bookings/${id}`, bookingData);
    } catch (error) {
      throw error;
    }
  }

  // Delete booking (admin only)
  async deleteBooking(id) {
    try {
      return await apiService.delete(`/bookings/${id}`);
    } catch (error) {
      throw error;
    }
  }

  // Get user's own bookings
  async getUserBookings() {
    try {
      return await apiService.get('/bookings/user');
    } catch (error) {
      throw error;
    }
  }

  // Get bookings by status
  async getBookingsByStatus(status) {
    try {
      return await apiService.get(`/bookings/status/${status}`);
    } catch (error) {
      throw error;
    }
  }

  // Get available time slots
  async getAvailableTimeSlots(date) {
    try {
      return await apiService.get(`/bookings/available-slots?date=${date}`);
    } catch (error) {
      throw error;
    }
  }

  // Cancel booking
  async cancelBooking(id) {
    try {
      return await apiService.put(`/bookings/${id}/cancel`);
    } catch (error) {
      throw error;
    }
  }

  // Reschedule booking
  async rescheduleBooking(id, newDateTime) {
    try {
      return await apiService.put(`/bookings/${id}/reschedule`, { newDateTime });
    } catch (error) {
      throw error;
    }
  }

  // Get booking statistics (admin only)
  async getBookingStats() {
    try {
      return await apiService.get('/bookings/stats');
    } catch (error) {
      throw error;
    }
  }
}

export default new BookingsService();




