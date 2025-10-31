package com.example.courseService.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import com.example.courseService.entity.EnrollmentStatus;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseEnrollmentDTO {
    
    private Long enrollmentId;
    private Long studentId;
    private String studentName;
    private String studentEmail;
    private String studentImageUrl;
    private EnrollmentStatus status;
    private Double progressPercentage;
    private Boolean isCompleted;
    private LocalDateTime enrolledAt;
    private LocalDateTime lastAccessed;
    
    // Getters and Setters
}