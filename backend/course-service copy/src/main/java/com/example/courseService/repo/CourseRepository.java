package com.example.courseService.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.courseService.entity.Course;
import com.example.courseService.utility.CourseLevel;


@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
	
	 	Page<Course> findByIsActiveTrue(Pageable pageable);
	    
	    // Find courses by category
	    Page<Course> findByCategoryAndIsActiveTrue(String category, Pageable pageable);
	     
	    // Find courses by level
	    Page<Course> findByLevelAndIsActiveTrue(CourseLevel level, Pageable pageable);
	    
	    // Search courses by title or description
	    @Query("SELECT c FROM Course c WHERE c.isActive = true AND " +
	           "(LOWER(c.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
	           "LOWER(c.description) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
	    Page<Course> searchCourses(@Param("searchTerm") String searchTerm, Pageable pageable);
	    
	    // Find top rated courses
	    Page<Course> findByIsActiveTrueOrderByRatingDesc(Pageable pageable);
	    
	    // Check if course exists and is published
	    boolean existsByIdAndIsActiveTrue(Long id);
}
