package com.example.courseService.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.courseService.DTOs.StudentRegistrationDTO;
import com.example.courseService.DTOs.StudentResponseDTO;
import com.example.courseService.DTOs.StudentUpdateDTO;
import com.example.courseService.service.StudentService;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*") // Configure properly in production
public class StudentController {
    @Autowired
    private StudentService studentService;
    

    // REGISTER - Public (Registration)
    @PostMapping
    public ResponseEntity<StudentResponseDTO> registerStudent(
            @Valid @RequestBody StudentRegistrationDTO registrationDTO) {
        log.info("REST request to register student with email: {}", registrationDTO.getEmail());
        
        StudentResponseDTO registeredStudent = studentService.registerStudent(registrationDTO);
        return new ResponseEntity<>(registeredStudent, HttpStatus.CREATED);
    }
    
    // GET ALL - Admin only
    @GetMapping
    public ResponseEntity<?> getAllStudents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "ASC") String sortDirection,
            @RequestParam(required = false) Boolean activeOnly,
            Authentication authentication) {

        log.info("REST request to get all students - page: {}, size: {}", page, size);

        try {
            String principal = authentication.getPrincipal().toString();
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ADMIN"));

            if (isAdmin) {
                // Admin → Can view all students
                Sort sort = sortDirection.equalsIgnoreCase("DESC")
                        ? Sort.by(sortBy).descending()
                        : Sort.by(sortBy).ascending();
                Pageable pageable = PageRequest.of(page, size, sort);

                Page<StudentResponseDTO> students = Boolean.TRUE.equals(activeOnly)
                        ? studentService.getActiveStudents(pageable)
                        : studentService.getAllStudents(pageable);

                return ResponseEntity.ok(students);
            } else {
                // Non-admin → Can only view their own record
                StudentResponseDTO student = studentService.getStudentById(Long.parseLong(principal));
                return ResponseEntity.ok(student);
            }
        } catch (Exception e) {
            log.error("Error fetching students: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // GET BY ID - Student (own) / Admin
    @GetMapping("/{studentId}")
    public ResponseEntity<StudentResponseDTO> getStudentById(@PathVariable Long studentId, Authentication authentication) {
        log.info("REST request to get student by ID: {}", studentId);
        try{
            String principal = (String) authentication.getPrincipal().toString(); 
            StudentResponseDTO student = studentService.getStudentById(studentId);
    
            if (!principal.equals(student.getId().toString()) 
                && !authentication.getAuthorities().stream()
                        .anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
    
            return ResponseEntity.ok(student);
        } catch (Exception e) {
            log.error("Error fetching student: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
 // SEARCH - Admin only
    @GetMapping("/search")
    public ResponseEntity<Page<StudentResponseDTO>> searchStudents(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {

        log.info("REST request to search students with query: {}", query);
        try {
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ADMIN"));
            if (!isAdmin) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            Pageable pageable = PageRequest.of(page, size);
            Page<StudentResponseDTO> students = studentService.searchStudents(query, pageable);
            return ResponseEntity.ok(students);

        } catch (Exception e) {
            log.error("Error searching students: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // GET BY EMAIL - Internal use / Admin
    @GetMapping("/email/{email}")
    public ResponseEntity<StudentResponseDTO> getStudentByEmail(
            @PathVariable String email,
            Authentication authentication) {

        log.info("REST request to get student by email: {}", email);
        try {
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ADMIN"));
            if (!isAdmin) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            StudentResponseDTO student = studentService.getStudentByEmail(email);
            return ResponseEntity.ok(student);

        } catch (Exception e) {
            log.error("Error fetching student by email: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // GET BY PHONE - Internal use / Admin
    @GetMapping("/phone/{phoneNumber}")
    public ResponseEntity<StudentResponseDTO> getStudentByPhoneNumber(
            @PathVariable String phoneNumber,
            Authentication authentication) {

        log.info("REST request to get student by phone number: {}", phoneNumber);
        try {
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ADMIN"));
            if (!isAdmin) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            StudentResponseDTO student = studentService.getStudentByPhoneNumber(phoneNumber);
            return ResponseEntity.ok(student);

        } catch (Exception e) {
            log.error("Error fetching student by phone number: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // UPDATE - Student (own) / Admin
    @PutMapping("/{studentId}")
    public ResponseEntity<StudentResponseDTO> updateStudent(
            @PathVariable Long studentId,
            @Valid @RequestBody StudentUpdateDTO updateDTO,
            Authentication authentication) {

        log.info("REST request to update student with ID: {}", studentId);
        try {
            String principal = authentication.getPrincipal().toString();
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ADMIN"));

            if (!isAdmin && !principal.equals(studentId.toString())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            StudentResponseDTO updatedStudent = studentService.updateStudent(studentId, updateDTO);
            return ResponseEntity.ok(updatedStudent);

        } catch (Exception e) {
            log.error("Error updating student: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // PATCH - Student (own) / Admin
    @PatchMapping("/{studentId}")
    public ResponseEntity<StudentResponseDTO> partialUpdateStudent(
            @PathVariable Long studentId,
            @RequestBody StudentUpdateDTO updateDTO,
            Authentication authentication) {

        log.info("REST request to partially update student with ID: {}", studentId);
        try {
            String principal = authentication.getPrincipal().toString();
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ADMIN"));

            if (!isAdmin && !principal.equals(studentId.toString())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            StudentResponseDTO updatedStudent = studentService.updateStudent(studentId, updateDTO);
            return ResponseEntity.ok(updatedStudent);

        } catch (Exception e) {
            log.error("Error partially updating student: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // DELETE - Admin only
    @DeleteMapping("/{studentId}")
    public ResponseEntity<Void> deleteStudent(
            @PathVariable Long studentId,
            Authentication authentication) {

        log.info("REST request to delete student with ID: {}", studentId);
        try {
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ADMIN"));
            if (!isAdmin) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            studentService.deleteStudent(studentId);
            return ResponseEntity.noContent().build();

        } catch (Exception e) {
            log.error("Error deleting student: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // DEACTIVATE - Admin only
    @PutMapping("/{studentId}/deactivate")
    public ResponseEntity<Void> deactivateStudent(
            @PathVariable Long studentId,
            Authentication authentication) {

        log.info("REST request to deactivate student with ID: {}", studentId);
        try {
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ADMIN"));
            if (!isAdmin) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            studentService.deactivateStudent(studentId);
            return ResponseEntity.ok().build();

        } catch (Exception e) {
            log.error("Error deactivating student: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // ACTIVATE - Admin only
    @PutMapping("/{studentId}/activate")
    public ResponseEntity<Void> activateStudent(
            @PathVariable Long studentId,
            Authentication authentication) {

        log.info("REST request to activate student with ID: {}", studentId);
        try {
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ADMIN"));
            if (!isAdmin) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            studentService.activateStudent(studentId);
            return ResponseEntity.ok().build();

        } catch (Exception e) {
            log.error("Error activating student: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    // Internal endpoints for inter-service communication

    @PutMapping("/{studentId}/increment-enrollment")
    public ResponseEntity<Void> incrementEnrollment(@PathVariable Long studentId) {
        log.info("REST request to increment enrollment count for student ID: {}", studentId);
        
        studentService.incrementCoursesEnrolled(studentId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{studentId}/decrement-enrollment")
    public ResponseEntity<Void> decrementEnrollment(@PathVariable Long studentId) {
        log.info("REST request to decrement enrollment count for student ID: {}", studentId);
        
        studentService.decrementCoursesEnrolled(studentId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{studentId}/increment-completion")
    public ResponseEntity<Void> incrementCompletion(@PathVariable Long studentId) {
        log.info("REST request to increment completion count for student ID: {}", studentId);
        
        studentService.incrementCoursesCompleted(studentId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{studentId}/update-last-login")
    public ResponseEntity<Void> updateLastLogin(@PathVariable Long studentId) {
        log.info("REST request to update last login for student ID: {}", studentId);
        
        studentService.updateLastLogin(studentId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{studentId}/verify-email")
    public ResponseEntity<Void> verifyEmail(@PathVariable Long studentId) {
        log.info("REST request to verify email for student ID: {}", studentId);
        
        studentService.verifyEmail(studentId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{studentId}/verify-phone")
    public ResponseEntity<Void> verifyPhone(@PathVariable Long studentId) {
        log.info("REST request to verify phone for student ID: {}", studentId);
        
        studentService.verifyPhone(studentId);
        return ResponseEntity.ok().build();
    }

    // Check availability endpoints
    @GetMapping("/check-email")
    public ResponseEntity<Boolean> checkEmailAvailability(@RequestParam String email) {
        log.info("REST request to check email availability: {}", email);
        
        boolean available = studentService.isEmailAvailable(email);
        return ResponseEntity.ok(available);
    }

    @GetMapping("/check-phone")
    public ResponseEntity<Boolean> checkPhoneAvailability(@RequestParam String phoneNumber) {
        log.info("REST request to check phone number availability: {}", phoneNumber);
        
        boolean available = studentService.isPhoneNumberAvailable(phoneNumber);
        return ResponseEntity.ok(available);
    }
}