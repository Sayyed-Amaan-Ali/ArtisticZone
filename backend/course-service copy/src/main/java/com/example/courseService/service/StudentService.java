package com.example.courseService.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.courseService.DTOs.StudentRegistrationDTO;
import com.example.courseService.DTOs.StudentResponseDTO;
import com.example.courseService.DTOs.StudentUpdateDTO;

public interface StudentService {
    
    StudentResponseDTO registerStudent(StudentRegistrationDTO registrationDTO);
    
    StudentResponseDTO getStudentById(Long id);
    
    StudentResponseDTO getStudentByEmail(String email);
    
    StudentResponseDTO getStudentByPhoneNumber(String phoneNumber);
    
    Page<StudentResponseDTO> getAllStudents(Pageable pageable);
    
    Page<StudentResponseDTO> getActiveStudents(Pageable pageable);
    
    Page<StudentResponseDTO> searchStudents(String searchTerm, Pageable pageable);
    
    StudentResponseDTO updateStudent(Long id, StudentUpdateDTO updateDTO);
    
    void deleteStudent(Long id);
    
    void deactivateStudent(Long id);
    
    void activateStudent(Long id);
    
    void incrementCoursesEnrolled(Long studentId);
    
    void decrementCoursesEnrolled(Long studentId);
    
    void incrementCoursesCompleted(Long studentId);
    
    void updateLastLogin(Long studentId);
    
    void verifyEmail(Long studentId);
    
    void verifyPhone(Long studentId);
    
    boolean isEmailAvailable(String email);
    
    boolean isPhoneNumberAvailable(String phoneNumber);
}