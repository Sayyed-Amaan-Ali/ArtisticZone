package com.example.courseService.ExceptionHandling;


public class EnrollmentNotFoundException extends RuntimeException {
    
    public EnrollmentNotFoundException(String message) {
        super(message);
    }
    
    public EnrollmentNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}