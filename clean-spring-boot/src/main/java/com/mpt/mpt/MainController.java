package com.mpt.mpt;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class MainController {

    @GetMapping("/test")
    public Map<String, Object> test() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Backend is working!");
        response.put("status", "success");
        return response;
    }

    @GetMapping("/customers")
    public Map<String, Object> getCustomers() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", new Object[]{
            Map.of("customerId", 1, "firstName", "John", "lastName", "Doe", "email", "john@example.com"),
            Map.of("customerId", 2, "firstName", "Jane", "lastName", "Smith", "email", "jane@example.com")
        });
        return response;
    }

    @GetMapping("/packages")
    public Map<String, Object> getPackages() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", new Object[]{
            Map.of("packageId", 1, "packageName", "Basic Package", "price", 99.99, "duration", "1 hour"),
            Map.of("packageId", 2, "packageName", "Premium Package", "price", 199.99, "duration", "2 hours"),
            Map.of("packageId", 3, "packageName", "Deluxe Package", "price", 299.99, "duration", "3 hours"),
            Map.of("packageId", 4, "packageName", "VIP Package", "price", 499.99, "duration", "4 hours"),
            Map.of("packageId", 5, "packageName", "Corporate Package", "price", 799.99, "duration", "6 hours")
        });
        return response;
    }

    // Removed /bookings endpoint to avoid conflict with BookingController

    @GetMapping("/testimonials")
    public Map<String, Object> getTestimonials() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", new Object[]{
            Map.of("testimonialId", 1, "content", "Amazing experience! The trainers are professional and the facilities are top-notch.", "rating", 5),
            Map.of("testimonialId", 2, "content", "Great workout session, really pushed my limits in a safe way.", "rating", 4),
            Map.of("testimonialId", 3, "content", "Excellent service and very knowledgeable staff.", "rating", 5),
            Map.of("testimonialId", 4, "content", "The premium package was worth every penny. Highly recommend!", "rating", 5),
            Map.of("testimonialId", 5, "content", "Corporate package exceeded our expectations. Perfect for team building.", "rating", 4)
        });
        return response;
    }

    @GetMapping("/gallery")
    public Map<String, Object> getGallery() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", new Object[]{
            Map.of("id", 1, "title", "Training Session 1", "category", "training", "imageUrl", "https://via.placeholder.com/300x200"),
            Map.of("id", 2, "title", "Training Session 2", "category", "training", "imageUrl", "https://via.placeholder.com/300x200"),
            Map.of("id", 3, "title", "Facility Tour", "category", "facility", "imageUrl", "https://via.placeholder.com/300x200")
        });
        return response;
    }

    @GetMapping("/services")
    public Map<String, Object> getServices() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", new Object[]{
            Map.of("id", 1, "name", "Personal Training", "description", "One-on-one training sessions"),
            Map.of("id", 2, "name", "Group Classes", "description", "Group fitness classes"),
            Map.of("id", 3, "name", "Nutrition Coaching", "description", "Diet and nutrition guidance")
        });
        return response;
    }
}
