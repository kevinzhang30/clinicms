package com.kzapp.clinicms_backend.mapper;

import com.kzapp.clinicms_backend.dto.PatientDto;
import com.kzapp.clinicms_backend.entity.Patient;

public class PatientMapper {
    public static PatientDto mapToPatientDto(Patient patient) {
        return new PatientDto(
            patient.getId(),
            patient.getFirstName(),
            patient.getLastName(),
            patient.getPhoneNum(),
            patient.getEmail(),
            patient.getDoctor().getId()
        );
    }

    public static Patient mapToPatient(PatientDto patientDto) {
        Patient patient = new Patient();
        patient.setId(patientDto.getId());
        patient.setFirstName(patientDto.getFirstName());
        patient.setLastName(patientDto.getLastName());
        patient.setPhoneNum(patientDto.getPhoneNum());
        patient.setEmail(patientDto.getEmail());
        return patient;
    }
}
