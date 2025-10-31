package com.example.courseService.utility;

import org.springframework.stereotype.Component;

import com.example.courseService.DTOs.StudentRegistrationDTO;
import com.example.courseService.DTOs.StudentResponseDTO;
import com.example.courseService.DTOs.StudentUpdateDTO;
import com.example.courseService.entity.Student;

@Component
public class StudentMapper {
    public Student toEntity(StudentRegistrationDTO dto) {
    if (dto == null) {
        return null;
    }    Student student = new Student();
    student.setName(dto.getName());
    student.setEmail(dto.getEmail());
    student.setPhoneNumber(dto.getPhoneNumber());
    student.setImageUrl(dto.getImageUrl());
    student.setDateOfBirth(dto.getDateOfBirth());
    student.setGender(dto.getGender());
    student.setAddress(dto.getAddress());
    student.setCity(dto.getCity());
    student.setState(dto.getState());
    student.setCountry(dto.getCountry());
    student.setPostalCode(dto.getPostalCode());
    student.setBio(dto.getBio());    return student;
}public StudentResponseDTO toResponseDTO(Student student) {
    if (student == null) {
        return null;
    }    StudentResponseDTO dto = new StudentResponseDTO();
    dto.setId(student.getId());
    dto.setName(student.getName());
    dto.setEmail(student.getEmail());
    dto.setPhoneNumber(student.getPhoneNumber());
    dto.setImageUrl(student.getImageUrl());
    dto.setDateOfBirth(student.getDateOfBirth());
    dto.setGender(student.getGender());
    dto.setAddress(student.getAddress());
    dto.setCity(student.getCity());
    dto.setState(student.getState());
    dto.setCountry(student.getCountry());
    dto.setPostalCode(student.getPostalCode());
    dto.setBio(student.getBio());
    dto.setIsActive(student.getIsActive());
    dto.setIsEmailVerified(student.getIsEmailVerified());
    dto.setIsPhoneVerified(student.getIsPhoneVerified());
    dto.setTotalCoursesEnrolled(student.getTotalCoursesEnrolled());
    dto.setTotalCoursesCompleted(student.getTotalCoursesCompleted());
    dto.setJoinDate(student.getJoinDate());
    dto.setLastLogin(student.getLastLogin());
    dto.setCreatedAt(student.getCreatedAt());
    dto.setUpdatedAt(student.getUpdatedAt());    return dto;
}public void updateEntityFromDTO(StudentUpdateDTO dto, Student student) {
    if (dto == null || student == null) {
        return;
    }    if (dto.getName() != null) {
        student.setName(dto.getName());
    }
    if (dto.getEmail() != null) {
        student.setEmail(dto.getEmail());
    }
    if (dto.getPhoneNumber() != null) {
        student.setPhoneNumber(dto.getPhoneNumber());
    }
    if (dto.getImageUrl() != null) {
        student.setImageUrl(dto.getImageUrl());
    }
    if (dto.getDateOfBirth() != null) {
        student.setDateOfBirth(dto.getDateOfBirth());
    }
    if (dto.getGender() != null) {
        student.setGender(dto.getGender());
    }
    if (dto.getAddress() != null) {
        student.setAddress(dto.getAddress());
    }
    if (dto.getCity() != null) {
        student.setCity(dto.getCity());
    }
    if (dto.getState() != null) {
        student.setState(dto.getState());
    }
    if (dto.getCountry() != null) {
        student.setCountry(dto.getCountry());
    }
    if (dto.getPostalCode() != null) {
        student.setPostalCode(dto.getPostalCode());
    }
    if (dto.getBio() != null) {
        student.setBio(dto.getBio());
    }
}
}
