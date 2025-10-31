package com.example.courseService.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.courseService.entity.Enrollment;
import com.example.courseService.entity.EnrollmentStatus;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    
    // Find enrollment by student and course
    Optional<Enrollment> findByStudentIdAndCourseId(Long studentId, Long courseId);
    
    // Check if enrollment exists
    boolean existsByStudentIdAndCourseId(Long studentId, Long courseId);
    
    // Find all enrollments for a student
    Page<Enrollment> findByStudentId(Long studentId, Pageable pageable);
    
    // Find all enrollments for a course
    Page<Enrollment> findByCourseId(Long courseId, Pageable pageable);
    
    // Find active enrollments for a student
    Page<Enrollment> findByStudentIdAndStatus(Long studentId, EnrollmentStatus status, Pageable pageable);
    
    // Find completed enrollments for a student
    Page<Enrollment> findByStudentIdAndIsCompletedTrue(Long studentId, Pageable pageable);
    
    // Find enrollments by status
    Page<Enrollment> findByStatus(EnrollmentStatus status, Pageable pageable);
    
    // Count enrollments for a student
    long countByStudentId(Long studentId);
    
    // Count enrollments for a course
    long countByCourseId(Long courseId);
    
    // Count active enrollments for a student
    long countByStudentIdAndStatus(Long studentId, EnrollmentStatus status);
    
    // Find recent enrollments
    @Query("SELECT e FROM Enrollment e WHERE e.enrolledAt >= :fromDate ORDER BY e.enrolledAt DESC")
    Page<Enrollment> findRecentEnrollments(@Param("fromDate") LocalDateTime fromDate, Pageable pageable);
    
    // Find enrollments needing attention (not accessed in X days)
    @Query("SELECT e FROM Enrollment e WHERE e.status = 'ACTIVE' " +
           "AND e.lastAccessed < :thresholdDate ORDER BY e.lastAccessed ASC")
    Page<Enrollment> findInactiveEnrollments(@Param("thresholdDate") LocalDateTime thresholdDate, Pageable pageable);
    
    // Get enrollment statistics for a student
    @Query("SELECT e.status, COUNT(e) FROM Enrollment e WHERE e.studentId = :studentId GROUP BY e.status")
    List<Object[]> getEnrollmentStatsByStudent(@Param("studentId") Long studentId);
    
    // Get enrollment statistics for a course
    @Query("SELECT e.status, COUNT(e) FROM Enrollment e WHERE e.courseId = :courseId GROUP BY e.status")
    List<Object[]> getEnrollmentStatsByCourse(@Param("courseId") Long courseId);
}