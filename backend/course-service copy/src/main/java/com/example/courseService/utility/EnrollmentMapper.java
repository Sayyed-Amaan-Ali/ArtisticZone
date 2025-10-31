package com.example.courseService.utility;

import org.springframework.stereotype.Component;

import com.example.courseService.DTOs.CourseEnrollmentDTO;
import com.example.courseService.DTOs.EnrollmentResponseDTO;
import com.example.courseService.DTOs.StudentEnrollmentDTO;
import com.example.courseService.entity.Enrollment;

@Component
public class EnrollmentMapper {
    
    public EnrollmentResponseDTO toResponseDTO(Enrollment enrollment) {
        if (enrollment == null) {
            return null;
        }
        
        EnrollmentResponseDTO dto = new EnrollmentResponseDTO();
        dto.setId(enrollment.getId());
        dto.setStudentId(enrollment.getStudentId());
        dto.setCourseId(enrollment.getCourseId());
        dto.setStatus(enrollment.getStatus());
        dto.setProgressPercentage(enrollment.getProgressPercentage());
        dto.setIsCompleted(enrollment.getIsCompleted());
        dto.setCompletionDate(enrollment.getCompletionDate());
        dto.setEnrolledAt(enrollment.getEnrolledAt());
        dto.setLastAccessed(enrollment.getLastAccessed());
        dto.setTotalWatchTimeMinutes(enrollment.getTotalWatchTimeMinutes());
        dto.setCertificateIssued(enrollment.getCertificateIssued());
        dto.setCertificateUrl(enrollment.getCertificateUrl());
        dto.setRating(enrollment.getRating());
        dto.setReview(enrollment.getReview());
        dto.setReviewDate(enrollment.getReviewDate());
        dto.setCreatedAt(enrollment.getCreatedAt());
        dto.setUpdatedAt(enrollment.getUpdatedAt());
        
        return dto;
    }
    
    public StudentEnrollmentDTO toStudentEnrollmentDTO(Enrollment enrollment) {
        if (enrollment == null) {
            return null;
        }
        
        StudentEnrollmentDTO dto = new StudentEnrollmentDTO();
        dto.setEnrollmentId(enrollment.getId());
        dto.setCourseId(enrollment.getCourseId());
        dto.setStatus(enrollment.getStatus());
        dto.setProgressPercentage(enrollment.getProgressPercentage());
        dto.setIsCompleted(enrollment.getIsCompleted());
        dto.setEnrolledAt(enrollment.getEnrolledAt());
        dto.setLastAccessed(enrollment.getLastAccessed());
        
        return dto;
    }
    
    public CourseEnrollmentDTO toCourseEnrollmentDTO(Enrollment enrollment) {
        if (enrollment == null) {
            return null;
        }
        
        CourseEnrollmentDTO dto = new CourseEnrollmentDTO();
        dto.setEnrollmentId(enrollment.getId());
        dto.setStudentId(enrollment.getStudentId());
        dto.setStatus(enrollment.getStatus());
        dto.setProgressPercentage(enrollment.getProgressPercentage());
        dto.setIsCompleted(enrollment.getIsCompleted());
        dto.setEnrolledAt(enrollment.getEnrolledAt());
        dto.setLastAccessed(enrollment.getLastAccessed());
        
        return dto;
    }
}