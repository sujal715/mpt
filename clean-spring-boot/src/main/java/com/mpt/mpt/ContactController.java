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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mpt.mpt.entity.Contact;
import com.mpt.mpt.entity.EmailCapture;
import com.mpt.mpt.service.ContactService;
import com.mpt.mpt.service.EmailCaptureService;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowCredentials = "false")
public class ContactController {

    @Autowired
    private ContactService contactService;
    
    @Autowired
    private EmailCaptureService emailCaptureService;

    // ========== CONTACT MESSAGES ENDPOINTS ==========
    
    @PostMapping("/contacts/submit")
    public Map<String, Object> submitContact(@RequestBody Map<String, Object> contactRequest, HttpServletRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Extract contact details
            String firstName = (String) contactRequest.get("firstName");
            String lastName = (String) contactRequest.get("lastName");
            String email = (String) contactRequest.get("email");
            String phone = (String) contactRequest.get("phone");
            String subject = (String) contactRequest.get("subject");
            String message = (String) contactRequest.get("message");
            
            // Validate required fields
            if (firstName == null || lastName == null || email == null || subject == null || message == null) {
                response.put("success", false);
                response.put("message", "Missing required fields: firstName, lastName, email, subject, message");
                return response;
            }
            
            // Create a new Contact entity
            Contact contact = new Contact();
            contact.setFirstName(firstName);
            contact.setLastName(lastName);
            contact.setEmail(email);
            contact.setPhone(phone != null ? phone : "");
            contact.setSubject(subject);
            contact.setMessage(message);
            
            // Save to database
            Contact savedContact = contactService.createContact(contact);
            
            // Create the response
            response.put("success", true);
            response.put("message", "Contact message submitted successfully");
            response.put("contactId", savedContact.getId());
            response.put("data", Map.of(
                "id", savedContact.getId(),
                "fullName", savedContact.getFullName(),
                "email", savedContact.getEmail(),
                "subject", savedContact.getSubject(),
                "createdAt", savedContact.getCreatedAt()
            ));
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error submitting contact message: " + e.getMessage());
        }
        
        return response;
    }
    
    @GetMapping("/contacts")
    public Map<String, Object> getAllContacts(@RequestParam(required = false) String status,
                                             @RequestParam(required = false) String search) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<Contact> contacts;
            
            if (search != null && !search.trim().isEmpty()) {
                contacts = contactService.searchContacts(search);
            } else if (status != null && !status.trim().isEmpty()) {
                contacts = contactService.getContactsByStatus(status);
            } else {
                contacts = contactService.getAllContacts();
            }
            
            response.put("success", true);
            response.put("data", contacts);
            response.put("count", contacts.size());
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching contacts: " + e.getMessage());
        }
        
        return response;
    }
    
    @GetMapping("/contacts/unread")
    public Map<String, Object> getUnreadContacts() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<Contact> unreadContacts = contactService.getUnreadContacts();
            response.put("success", true);
            response.put("data", unreadContacts);
            response.put("count", unreadContacts.size());
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching unread contacts: " + e.getMessage());
        }
        
        return response;
    }
    
    @GetMapping("/contacts/{id}")
    public Map<String, Object> getContactById(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            var contactOpt = contactService.getContactById(id);
            if (contactOpt.isPresent()) {
                response.put("success", true);
                response.put("data", contactOpt.get());
            } else {
                response.put("success", false);
                response.put("message", "Contact not found");
            }
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching contact: " + e.getMessage());
        }
        
        return response;
    }
    
    @PutMapping("/contacts/{id}/read")
    public Map<String, Object> markContactAsRead(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Contact contact = contactService.markAsRead(id);
            if (contact != null) {
                response.put("success", true);
                response.put("message", "Contact marked as read");
                response.put("data", contact);
            } else {
                response.put("success", false);
                response.put("message", "Contact not found");
            }
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error updating contact: " + e.getMessage());
        }
        
        return response;
    }
    
    @PutMapping("/contacts/{id}/status")
    public Map<String, Object> updateContactStatus(@PathVariable Long id, @RequestBody Map<String, String> statusRequest) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            String status = statusRequest.get("status");
            if (status == null) {
                response.put("success", false);
                response.put("message", "Status is required");
                return response;
            }
            
            Contact contact = contactService.updateContactStatus(id, status);
            if (contact != null) {
                response.put("success", true);
                response.put("message", "Contact status updated");
                response.put("data", contact);
            } else {
                response.put("success", false);
                response.put("message", "Contact not found");
            }
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error updating contact status: " + e.getMessage());
        }
        
        return response;
    }
    
    @DeleteMapping("/contacts/{id}")
    public Map<String, Object> deleteContact(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            contactService.deleteContact(id);
            response.put("success", true);
            response.put("message", "Contact deleted successfully");
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error deleting contact: " + e.getMessage());
        }
        
        return response;
    }

    // ========== EMAIL CAPTURE ENDPOINTS ==========
    
    @PostMapping("/email-captures/submit")
    public Map<String, Object> submitEmailCapture(@RequestBody Map<String, Object> emailRequest, HttpServletRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Extract email details
            String email = (String) emailRequest.get("email");
            String source = (String) emailRequest.get("source");
            String resourceType = (String) emailRequest.get("resourceType");
            
            // Validate required fields
            if (email == null || source == null) {
                response.put("success", false);
                response.put("message", "Missing required fields: email, source");
                return response;
            }
            
            // Check if email already exists
            if (emailCaptureService.emailExists(email)) {
                response.put("success", false);
                response.put("message", "Email already exists in our database");
                return response;
            }
            
            // Create a new EmailCapture entity
            EmailCapture emailCapture = new EmailCapture();
            emailCapture.setEmail(email);
            emailCapture.setSource(source);
            emailCapture.setResourceType(resourceType != null ? resourceType : "");
            
            // Get client info (optional)
            String ipAddress = request.getRemoteAddr();
            String userAgent = request.getHeader("User-Agent");
            emailCapture.setIpAddress(ipAddress);
            emailCapture.setUserAgent(userAgent);
            
            // Save to database
            EmailCapture savedEmailCapture = emailCaptureService.createEmailCapture(emailCapture);
            
            // Create the response
            response.put("success", true);
            response.put("message", "Email captured successfully");
            response.put("emailCaptureId", savedEmailCapture.getId());
            response.put("data", Map.of(
                "id", savedEmailCapture.getId(),
                "email", savedEmailCapture.getEmail(),
                "source", savedEmailCapture.getSource(),
                "resourceType", savedEmailCapture.getResourceType(),
                "createdAt", savedEmailCapture.getCreatedAt()
            ));
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error capturing email: " + e.getMessage());
        }
        
        return response;
    }
    
    @GetMapping("/email-captures")
    public Map<String, Object> getAllEmailCaptures(@RequestParam(required = false) String source,
                                                   @RequestParam(required = false) String resourceType,
                                                   @RequestParam(required = false) String search) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<EmailCapture> emailCaptures;
            
            if (search != null && !search.trim().isEmpty()) {
                emailCaptures = emailCaptureService.searchEmailCaptures(search);
            } else if (resourceType != null && !resourceType.trim().isEmpty()) {
                emailCaptures = emailCaptureService.getEmailCapturesByResourceType(resourceType);
            } else if (source != null && !source.trim().isEmpty()) {
                emailCaptures = emailCaptureService.getEmailCapturesBySource(source);
            } else {
                emailCaptures = emailCaptureService.getAllEmailCaptures();
            }
            
            response.put("success", true);
            response.put("data", emailCaptures);
            response.put("count", emailCaptures.size());
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching email captures: " + e.getMessage());
        }
        
        return response;
    }
    
    @GetMapping("/email-captures/verified")
    public Map<String, Object> getVerifiedEmailCaptures() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<EmailCapture> verifiedEmails = emailCaptureService.getVerifiedEmailCaptures();
            response.put("success", true);
            response.put("data", verifiedEmails);
            response.put("count", verifiedEmails.size());
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching verified emails: " + e.getMessage());
        }
        
        return response;
    }
    
    @GetMapping("/email-captures/active")
    public Map<String, Object> getActiveEmailCaptures() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<EmailCapture> activeEmails = emailCaptureService.getActiveEmailCaptures();
            response.put("success", true);
            response.put("data", activeEmails);
            response.put("count", activeEmails.size());
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching active emails: " + e.getMessage());
        }
        
        return response;
    }
    
    @GetMapping("/email-captures/{id}")
    public Map<String, Object> getEmailCaptureById(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            var emailCaptureOpt = emailCaptureService.getEmailCaptureById(id);
            if (emailCaptureOpt.isPresent()) {
                response.put("success", true);
                response.put("data", emailCaptureOpt.get());
            } else {
                response.put("success", false);
                response.put("message", "Email capture not found");
            }
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching email capture: " + e.getMessage());
        }
        
        return response;
    }
    
    @PutMapping("/email-captures/{id}/verify")
    public Map<String, Object> verifyEmailCapture(@PathVariable Long id, @RequestBody Map<String, Boolean> verifyRequest) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Boolean isVerified = verifyRequest.get("isVerified");
            if (isVerified == null) {
                response.put("success", false);
                response.put("message", "isVerified field is required");
                return response;
            }
            
            EmailCapture emailCapture = emailCaptureService.updateEmailCaptureStatus(id, isVerified);
            if (emailCapture != null) {
                response.put("success", true);
                response.put("message", "Email capture verification updated");
                response.put("data", emailCapture);
            } else {
                response.put("success", false);
                response.put("message", "Email capture not found");
            }
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error updating email capture verification: " + e.getMessage());
        }
        
        return response;
    }
    
    @PutMapping("/email-captures/{id}/unsubscribe")
    public Map<String, Object> unsubscribeEmailCapture(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            EmailCapture emailCapture = emailCaptureService.unsubscribeEmail(id);
            if (emailCapture != null) {
                response.put("success", true);
                response.put("message", "Email unsubscribed successfully");
                response.put("data", emailCapture);
            } else {
                response.put("success", false);
                response.put("message", "Email capture not found");
            }
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error unsubscribing email: " + e.getMessage());
        }
        
        return response;
    }
    
    @DeleteMapping("/email-captures/{id}")
    public Map<String, Object> deleteEmailCapture(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            emailCaptureService.deleteEmailCapture(id);
            response.put("success", true);
            response.put("message", "Email capture deleted successfully");
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error deleting email capture: " + e.getMessage());
        }
        
        return response;
    }
    
    // ========== DASHBOARD STATS ENDPOINTS ==========
    
    @GetMapping("/contacts/stats")
    public Map<String, Object> getContactStats() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            long totalContacts = contactService.getAllContacts().size();
            long unreadContacts = contactService.getUnreadCount();
            long newContacts = contactService.getContactCountByStatus("NEW");
            long inProgressContacts = contactService.getContactCountByStatus("IN_PROGRESS");
            long resolvedContacts = contactService.getContactCountByStatus("RESOLVED");
            
            response.put("success", true);
            response.put("data", Map.of(
                "total", totalContacts,
                "unread", unreadContacts,
                "new", newContacts,
                "inProgress", inProgressContacts,
                "resolved", resolvedContacts
            ));
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching contact stats: " + e.getMessage());
        }
        
        return response;
    }
    
    @GetMapping("/email-captures/stats")
    public Map<String, Object> getEmailCaptureStats() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            long totalEmails = emailCaptureService.getAllEmailCaptures().size();
            long verifiedEmails = emailCaptureService.getVerifiedEmailCount();
            long unverifiedEmails = totalEmails - verifiedEmails;
            long unsubscribedEmails = emailCaptureService.getUnsubscribedEmailCount();
            long activeEmails = totalEmails - unsubscribedEmails;
            
            // Count by source
            long resourcesEmails = emailCaptureService.getEmailCaptureCountBySource("resources");
            long newsletterEmails = emailCaptureService.getEmailCaptureCountBySource("newsletter");
            long contactEmails = emailCaptureService.getEmailCaptureCountBySource("contact");
            
            response.put("success", true);
            response.put("data", Map.of(
                "total", totalEmails,
                "verified", verifiedEmails,
                "unverified", unverifiedEmails,
                "active", activeEmails,
                "unsubscribed", unsubscribedEmails,
                "bySource", Map.of(
                    "resources", resourcesEmails,
                    "newsletter", newsletterEmails,
                    "contact", contactEmails
                )
            ));
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching email capture stats: " + e.getMessage());
        }
        
        return response;
    }
}
