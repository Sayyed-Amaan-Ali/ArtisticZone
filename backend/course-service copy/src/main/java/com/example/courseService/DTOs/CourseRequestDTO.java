package com.example.courseService.DTOs;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.example.courseService.utility.CourseLevel;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseRequestDTO {
    
    @NotBlank(message = "Course title is required")
    @Size(min = 5, max = 200, message = "Title must be between 5 and 200 characters")
    private String title;
    
    @NotBlank(message = "Description is required")
    private String description;
    
    @Size(max = 500, message = "Short description cannot exceed 500 characters")
    private String shortDescription;
    
    @NotBlank(message = "Category is required")
    private String category;
    
    @DecimalMin(value = "0.0", inclusive = true, message = "Price must be positive")
    private BigDecimal price;
    
    @Min(value = 1, message = "Duration must be at least 1 hour")
    private Integer durationHours;
    
    @NotNull(message = "Course level is required")
    private CourseLevel level;
    
    @NotNull(message = "Start Date is required")
    @FutureOrPresent(message = "Start Date must be today or later")
    private LocalDate startDate;
    
    private String imageUrl;
    
    private Boolean isActive;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getShortDescription() {
		return shortDescription;
	}

	public void setShortDescription(String shortDescription) {
		this.shortDescription = shortDescription;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public Integer getDurationHours() {
		return durationHours;
	}

	public void setDurationHours(Integer durationHours) {
		this.durationHours = durationHours;
	}

	public CourseLevel getLevel() {
		return level;
	}

	public void setLevel(CourseLevel level) {
		this.level = level;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}
    
    // Getters and Setters
    
}