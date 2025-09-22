package com.mpt.mpt;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mpt.mpt.entity.Booking;
import com.mpt.mpt.service.BookingService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowCredentials = "false")
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
            
            // Handle packageId conversion safely
            Integer packageId;
            Object packageIdObj = bookingRequest.get("packageId");
            if (packageIdObj instanceof Integer) {
                packageId = (Integer) packageIdObj;
            } else if (packageIdObj instanceof String) {
                try {
                    packageId = Integer.parseInt((String) packageIdObj);
                } catch (NumberFormatException e) {
                    response.put("success", false);
                    response.put("message", "Invalid package ID format");
                    return response;
                }
            } else {
                response.put("success", false);
                response.put("message", "Package ID is required and must be a number");
                return response;
            }
            
            String selectedDate = (String) bookingRequest.get("selectedDate");
            String selectedTime = (String) bookingRequest.get("selectedTime");
            String specialRequests = (String) bookingRequest.get("specialRequests");
            
            // Validate required fields
            if (customerName == null || customerName.trim().isEmpty() || 
                customerEmail == null || customerEmail.trim().isEmpty() || 
                packageId == null || 
                selectedDate == null || selectedDate.trim().isEmpty() || 
                selectedTime == null || selectedTime.trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Missing required fields");
                return response;
            }
            
            // Create a new Booking entity
            Booking booking = new Booking();
            booking.setName(customerName);
            booking.setEmail(customerEmail);
            booking.setPhone(customerPhone);
            booking.setService(getPackageName(packageId));
            booking.setMessage(specialRequests != null ? specialRequests : "");
            booking.setStatus("CONFIRMED");
            
            // Save to database
            Booking savedBooking = bookingService.createBooking(booking);
            
            // Create the response
            Map<String, Object> bookingResponse = new HashMap<>();
            bookingResponse.put("bookingId", savedBooking.getId());
            bookingResponse.put("customerName", savedBooking.getName());
            bookingResponse.put("customerEmail", savedBooking.getEmail());
            bookingResponse.put("customerPhone", savedBooking.getPhone());
            bookingResponse.put("packageId", packageId);
            bookingResponse.put("selectedDate", selectedDate);
            bookingResponse.put("selectedTime", selectedTime);
            bookingResponse.put("specialRequests", savedBooking.getMessage());
            bookingResponse.put("status", savedBooking.getStatus());
            bookingResponse.put("totalAmount", getPackagePrice(packageId));
            bookingResponse.put("createdAt", savedBooking.getCreatedAt().toString());
            
            response.put("success", true);
            response.put("message", "Booking created successfully!");
            response.put("data", bookingResponse);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error creating booking: " + e.getMessage());
        }
        
        return response;
    }
    
    @GetMapping("/bookings-test")
    public Map<String, Object> testBookings() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Bookings endpoint is working!");
        response.put("timestamp", System.currentTimeMillis());
        response.put("bookings", new java.util.ArrayList<>());
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
    
    @GetMapping("/bookings/stats")
    public ResponseEntity<Map<String, Object>> getBookingStats() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<Booking> bookings = bookingService.getAllBookings();
            
            // Calculate booking statistics
            int totalBookings = bookings.size();
            int confirmedBookings = (int) bookings.stream()
                .filter(b -> "CONFIRMED".equals(b.getStatus()))
                .count();
            int pendingBookings = (int) bookings.stream()
                .filter(b -> "PENDING".equals(b.getStatus()))
                .count();
            int cancelledBookings = (int) bookings.stream()
                .filter(b -> "CANCELLED".equals(b.getStatus()))
                .count();
            
            double totalRevenue = bookings.stream()
                .filter(b -> "CONFIRMED".equals(b.getStatus()))
                .mapToDouble(this::getBookingRevenue)
                .sum();
            
            // Monthly stats
            int currentMonth = java.time.LocalDate.now().getMonthValue();
            int currentYear = java.time.LocalDate.now().getYear();
            
            long monthlyBookings = bookings.stream()
                .filter(b -> {
                    if (b.getCreatedAt() == null) return false;
                    java.time.LocalDate bookingDate = b.getCreatedAt().toLocalDate();
                    return bookingDate.getMonthValue() == currentMonth && 
                           bookingDate.getYear() == currentYear;
                })
                .count();
            
            double monthlyRevenue = bookings.stream()
                .filter(b -> {
                    if (b.getCreatedAt() == null) return false;
                    java.time.LocalDate bookingDate = b.getCreatedAt().toLocalDate();
                    return bookingDate.getMonthValue() == currentMonth && 
                           bookingDate.getYear() == currentYear &&
                           "CONFIRMED".equals(b.getStatus());
                })
                .mapToDouble(this::getBookingRevenue)
                .sum();
            
            Map<String, Object> stats = new HashMap<>();
            stats.put("totalBookings", totalBookings);
            stats.put("confirmedBookings", confirmedBookings);
            stats.put("pendingBookings", pendingBookings);
            stats.put("cancelledBookings", cancelledBookings);
            stats.put("totalRevenue", Math.round(totalRevenue));
            stats.put("monthlyBookings", Math.toIntExact(monthlyBookings));
            stats.put("monthlyRevenue", Math.round(monthlyRevenue));
            stats.put("conversionRate", totalBookings > 0 ? 
                Math.round((confirmedBookings * 100.0) / totalBookings) : 0);
            
            response.put("success", true);
            response.put("data", stats);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching booking stats: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
        
        return ResponseEntity.ok(response);
    }
    
    private Double getPackagePrice(Integer packageId) {
        switch (packageId) {
            case 0: return 0.00;  // FREE Consultation
            case 1: return 99.00;  // Basic Package
            case 2: return 119.00; // Premium Package
            case 3: return 139.00; // Deluxe Package
            case 4: return 159.00; // VIP Package
            default: return 0.00;
        }
    }
    
    private String getPackageName(Integer packageId) {
        switch (packageId) {
            case 0: return "FREE Consultation (30 minutes)";
            case 1: return "Basic Package";
            case 2: return "Premium Package";
            case 3: return "Deluxe Package";
            case 4: return "VIP Package";
            default: return "FREE Consultation (30 minutes)";
        }
    }
    
    private double getBookingRevenue(Booking booking) {
        // Extract package info from service name or use default pricing
        String service = booking.getService();
        if (service.contains("Basic")) return 99.00;
        if (service.contains("Premium")) return 119.00;
        if (service.contains("Deluxe")) return 139.00;
        if (service.contains("VIP")) return 159.00;
        if (service.contains("FREE")) return 0.00;
        return 99.00; // Default price
    }
}
