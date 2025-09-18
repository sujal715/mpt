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

import com.mpt.mpt.entity.Message;
import com.mpt.mpt.repository.MessageRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class MessageController {

    @Autowired
    private MessageRepository messageRepository;

    @PostMapping("/messages")
    public Map<String, Object> createMessage(@RequestBody Map<String, String> messageRequest) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Message message = new Message();
            message.setName(messageRequest.get("name"));
            message.setEmail(messageRequest.get("email"));
            message.setPhone(messageRequest.get("phone"));
            message.setSubject(messageRequest.get("subject"));
            message.setMessage(messageRequest.get("message"));
            message.setStatus("NEW");
            
            Message savedMessage = messageRepository.save(message);
            
            response.put("success", true);
            response.put("message", "Message sent successfully");
            response.put("data", savedMessage);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error sending message: " + e.getMessage());
        }
        
        return response;
    }

    @GetMapping("/messages")
    public Map<String, Object> getAllMessages() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<Message> messages = messageRepository.findAll();
            response.put("success", true);
            response.put("data", messages);
            response.put("count", messages.size());
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching messages: " + e.getMessage());
        }
        
        return response;
    }
}
