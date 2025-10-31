package com.example.courseService.utility;

import org.springframework.stereotype.Component;

import com.example.courseService.DTOs.CourseRequestDTO;
import com.example.courseService.DTOs.CourseResponseDTO;
import com.example.courseService.DTOs.CourseUpdateDTO;
import com.example.courseService.entity.Course;

@Component
public class CourseMapper {
    
    public Course toEntity(CourseRequestDTO dto) {
        if (dto == null) {
            return null;
        }
        
        Course course = new Course();
        course.setTitle(dto.getTitle());
        course.setDescription(dto.getDescription());
        course.setShortDescription(dto.getShortDescription());
        course.setCategory(dto.getCategory());
        course.setPrice(dto.getPrice());
        course.setDurationHours(dto.getDurationHours());
        course.setLevel(dto.getLevel());
        course.setImageUrl(dto.getImageUrl());
        course.setIsActive(dto.getIsActive() != null ? dto.getIsActive() : false);
        course.setStartDate(dto.getStartDate());
        return course;
    }
    
    public CourseResponseDTO toResponseDTO(Course course) {
        if (course == null) {
            return null;
        }
        
        CourseResponseDTO dto = new CourseResponseDTO();
        dto.setId(course.getId());
        dto.setTitle(course.getTitle());
        dto.setDescription(course.getDescription());
        dto.setShortDescription(course.getShortDescription());
        dto.setCategory(course.getCategory());
        dto.setPrice(course.getPrice());
        dto.setDurationHours(course.getDurationHours());
        dto.setLevel(course.getLevel());
        dto.setImageUrl(course.getImageUrl());
        dto.setIsActive(course.getIsActive());
        dto.setEnrolledCount(course.getEnrolledCount());
        dto.setRating(course.getRating());
        dto.setTotalReviews(course.getTotalReviews());
        dto.setCreatedAt(course.getCreatedAt());
        dto.setUpdatedAt(course.getUpdatedAt());
        dto.setStartDate(course.getStartDate());
        return dto;
    }
    
    public void updateEntityFromDTO(CourseUpdateDTO dto, Course course) {
        if (dto == null || course == null) {
            return;
        }
        
        if (dto.getTitle() != null) {
            course.setTitle(dto.getTitle());
        }
        if (dto.getDescription() != null) {
            course.setDescription(dto.getDescription());
        }
        if (dto.getShortDescription() != null) {
            course.setShortDescription(dto.getShortDescription());
        }
        if (dto.getCategory() != null) {
            course.setCategory(dto.getCategory());
        }
        if (dto.getPrice() != null) {
            course.setPrice(dto.getPrice());
        }
        if (dto.getDurationHours() != null) {
        	course.setDurationHours(dto.getDurationHours());
        }
        if (dto.getLevel() != null) {
        course.setLevel(dto.getLevel());
        }
        if (dto.getImageUrl() != null) {
        course.setImageUrl(dto.getImageUrl());
        }
        if (dto.getIsActive() != null) {
        course.setIsActive(dto.getIsActive());
        }
        if (dto.getStartDate() != null) {
        course.setStartDate(dto.getStartDate());
        }
    }
}