package com.example.courseService.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.example.courseService.entity.Gender;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentResponseDTO {
    
    private Long id;
    private String name;
    private String email;
    private String phoneNumber;
    private String imageUrl;
    private LocalDate dateOfBirth;
    private Gender gender;
    private String address;
    private String city;
    private String state;
    private String country;
    private String postalCode;
    private String bio;
    private Boolean isActive;
    private Boolean isEmailVerified;
    private Boolean isPhoneVerified;
    private Integer totalCoursesEnrolled;
    private Integer totalCoursesCompleted;
    private LocalDate joinDate;
    private LocalDateTime lastLogin;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Getters and Setters
}