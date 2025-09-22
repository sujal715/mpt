package com.mpt.mpt.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Value("${stripe.secret.key:sk_test_51234567890abcdefghijklmnopqrstuvwxyz}")
    private String stripeSecretKey;

    @Value("${STRIPE_CURRENCY:AUD}")
    private String currency;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }

    @PostMapping("/create-intent")
    public ResponseEntity<Map<String, Object>> createPaymentIntent(@RequestBody Map<String, Object> request) {
        try {
            // Extract request parameters
            Integer amount = (Integer) request.get("amount");
            String currencyParam = (String) request.getOrDefault("currency", currency.toLowerCase());
            String bookingId = String.valueOf(request.get("bookingId")); // Convert to string safely
            String serviceType = (String) request.get("serviceType");
            String customerEmail = (String) request.get("customerEmail");
            String customerName = (String) request.get("customerName");
            
            // Validate required fields
            if (amount == null || amount <= 0) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "Invalid amount");
                return ResponseEntity.badRequest().body(errorResponse);
            }
            
            // For testing purposes, return a mock client secret
            // In production, you would use a real Stripe test key
            Map<String, Object> response = new HashMap<>();
            response.put("clientSecret", "pi_test_mock_client_secret_" + System.currentTimeMillis());
            response.put("paymentIntentId", "pi_test_mock_" + System.currentTimeMillis());
            response.put("status", "created");
            response.put("amount", amount);
            response.put("currency", currencyParam.toLowerCase());
            response.put("description", "MPT Training Session - " + (serviceType != null ? serviceType : "Training"));

            return ResponseEntity.ok(response);
            
            /* Uncomment this section when you have a real Stripe test key
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount((long) amount)
                    .setCurrency(currencyParam.toLowerCase())
                    .setDescription("MPT Training Session - " + (serviceType != null ? serviceType : "Training"))
                    .putMetadata("bookingId", bookingId != null ? bookingId : "unknown")
                    .putMetadata("serviceType", serviceType != null ? serviceType : "unknown")
                    .putMetadata("customerEmail", customerEmail != null ? customerEmail : "unknown")
                    .putMetadata("customerName", customerName != null ? customerName : "unknown")
                    .build();

            PaymentIntent paymentIntent = PaymentIntent.create(params);

            Map<String, Object> response = new HashMap<>();
            response.put("clientSecret", paymentIntent.getClientSecret());
            response.put("paymentIntentId", paymentIntent.getId());
            response.put("status", "created");

            return ResponseEntity.ok(response);
            */
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Internal error: " + e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    @PostMapping("/confirm")
    public ResponseEntity<Map<String, String>> confirmPayment(@RequestBody ConfirmPaymentRequest request) {
        try {
            PaymentIntent paymentIntent = PaymentIntent.retrieve(request.getPaymentIntentId());
            
            Map<String, String> response = new HashMap<>();
            response.put("status", paymentIntent.getStatus());
            response.put("id", paymentIntent.getId());
            
            if ("succeeded".equals(paymentIntent.getStatus())) {
                // Update booking status in database
                // This would typically involve updating your booking entity
                response.put("message", "Payment successful");
            }
            
            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @PostMapping("/webhook")
    public ResponseEntity<String> handleWebhook(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {
        // Webhook handling for payment events
        // This would typically involve verifying the webhook signature
        // and updating your database based on payment events
        
        return ResponseEntity.ok("Webhook received");
    }

    // Request DTOs
    public static class PaymentRequest {
        private int amount;
        private String serviceType;
        private Long bookingId;
        private String customerEmail;
        private String customerName;

        // Getters and setters
        public int getAmount() { return amount; }
        public void setAmount(int amount) { this.amount = amount; }
        
        public String getServiceType() { return serviceType; }
        public void setServiceType(String serviceType) { this.serviceType = serviceType; }
        
        public Long getBookingId() { return bookingId; }
        public void setBookingId(Long bookingId) { this.bookingId = bookingId; }
        
        public String getCustomerEmail() { return customerEmail; }
        public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }
        
        public String getCustomerName() { return customerName; }
        public void setCustomerName(String customerName) { this.customerName = customerName; }
    }

    public static class ConfirmPaymentRequest {
        private String paymentIntentId;

        public String getPaymentIntentId() { return paymentIntentId; }
        public void setPaymentIntentId(String paymentIntentId) { this.paymentIntentId = paymentIntentId; }
    }
}
