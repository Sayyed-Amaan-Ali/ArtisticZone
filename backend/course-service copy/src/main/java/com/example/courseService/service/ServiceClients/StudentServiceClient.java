package com.example.courseService.service.ServiceClients;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.courseService.service.StudentService;

@Component
@RequiredArgsConstructor
@Slf4j
public class StudentServiceClient {
    
    @Autowired
    private StudentService studentService;
    
    public boolean isStudentActive(Long studentId) {
        try {
            studentService.getStudentById(studentId);
            return true;
        } catch (Exception e) {
            log.error("Error checking if student is active: {}", e.getMessage());
            return false;
        }
    }
    
    public void incrementCoursesEnrolled(Long studentId) {
        try {
            studentService.incrementCoursesEnrolled(studentId);
            log.info("Incremented courses enrolled for student ID: {}", studentId);
        } catch (Exception e) {
            log.error("Error incrementing courses enrolled: {}", e.getMessage());
        }
    }
    
    public void decrementCoursesEnrolled(Long studentId) {
        try {
            studentService.decrementCoursesEnrolled(studentId);
            log.info("Decremented courses enrolled for student ID: {}", studentId);
        } catch (Exception e) {
            log.error("Error decrementing courses enrolled: {}", e.getMessage());
        }
    }
    
    public void incrementCoursesCompleted(Long studentId) {
        try {
            studentService.incrementCoursesCompleted(studentId);
            log.info("Incremented courses completed for student ID: {}", studentId);
        } catch (Exception e) {
            log.error("Error incrementing courses completed: {}", e.getMessage());
        }
    }
    
    public Object getStudentDetails(Long studentId) {
        try {
            return studentService.getStudentById(studentId);
        } catch (Exception e) {
            log.error("Error fetching student details: {}", e.getMessage());
            return null;
        }
    }
}