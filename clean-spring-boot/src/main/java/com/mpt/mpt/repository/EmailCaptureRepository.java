package com.mpt.mpt.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mpt.mpt.entity.EmailCapture;

@Repository
public interface EmailCaptureRepository extends JpaRepository<EmailCapture, Long> {
    List<EmailCapture> findByEmail(String email);
    List<EmailCapture> findBySource(String source);
    List<EmailCapture> findAllByOrderByCreatedAtDesc();
    List<EmailCapture> findBySourceOrderByCreatedAtDesc(String source);
    List<EmailCapture> findByResourceTypeOrderByCreatedAtDesc(String resourceType);
    List<EmailCapture> findByIsVerifiedTrueOrderByCreatedAtDesc();
    List<EmailCapture> findByIsVerifiedFalseOrderByCreatedAtDesc();
    List<EmailCapture> findByIsUnsubscribedFalseOrderByCreatedAtDesc();
    
    @Query("SELECT e FROM EmailCapture e WHERE e.email LIKE %?1% OR e.source LIKE %?1%")
    List<EmailCapture> searchEmailCaptures(String searchTerm);
    
    boolean existsByEmail(String email);
    Optional<EmailCapture> findFirstByEmail(String email);
    
    long countBySource(String source);
    long countByResourceType(String resourceType);
    long countByIsVerifiedTrue();
    long countByIsUnsubscribedTrue();
}