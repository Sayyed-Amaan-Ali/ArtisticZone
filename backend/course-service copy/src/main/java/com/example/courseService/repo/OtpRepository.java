package com.example.courseService.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.courseService.entity.Otp;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface OtpRepository extends JpaRepository<Otp, Long> {
    
    // Find latest valid OTP for phone number
    @Query("SELECT o FROM Otp o WHERE o.phoneNumber = :phoneNumber " +
           "AND o.isVerified = false AND o.isExpired = false " +
           "AND o.expiresAt > :currentTime " +
           "ORDER BY o.createdAt DESC")
    Optional<Otp> findLatestValidOtp(@Param("phoneNumber") String phoneNumber, 
                                     @Param("currentTime") LocalDateTime currentTime);
    
    // Expire all previous OTPs for a phone number
    @Transactional
    @Modifying
    @Query("UPDATE Otp o SET o.isExpired = true " +
           "WHERE o.phoneNumber = :phoneNumber AND o.isVerified = false")
    int expireAllPreviousOtps(@Param("phoneNumber") String phoneNumber);
    
    // Delete expired OTPs (cleanup job)
    @Transactional
    @Modifying
    @Query("DELETE FROM Otp o WHERE o.expiresAt < :currentTime")
    void deleteExpiredOtps(@Param("currentTime") LocalDateTime currentTime);

    
}