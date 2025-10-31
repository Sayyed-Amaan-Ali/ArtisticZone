package com.example.courseService.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.courseService.DTOs.CourseEnrollmentDTO;
import com.example.courseService.DTOs.EnrollmentRequestDTO;
import com.example.courseService.DTOs.EnrollmentResponseDTO;
import com.example.courseService.DTOs.StudentEnrollmentDTO;

import java.util.Map;

public interface EnrollmentService {
    
    EnrollmentResponseDTO enrollStudent(EnrollmentRequestDTO requestDTO);
    
    EnrollmentResponseDTO getEnrollmentById(Long enrollmentId);
    
    EnrollmentResponseDTO getEnrollmentByStudentAndCourse(Long studentId, Long courseId);
    
    Page<StudentEnrollmentDTO> getStudentEnrollments(Long studentId, Pageable pageable);
    
    Page<CourseEnrollmentDTO> getCourseEnrollments(Long courseId, Pageable pageable);
    
    void cancelEnrollment(Long enrollmentId);
    
    void updateProgress(Long enrollmentId, Double progressPercentage);
    
    void markAsCompleted(Long enrollmentId);
    
    void updateWatchTime(Long enrollmentId, Integer minutes);
    
    void updateLastAccessed(Long enrollmentId);
    
    EnrollmentResponseDTO addReview(Long enrollmentId, Integer rating, String review);
    
    Map<String, Long> getEnrollmentStatsByStudent(Long studentId);
    
    Map<String, Long> getEnrollmentStatsByCourse(Long courseId);
    
    long getEnrollmentCountByStudent(Long studentId);
    
    long getEnrollmentCountByCourse(Long courseId);
}