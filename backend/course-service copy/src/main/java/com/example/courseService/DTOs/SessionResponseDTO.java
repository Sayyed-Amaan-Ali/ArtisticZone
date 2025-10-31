package com.example.courseService.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import com.example.courseService.entity.UserRole;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessionResponseDTO {
    
    private String sessionId;
    private Long userId;
    private String phoneNumber;
    private UserRole role;
    private Boolean isActive;
    private LocalDateTime expiresAt;
    private LocalDateTime createdAt;
    
    // Getters and Setters
}