package com.kzapp.clinicms_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.kzapp.clinicms_backend.entity.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {

    
} 
