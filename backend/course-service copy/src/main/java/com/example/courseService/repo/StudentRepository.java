package com.example.courseService.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.courseService.entity.Student;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    
    // Find by email
    Optional<Student> findByEmail(String email);
    
    // Find by phone number
    Optional<Student> findByPhoneNumber(String phoneNumber);
    
    // Check if email exists
    boolean existsByEmail(String email);
    
    // Check if phone number exists
    boolean existsByPhoneNumber(String phoneNumber);
    
    // Find active students
    Page<Student> findByIsActiveTrue(Pageable pageable);
    
    // Search students by name or email
    @Query("SELECT s FROM Student s WHERE " +
           "LOWER(s.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(s.email) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    Page<Student> searchStudents(@Param("searchTerm") String searchTerm, Pageable pageable);
    
    // Find students by city
    Page<Student> findByCity(String city, Pageable pageable);
    
    // Find students by country
    Page<Student> findByCountry(String country, Pageable pageable);
    
    // Find students who joined after a certain date
    @Query("SELECT s FROM Student s WHERE s.joinDate >= :fromDate")
    Page<Student> findRecentStudents(@Param("fromDate") java.time.LocalDate fromDate, Pageable pageable);
}