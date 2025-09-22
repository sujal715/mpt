package com.mpt.mpt;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowCredentials = "false")
public class MainController {

    // Gallery Management Endpoints - WORKING VERSION
    @GetMapping("/gallery")
    public Map<String, Object> getGallery() {
        return Map.of(
            "success", true,
            "message", "Gallery data loaded successfully",
            "data", Arrays.asList(
                Map.of("id", 1L, "title", "MPT Logo", "url", "/images/logos/mpt-logo.jpeg", "category", "logos", "isFeatured", true),
                Map.of("id", 2L, "title", "Chloe Barrett - Founder & Head Trainer", "url", "/images/team/chloe-headshot.jpg", "category", "team", "isFeatured", true),
                Map.of("id", 3L, "title", "Kitesurfing Training Session", "url", "/images/training/WhatsApp Image 2025-09-01 at 11.21.30 AM.jpeg", "category", "training", "isFeatured", true),
                Map.of("id", 4L, "title", "Hydrofoil Practice", "url", "/images/training/WhatsApp Image 2025-09-01 at 11.21.31 AM.jpeg", "category", "training", "isFeatured", false),
                Map.of("id", 5L, "title", "Advanced Training Techniques", "url", "/images/training/WhatsApp Image 2025-09-01 at 11.21.33 AM.jpeg", "category", "training", "isFeatured", false)
            ),
            "count", 5
        );
    }

    @GetMapping("/services")
    public Map<String, Object> getServices() {
        return Map.of(
            "success", true,
            "data", Arrays.asList(
        Map.of("id", 1, "name", "Kitesurfing Training", "description", "Comprehensive kitesurfing lessons for all skill levels", "price", 99.00, "category", "Training", "isActive", true, "duration", "2 hours"),
        Map.of("id", 2, "name", "Hydrofoil Training", "description", "Master the art of hydrofoiling with expert instructors", "price", 99.00, "category", "Training", "isActive", true, "duration", "2 hours"),
        Map.of("id", 3, "name", "Nutrition Coaching", "description", "Learn nutrition principles and meal planning strategies", "price", 99.00, "category", "Training", "isActive", true, "duration", "2 hours"),
        Map.of("id", 4, "name", "Equipment Rental", "description", "High-quality kitesurfing and foiling equipment rental", "price", 99.00, "category", "Rental", "isActive", true, "duration", "Full day"),
        Map.of("id", 5, "name", "Private Coaching", "description", "One-on-one personalized coaching sessions", "price", 99.00, "category", "Coaching", "isActive", true, "duration", "1 hour")
            )
        );
    }

    // Alternative endpoints with different names
    @GetMapping("/gallery-data")
    public Map<String, Object> getGalleryData() {
        return Map.of(
            "success", true,
            "message", "Gallery data loaded successfully",
            "data", Arrays.asList(
                Map.of("id", 1L, "title", "MPT Logo", "url", "/images/logos/mpt-logo.jpeg", "category", "logos", "isFeatured", true),
                Map.of("id", 2L, "title", "Chloe Barrett - Founder & Head Trainer", "url", "/images/team/chloe-headshot.jpg", "category", "team", "isFeatured", true),
                Map.of("id", 3L, "title", "Kitesurfing Training Session", "url", "/images/training/WhatsApp Image 2025-09-01 at 11.21.30 AM.jpeg", "category", "training", "isFeatured", true)
            ),
            "count", 3
        );
    }

    @GetMapping("/services-data")
    public Map<String, Object> getServicesData() {
        return Map.of(
            "success", true,
            "data", Arrays.asList(
                Map.of("id", 1, "name", "Kitesurfing Training", "description", "Comprehensive kitesurfing lessons for all skill levels", "price", 99.00, "category", "Training", "isActive", true, "duration", "2 hours"),
                Map.of("id", 2, "name", "Hydrofoil Training", "description", "Master the art of hydrofoiling with expert instructors", "price", 99.00, "category", "Training", "isActive", true, "duration", "2 hours")
            )
        );
    }

    @GetMapping("/packages")
    public Map<String, Object> getPackages() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", Arrays.asList(
            Map.of("packageId", 0, "packageName", "FREE Consultation", "price", 0.00, "duration", "30 minutes"),
            Map.of("packageId", 1, "packageName", "Basic Package", "price", 99.00, "duration", "1 hour"),
            Map.of("packageId", 2, "packageName", "Premium Package", "price", 119.00, "duration", "2 hours"),
            Map.of("packageId", 3, "packageName", "Deluxe Package", "price", 139.00, "duration", "3 hours"),
            Map.of("packageId", 4, "packageName", "VIP Package", "price", 159.00, "duration", "4 hours")
        ));
        return response;
    }

    @GetMapping("/videos")
    public Map<String, Object> getVideos() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("videos", Arrays.asList(
            Map.of("filename", "training-video.mp4", "title", "Training Video", "url", "/videos/training-video.mp4", "size", 1024000, "lastModified", "2025-09-07T20:00:00Z"),
            Map.of("filename", "demo-video.mp4", "title", "Demo Video", "url", "/videos/demo-video.mp4", "size", 2048000, "lastModified", "2025-09-07T19:00:00Z")
        ));
        return response;
    }

    @GetMapping("/test-bookings")
    public Map<String, Object> getTestBookings() {
        return Map.of(
            "success", true,
            "message", "Test bookings endpoint working",
            "data", Arrays.asList(
                Map.of("id", 1, "name", "Test Booking", "service", "Test Service", "date", "2025-09-23", "status", "confirmed", "email", "test@example.com", "phone", "1234567890", "amount", 99)
            )
        );
    }

    @GetMapping("/team")
    public List<Map<String, Object>> getTeam() {
        return Arrays.asList(
            Map.of(
                "id", 1,
                "name", "Chloe Barrett",
                "title", "Founder & Head Trainer",
                "description", "Chloe Barrett is the founder and head trainer at Movement Performance Training. With over 8 years of experience in kitesurfing, hydrofoiling, and movement coaching, she brings a unique blend of technical expertise and personalized instruction to every session. Chloe is passionate about helping students achieve their goals while maintaining the highest standards of safety and performance.",
                "imageUrl", "/images/team/chloe-headshot.jpg",
                "credentials", "• Certified Kitesurfing Instructor (IKO Level 2)\\n• Hydrofoil Specialist\\n• Movement Performance Coach\\n• Nutrition & Wellness Consultant\\n• Water Safety Instructor\\n• 8+ Years Experience\\n• 500+ Students Trained",
                "isFeatured", true,
                "displayOrder", 1,
                "createdAt", "2025-09-22T20:44:18.029036",
                "updatedAt", "2025-09-22T20:44:18.029036"
            )
        );
    }

    // Serve the React app for all non-API routes
    @GetMapping(value = {"/", "/admin", "/about", "/contact", "/gallery", "/products", "/resources", "/faq", "/privacy", "/terms"})
    public String serveReactApp() {
        return "forward:/index.html";
    }
    
    // Catch-all for any other routes (except API, h2-console, and static)
    @GetMapping(value = "/{path:^(?!api|h2-console|static|css|js|images|pdfs|videos).*$}")
    public String catchAll(@PathVariable String path) {
        return "forward:/index.html";
    }
}