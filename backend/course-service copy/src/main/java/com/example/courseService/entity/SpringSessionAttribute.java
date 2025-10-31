package com.example.courseService.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * Entity class for SPRING_SESSION_ATTRIBUTES table
 * Represents session attributes (key-value pairs)
 */
@Entity
@Table(name = "SPRING_SESSION_ATTRIBUTES", indexes = {
    @Index(name = "SPRING_SESSION_ATTRIBUTES_IX1", columnList = "SESSION_PRIMARY_ID")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(SpringSessionAttribute.SpringSessionAttributeId.class)
public class SpringSessionAttribute {

    @Id
    @Column(name = "SESSION_PRIMARY_ID", length = 36, nullable = false)
    private String sessionPrimaryId;

    @Id
    @Column(name = "ATTRIBUTE_NAME", length = 200, nullable = false)
    private String attributeName;

    @Lob
    @Column(name = "ATTRIBUTE_BYTES", nullable = false, columnDefinition = "BLOB")
    private byte[] attributeBytes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SESSION_PRIMARY_ID", referencedColumnName = "PRIMARY_ID", 
                insertable = false, updatable = false)
    private SpringSession session;

    /**
     * Composite key class for SpringSessionAttribute
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SpringSessionAttributeId implements Serializable {
        private String sessionPrimaryId;
        private String attributeName;
    }
}
