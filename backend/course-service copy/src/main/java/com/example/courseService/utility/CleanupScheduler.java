package com.example.courseService.utility;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.example.courseService.repo.UserSessionRepository;

import com.example.courseService.repo.OtpRepository;

import java.time.LocalDateTime;

@Component
@EnableScheduling
@RequiredArgsConstructor
@Slf4j
public class CleanupScheduler {
    @Autowired
    private OtpRepository otpRepository;
    @Autowired
    private UserSessionRepository userSessionRepository;
    
    // Run every hour
    @Scheduled(cron = "0 0 * * * *")
    @Transactional
    public void cleanupExpiredOtps() {
        log.info("Starting cleanup of expired OTPs");
        otpRepository.deleteExpiredOtps(LocalDateTime.now());
        log.info("Completed cleanup of expired OTPs");
    }
    
    // Run every 6 hours
    @Scheduled(cron = "0 0 */6 * * *")
    @Transactional
    public void cleanupExpiredSessions() {
        log.info("Starting cleanup of expired sessions");
        userSessionRepository.deleteExpiredSessions(LocalDateTime.now());
        log.info("Completed cleanup of expired sessions");
    }
}