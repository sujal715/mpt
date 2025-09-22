package com.mpt.mpt;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowCredentials = "false")
public class MainControllerNew {

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

    @GetMapping("/test")
    public Map<String, Object> getTest() {
        return Map.of(
            "success", true,
            "message", "New MainController working!",
            "timestamp", System.currentTimeMillis()
        );
    }
}
