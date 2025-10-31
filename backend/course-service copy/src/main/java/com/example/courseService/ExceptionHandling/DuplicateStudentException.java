package com.example.courseService.ExceptionHandling;

public class DuplicateStudentException extends RuntimeException {
    
    public DuplicateStudentException(String message) {
        super(message);
    }
    
    public DuplicateStudentException(String message, Throwable cause) {
        super(message, cause);
    }
}