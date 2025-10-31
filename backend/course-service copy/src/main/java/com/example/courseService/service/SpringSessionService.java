package com.example.courseService.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.courseService.entity.SpringSession;
import com.example.courseService.repo.SpringSessionRepository;

import java.util.List;
import java.util.Optional;

/**
 * Service for managing Spring Sessions
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class SpringSessionService {

    private final SpringSessionRepository sessionRepository;

    /**
     * Get session by session ID
     */
    public Optional<SpringSession> getSessionBySessionId(String sessionId) {
        return sessionRepository.findBySessionId(sessionId);
    }

    /**
     * Get all sessions for a user
     */
    public List<SpringSession> getUserSessions(String username) {
        return sessionRepository.findByPrincipalName(username);
    }

    /**
     * Get all active sessions for a user
     */
    public List<SpringSession> getActiveUserSessions(String username) {
        long currentTime = System.currentTimeMillis();
        return sessionRepository.findActiveSessionsByPrincipal(username, currentTime);
    }

    /**
     * Get all active sessions
     */
    public List<SpringSession> getAllActiveSessions() {
        long currentTime = System.currentTimeMillis();
        return sessionRepository.findActiveSessions(currentTime);
    }

    /**
     * Count active sessions
     */
    public Long countActiveSessions() {
        long currentTime = System.currentTimeMillis();
        return sessionRepository.countActiveSessions(currentTime);
    }

    /**
     * Delete a specific session (logout)
     */
    @Transactional
    public void deleteSession(String sessionId) {
        sessionRepository.findBySessionId(sessionId)
            .ifPresent(session -> {
                sessionRepository.delete(session);
                log.info("Deleted session: {}", sessionId);
            });
    }

    /**
     * Delete all sessions for a user
     */
    @Transactional
    public void deleteUserSessions(String username) {
        List<SpringSession> sessions = sessionRepository.findByPrincipalName(username);
        sessionRepository.deleteAll(sessions);
        log.info("Deleted {} sessions for user: {}", sessions.size(), username);
    }

    /**
     * Clean up expired sessions (scheduled task - runs every hour)
     */
    @Scheduled(cron = "0 0 * * * *") // Every hour
    @Transactional
    public void cleanupExpiredSessions() {
        long currentTime = System.currentTimeMillis();
        List<SpringSession> expiredSessions = sessionRepository.findExpiredSessions(currentTime);
        
        if (!expiredSessions.isEmpty()) {
            sessionRepository.deleteAll(expiredSessions);
            log.info("Cleaned up {} expired sessions", expiredSessions.size());
        }
    }

    /**
     * Check if user has active sessions
     */
    public boolean hasActiveSessions(String username) {
        return !getActiveUserSessions(username).isEmpty();
    }
}