package com.mpt.mpt.controller;

import com.mpt.mpt.entity.Testimonial;
import com.mpt.mpt.service.TestimonialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/testimonials")
@CrossOrigin(origins = "*")
public class TestimonialController {
    
    @Autowired
    private TestimonialService testimonialService;
    
    // Get all testimonials
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllTestimonials() {
        try {
            List<Testimonial> testimonials = testimonialService.getAllTestimonials();
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", testimonials);
            response.put("message", "Testimonials retrieved successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error retrieving testimonials: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    // Get approved testimonials
    @GetMapping("/approved")
    public ResponseEntity<Map<String, Object>> getApprovedTestimonials() {
        try {
            List<Testimonial> testimonials = testimonialService.getApprovedTestimonials();
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", testimonials);
            response.put("message", "Approved testimonials retrieved successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error retrieving approved testimonials: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    // Get testimonial by ID
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getTestimonialById(@PathVariable Long id) {
        try {
            Optional<Testimonial> testimonial = testimonialService.getTestimonialById(id);
            Map<String, Object> response = new HashMap<>();
            
            if (testimonial.isPresent()) {
                response.put("success", true);
                response.put("data", testimonial.get());
                response.put("message", "Testimonial retrieved successfully");
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "Testimonial not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error retrieving testimonial: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    // Create new testimonial
    @PostMapping
    public ResponseEntity<Map<String, Object>> createTestimonial(@RequestBody Testimonial testimonial) {
        try {
            // Validate required fields
            if (testimonial.getCustomerName() == null || testimonial.getCustomerName().trim().isEmpty()) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Customer name is required");
                return ResponseEntity.badRequest().body(response);
            }
            
            if (testimonial.getComment() == null || testimonial.getComment().trim().isEmpty()) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Testimonial comment is required");
                return ResponseEntity.badRequest().body(response);
            }
            
            if (testimonial.getRating() == null || testimonial.getRating() < 1 || testimonial.getRating() > 5) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Rating must be between 1 and 5");
                return ResponseEntity.badRequest().body(response);
            }
            
            Testimonial createdTestimonial = testimonialService.createTestimonial(testimonial);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", createdTestimonial);
            response.put("message", "Testimonial created successfully");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error creating testimonial: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    // Update testimonial
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateTestimonial(@PathVariable Long id, @RequestBody Testimonial testimonialDetails) {
        try {
            Testimonial updatedTestimonial = testimonialService.updateTestimonial(id, testimonialDetails);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", updatedTestimonial);
            response.put("message", "Testimonial updated successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error updating testimonial: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    // Delete testimonial
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteTestimonial(@PathVariable Long id) {
        try {
            testimonialService.deleteTestimonial(id);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Testimonial deleted successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error deleting testimonial: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    // Toggle approval status
    @PatchMapping("/{id}/toggle-approval")
    public ResponseEntity<Map<String, Object>> toggleApprovalStatus(@PathVariable Long id) {
        try {
            Testimonial updatedTestimonial = testimonialService.toggleApprovalStatus(id);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", updatedTestimonial);
            response.put("message", "Approval status toggled successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error toggling approval status: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    // Get testimonials by rating
    @GetMapping("/rating/{rating}")
    public ResponseEntity<Map<String, Object>> getTestimonialsByRating(@PathVariable Integer rating) {
        try {
            List<Testimonial> testimonials = testimonialService.getTestimonialsByRating(rating);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", testimonials);
            response.put("message", "Testimonials retrieved successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error retrieving testimonials: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    // Search testimonials by customer name
    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchTestimonialsByCustomerName(@RequestParam String customerName) {
        try {
            List<Testimonial> testimonials = testimonialService.searchTestimonialsByCustomerName(customerName);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", testimonials);
            response.put("message", "Search results retrieved successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error searching testimonials: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
