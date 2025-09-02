package com.mpt.mpt.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "testimonials")
public class Testimonial {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "customer_name", nullable = false)
    private String customerName;
    
    @Column
    private Integer rating;
    
    @Column(columnDefinition = "TEXT")
    private String comment;
    
    @Column(name = "service_used")
    private String serviceUsed;
    
    @Column(name = "is_approved")
    private Boolean isApproved;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    // Default constructor
    public Testimonial() {
        this.createdAt = LocalDateTime.now();
        this.isApproved = false;
    }
    
    // Constructor with fields
    public Testimonial(String customerName, Integer rating, String comment, String serviceUsed) {
        this();
        this.customerName = customerName;
        this.rating = rating;
        this.comment = comment;
        this.serviceUsed = serviceUsed;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getCustomerName() {
        return customerName;
    }
    
    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
    
    public Integer getRating() {
        return rating;
    }
    
    public void setRating(Integer rating) {
        this.rating = rating;
    }
    
    public String getComment() {
        return comment;
    }
    
    public void setComment(String comment) {
        this.comment = comment;
    }
    
    public String getServiceUsed() {
        return serviceUsed;
    }
    
    public void setServiceUsed(String serviceUsed) {
        this.serviceUsed = serviceUsed;
    }
    
    public Boolean getIsApproved() {
        return isApproved;
    }
    
    public void setIsApproved(Boolean isApproved) {
        this.isApproved = isApproved;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    @Override
    public String toString() {
        return "Testimonial{" +
                "id=" + id +
                ", customerName='" + customerName + '\'' +
                ", rating=" + rating +
                ", comment='" + comment + '\'' +
                ", serviceUsed='" + serviceUsed + '\'' +
                ", isApproved=" + isApproved +
                ", createdAt=" + createdAt +
                '}';
    }
}
