package com.mpt.mpt.service;

import com.mpt.mpt.entity.Booking;
import com.mpt.mpt.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
    
    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }
    
    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }
    
    public Booking updateBooking(Long id, Booking bookingDetails) {
        Optional<Booking> optionalBooking = bookingRepository.findById(id);
        if (optionalBooking.isPresent()) {
            Booking existingBooking = optionalBooking.get();
            existingBooking.setName(bookingDetails.getName());
            existingBooking.setEmail(bookingDetails.getEmail());
            existingBooking.setPhone(bookingDetails.getPhone());
            existingBooking.setService(bookingDetails.getService());
            existingBooking.setMessage(bookingDetails.getMessage());
            existingBooking.setStatus(bookingDetails.getStatus());
            return bookingRepository.save(existingBooking);
        }
        return null;
    }
    
    public boolean deleteBooking(Long id) {
        if (bookingRepository.existsById(id)) {
            bookingRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
