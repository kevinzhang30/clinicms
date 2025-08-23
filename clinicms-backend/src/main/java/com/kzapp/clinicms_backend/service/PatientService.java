package com.kzapp.clinicms_backend.service;

import java.util.List;

import com.kzapp.clinicms_backend.dto.PatientDto;

public interface PatientService {
    PatientDto createPatient(PatientDto patientDto);

    PatientDto getPatientById(Long id);

    List<PatientDto> getAllPatients();

    PatientDto updatePatient(Long id, PatientDto patientDto);

    void deletePatient(Long id);
}
    
