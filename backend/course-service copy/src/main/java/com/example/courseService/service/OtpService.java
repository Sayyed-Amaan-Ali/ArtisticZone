package com.example.courseService.service;


public interface OtpService {
    
    String sendOtp(String phoneNumber);
    
    boolean verifyOtp(String phoneNumber, String otp);
    
    void resendOtp(String phoneNumber);
}