package com.example.courseService.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "enrollments",
       uniqueConstraints = {
           @UniqueConstraint(columnNames = {"student_id", "course_id"})
       })
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Enrollment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "student_id", nullable = false)
    private Long studentId;
    
    @Column(name = "course_id", nullable = false)
    private Long courseId;
    
    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private EnrollmentStatus status;
    
    @Column(name = "progress_percentage")
    private Double progressPercentage = 0.0;
    
    @Column(name = "is_completed")
    private Boolean isCompleted = false;
    
    @Column(name = "completion_date")
    private LocalDateTime completionDate;
    
    @Column(name = "enrolled_at", nullable = false)
    private LocalDateTime enrolledAt;
    
    @Column(name = "last_accessed")
    private LocalDateTime lastAccessed;
    
    @Column(name = "total_watch_time_minutes")
    private Integer totalWatchTimeMinutes = 0;
    
    @Column(name = "certificate_issued")
    private Boolean certificateIssued = false;
    
    @Column(name = "certificate_url", length = 500)
    private String certificateUrl;
    
    @Column(name = "rating")
    private Integer rating; // 1-5 stars
    
    @Column(name = "review", columnDefinition = "TEXT")
    private String review;
    
    @Column(name = "review_date")
    private LocalDateTime reviewDate;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Getters and Setters
}