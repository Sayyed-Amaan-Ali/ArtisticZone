package com.example.courseService.service;


import com.example.courseService.DTOs.SessionResponseDTO;
import com.example.courseService.entity.UserRole;


public interface SessionService {
    
    String createSession(Long userId, String phoneNumber, UserRole role, 
                        String ipAddress, String userAgent);
    
    SessionResponseDTO getSession(String sessionId);
    
    void invalidateSession(String sessionId);
    
    void invalidateAllUserSessions(Long userId);
    
    boolean isSessionValid(String sessionId);
}