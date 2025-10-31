package com.example.courseService.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.courseService.entity.SpringSession;

import java.util.List;
import java.util.Optional;

/**
 * Repository for SpringSession entity
 */
@Repository
public interface SpringSessionRepository extends JpaRepository<SpringSession, String> {

    /**
     * Find session by session ID
     */
    Optional<SpringSession> findBySessionId(String sessionId);

    /**
     * Find all sessions by principal name (username)
     */
    List<SpringSession> findByPrincipalName(String principalName);

    /**
     * Find all active (non-expired) sessions
     */
    @Query("SELECT s FROM SpringSession s WHERE s.expiryTime > :currentTime")
    List<SpringSession> findActiveSessions(@Param("currentTime") Long currentTime);

    /**
     * Find all expired sessions
     */
    @Query("SELECT s FROM SpringSession s WHERE s.expiryTime <= :currentTime")
    List<SpringSession> findExpiredSessions(@Param("currentTime") Long currentTime);

    /**
     * Delete expired sessions
     */
    @Query("DELETE FROM SpringSession s WHERE s.expiryTime <= :currentTime")
    void deleteExpiredSessions(@Param("currentTime") Long currentTime);

    /**
     * Count active sessions
     */
    @Query("SELECT COUNT(s) FROM SpringSession s WHERE s.expiryTime > :currentTime")
    Long countActiveSessions(@Param("currentTime") Long currentTime);

    /**
     * Find active sessions by principal name
     */
    @Query("SELECT s FROM SpringSession s WHERE s.principalName = :principalName AND s.expiryTime > :currentTime")
    List<SpringSession> findActiveSessionsByPrincipal(
        @Param("principalName") String principalName,
        @Param("currentTime") Long currentTime
    );
}
