package com.example.courseService.service.ServiceClients;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.courseService.service.CourseService;

@Component
@RequiredArgsConstructor
@Slf4j
public class CourseServiceClient {
    
    @Autowired
    private CourseService courseService;
    
    public boolean isCourseActive(Long courseId) {
        try {
            courseService.getCourseById(courseId);
            return true;
        } catch (Exception e) {
            log.error("Error checking if course is published: {}", e.getMessage());
            return false;
        }
    }
    
    public void incrementEnrollmentCount(Long courseId) {
        try {
            courseService.incrementEnrollmentCount(courseId);
            log.info("Incremented enrollment count for course ID: {}", courseId);
        } catch (Exception e) {
            log.error("Error incrementing enrollment count: {}", e.getMessage());
        }
    }
    
    public void decrementEnrollmentCount(Long courseId) {
        try {
            courseService.decrementEnrollmentCount(courseId);
            log.info("Decremented enrollment count for course ID: {}", courseId);
        } catch (Exception e) {
            log.error("Error decrementing enrollment count: {}", e.getMessage());
        }
    }
    
    public Object getCourseDetails(Long courseId) {
        try {
            return courseService.getCourseById(courseId);
        } catch (Exception e) {
            log.error("Error fetching course details: {}", e.getMessage());
            return null;
        }
    }
}