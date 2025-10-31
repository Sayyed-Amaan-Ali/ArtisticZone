package com.example.courseService.DTOs;

import com.example.courseService.entity.EnrollmentStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentEnrollmentDTO {
    
    private Long enrollmentId;
    private Long courseId;
    private String courseTitle;
    private String courseDescription;
    private String imageUrl;
    private EnrollmentStatus status;
    private Double progressPercentage;
    private Boolean isCompleted;
    private LocalDateTime enrolledAt;
    private LocalDateTime lastAccessed;
    
    // Getters and Setters
}