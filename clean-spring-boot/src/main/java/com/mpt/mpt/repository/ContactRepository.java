package com.mpt.mpt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mpt.mpt.entity.Contact;
import java.util.List;
import java.util.Optional;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    
    // Find all contacts ordered by creation date (newest first)
    List<Contact> findAllByOrderByCreatedAtDesc();
    
    // Find unread contacts
    List<Contact> findByIsReadFalseOrderByCreatedAtDesc();
    
    // Find contacts by status
    List<Contact> findByStatusOrderByCreatedAtDesc(String status);
    
    // Find contacts by subject
    List<Contact> findBySubjectOrderByCreatedAtDesc(String subject);
    
    // Search contacts by name or email
    @Query("SELECT c FROM Contact c WHERE " +
           "LOWER(c.firstName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(c.lastName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(c.email) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Contact> searchContacts(String searchTerm);
    
    // Count unread contacts
    long countByIsReadFalse();
    
    // Count contacts by status
    long countByStatus(String status);
}
