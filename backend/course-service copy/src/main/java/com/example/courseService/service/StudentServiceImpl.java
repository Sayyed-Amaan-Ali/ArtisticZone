package com.example.courseService.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.courseService.DTOs.StudentRegistrationDTO;
import com.example.courseService.DTOs.StudentResponseDTO;
import com.example.courseService.DTOs.StudentUpdateDTO;
import com.example.courseService.ExceptionHandling.DuplicateStudentException;
import com.example.courseService.ExceptionHandling.StudentNotFoundException;
import com.example.courseService.entity.Student;
import com.example.courseService.repo.StudentRepository;
import com.example.courseService.utility.StudentMapper;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class StudentServiceImpl implements StudentService {
    
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private StudentMapper studentMapper;
    
    @Override
    public StudentResponseDTO registerStudent(StudentRegistrationDTO registrationDTO) {
        log.info("Registering new student with email: {}", registrationDTO.getEmail());
        
        // Check if email already exists
        if (studentRepository.existsByEmail(registrationDTO.getEmail())) {
            throw new DuplicateStudentException("Student with email " + registrationDTO.getEmail() + " already exists");
        }
        
        // Check if phone number already exists
        if (studentRepository.existsByPhoneNumber(registrationDTO.getPhoneNumber())) {
            throw new DuplicateStudentException("Student with phone number " + registrationDTO.getPhoneNumber() + " already exists");
        }
        
        Student student = studentMapper.toEntity(registrationDTO);
        student.setJoinDate(LocalDate.now());
        student.setIsActive(true);
        student.setIsEmailVerified(false);
        student.setIsPhoneVerified(false);
        student.setTotalCoursesEnrolled(0);
        student.setTotalCoursesCompleted(0);
        Student savedStudent = studentRepository.save(student);
        log.info("Student registered successfully with ID: {}", savedStudent.getId());
        
        return studentMapper.toResponseDTO(savedStudent);
    }
    
    @Override
    @Transactional(readOnly = true)
    public StudentResponseDTO getStudentById(Long id) {
        log.info("Fetching student with ID: {}", id);
        
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Student not found with ID: " + id));
        
        return studentMapper.toResponseDTO(student);
    }
    
    @Override
    @Transactional(readOnly = true)
    public StudentResponseDTO getStudentByEmail(String email) {
        log.info("Fetching student with email: {}", email);
        
        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new StudentNotFoundException("Student not found with email: " + email));
        
        return studentMapper.toResponseDTO(student);
    }
    
    @Override
    @Transactional(readOnly = true)
    public StudentResponseDTO getStudentByPhoneNumber(String phoneNumber) {
        log.info("Fetching student with phone number: {}", phoneNumber);
        
        Student student = studentRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new StudentNotFoundException("Student not found with phone number: " + phoneNumber));
        
        return studentMapper.toResponseDTO(student);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<StudentResponseDTO> getAllStudents(Pageable pageable) {
        log.info("Fetching all students with pagination");
        
        Page<Student> students = studentRepository.findAll(pageable);
        return students.map(studentMapper::toResponseDTO);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<StudentResponseDTO> getActiveStudents(Pageable pageable) {
        log.info("Fetching active students with pagination");
        
        Page<Student> students = studentRepository.findByIsActiveTrue(pageable);
        return students.map(studentMapper::toResponseDTO);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<StudentResponseDTO> searchStudents(String searchTerm, Pageable pageable) {
        log.info("Searching students with term: {}", searchTerm);
        
        Page<Student> students = studentRepository.searchStudents(searchTerm, pageable);
        return students.map(studentMapper::toResponseDTO);
    }
    
    @Override
    public StudentResponseDTO updateStudent(Long id, StudentUpdateDTO updateDTO) {
        log.info("Updating student with ID: {}", id);
        
        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Student not found with ID: " + id));
        
        // Check email uniqueness if changed
        if (updateDTO.getEmail() != null && !updateDTO.getEmail().equals(existingStudent.getEmail())) {
            if (studentRepository.existsByEmail(updateDTO.getEmail())) {
                throw new DuplicateStudentException("Email " + updateDTO.getEmail() + " is already in use");
            }
        }
        
        // Check phone number uniqueness if changed
        if (updateDTO.getPhoneNumber() != null && !updateDTO.getPhoneNumber().equals(existingStudent.getPhoneNumber())) {
            if (studentRepository.existsByPhoneNumber(updateDTO.getPhoneNumber())) {
                throw new DuplicateStudentException("Phone number " + updateDTO.getPhoneNumber() + " is already in use");
            }
        }
        
        studentMapper.updateEntityFromDTO(updateDTO, existingStudent);
        
        Student updatedStudent = studentRepository.save(existingStudent);
        log.info("Student updated successfully with ID: {}", updatedStudent.getId());
        
        return studentMapper.toResponseDTO(updatedStudent);
    }
    
    @Override
    public void deleteStudent(Long id) {
        log.info("Deleting student with ID: {}", id);
        
        if (!studentRepository.existsById(id)) {
            throw new StudentNotFoundException("Student not found with ID: " + id);
        }
        
        studentRepository.deleteById(id);
        log.info("Student deleted successfully with ID: {}", id);
    }
    
    @Override
    public void deactivateStudent(Long id) {
        log.info("Deactivating student with ID: {}", id);
        
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Student not found with ID: " + id));
        
        student.setIsActive(false);
        studentRepository.save(student);
        log.info("Student deactivated successfully with ID: {}", id);
    }
    
    @Override
    public void activateStudent(Long id) {
        log.info("Activating student with ID: {}", id);
        
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Student not found with ID: " + id));
        
        student.setIsActive(true);
        studentRepository.save(student);
        log.info("Student activated successfully with ID: {}", id);
    }
    
    @Override
    public void incrementCoursesEnrolled(Long studentId) {
        log.info("Incrementing courses enrolled for student ID: {}", studentId);
        
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new StudentNotFoundException("Student not found with ID: " + studentId));
        
        student.setTotalCoursesEnrolled(student.getTotalCoursesEnrolled() + 1);
        studentRepository.save(student);
    }
    
    @Override
    public void decrementCoursesEnrolled(Long studentId) {
        log.info("Decrementing courses enrolled for student ID: {}", studentId);
        
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new StudentNotFoundException("Student not found with ID: " + studentId));
        
        if (student.getTotalCoursesEnrolled() > 0) {
            student.setTotalCoursesEnrolled(student.getTotalCoursesEnrolled() - 1);
            studentRepository.save(student);
        }
    }
    
    @Override
    public void incrementCoursesCompleted(Long studentId) {
        log.info("Incrementing courses completed for student ID: {}", studentId);
        
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new StudentNotFoundException("Student not found with ID: " + studentId));
        
        student.setTotalCoursesCompleted(student.getTotalCoursesCompleted() + 1);
        studentRepository.save(student);
    }
    
    @Override
    public void updateLastLogin(Long studentId) {
        log.info("Updating last login for student ID: {}", studentId);
        
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new StudentNotFoundException("Student not found with ID: " + studentId));
        
        student.setLastLogin(LocalDateTime.now());
        studentRepository.save(student);
    }
    
    @Override
    public void verifyEmail(Long studentId) {
        log.info("Verifying email for student ID: {}", studentId);
        
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new StudentNotFoundException("Student not found with ID: " + studentId));
        
        student.setIsEmailVerified(true);
        studentRepository.save(student);
        log.info("Email verified for student ID: {}", studentId);
    }
    
    @Override
    public void verifyPhone(Long studentId) {
        log.info("Verifying phone for student ID: {}", studentId);
        
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new StudentNotFoundException("Student not found with ID: " + studentId));
        
        student.setIsPhoneVerified(true);
        studentRepository.save(student);
        log.info("Phone verified for student ID: {}", studentId);
    }
    
    @Override
    @Transactional(readOnly = true)
    public boolean isEmailAvailable(String email) {
        return !studentRepository.existsByEmail(email);
    }
    
    @Override
    @Transactional(readOnly = true)
    public boolean isPhoneNumberAvailable(String phoneNumber) {
        return !studentRepository.existsByPhoneNumber(phoneNumber);
    }
}