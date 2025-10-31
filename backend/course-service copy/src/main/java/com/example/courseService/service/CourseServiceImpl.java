package com.example.courseService.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.courseService.DTOs.CourseRequestDTO;
import com.example.courseService.DTOs.CourseResponseDTO;
import com.example.courseService.DTOs.CourseUpdateDTO;
import com.example.courseService.ExceptionHandling.CourseNotFoundException;
import com.example.courseService.entity.Course;
import com.example.courseService.repo.CourseRepository;
import com.example.courseService.utility.CourseLevel;
import com.example.courseService.utility.CourseMapper;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CourseServiceImpl implements CourseService {
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private  CourseMapper courseMapper;
    
    
    @Override
    public CourseResponseDTO createCourse(CourseRequestDTO courseRequestDTO) {
        log.info("Creating new course: {}", courseRequestDTO.getTitle());
        
        Course course = courseMapper.toEntity(courseRequestDTO);
        course.setEnrolledCount(0);
        course.setRating(0.0);
        course.setTotalReviews(0);
        
        Course savedCourse = courseRepository.save(course);
        log.info("Course created successfully with ID: {}", savedCourse.getId());
        
        return courseMapper.toResponseDTO(savedCourse);
    }
    
    @Override
    @Transactional(readOnly = true)
    public CourseResponseDTO getCourseById(Long id) {
        log.info("Fetching course with ID: {}", id);
        
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new CourseNotFoundException("Course not found with ID: " + id));
        
        return courseMapper.toResponseDTO(course);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<CourseResponseDTO> getAllCourses(Pageable pageable) {
        log.info("Fetching all courses with pagination");
        
        Page<Course> courses = courseRepository.findAll(pageable);
        return courses.map(courseMapper::toResponseDTO);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<CourseResponseDTO> getActiveCourses(Pageable pageable) {
        log.info("Fetching published courses with pagination");
        
        Page<Course> courses = courseRepository.findByIsActiveTrue(pageable);
        return courses.map(courseMapper::toResponseDTO);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<CourseResponseDTO> getCoursesByCategory(String category, Pageable pageable) {
        log.info("Fetching courses by category: {}", category);
        
        Page<Course> courses = courseRepository.findByCategoryAndIsActiveTrue(category, pageable);
        return courses.map(courseMapper::toResponseDTO);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<CourseResponseDTO> getCoursesByLevel(CourseLevel level, Pageable pageable) {
        log.info("Fetching courses by level: {}", level);
        
        Page<Course> courses = courseRepository.findByLevelAndIsActiveTrue(level, pageable);
        return courses.map(courseMapper::toResponseDTO);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<CourseResponseDTO> searchCourses(String searchTerm, Pageable pageable) {
        log.info("Searching courses with term: {}", searchTerm);
        
        Page<Course> courses = courseRepository.searchCourses(searchTerm, pageable);
        return courses.map(courseMapper::toResponseDTO);
    }
    
    @Override
    public CourseResponseDTO updateCourse(Long id, CourseUpdateDTO courseUpdateDTO) {
        log.info("Updating course with ID: {}", id);
        
        Course existingCourse = courseRepository.findById(id)
                .orElseThrow(() -> new CourseNotFoundException("Course not found with ID: " + id));
        
        courseMapper.updateEntityFromDTO(courseUpdateDTO, existingCourse);
        
        Course updatedCourse = courseRepository.save(existingCourse);
        log.info("Course updated successfully with ID: {}", updatedCourse.getId());
        
        return courseMapper.toResponseDTO(updatedCourse);
    }
    
    @Override
    public void deleteCourse(Long id) {
        log.info("Deleting course with ID: {}", id);
        
        if (!courseRepository.existsById(id)) {
            throw new CourseNotFoundException("Course not found with ID: " + id);
        }
        
        courseRepository.deleteById(id);
        log.info("Course deleted successfully with ID: {}", id);
    }
    
    @Override
    public void incrementEnrollmentCount(Long courseId) {
        log.info("Incrementing enrollment count for course ID: {}", courseId);
        
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new CourseNotFoundException("Course not found with ID: " + courseId));
        
        course.setEnrolledCount(course.getEnrolledCount() + 1);
        courseRepository.save(course);
    }
    
    @Override
    public void decrementEnrollmentCount(Long courseId) {
        log.info("Decrementing enrollment count for course ID: {}", courseId);
        
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new CourseNotFoundException("Course not found with ID: " + courseId));
        
        if (course.getEnrolledCount() > 0) {
            course.setEnrolledCount(course.getEnrolledCount() - 1);
            courseRepository.save(course);
        }
    }
    
    @Override
    @Transactional(readOnly = true)
    public boolean isCourseActive(Long courseId) {
        return courseRepository.existsByIdAndIsActiveTrue(courseId);
    }
    
  
}