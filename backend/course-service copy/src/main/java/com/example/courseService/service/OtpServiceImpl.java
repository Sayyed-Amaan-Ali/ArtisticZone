package com.example.courseService.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.courseService.ExceptionHandling.InvalidOtpException;
import com.example.courseService.ExceptionHandling.OtpExpiredException;
import com.example.courseService.entity.Otp;
import com.example.courseService.repo.OtpRepository;
import com.example.courseService.utility.OtpGenerator;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class OtpServiceImpl implements OtpService {
    
    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private OtpGenerator otpGenerator;
    
    private static final int OTP_EXPIRY_MINUTES = 5;
    
    @Override
    public String sendOtp(String phoneNumber) {
        log.info("Sending OTP to phone number: {}", phoneNumber);
        
        // Expire all previous OTPs for this phone number
        int rows = otpRepository.expireAllPreviousOtps(phoneNumber);
        log.info("Rows affected by query: {}", rows);
        // Generate new OTP
        String otpCode = otpGenerator.generateOtp();
        
        // Create and save OTP entity
        Otp otp = new Otp();
        otp.setPhoneNumber(phoneNumber);
        otp.setOtpCode(otpCode);
        otp.setIsVerified(false);
        otp.setIsExpired(false);
        otp.setAttempts(0);
        otp.setMaxAttempts(3);
        otp.setExpiresAt(LocalDateTime.now().plusMinutes(OTP_EXPIRY_MINUTES));
        
        otpRepository.save(otp);
        
        // Send OTP via SMS (integrate with Twilio or other SMS gateway)
        sendSms(phoneNumber, otpCode);
        
        log.info("OTP sent successfully to phone number: {}", phoneNumber);
        return otpCode;
    }
    
    @Override
    @Transactional(readOnly = true)
    public boolean verifyOtp(String phoneNumber, String otp) {
        log.info("Verifying OTP for phone number: {}", phoneNumber);
        
        // Find latest valid OTP
        Otp otpEntity = otpRepository.findLatestValidOtp(phoneNumber, LocalDateTime.now())
                .orElseThrow(() -> new OtpExpiredException("OTP expired or not found"));
        
        // Check if max attempts exceeded
        if (otpEntity.getAttempts() >= otpEntity.getMaxAttempts()) {
            otpEntity.setIsExpired(true);
            otpRepository.save(otpEntity);
            throw new InvalidOtpException("Maximum OTP verification attempts exceeded");
        }
        
        // Increment attempts
        otpEntity.setAttempts(otpEntity.getAttempts() + 1);
        otpRepository.save(otpEntity);
        
        // Verify OTP
        if (!otpEntity.getOtpCode().equals(otp)) {
            log.warn("Invalid OTP provided for phone number: {}", phoneNumber);
            throw new InvalidOtpException("Invalid OTP");
        }
        
        // Mark OTP as verified
        otpEntity.setIsVerified(true);
        otpRepository.save(otpEntity);
        
        log.info("OTP verified successfully for phone number: {}", phoneNumber);
        return true;
    }
    
    @Override
    public void resendOtp(String phoneNumber) {
        log.info("Resending OTP to phone number: {}", phoneNumber);
        sendOtp(phoneNumber);
    }
    
    private void sendSms(String phoneNumber, String otpCode) {
        // TODO: Integrate with SMS gateway (Twilio, AWS SNS, etc.)
        // For development, just log the OTP
        log.info("=== OTP for {} is: {} ===", phoneNumber, otpCode);
        
        /*
        // Example Twilio integration:
        Twilio.init(accountSid, authToken);
        Message message = Message.creator(
                new PhoneNumber(phoneNumber),
                new PhoneNumber(twilioPhoneNumber),
                "Your OTP is: " + otpCode + ". Valid for 5 minutes."
        ).create();
        */
    }
}