package com.example.courseService.service;


import com.example.courseService.DTOs.LoginResponseDTO;

import jakarta.servlet.http.HttpServletRequest;

public interface AuthService {
    
    String sendLoginOtp(String phoneNumber);
    
    LoginResponseDTO verifyAndLogin(String phoneNumber, String otp, HttpServletRequest request);
    
    void logout(String sessionId);
    
    boolean validateSession(String sessionId);
}