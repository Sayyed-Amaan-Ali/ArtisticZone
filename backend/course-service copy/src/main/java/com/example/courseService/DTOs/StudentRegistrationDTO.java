package com.example.courseService.DTOs;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import com.example.courseService.entity.Gender;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentRegistrationDTO {
    
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;
    

    @Email(message = "Invalid email format")
    @Size(max = 150, message = "Email cannot exceed 150 characters")
    private String email;
    
    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[+]?[0-9]{10,15}$", message = "Invalid phone number format")
    private String phoneNumber;
    
    private String imageUrl;
    
    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;
    
    private Gender gender;
    
    @Size(max = 500, message = "Address cannot exceed 500 characters")
    private String address;
    
    @Size(max = 100, message = "City cannot exceed 100 characters")
    private String city;
    
    @Size(max = 100, message = "State cannot exceed 100 characters")
    private String state;
    
    @Size(max = 100, message = "Country cannot exceed 100 characters")
    private String country;
    
    @Size(max = 20, message = "Postal code cannot exceed 20 characters")
    private String postalCode;
    
    @Size(max = 1000, message = "Bio cannot exceed 1000 characters")
    private String bio;
    
    // Getters and Setters
}