package com.mpt.mpt.repository;

import com.mpt.mpt.entity.Testimonial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestimonialRepository extends JpaRepository<Testimonial, Long> {
    
    // Find all testimonials ordered by creation date
    @Query("SELECT t FROM Testimonial t ORDER BY t.createdAt DESC")
    List<Testimonial> findAllOrderedByCreatedAt();
    
    // Find approved testimonials
    @Query("SELECT t FROM Testimonial t WHERE t.isApproved = true ORDER BY t.createdAt DESC")
    List<Testimonial> findApprovedTestimonials();
    
    // Find testimonials by rating
    List<Testimonial> findByRatingOrderByCreatedAtDesc(Integer rating);
    
    // Find testimonials by customer name (case insensitive)
    List<Testimonial> findByCustomerNameContainingIgnoreCaseOrderByCreatedAtDesc(String customerName);
}