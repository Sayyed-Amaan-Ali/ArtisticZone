package com.example.courseService.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import com.example.courseService.DTOs.LoginResponseDTO;
import com.example.courseService.DTOs.OtpRequestDTO;
import com.example.courseService.DTOs.OtpVerifyDTO;
import com.example.courseService.DTOs.SessionResponseDTO;
import com.example.courseService.service.AuthService;
import com.example.courseService.service.SessionService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private AuthService authService;
    @Autowired
    private SessionService sessionService;

    
    // Send OTP for login
    @PostMapping("/send-otp")
    public ResponseEntity<Map<String, String>> sendOtp(
            @Valid @RequestBody OtpRequestDTO request) {
        log.info("REST request to send OTP to: {}", request.getPhoneNumber());
        
        String otp = authService.sendLoginOtp(request.getPhoneNumber());
        log.info("otp", otp);
        Map<String, String> response = new HashMap<>();
        response.put("message", "OTP sent successfully");
        response.put("phoneNumber", request.getPhoneNumber());

        // remove in production
        response.put("otp",otp);
        
        return ResponseEntity.ok(response);
    }
    
    // Verify OTP and login
    @PostMapping("/verify-otp")
    public ResponseEntity<LoginResponseDTO> verifyOtp(
            @Valid @RequestBody OtpVerifyDTO request,
            HttpServletRequest httpRequest,
            HttpSession httpSession) {
        log.info("REST request to verify OTP for: {}", request.getPhoneNumber());
        
        LoginResponseDTO response = authService.verifyAndLogin(
                request.getPhoneNumber(), 
                request.getOtp(), 
                httpRequest
        );
        
        // Store session info in HTTP session
        // after successful login
        String ROLE = response.getPhoneNumber().equals("+917827143813")?"ADMIN":"USER";
        
        Authentication auth = new UsernamePasswordAuthenticationToken(response.getUserId(), null,List.of(new SimpleGrantedAuthority(ROLE)));
        SecurityContextHolder.getContext().setAuthentication(auth);
        httpSession.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, SecurityContextHolder.getContext());
        // you can still store custom attrs

        // httpSession.setAttribute("sessionId", response.getSessionId());
        // httpSession.setAttribute("userId", response.getUserId());
        // httpSession.setAttribute("role", response.getRole().name());
        // httpSession.setAttribute("phoneNumber", response.getPhoneNumber());
        
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    // Resend OTP
    @PostMapping("/resend-otp")
    public ResponseEntity<Map<String, String>> resendOtp(
            @Valid @RequestBody OtpRequestDTO request) {
        log.info("REST request to resend OTP to: {}", request.getPhoneNumber());
        
        authService.sendLoginOtp(request.getPhoneNumber());
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "OTP resent successfully");
        response.put("phoneNumber", request.getPhoneNumber());
        
        return ResponseEntity.ok(response);
    }
    
    // Get current session
    @GetMapping("/session")
    public ResponseEntity<SessionResponseDTO> getCurrentSession(HttpSession httpSession) {
        String sessionId = (String) httpSession.getAttribute("sessionId");
        
        if (sessionId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        log.info("REST request to get session: {}", sessionId);
        
        SessionResponseDTO session = sessionService.getSession(sessionId);
        return ResponseEntity.ok(session);
    }
    
    // Validate session
    @GetMapping("/validate")
    public ResponseEntity<Map<String, Boolean>> validateSession(HttpSession httpSession) {
        String sessionId = (String) httpSession.getAttribute("sessionId");
        
        Map<String, Boolean> response = new HashMap<>();
        
        if (sessionId == null) {
            response.put("valid", false);
            return ResponseEntity.ok(response);
        }
        
        log.info("REST request to validate session: {}", sessionId);
        
        boolean isValid = authService.validateSession(sessionId);
        response.put("valid", isValid);
        
        return ResponseEntity.ok(response);
    }
    
    // Logout
    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpSession httpSession) {
        String sessionId = (String) httpSession.getAttribute("sessionId");
        if (sessionId != null) {
            log.info("REST request to logout session: {}", sessionId);
            authService.logout(sessionId);
        }
        
        // Invalidate HTTP session
        httpSession.invalidate();
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Logged out successfully");
        
        return ResponseEntity.ok(response);
    }
    
    // Check authentication status
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getAuthStatus(HttpSession httpSession) {
        Map<String, Object> response = new HashMap<>();
        
        String sessionId = (String) httpSession.getAttribute("sessionId");
        
        if (sessionId == null) {
            response.put("authenticated", false);
            return ResponseEntity.ok(response);
        }
        
        boolean isValid = authService.validateSession(sessionId);
        
        response.put("authenticated", isValid);
        if (isValid) {
            response.put("userId", httpSession.getAttribute("userId"));
            response.put("role", httpSession.getAttribute("role"));
            response.put("phoneNumber", httpSession.getAttribute("phoneNumber"));
        }
        
        return ResponseEntity.ok(response);
    }
}