package com.mpt.mpt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mpt.mpt.entity.EmailCapture;
import com.mpt.mpt.repository.EmailCaptureRepository;

import java.util.List;
import java.util.Optional;

@Service
public class EmailCaptureService {
    
    @Autowired
    private EmailCaptureRepository emailCaptureRepository;
    
    public EmailCapture createEmailCapture(EmailCapture emailCapture) {
        return emailCaptureRepository.save(emailCapture);
    }
    
    public List<EmailCapture> getAllEmailCaptures() {
        return emailCaptureRepository.findAllByOrderByCreatedAtDesc();
    }
    
    public Optional<EmailCapture> getEmailCaptureById(Long id) {
        return emailCaptureRepository.findById(id);
    }
    
    public List<EmailCapture> getEmailCapturesBySource(String source) {
        return emailCaptureRepository.findBySourceOrderByCreatedAtDesc(source);
    }
    
    public List<EmailCapture> getEmailCapturesByResourceType(String resourceType) {
        return emailCaptureRepository.findByResourceTypeOrderByCreatedAtDesc(resourceType);
    }
    
    public List<EmailCapture> getVerifiedEmailCaptures() {
        return emailCaptureRepository.findByIsVerifiedTrueOrderByCreatedAtDesc();
    }
    
    public List<EmailCapture> getUnverifiedEmailCaptures() {
        return emailCaptureRepository.findByIsVerifiedFalseOrderByCreatedAtDesc();
    }
    
    public List<EmailCapture> getActiveEmailCaptures() {
        return emailCaptureRepository.findByIsUnsubscribedFalseOrderByCreatedAtDesc();
    }
    
    public List<EmailCapture> searchEmailCaptures(String searchTerm) {
        return emailCaptureRepository.searchEmailCaptures(searchTerm);
    }
    
    public boolean emailExists(String email) {
        return emailCaptureRepository.existsByEmail(email);
    }
    
    public Optional<EmailCapture> getEmailCaptureByEmail(String email) {
        return emailCaptureRepository.findFirstByEmail(email);
    }
    
    public EmailCapture updateEmailCaptureStatus(Long id, boolean isVerified) {
        Optional<EmailCapture> emailCaptureOpt = emailCaptureRepository.findById(id);
        if (emailCaptureOpt.isPresent()) {
            EmailCapture emailCapture = emailCaptureOpt.get();
            emailCapture.setIsVerified(isVerified);
            return emailCaptureRepository.save(emailCapture);
        }
        return null;
    }
    
    public EmailCapture unsubscribeEmail(Long id) {
        Optional<EmailCapture> emailCaptureOpt = emailCaptureRepository.findById(id);
        if (emailCaptureOpt.isPresent()) {
            EmailCapture emailCapture = emailCaptureOpt.get();
            emailCapture.setUnsubscribed(true);
            return emailCaptureRepository.save(emailCapture);
        }
        return null;
    }
    
    public void deleteEmailCapture(Long id) {
        emailCaptureRepository.deleteById(id);
    }
    
    public long getEmailCaptureCountBySource(String source) {
        return emailCaptureRepository.countBySource(source);
    }
    
    public long getEmailCaptureCountByResourceType(String resourceType) {
        return emailCaptureRepository.countByResourceType(resourceType);
    }
    
    public long getVerifiedEmailCount() {
        return emailCaptureRepository.countByIsVerifiedTrue();
    }
    
    public long getUnsubscribedEmailCount() {
        return emailCaptureRepository.countByIsUnsubscribedTrue();
    }
}
