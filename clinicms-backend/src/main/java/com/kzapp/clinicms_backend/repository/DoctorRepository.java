package com.kzapp.clinicms_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kzapp.clinicms_backend.entity.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    
    
}
