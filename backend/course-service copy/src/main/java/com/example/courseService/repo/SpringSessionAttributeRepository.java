package com.example.courseService.repo;

import com.example.courseService.entity.SpringSessionAttribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for SpringSessionAttribute entity
 */
@Repository
public interface SpringSessionAttributeRepository extends JpaRepository<SpringSessionAttribute, SpringSessionAttribute.SpringSessionAttributeId> {

    /**
     * Find all attributes for a session
     */
    List<SpringSessionAttribute> findBySessionPrimaryId(String sessionPrimaryId);

    /**
     * Find specific attribute for a session
     */
    Optional<SpringSessionAttribute> findBySessionPrimaryIdAndAttributeName(
        String sessionPrimaryId, 
        String attributeName
    );

    /**
     * Delete all attributes for a session
     */
    void deleteBySessionPrimaryId(String sessionPrimaryId);
}
