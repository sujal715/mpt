package com.mpt.mpt;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
import com.mpt.mpt.entity.Gallery;
import com.mpt.mpt.entity.Team;
import com.mpt.mpt.entity.Testimonial;
import com.mpt.mpt.service.BookingService;
import com.mpt.mpt.service.GalleryService;
import com.mpt.mpt.service.ServiceService;
import com.mpt.mpt.service.TeamService;
import com.mpt.mpt.service.TestimonialService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*", allowCredentials = "false")
public class AdminController {

    @Autowired
    private BookingService bookingService;
    
    @Autowired
    private ServiceService serviceService;

    // ============================================================================
    // BOOKINGS MANAGEMENT ENDPOINTS
    // ============================================================================

    @GetMapping("/bookings")
    public ResponseEntity<Map<String, Object>> getBookings() {
        Map<String, Object> response = new HashMap<>();

        try {
            List<Booking> bookings = bookingService.getAllBookings();
            response.put("success", true);
            response.put("data", bookings);
            response.put("count", bookings.size());

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching bookings: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }
    
    @Autowired
    private TestimonialService testimonialService;
    
    @Autowired
    private GalleryService galleryService;
    
    @Autowired
    private TeamService teamService;

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboardData() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Get all data for dashboard calculations
            List<Booking> bookings = bookingService.getAllBookings();
            List<Testimonial> testimonials = testimonialService.getAllTestimonials();
            List<Gallery> galleryItems = galleryService.getAllGalleryItems();
            List<Team> teamMembers = teamService.getAllTeamMembers();
            
            // Calculate metrics
            int totalBookings = bookings.size();
            int confirmedBookings = (int) bookings.stream()
                .filter(b -> "CONFIRMED".equals(b.getStatus()))
                .count();
            
            double totalRevenue = bookings.stream()
                .filter(b -> "CONFIRMED".equals(b.getStatus()))
                .mapToDouble(this::getBookingRevenue)
                .sum();
            
            double avgRating = testimonials.isEmpty() ? 4.8 : 
                testimonials.stream()
                    .mapToDouble(Testimonial::getRating)
                    .average()
                    .orElse(4.8);
            
            int conversionRate = totalBookings > 0 ? 
                (int) Math.round((confirmedBookings * 100.0) / totalBookings) : 0;
            
            // Create dashboard data
            Map<String, Object> dashboardData = new HashMap<>();
            dashboardData.put("totalBookings", totalBookings);
            dashboardData.put("activeServices", 5); // Static count of services
            dashboardData.put("testimonials", testimonials.size());
            dashboardData.put("revenue", Math.round(totalRevenue));
            dashboardData.put("recentBookings", confirmedBookings);
            dashboardData.put("conversionRate", conversionRate);
            dashboardData.put("avgRating", Math.round(avgRating * 10.0) / 10.0);
            dashboardData.put("galleryItems", galleryItems.size());
            dashboardData.put("teamMembers", teamMembers.size());
            
            response.put("success", true);
            response.put("data", dashboardData);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching dashboard data: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getSystemStats() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<Booking> bookings = bookingService.getAllBookings();
            List<Testimonial> testimonials = testimonialService.getAllTestimonials();
            
            // Calculate monthly stats
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
            stats.put("totalBookings", bookings.size());
            stats.put("monthlyBookings", Math.toIntExact(monthlyBookings));
            stats.put("monthlyRevenue", Math.round(monthlyRevenue));
            stats.put("totalTestimonials", testimonials.size());
            stats.put("avgRating", testimonials.isEmpty() ? 4.8 : 
                testimonials.stream().mapToDouble(Testimonial::getRating).average().orElse(4.8));
            
            response.put("success", true);
            response.put("data", stats);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching system stats: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/users")
    public ResponseEntity<Map<String, Object>> getUsers() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // For now, return empty users list since there's no user management implemented
            List<Map<String, Object>> users = new java.util.ArrayList<>();
            
            response.put("success", true);
            response.put("data", users);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching users: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
        
        return ResponseEntity.ok(response);
    }

    @PutMapping("/users/{userId}/role")
    public ResponseEntity<Map<String, Object>> updateUserRole(@PathVariable Long userId, @RequestBody Map<String, Object> request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // User management not implemented yet
            response.put("success", false);
            response.put("message", "User management not implemented yet");
            return ResponseEntity.notFound().build();
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error updating user role: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Map<String, Object>> deleteUser(@PathVariable Long userId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // User management not implemented yet
            response.put("success", false);
            response.put("message", "User management not implemented yet");
            return ResponseEntity.notFound().build();
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error deleting user: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    // ============================================================================
    // TEAM MANAGEMENT ENDPOINTS
    // ============================================================================
    
    @GetMapping("/team")
    public ResponseEntity<Map<String, Object>> getTeamMembers() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<Team> teamMembers = teamService.getAllTeamMembers();
            response.put("success", true);
            response.put("data", teamMembers);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching team members: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/team")
    public ResponseEntity<Map<String, Object>> createTeamMember(@RequestBody Team teamMember) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Team createdTeam = teamService.createTeamMember(teamMember);
            response.put("success", true);
            response.put("message", "Team member created successfully");
            response.put("data", createdTeam);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error creating team member: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/team/{id}")
    public ResponseEntity<Map<String, Object>> getTeamMember(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            java.util.Optional<Team> teamMember = teamService.getTeamMemberById(id);
            if (teamMember.isPresent()) {
                response.put("success", true);
                response.put("data", teamMember.get());
            } else {
                response.put("success", false);
                response.put("message", "Team member not found");
                return ResponseEntity.notFound().build();
            }
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching team member: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
        
        return ResponseEntity.ok(response);
    }
    
    @PutMapping("/team/{id}")
    public ResponseEntity<Map<String, Object>> updateTeamMember(@PathVariable Long id, @RequestBody Team teamDetails) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Team updatedTeam = teamService.updateTeamMember(id, teamDetails);
            if (updatedTeam != null) {
                response.put("success", true);
                response.put("message", "Team member updated successfully");
                response.put("data", updatedTeam);
            } else {
                response.put("success", false);
                response.put("message", "Team member not found");
                return ResponseEntity.notFound().build();
            }
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error updating team member: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
        
        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/team/{id}")
    public ResponseEntity<Map<String, Object>> deleteTeamMember(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            boolean deleted = teamService.deleteTeamMember(id);
            if (deleted) {
                response.put("success", true);
                response.put("message", "Team member deleted successfully");
            } else {
                response.put("success", false);
                response.put("message", "Team member not found");
                return ResponseEntity.notFound().build();
            }
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error deleting team member: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
        
        return ResponseEntity.ok(response);
    }

    // ============================================================================
    // TESTIMONIAL MANAGEMENT ENDPOINTS
    // ============================================================================
    
    @GetMapping("/testimonials")
    public ResponseEntity<Map<String, Object>> getTestimonials() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<Testimonial> testimonials = testimonialService.getAllTestimonials();
            response.put("success", true);
            response.put("data", testimonials);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching testimonials: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/testimonials/{id}")
    public ResponseEntity<Map<String, Object>> getTestimonial(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            java.util.Optional<Testimonial> testimonial = testimonialService.getTestimonialById(id);
            if (testimonial.isPresent()) {
                response.put("success", true);
                response.put("data", testimonial.get());
            } else {
                response.put("success", false);
                response.put("message", "Testimonial not found");
                return ResponseEntity.notFound().build();
            }
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching testimonial: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
        
        return ResponseEntity.ok(response);
    }
    
    @PutMapping("/testimonials/{id}")
    public ResponseEntity<Map<String, Object>> updateTestimonial(@PathVariable Long id, @RequestBody Testimonial testimonialDetails) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Testimonial updatedTestimonial = testimonialService.updateTestimonial(id, testimonialDetails);
            if (updatedTestimonial != null) {
                response.put("success", true);
                response.put("message", "Testimonial updated successfully");
                response.put("data", updatedTestimonial);
            } else {
                response.put("success", false);
                response.put("message", "Testimonial not found");
                return ResponseEntity.notFound().build();
            }
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error updating testimonial: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
        
        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/testimonials/{id}")
    public ResponseEntity<Map<String, Object>> deleteTestimonial(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            testimonialService.deleteTestimonial(id);
            response.put("success", true);
            response.put("message", "Testimonial deleted successfully");
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error deleting testimonial: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
        
        return ResponseEntity.ok(response);
    }
    
    private double getBookingRevenue(Booking booking) {
        // Extract package info from service name or use default pricing
        String service = booking.getService();
        if (service.contains("Basic")) return 99.00;
        if (service.contains("Premium")) return 119.00;
        if (service.contains("Deluxe")) return 139.00;
        if (service.contains("VIP")) return 159.00;
        return 99.00; // Default price
    }

    // ============================================================================
    // SERVICES MANAGEMENT ENDPOINTS
    // ============================================================================

    @GetMapping("/services")
    public ResponseEntity<Map<String, Object>> getServices() {
        Map<String, Object> response = new HashMap<>();

        try {
            List<com.mpt.mpt.entity.Service> services = serviceService.getAllServices();
            response.put("success", true);
            response.put("data", services);
            response.put("count", services.size());

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching services: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("/services")
    public ResponseEntity<Map<String, Object>> createService(@RequestBody com.mpt.mpt.entity.Service service) {
        Map<String, Object> response = new HashMap<>();

        try {
            com.mpt.mpt.entity.Service createdService = serviceService.createService(service);
            response.put("success", true);
            response.put("message", "Service created successfully");
            response.put("data", createdService);

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error creating service: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/services/{id}")
    public ResponseEntity<Map<String, Object>> getServiceById(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();

        try {
            Optional<com.mpt.mpt.entity.Service> service = serviceService.getServiceById(id);
            if (service.isPresent()) {
                response.put("success", true);
                response.put("data", service.get());
            } else {
                response.put("success", false);
                response.put("message", "Service not found");
                return ResponseEntity.notFound().build();
            }

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching service: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }

    @PutMapping("/services/{id}")
    public ResponseEntity<Map<String, Object>> updateService(@PathVariable Long id, @RequestBody com.mpt.mpt.entity.Service service) {
        Map<String, Object> response = new HashMap<>();

        try {
            com.mpt.mpt.entity.Service updatedService = serviceService.updateService(id, service);
            if (updatedService != null) {
                response.put("success", true);
                response.put("message", "Service updated successfully");
                response.put("data", updatedService);
            } else {
                response.put("success", false);
                response.put("message", "Service not found");
                return ResponseEntity.notFound().build();
            }

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error updating service: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/services/{id}")
    public ResponseEntity<Map<String, Object>> deleteService(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();

        try {
            boolean deleted = serviceService.deleteService(id);
            if (deleted) {
                response.put("success", true);
                response.put("message", "Service deleted successfully");
            } else {
                response.put("success", false);
                response.put("message", "Service not found");
                return ResponseEntity.notFound().build();
            }

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error deleting service: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }

    // ============================================================================
    // GALLERY MANAGEMENT ENDPOINTS
    // ============================================================================

    @GetMapping("/gallery")
    public ResponseEntity<Map<String, Object>> getGalleryItems() {
        Map<String, Object> response = new HashMap<>();

        try {
            List<Gallery> galleryItems = galleryService.getAllGalleryItems();
            response.put("success", true);
            response.put("data", galleryItems);
            response.put("count", galleryItems.size());

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching gallery items: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("/gallery")
    public ResponseEntity<Map<String, Object>> addGalleryItem(@RequestBody Gallery galleryItem) {
        Map<String, Object> response = new HashMap<>();

        try {
            Gallery savedItem = galleryService.createGalleryItem(galleryItem);
            response.put("success", true);
            response.put("data", savedItem);
            response.put("message", "Gallery item added successfully");

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error adding gallery item: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }

    @PutMapping("/gallery/{id}")
    public ResponseEntity<Map<String, Object>> updateGalleryItem(@PathVariable Long id, @RequestBody Gallery galleryItem) {
        Map<String, Object> response = new HashMap<>();

        try {
            Optional<Gallery> existingItem = galleryService.getGalleryItemById(id);
            if (existingItem.isPresent()) {
                Gallery updatedItem = galleryService.updateGalleryItem(id, galleryItem);
                if (updatedItem != null) {
                    response.put("success", true);
                    response.put("data", updatedItem);
                    response.put("message", "Gallery item updated successfully");
                } else {
                    response.put("success", false);
                    response.put("message", "Failed to update gallery item");
                    return ResponseEntity.badRequest().body(response);
                }
            } else {
                response.put("success", false);
                response.put("message", "Gallery item not found");
                return ResponseEntity.notFound().build();
            }

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error updating gallery item: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/gallery/{id}")
    public ResponseEntity<Map<String, Object>> deleteGalleryItem(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();

        try {
            boolean deleted = galleryService.deleteGalleryItem(id);
            if (deleted) {
                response.put("success", true);
                response.put("message", "Gallery item deleted successfully");
            } else {
                response.put("success", false);
                response.put("message", "Gallery item not found");
                return ResponseEntity.notFound().build();
            }

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error deleting gallery item: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }
}
