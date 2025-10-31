package com.example.courseService.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

/**
 * Entity class for SPRING_SESSION table
 * Represents a user session stored in the database
 */
@Entity
@Table(name = "SPRING_SESSION", indexes = {
    @Index(name = "SPRING_SESSION_IX1", columnList = "SESSION_ID", unique = true),
    @Index(name = "SPRING_SESSION_IX2", columnList = "EXPIRY_TIME"),
    @Index(name = "SPRING_SESSION_IX3", columnList = "PRINCIPAL_NAME")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SpringSession {

    @Id
    @Column(name = "PRIMARY_ID", length = 36, nullable = false)
    private String primaryId;

    @Column(name = "SESSION_ID", length = 36, nullable = false, unique = true)
    private String sessionId;

    @Column(name = "CREATION_TIME", nullable = false)
    private Long creationTime;

    @Column(name = "LAST_ACCESS_TIME", nullable = false)
    private Long lastAccessTime;

    @Column(name = "MAX_INACTIVE_INTERVAL", nullable = false)
    private Integer maxInactiveInterval;

    @Column(name = "EXPIRY_TIME", nullable = false)
    private Long expiryTime;

    @Column(name = "PRINCIPAL_NAME", length = 255)
    private String principalName;

    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Builder.Default
    private Set<SpringSessionAttribute> attributes = new HashSet<>();

    // Helper methods
    public void addAttribute(SpringSessionAttribute attribute) {
        attributes.add(attribute);
        attribute.setSession(this);
    }

    public void removeAttribute(SpringSessionAttribute attribute) {
        attributes.remove(attribute);
        attribute.setSession(null);
    }

    /**
     * Check if session is expired
     */
    public boolean isExpired() {
        return System.currentTimeMillis() > expiryTime;
    }

    /**
     * Check if session is active
     */
    public boolean isActive() {
        return !isExpired();
    }
}




