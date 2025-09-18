package com.mpt.mpt.service;

import com.mpt.mpt.entity.Testimonial;
import com.mpt.mpt.repository.TestimonialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TestimonialService {
    
    @Autowired
    private TestimonialRepository testimonialRepository;
    
    // Get all testimonials
    public List<Testimonial> getAllTestimonials() {
        return testimonialRepository.findAllOrderedByCreatedAt();
    }
    
    // Get approved testimonials
    public List<Testimonial> getApprovedTestimonials() {
        return testimonialRepository.findApprovedTestimonials();
    }
    
    // Get testimonial by ID
    public Optional<Testimonial> getTestimonialById(Long id) {
        return testimonialRepository.findById(id);
    }
    
    // Create new testimonial
    public Testimonial createTestimonial(Testimonial testimonial) {
        return testimonialRepository.save(testimonial);
    }
    
    // Update testimonial
    public Testimonial updateTestimonial(Long id, Testimonial testimonialDetails) {
        Optional<Testimonial> optionalTestimonial = testimonialRepository.findById(id);
        
        if (optionalTestimonial.isPresent()) {
            Testimonial testimonial = optionalTestimonial.get();
            
            testimonial.setCustomerName(testimonialDetails.getCustomerName());
            testimonial.setComment(testimonialDetails.getComment());
            testimonial.setRating(testimonialDetails.getRating());
            testimonial.setServiceUsed(testimonialDetails.getServiceUsed());
            testimonial.setIsApproved(testimonialDetails.getIsApproved());
            
            return testimonialRepository.save(testimonial);
        } else {
            throw new RuntimeException("Testimonial not found with id: " + id);
        }
    }
    
    // Delete testimonial
    public void deleteTestimonial(Long id) {
        Optional<Testimonial> optionalTestimonial = testimonialRepository.findById(id);
        
        if (optionalTestimonial.isPresent()) {
            testimonialRepository.deleteById(id);
        } else {
            throw new RuntimeException("Testimonial not found with id: " + id);
        }
    }
    
    // Get testimonials by rating
    public List<Testimonial> getTestimonialsByRating(Integer rating) {
        return testimonialRepository.findByRatingOrderByCreatedAtDesc(rating);
    }
    
    // Search testimonials by customer name
    public List<Testimonial> searchTestimonialsByCustomerName(String customerName) {
        return testimonialRepository.findByCustomerNameContainingIgnoreCaseOrderByCreatedAtDesc(customerName);
    }
    
    // Toggle approval status
    public Testimonial toggleApprovalStatus(Long id) {
        Optional<Testimonial> optionalTestimonial = testimonialRepository.findById(id);
        
        if (optionalTestimonial.isPresent()) {
            Testimonial testimonial = optionalTestimonial.get();
            testimonial.setIsApproved(!testimonial.getIsApproved());
            return testimonialRepository.save(testimonial);
        } else {
            throw new RuntimeException("Testimonial not found with id: " + id);
        }
    }
}
