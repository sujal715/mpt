package com.mpt.mpt.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "email_captures")
public class EmailCapture {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String email;
    
    private String source;
    
    @Column(name = "resource_type")
    private String resourceType;
    
    @Column(name = "ip_address")
    private String ipAddress;
    
    @Column(name = "user_agent")
    private String userAgent;
    
    @Column(name = "is_verified")
    private Boolean isVerified = false;
    
    @Column(name = "is_unsubscribed")
    private Boolean isUnsubscribed = false;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    // Default constructor
    public EmailCapture() {
        this.createdAt = LocalDateTime.now();
    }
    
    // Constructor with fields
    public EmailCapture(String email, String source) {
        this();
        this.email = email;
        this.source = source;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getSource() {
        return source;
    }
    
    public void setSource(String source) {
        this.source = source;
    }
    
    public String getResourceType() {
        return resourceType;
    }
    
    public void setResourceType(String resourceType) {
        this.resourceType = resourceType;
    }
    
    public String getIpAddress() {
        return ipAddress;
    }
    
    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }
    
    public String getUserAgent() {
        return userAgent;
    }
    
    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }
    
    public Boolean getIsVerified() {
        return isVerified;
    }
    
    public void setIsVerified(Boolean isVerified) {
        this.isVerified = isVerified;
    }
    
    public Boolean getIsUnsubscribed() {
        return isUnsubscribed;
    }
    
    public void setIsUnsubscribed(Boolean isUnsubscribed) {
        this.isUnsubscribed = isUnsubscribed;
    }
    
    public void setUnsubscribed(Boolean unsubscribed) {
        this.isUnsubscribed = unsubscribed;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}