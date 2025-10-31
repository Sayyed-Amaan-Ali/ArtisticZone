package com.example.courseService.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.courseService.DTOs.SessionResponseDTO;
import com.example.courseService.ExceptionHandling.SessionNotFoundException;
import com.example.courseService.entity.UserRole;
import com.example.courseService.entity.UserSession;
import com.example.courseService.repo.UserSessionRepository;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class SessionServiceImpl implements SessionService {
    
    @Autowired
    private UserSessionRepository userSessionRepository;
    
    private static final int SESSION_EXPIRY_HOURS = 24;
    
    @Override
    public String createSession(Long userId, String phoneNumber, UserRole role, 
                               String ipAddress, String userAgent) {
        log.info("Creating session for user ID: {}", userId);
        
        // Generate unique session ID
        String sessionId = UUID.randomUUID().toString();
        
        // Create session entity
        UserSession session = new UserSession();
        session.setSessionId(sessionId);
        session.setUserId(userId);
        session.setPhoneNumber(phoneNumber);
        session.setUserRole(role);
        session.setIsActive(true);
        session.setIpAddress(ipAddress);
        session.setUserAgent(userAgent);
        session.setExpiresAt(LocalDateTime.now().plusHours(SESSION_EXPIRY_HOURS));
        
        userSessionRepository.save(session);
        
        log.info("Session created successfully with ID: {}", sessionId);
        return sessionId;
    }
    
    @Override
    @Transactional(readOnly = true)
    public SessionResponseDTO getSession(String sessionId) {
        log.info("Fetching session with ID: {}", sessionId);
        
        UserSession session = userSessionRepository.findBySessionIdAndIsActiveTrue(sessionId)
                .orElseThrow(() -> new SessionNotFoundException("Session not found or expired"));
        
        // Check if session is expired
        if (session.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new SessionNotFoundException("Session expired");
        }
        
        SessionResponseDTO responseDTO = new SessionResponseDTO();
        responseDTO.setSessionId(session.getSessionId());
        responseDTO.setUserId(session.getUserId());
        responseDTO.setPhoneNumber(session.getPhoneNumber());
        responseDTO.setRole(session.getUserRole());
        responseDTO.setIsActive(session.getIsActive());
        responseDTO.setExpiresAt(session.getExpiresAt());
        responseDTO.setCreatedAt(session.getCreatedAt());
        
        return responseDTO;
    }
    
    @Override
    public void invalidateSession(String sessionId) {
        log.info("Invalidating session with ID: {}", sessionId);
        
        UserSession session = userSessionRepository.findById(sessionId)
                .orElseThrow(() -> new SessionNotFoundException("Session not found"));
        
        session.setIsActive(false);
        userSessionRepository.save(session);
        
        log.info("Session invalidated successfully with ID: {}", sessionId);
    }
    
    @Override
    public void invalidateAllUserSessions(Long userId) {
        log.info("Invalidating all sessions for user ID: {}", userId);
        
        userSessionRepository.invalidateAllUserSessions(userId);
        
        log.info("All sessions invalidated for user ID: {}", userId);
    }
    
    @Override
    @Transactional(readOnly = true)
    public boolean isSessionValid(String sessionId) {
        return userSessionRepository.findBySessionIdAndIsActiveTrue(sessionId)
                .map(session -> session.getExpiresAt().isAfter(LocalDateTime.now()))
                .orElse(false);
    }
}