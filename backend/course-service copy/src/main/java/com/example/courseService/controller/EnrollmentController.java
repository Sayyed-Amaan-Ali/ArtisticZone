package com.example.courseService.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.courseService.DTOs.CourseEnrollmentDTO;
import com.example.courseService.DTOs.EnrollmentRequestDTO;
import com.example.courseService.DTOs.EnrollmentResponseDTO;
import com.example.courseService.DTOs.StudentEnrollmentDTO;
import com.example.courseService.service.EnrollmentService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/enrollments")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class EnrollmentController {
    @Autowired
    private EnrollmentService enrollmentService;
    
    // ENROLL - Authenticated Student
 // ENROLL STUDENT
    @PostMapping
    public ResponseEntity<EnrollmentResponseDTO> enrollStudent(
            @Valid @RequestBody EnrollmentRequestDTO requestDTO,
            Authentication authentication) {

        log.info("REST request to enroll student ID: {} in course ID: {}", 
                requestDTO.getStudentId(), requestDTO.getCourseId());

        try {
            String principal = authentication.getPrincipal().toString();
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ADMIN"));

            if (!isAdmin && !principal.equals(requestDTO.getStudentId().toString())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            EnrollmentResponseDTO enrollment = enrollmentService.enrollStudent(requestDTO);
            return new ResponseEntity<>(enrollment, HttpStatus.CREATED);

        } catch (Exception e) {
            log.error("Error enrolling student: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // GET ENROLLMENT BY ID
    @GetMapping("/{enrollmentId}")
    public ResponseEntity<EnrollmentResponseDTO> getEnrollmentById(
            @PathVariable Long enrollmentId,
            Authentication authentication) {

        log.info("REST request to get enrollment by ID: {}", enrollmentId);

        try {
            EnrollmentResponseDTO enrollment = enrollmentService.getEnrollmentById(enrollmentId);
            String principal = authentication.getPrincipal().toString();
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ADMIN"));

            if (!isAdmin && !principal.equals(enrollment.getStudentId().toString())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            return ResponseEntity.ok(enrollment);

        } catch (Exception e) {
            log.error("Error fetching enrollment: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // GET ALL STUDENTS IN A COURSE
    @GetMapping("/course/{courseId}")
    public ResponseEntity<Page<CourseEnrollmentDTO>> getCourseEnrollments(
            @PathVariable Long courseId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "enrolledAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortDirection,
            Authentication authentication) {

        log.info("REST request to get enrollments for course ID: {}", courseId);

        try {
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ADMIN") || a.getAuthority().equals("INSTRUCTOR"));

            if (!isAdmin) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            Sort sort = sortDirection.equalsIgnoreCase("DESC")
                    ? Sort.by(sortBy).descending()
                    : Sort.by(sortBy).ascending();
            Pageable pageable = PageRequest.of(page, size, sort);

            Page<CourseEnrollmentDTO> enrollments = enrollmentService.getCourseEnrollments(courseId, pageable);
            return ResponseEntity.ok(enrollments);

        } catch (Exception e) {
            log.error("Error fetching course enrollments: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // GET ALL COURSES STUDENT IS ENROLLED IN
    @GetMapping("/student/{studentId}")
    public ResponseEntity<?> getStudentEnrollments(
            @PathVariable Long studentId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "enrolledAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortDirection,
            Authentication authentication) {

        log.info("REST request to get enrollments for student ID: {}", studentId);

        try {
            String principal = authentication.getPrincipal().toString();
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ADMIN"));

            if (!isAdmin && !principal.equals(studentId.toString())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            Sort sort = sortDirection.equalsIgnoreCase("DESC")
                    ? Sort.by(sortBy).descending()
                    : Sort.by(sortBy).ascending();
            Pageable pageable = PageRequest.of(page, size, sort);

            Page<StudentEnrollmentDTO> enrollments = enrollmentService.getStudentEnrollments(studentId, pageable);
            return ResponseEntity.ok(enrollments);

        } catch (Exception e) {
            log.error("Error fetching student enrollments: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // GET SPECIFIC ENROLLMENT BY STUDENT AND COURSE
    @GetMapping("/student/{studentId}/course/{courseId}")
    public ResponseEntity<EnrollmentResponseDTO> getEnrollmentByStudentAndCourse(
            @PathVariable Long studentId,
            @PathVariable Long courseId,
            Authentication authentication) {

        log.info("REST request to get enrollment for student ID: {} and course ID: {}", studentId, courseId);

        try {
            String principal = authentication.getPrincipal().toString();
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ADMIN"));

            if (!isAdmin && !principal.equals(studentId.toString())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            EnrollmentResponseDTO enrollment = enrollmentService.getEnrollmentByStudentAndCourse(studentId, courseId);
            return ResponseEntity.ok(enrollment);

        } catch (Exception e) {
            log.error("Error fetching enrollment by student and course: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // CANCEL ENROLLMENT
    @DeleteMapping("/{enrollmentId}")
    public ResponseEntity<Map<String, String>> cancelEnrollment(
            @PathVariable Long enrollmentId,
            Authentication authentication) {

        log.info("REST request to cancel enrollment with ID: {}", enrollmentId);

        try {
            EnrollmentResponseDTO enrollment = enrollmentService.getEnrollmentById(enrollmentId);
            String principal = authentication.getPrincipal().toString();
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ADMIN"));

            if (!isAdmin && !principal.equals(enrollment.getStudentId().toString())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            enrollmentService.cancelEnrollment(enrollmentId);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Enrollment canceled successfully");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error canceling enrollment: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // UPDATE PROGRESS
    @PutMapping("/{enrollmentId}/progress")
    public ResponseEntity<Map<String, String>> updateProgress(
            @PathVariable Long enrollmentId,
            @RequestParam Double progressPercentage,
            Authentication authentication) {

        log.info("REST request to update progress for enrollment ID: {} to {}%", enrollmentId, progressPercentage);

        try {
            EnrollmentResponseDTO enrollment = enrollmentService.getEnrollmentById(enrollmentId);
            String principal = authentication.getPrincipal().toString();
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ADMIN"));

            if (!isAdmin && !principal.equals(enrollment.getStudentId().toString())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            enrollmentService.updateProgress(enrollmentId, progressPercentage);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Progress updated successfully");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error updating progress: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // MARK AS COMPLETED
    @PutMapping("/{enrollmentId}/complete")
    public ResponseEntity<Map<String, String>> markAsCompleted(
            @PathVariable Long enrollmentId,
            Authentication authentication) {

        log.info("REST request to mark enrollment as completed with ID: {}", enrollmentId);

        try {
            EnrollmentResponseDTO enrollment = enrollmentService.getEnrollmentById(enrollmentId);
            String principal = authentication.getPrincipal().toString();
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ADMIN"));

            if (!isAdmin && !principal.equals(enrollment.getStudentId().toString())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            enrollmentService.markAsCompleted(enrollmentId);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Enrollment marked as completed");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error marking as completed: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // UPDATE WATCH TIME
    @PutMapping("/{enrollmentId}/watch-time")
    public ResponseEntity<Map<String, String>> updateWatchTime(
            @PathVariable Long enrollmentId,
            @RequestParam Integer minutes,
            Authentication authentication) {

        log.info("REST request to update watch time for enrollment ID: {} by {} minutes", enrollmentId, minutes);

        try {
            EnrollmentResponseDTO enrollment = enrollmentService.getEnrollmentById(enrollmentId);
            String principal = authentication.getPrincipal().toString();
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ADMIN"));

            if (!isAdmin && !principal.equals(enrollment.getStudentId().toString())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            enrollmentService.updateWatchTime(enrollmentId, minutes);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Watch time updated successfully");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error updating watch time: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // UPDATE LAST ACCESSED
    @PutMapping("/{enrollmentId}/last-accessed")
    public ResponseEntity<Map<String, String>> updateLastAccessed(
            @PathVariable Long enrollmentId,
            Authentication authentication) {

        log.info("REST request to update last accessed for enrollment ID: {}", enrollmentId);

        try {
            EnrollmentResponseDTO enrollment = enrollmentService.getEnrollmentById(enrollmentId);
            String principal = authentication.getPrincipal().toString();
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ADMIN"));

            if (!isAdmin && !principal.equals(enrollment.getStudentId().toString())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            enrollmentService.updateLastAccessed(enrollmentId);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Last accessed updated successfully");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error updating last accessed: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // ADD REVIEW
    @PostMapping("/{enrollmentId}/review")
    public ResponseEntity<EnrollmentResponseDTO> addReview(
            @PathVariable Long enrollmentId,
            @RequestParam Integer rating,
            @RequestParam(required = false) String review,
            Authentication authentication) {

        log.info("REST request to add review for enrollment ID: {}", enrollmentId);

        try {
            EnrollmentResponseDTO enrollment = enrollmentService.getEnrollmentById(enrollmentId);
            String principal = authentication.getPrincipal().toString();
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ADMIN"));

            if (!isAdmin && !principal.equals(enrollment.getStudentId().toString())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            enrollment = enrollmentService.addReview(enrollmentId, rating, review);
            return ResponseEntity.ok(enrollment);

        } catch (Exception e) {
            log.error("Error adding review: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // STUDENT ENROLLMENT STATS
    @GetMapping("/student/{studentId}/stats")
    public ResponseEntity<?> getStudentEnrollmentStats(
            @PathVariable Long studentId,
            Authentication authentication) {

        log.info("REST request to get enrollment stats for student ID: {}", studentId);

        try {
            String principal = authentication.getPrincipal().toString();
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ADMIN"));

            if (!isAdmin && !principal.equals(studentId.toString())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            Map<String, Long> stats = enrollmentService.getEnrollmentStatsByStudent(studentId);
            return ResponseEntity.ok(stats);

        } catch (Exception e) {
            log.error("Error fetching student stats: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // COURSE ENROLLMENT STATS
    @GetMapping("/course/{courseId}/stats")
    public ResponseEntity<?> getCourseEnrollmentStats(
            @PathVariable Long courseId,
            Authentication authentication) {

        log.info("REST request to get enrollment stats for course ID: {}", courseId);

        try {
            boolean isAdminOrInstructor = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ADMIN") || a.getAuthority().equals("INSTRUCTOR"));

            if (!isAdminOrInstructor) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            Map<String, Long> stats = enrollmentService.getEnrollmentStatsByCourse(courseId);
            return ResponseEntity.ok(stats);

        } catch (Exception e) {
            log.error("Error fetching course stats: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // STUDENT ENROLLMENT COUNT
    @GetMapping("/student/{studentId}/count")
    public ResponseEntity<?> getStudentEnrollmentCount(
            @PathVariable Long studentId,
            Authentication authentication) {

        log.info("REST request to get enrollment count for student ID: {}", studentId);

        try {
            String principal = authentication.getPrincipal().toString();
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ADMIN"));

            if (!isAdmin && !principal.equals(studentId.toString())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            long count = enrollmentService.getEnrollmentCountByStudent(studentId);
            Map<String, Long> response = new HashMap<>();
            response.put("count", count);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error fetching enrollment count: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    
    // GET ENROLLMENT COUNT FOR COURSE
    @GetMapping("/course/{courseId}/count")
    public ResponseEntity<Map<String, Long>> getCourseEnrollmentCount(
            @PathVariable Long courseId) {
        log.info("REST request to get enrollment count for course ID: {}", courseId);
        
        long count = enrollmentService.getEnrollmentCountByCourse(courseId);
        
        Map<String, Long> response = new HashMap<>();
        response.put("count", count);
        
        return ResponseEntity.ok(response);
    }
}