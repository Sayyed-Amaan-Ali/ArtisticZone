package com.example.courseService.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.courseService.DTOs.CourseRequestDTO;
import com.example.courseService.DTOs.CourseResponseDTO;
import com.example.courseService.DTOs.CourseUpdateDTO;
import com.example.courseService.utility.CourseLevel;

public interface CourseService {
    
    CourseResponseDTO createCourse(CourseRequestDTO courseRequestDTO);
    
    CourseResponseDTO getCourseById(Long id);
    
    Page<CourseResponseDTO> getAllCourses(Pageable pageable);
    
    Page<CourseResponseDTO> getActiveCourses(Pageable pageable);
    
    Page<CourseResponseDTO> getCoursesByCategory(String category, Pageable pageable);
    
    Page<CourseResponseDTO> getCoursesByLevel(CourseLevel level, Pageable pageable);
    
    Page<CourseResponseDTO> searchCourses(String searchTerm, Pageable pageable);
    
    CourseResponseDTO updateCourse(Long id, CourseUpdateDTO courseUpdateDTO);
    
    void deleteCourse(Long id);
    
    void incrementEnrollmentCount(Long courseId);
    
    void decrementEnrollmentCount(Long courseId);
    
    boolean isCourseActive(Long courseId);
}