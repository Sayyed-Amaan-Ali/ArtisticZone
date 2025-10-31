package com.example.courseService.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import com.example.courseService.entity.EnrollmentStatus;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnrollmentResponseDTO {
    
    private Long id;
    private Long studentId;
    private Long courseId;
    private EnrollmentStatus status;
    private Double progressPercentage;
    private Boolean isCompleted;
    private LocalDateTime completionDate;
    private LocalDateTime enrolledAt;
    private LocalDateTime lastAccessed;
    private Integer totalWatchTimeMinutes;
    private Boolean certificateIssued;
    private String certificateUrl;
    private Integer rating;
    private String review;
    private LocalDateTime reviewDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Additional fields from other services
    private String studentName;
    private String studentEmail;
    private String courseTitle;
    
    // Getters and Setters
}