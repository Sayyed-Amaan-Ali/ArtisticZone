package com.example.courseService.ExceptionHandling;

public class OtpExpiredException extends RuntimeException {
    
    public OtpExpiredException(String message) {
        super(message);
    }
    
    public OtpExpiredException(String message, Throwable cause) {
        super(message, cause);
    }
}