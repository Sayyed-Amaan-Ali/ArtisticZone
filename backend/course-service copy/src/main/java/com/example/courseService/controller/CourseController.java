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

import com.example.courseService.DTOs.CourseRequestDTO;
import com.example.courseService.DTOs.CourseResponseDTO;
import com.example.courseService.DTOs.CourseUpdateDTO;
import com.example.courseService.service.CourseService;
import com.example.courseService.utility.CourseLevel;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*") // Configure properly in production
public class CourseController {
    @Autowired
    private CourseService courseService;
    
 // CREATE COURSE
    @PostMapping
    public ResponseEntity<CourseResponseDTO> createCourse(
            @Valid @RequestBody CourseRequestDTO courseRequestDTO,
            Authentication authentication) {

        log.info("REST request to create course: {}", courseRequestDTO.getTitle());

        try {
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ADMIN"));

            if (!isAdmin) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            CourseResponseDTO createdCourse = courseService.createCourse(courseRequestDTO);
            return new ResponseEntity<>(createdCourse, HttpStatus.CREATED);

        } catch (Exception e) {
            log.error("Error creating course: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    
    // GET ALL - Public/Authenticated
    @GetMapping
    public ResponseEntity<Page<CourseResponseDTO>> getAllCourses(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "ASC") String sortDirection,
            @RequestParam(required = false) Boolean ActiveOnly) {
        log.info("REST request to get all courses - page: {}, size: {}", page, size);
        
        Sort sort = sortDirection.equalsIgnoreCase("DESC") 
                ? Sort.by(sortBy).descending() 
                : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<CourseResponseDTO> courses;
        if (Boolean.TRUE.equals(ActiveOnly)) {
            courses = courseService.getActiveCourses(pageable);
        } else {
            courses = courseService.getAllCourses(pageable);
        }
        
        return ResponseEntity.ok(courses);
    }
    
    // GET BY ID - Public/Authenticated
    @GetMapping("/{id}")
    public ResponseEntity<CourseResponseDTO> getCourseById(@PathVariable Long id) {
        log.info("REST request to get course by ID: {}", id);
        
        CourseResponseDTO course = courseService.getCourseById(id);
        return ResponseEntity.ok(course);
    }
    
    // SEARCH - Public/Authenticated
    @GetMapping("/search")
    public ResponseEntity<Page<CourseResponseDTO>> searchCourses(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        log.info("REST request to search courses with query: {}", query);
        
        Pageable pageable = PageRequest.of(page, size);
        Page<CourseResponseDTO> courses = courseService.searchCourses(query, pageable);
        
        return ResponseEntity.ok(courses);
    }
    
    // GET BY CATEGORY - Public/Authenticated
    @GetMapping("/category/{category}")
    public ResponseEntity<Page<CourseResponseDTO>> getCoursesByCategory(
            @PathVariable String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        log.info("REST request to get courses by category: {}", category);
        
        Pageable pageable = PageRequest.of(page, size);
        Page<CourseResponseDTO> courses = courseService.getCoursesByCategory(category, pageable);
        
        return ResponseEntity.ok(courses);
    }
    
    // GET BY LEVEL - Public/Authenticated
    @GetMapping("/level/{level}")
    public ResponseEntity<Page<CourseResponseDTO>> getCoursesByLevel(
            @PathVariable CourseLevel level,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        log.info("REST request to get courses by level: {}", level);
        
        Pageable pageable = PageRequest.of(page, size);
        Page<CourseResponseDTO> courses = courseService.getCoursesByLevel(level, pageable);
        
        return ResponseEntity.ok(courses);
    }
    
 // UPDATE COURSE
    @PutMapping("/{id}")
    public ResponseEntity<CourseResponseDTO> updateCourse(
            @PathVariable Long id,
            @Valid @RequestBody CourseUpdateDTO courseUpdateDTO,
            Authentication authentication) {

        log.info("REST request to update course with ID: {}", id);

        try {
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ADMIN"));

            if (!isAdmin) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            CourseResponseDTO updatedCourse = courseService.updateCourse(id, courseUpdateDTO);
            return ResponseEntity.ok(updatedCourse);

        } catch (Exception e) {
            log.error("Error updating course: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // DELETE COURSE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(
            @PathVariable Long id,
            Authentication authentication) {

        log.info("REST request to delete course with ID: {}", id);

        try {
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ADMIN"));

            if (!isAdmin) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            courseService.deleteCourse(id);
            return ResponseEntity.noContent().build();

        } catch (Exception e) {
            log.error("Error deleting course: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Internal endpoints for inter-service communication
    
    @PutMapping("/{courseId}/increment-enrollment")
    public ResponseEntity<Void> incrementEnrollment(@PathVariable Long courseId) {
        log.info("REST request to increment enrollment for course ID: {}", courseId);
        
        courseService.incrementEnrollmentCount(courseId);
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/{courseId}/decrement-enrollment")
    public ResponseEntity<Void> decrementEnrollment(@PathVariable Long courseId) {
        log.info("REST request to decrement enrollment for course ID: {}", courseId);
        
        courseService.decrementEnrollmentCount(courseId);
        return ResponseEntity.ok().build();
    }
    
    
    @GetMapping("/{courseId}/is-Active")
    public ResponseEntity<Boolean> isActive(@PathVariable Long courseId) {
        log.info("REST request to check if course is Active, ID: {}", courseId);
        
        boolean isActive = courseService.isCourseActive(courseId);
        return ResponseEntity.ok(isActive);
    }
}