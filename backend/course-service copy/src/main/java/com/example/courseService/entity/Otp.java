package com.example.courseService.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "otps")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Otp {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "phone_number", nullable = false, length = 15)
    private String phoneNumber;
    
    @Column(name = "otp_code", nullable = false, length = 6)
    private String otpCode;
    
    @Column(name = "is_verified")
    private Boolean isVerified = false;
    
    @Column(name = "is_expired")
    private Boolean isExpired = false;
    
    @Column(name = "attempts")
    private Integer attempts = 0;
    
    @Column(name = "max_attempts")
    private Integer maxAttempts = 3;
    
    @Column(name = "expires_at", nullable = false)
    private LocalDateTime expiresAt;
    
    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    // Getters and Setters
}