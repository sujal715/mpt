package com.mpt.mpt.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mpt.mpt.entity.EmailCapture;
import com.mpt.mpt.repository.EmailCaptureRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class EmailController {

    @Autowired
    private EmailCaptureRepository emailCaptureRepository;

    @PostMapping("/emails")
    public Map<String, Object> createEmailCapture(@RequestBody Map<String, String> emailRequest) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            EmailCapture emailCapture = new EmailCapture();
            emailCapture.setEmail(emailRequest.get("email"));
            emailCapture.setSource(emailRequest.get("source"));
            
            EmailCapture savedEmailCapture = emailCaptureRepository.save(emailCapture);
            
            response.put("success", true);
            response.put("message", "Email captured successfully");
            response.put("data", savedEmailCapture);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error capturing email: " + e.getMessage());
        }
        
        return response;
    }

    @GetMapping("/emails")
    public Map<String, Object> getAllEmailCaptures() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<EmailCapture> emailCaptures = emailCaptureRepository.findAll();
            response.put("success", true);
            response.put("data", emailCaptures);
            response.put("count", emailCaptures.size());
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching email captures: " + e.getMessage());
        }
        
        return response;
    }
}
