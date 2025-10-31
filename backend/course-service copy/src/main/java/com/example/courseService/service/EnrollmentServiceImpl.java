package com.example.courseService.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.courseService.DTOs.CourseEnrollmentDTO;
import com.example.courseService.DTOs.EnrollmentRequestDTO;
import com.example.courseService.DTOs.EnrollmentResponseDTO;
import com.example.courseService.DTOs.StudentEnrollmentDTO;
import com.example.courseService.ExceptionHandling.DuplicateEnrollmentException;
import com.example.courseService.ExceptionHandling.EnrollmentNotFoundException;
import com.example.courseService.entity.Enrollment;
import com.example.courseService.entity.EnrollmentStatus;
import com.example.courseService.repo.EnrollmentRepository;
import com.example.courseService.service.ServiceClients.CourseServiceClient;
import com.example.courseService.service.ServiceClients.StudentServiceClient;
import com.example.courseService.utility.EnrollmentMapper;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class EnrollmentServiceImpl implements EnrollmentService {
    @Autowired
    private EnrollmentRepository enrollmentRepository;
    @Autowired
    private EnrollmentMapper enrollmentMapper;
    @Autowired
    private CourseServiceClient courseServiceClient;
    @Autowired
    private StudentServiceClient studentServiceClient;
    
    @Override
    public EnrollmentResponseDTO enrollStudent(EnrollmentRequestDTO requestDTO) {
        log.info("Enrolling student ID: {} in course ID: {}", 
                requestDTO.getStudentId(), requestDTO.getCourseId());
        
        // Check if already enrolled
        if (enrollmentRepository.existsByStudentIdAndCourseId(
                requestDTO.getStudentId(), requestDTO.getCourseId())) {
            throw new DuplicateEnrollmentException(
                    "Student is already enrolled in this course");
        }
        
        // Verify student is active
        if (!studentServiceClient.isStudentActive(requestDTO.getStudentId())) {
            throw new IllegalArgumentException("Student not found or inactive");
        }
        
        // Verify course is Active
        if (!courseServiceClient.isCourseActive(requestDTO.getCourseId())) {
            throw new IllegalArgumentException("Course is not Active or not found");
        }
        
        // Create enrollment
        Enrollment enrollment = new Enrollment();
        enrollment.setStudentId(requestDTO.getStudentId());
        enrollment.setCourseId(requestDTO.getCourseId());
        enrollment.setStatus(EnrollmentStatus.ACTIVE);
        enrollment.setProgressPercentage(0.0);
        enrollment.setIsCompleted(false);
        enrollment.setEnrolledAt(LocalDateTime.now());
        enrollment.setLastAccessed(LocalDateTime.now());
        enrollment.setTotalWatchTimeMinutes(0);
        enrollment.setCertificateIssued(false);
        
        Enrollment savedEnrollment = enrollmentRepository.save(enrollment);
        
        // Update counters in other services
        courseServiceClient.incrementEnrollmentCount(requestDTO.getCourseId());
        studentServiceClient.incrementCoursesEnrolled(requestDTO.getStudentId());
        
        log.info("Enrollment created successfully with ID: {}", savedEnrollment.getId());
        
        return enrollmentMapper.toResponseDTO(savedEnrollment);
    }
    
    @Override
    @Transactional(readOnly = true)
    public EnrollmentResponseDTO getEnrollmentById(Long enrollmentId) {
        log.info("Fetching enrollment with ID: {}", enrollmentId);
        
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new EnrollmentNotFoundException(
                        "Enrollment not found with ID: " + enrollmentId));
        
        return enrollmentMapper.toResponseDTO(enrollment);
    }
    
    @Override
    @Transactional(readOnly = true)
    public EnrollmentResponseDTO getEnrollmentByStudentAndCourse(Long studentId, Long courseId) {
        log.info("Fetching enrollment for student ID: {} and course ID: {}", studentId, courseId);
        
        Enrollment enrollment = enrollmentRepository.findByStudentIdAndCourseId(studentId, courseId)
                .orElseThrow(() -> new EnrollmentNotFoundException(
                        "Enrollment not found for student ID: " + studentId + 
                        " and course ID: " + courseId));
        
        return enrollmentMapper.toResponseDTO(enrollment);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<StudentEnrollmentDTO> getStudentEnrollments(Long studentId, Pageable pageable) {
        log.info("Fetching enrollments for student ID: {}", studentId);
        
        Page<Enrollment> enrollments = enrollmentRepository.findByStudentId(studentId, pageable);
        
        // Map to StudentEnrollmentDTO and fetch course details
        return enrollments.map(enrollment -> {
            StudentEnrollmentDTO dto = enrollmentMapper.toStudentEnrollmentDTO(enrollment);
            // TODO: Fetch course details from CourseServiceClient and populate
            return dto;
        });
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<CourseEnrollmentDTO> getCourseEnrollments(Long courseId, Pageable pageable) {
        log.info("Fetching enrollments for course ID: {}", courseId);
        
        Page<Enrollment> enrollments = enrollmentRepository.findByCourseId(courseId, pageable);
        
        // Map to CourseEnrollmentDTO and fetch student details
        return enrollments.map(enrollment -> {
            CourseEnrollmentDTO dto = enrollmentMapper.toCourseEnrollmentDTO(enrollment);
            // TODO: Fetch student details from StudentServiceClient and populate
            return dto;
        });
    }
    
    @Override
    public void cancelEnrollment(Long enrollmentId) {
        log.info("Canceling enrollment with ID: {}", enrollmentId);
        
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new EnrollmentNotFoundException(
                        "Enrollment not found with ID: " + enrollmentId));
        
        if (enrollment.getStatus() == EnrollmentStatus.COMPLETED) {
            throw new IllegalArgumentException("Cannot cancel a completed enrollment");
        }
        
        // Update status to DROPPED
        enrollment.setStatus(EnrollmentStatus.DROPPED);
        enrollmentRepository.save(enrollment);
        
        // Update counters in other services
        courseServiceClient.decrementEnrollmentCount(enrollment.getCourseId());
        studentServiceClient.decrementCoursesEnrolled(enrollment.getStudentId());
        
        log.info("Enrollment canceled successfully with ID: {}", enrollmentId);
    }
    
    @Override
    public void updateProgress(Long enrollmentId, Double progressPercentage) {
        log.info("Updating progress for enrollment ID: {} to {}%", 
                enrollmentId, progressPercentage);
        
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new EnrollmentNotFoundException(
                        "Enrollment not found with ID: " + enrollmentId));
        
        enrollment.setProgressPercentage(progressPercentage);
        enrollment.setLastAccessed(LocalDateTime.now());
        
        // Auto-complete if progress reaches 100%
        if (progressPercentage >= 100.0 && !enrollment.getIsCompleted()) {
            enrollment.setIsCompleted(true);
            enrollment.setCompletionDate(LocalDateTime.now());
            enrollment.setStatus(EnrollmentStatus.COMPLETED);
            
            // Update student's completed courses count
            studentServiceClient.incrementCoursesCompleted(enrollment.getStudentId());
        }
        
        enrollmentRepository.save(enrollment);
        
        log.info("Progress updated successfully for enrollment ID: {}", enrollmentId);
    }
    
    @Override
    public void markAsCompleted(Long enrollmentId) {
        log.info("Marking enrollment as completed with ID: {}", enrollmentId);
        
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new EnrollmentNotFoundException(
                        "Enrollment not found with ID: " + enrollmentId));
        
        if (enrollment.getIsCompleted()) {
            throw new IllegalArgumentException("Enrollment is already completed");
        }
        
        enrollment.setIsCompleted(true);
        enrollment.setCompletionDate(LocalDateTime.now());
        enrollment.setStatus(EnrollmentStatus.COMPLETED);
        enrollment.setProgressPercentage(100.0);
        
        enrollmentRepository.save(enrollment);
        
        // Update student's completed courses count
        studentServiceClient.incrementCoursesCompleted(enrollment.getStudentId());
        
        log.info("Enrollment marked as completed with ID: {}", enrollmentId);
    }
    
    @Override
    public void updateWatchTime(Long enrollmentId, Integer minutes) {
        log.info("Updating watch time for enrollment ID: {} by {} minutes", 
                enrollmentId, minutes);
        
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new EnrollmentNotFoundException(
                        "Enrollment not found with ID: " + enrollmentId));
        
        enrollment.setTotalWatchTimeMinutes(
                enrollment.getTotalWatchTimeMinutes() + minutes);
        enrollment.setLastAccessed(LocalDateTime.now());
        
        enrollmentRepository.save(enrollment);
        
        log.info("Watch time updated successfully for enrollment ID: {}", enrollmentId);
    }
    
    @Override
    public void updateLastAccessed(Long enrollmentId) {
        log.info("Updating last accessed for enrollment ID: {}", enrollmentId);
        
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new EnrollmentNotFoundException(
                        "Enrollment not found with ID: " + enrollmentId));
        
        enrollment.setLastAccessed(LocalDateTime.now());
        enrollmentRepository.save(enrollment);
    }
    
    @Override
    public EnrollmentResponseDTO addReview(Long enrollmentId, Integer rating, String review) {
        log.info("Adding review for enrollment ID: {}", enrollmentId);
        
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new EnrollmentNotFoundException(
                        "Enrollment not found with ID: " + enrollmentId));
        
        if (!enrollment.getIsCompleted()) {
            throw new IllegalArgumentException(
                    "Can only review completed courses");
        }
        
        if (rating < 1 || rating > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }
        
        enrollment.setRating(rating);
        enrollment.setReview(review);
        enrollment.setReviewDate(LocalDateTime.now());
        
        Enrollment savedEnrollment = enrollmentRepository.save(enrollment);
        
        log.info("Review added successfully for enrollment ID: {}", enrollmentId);
        
        return enrollmentMapper.toResponseDTO(savedEnrollment);
    }
    
    @Override
    @Transactional(readOnly= true)
    public Map<String, Long> getEnrollmentStatsByStudent(Long studentId) {
        log.info("Fetching enrollment statistics for student ID: {}", studentId);
        List<Object[]> stats = enrollmentRepository.getEnrollmentStatsByStudent(studentId);
    
        Map<String, Long> statsMap = new HashMap<>();
        for (Object[] stat : stats) {
            EnrollmentStatus status = (EnrollmentStatus) stat[0];
            Long count = (Long) stat[1];
            statsMap.put(status.name(), count);
        }
        
        return statsMap;
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Long> getEnrollmentStatsByCourse(Long courseId) {
        log.info("Fetching enrollment statistics for course ID: {}", courseId);
        
        List<Object[]> stats = enrollmentRepository.getEnrollmentStatsByCourse(courseId);
        
        Map<String, Long> statsMap = new HashMap<>();
        for (Object[] stat : stats) {
            EnrollmentStatus status = (EnrollmentStatus) stat[0];
            Long count = (Long) stat[1];
            statsMap.put(status.name(), count);
        }
        
        return statsMap;
    }

    @Override
    @Transactional(readOnly = true)
    public long getEnrollmentCountByStudent(Long studentId) {
        return enrollmentRepository.countByStudentId(studentId);
    }

    @Override
    @Transactional(readOnly = true)
    public long getEnrollmentCountByCourse(Long courseId) {
        return enrollmentRepository.countByCourseId(courseId);
    }
}
