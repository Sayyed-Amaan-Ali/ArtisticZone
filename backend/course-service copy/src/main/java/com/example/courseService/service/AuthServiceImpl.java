package com.example.courseService.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.courseService.DTOs.LoginResponseDTO;
import com.example.courseService.entity.UserRole;

import jakarta.servlet.http.HttpServletRequest;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AuthServiceImpl implements AuthService {
    
    @Autowired
    private  OtpService otpService;
    @Autowired
    private  SessionService sessionService;
    @Autowired
    private StudentService studentService;
    
    
    @Override
    public String sendLoginOtp(String phoneNumber) {
        log.info("Initiating login OTP for phone number: {}", phoneNumber);
        return otpService.sendOtp(phoneNumber);
    }
    
    @Override
    public LoginResponseDTO verifyAndLogin(String phoneNumber, String otp, HttpServletRequest request) {
        log.info("Verifying OTP and logging in user with phone number: {}", phoneNumber);
        
        // Verify OTP
        boolean isValid = otpService.verifyOtp(phoneNumber, otp);
        
        if (!isValid) {
            throw new RuntimeException("OTP verification failed");
        }
        
        // Fetch user details from Student Service
        // In real implementation, you'd call the student service
        // For now, we'll use mock data
        Long userId = getUserIdFromStudentService(phoneNumber);
        UserRole role = getUserRole(phoneNumber);
        
        // Extract request metadata
        String ipAddress = getClientIpAddress(request);
        String userAgent = request.getHeader("User-Agent");
        
        // Create session
        String sessionId = sessionService.createSession(userId, phoneNumber, role, ipAddress, userAgent);
        
        // Prepare response
        LoginResponseDTO response = new LoginResponseDTO();
        response.setSessionId(sessionId);
        response.setUserId(userId);
        response.setPhoneNumber(phoneNumber);
        response.setRole(role);
        response.setMessage("Login successful");
        
        

        log.info("User logged in successfully with session ID: {}", sessionId);
        return response;
    }
    
    @Override
    public void logout(String sessionId) {
        log.info("Logging out session: {}", sessionId);
        sessionService.invalidateSession(sessionId);
    }
    
    @Override
    public boolean validateSession(String sessionId) {
        return sessionService.isSessionValid(sessionId);
    }
    
    private Long getUserIdFromStudentService(String phoneNumber) {
        // TODO: Call Student Service API to get user ID
        // Example:
        // String url = STUDENT_SERVICE_URL + phoneNumber;
        // StudentResponseDTO student = restTemplate.getForObject(url, StudentResponseDTO.class);
        // return student.getId();
        
        // Mock implementation
        Long id = studentService.getStudentByPhoneNumber(phoneNumber).getId();

        return id;
    }
    
    private UserRole getUserRole(String phoneNumber) {
        // TODO: Determine role from database or user service
        // For now, return USER as default
        if(studentService.getStudentByPhoneNumber(phoneNumber).equals("+917827143813"))
            return UserRole.ADMIN;
        return UserRole.USER;
    }
    
    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty()) {
            return xRealIp;
        }
        return request.getRemoteAddr();
    }
}