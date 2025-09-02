package com.mpt.mpt;

import com.mpt.mpt.entity.Booking;
import com.mpt.mpt.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/bookings/create")
    public Map<String, Object> createBooking(@RequestBody Map<String, Object> bookingRequest) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Extract booking details
            String customerName = (String) bookingRequest.get("customerName");
            String customerEmail = (String) bookingRequest.get("customerEmail");
            String customerPhone = (String) bookingRequest.get("customerPhone");
            Integer packageId = (Integer) bookingRequest.get("packageId");
            String selectedDate = (String) bookingRequest.get("selectedDate");
            String selectedTime = (String) bookingRequest.get("selectedTime");
            String specialRequests = (String) bookingRequest.get("specialRequests");
            
            // Validate required fields
            if (customerName == null || customerEmail == null || packageId == null || 
                selectedDate == null || selectedTime == null) {
                response.put("success", false);
                response.put("message", "Missing required fields");
                return response;
            }
            
            // Generate a booking ID (in a real app, this would be from database)
            int bookingId = (int) (Math.random() * 10000) + 1000;
            
            // Create the booking response
            Map<String, Object> booking = new HashMap<>();
            booking.put("bookingId", bookingId);
            booking.put("customerName", customerName);
            booking.put("customerEmail", customerEmail);
            booking.put("customerPhone", customerPhone);
            booking.put("packageId", packageId);
            booking.put("selectedDate", selectedDate);
            booking.put("selectedTime", selectedTime);
            booking.put("specialRequests", specialRequests);
            booking.put("status", "CONFIRMED");
            booking.put("totalAmount", getPackagePrice(packageId));
            booking.put("createdAt", java.time.LocalDateTime.now().toString());
            
            response.put("success", true);
            response.put("message", "Booking created successfully!");
            response.put("data", booking);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error creating booking: " + e.getMessage());
        }
        
        return response;
    }
    
    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }
    
    @GetMapping("/bookings/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        return bookingService.getBookingById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/bookings/{id}")
    public ResponseEntity<Booking> updateBooking(@PathVariable Long id, @RequestBody Booking bookingDetails) {
        Booking updatedBooking = bookingService.updateBooking(id, bookingDetails);
        if (updatedBooking != null) {
            return ResponseEntity.ok(updatedBooking);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/bookings/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        if (bookingService.deleteBooking(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    private Double getPackagePrice(Integer packageId) {
        switch (packageId) {
            case 1: return 99.99;  // Basic Package
            case 2: return 199.99; // Premium Package
            case 3: return 299.99; // Deluxe Package
            case 4: return 499.99; // VIP Package
            case 5: return 799.99; // Corporate Package
            default: return 99.99;
        }
    }
}
