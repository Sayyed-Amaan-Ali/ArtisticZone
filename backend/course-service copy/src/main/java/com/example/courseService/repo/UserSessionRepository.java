package com.example.courseService.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.courseService.entity.UserSession;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserSessionRepository extends JpaRepository<UserSession, String> {
    
    // Find active session by session ID
    Optional<UserSession> findBySessionIdAndIsActiveTrue(String sessionId);
    
    // Find all active sessions for a user
    List<UserSession> findByUserIdAndIsActiveTrue(Long userId);
    
    // Find session by user ID and phone number
    Optional<UserSession> findByUserIdAndPhoneNumberAndIsActiveTrue(Long userId, String phoneNumber);
    
    // Invalidate all sessions for a user
    @Transactional
    @Modifying
    @Query("UPDATE UserSession s SET s.isActive = false WHERE s.userId = :userId")
    void invalidateAllUserSessions(@Param("userId") Long userId);
    
    // Delete expired sessions (cleanup job)
    @Transactional
    @Modifying
    @Query("DELETE FROM UserSession s WHERE s.expiresAt < :currentTime")
    void deleteExpiredSessions(@Param("currentTime") LocalDateTime currentTime);
}