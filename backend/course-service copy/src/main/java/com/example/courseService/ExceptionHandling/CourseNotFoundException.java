package com.example.courseService.ExceptionHandling;

public class CourseNotFoundException extends RuntimeException{
	
	 public CourseNotFoundException(String message) {
	        super(message);
	    }
	    
	    public CourseNotFoundException(String message, Throwable cause) {
	        super(message, cause);
	    }
}
