package com.example.courseService.DTOs;


import com.example.courseService.entity.UserRole;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDTO {
    
    private String sessionId;
    private Long userId;
    private String phoneNumber;
    private UserRole role;
    private String message;
    
    // Getters and Setters
}