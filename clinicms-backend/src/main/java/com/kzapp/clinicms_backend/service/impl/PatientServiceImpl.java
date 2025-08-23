package com.kzapp.clinicms_backend.service.impl;
import java.util.List;

import org.springframework.stereotype.Service;

import com.kzapp.clinicms_backend.dto.PatientDto;
import com.kzapp.clinicms_backend.entity.Doctor;
import com.kzapp.clinicms_backend.entity.Patient;
import com.kzapp.clinicms_backend.exception.ResourceNotFoundException;
import com.kzapp.clinicms_backend.mapper.PatientMapper;
import com.kzapp.clinicms_backend.repository.DoctorRepository;
import com.kzapp.clinicms_backend.repository.PatientRepository;
import com.kzapp.clinicms_backend.service.PatientService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PatientServiceImpl implements PatientService{
    private PatientRepository patientRepository;

    private DoctorRepository doctorRepository;
    @Override
    public PatientDto createPatient(PatientDto patientDto) {
        Patient patient = PatientMapper.mapToPatient(patientDto);
        Doctor doctor = doctorRepository.findById(patientDto.getDoctorId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with id: " + patientDto.getDoctorId()));
        patient.setDoctor(doctor); // Set the doctor for the patient
        Patient savedPatient = patientRepository.save(patient);
        return PatientMapper.mapToPatientDto(savedPatient);
    }

    @Override
    public PatientDto getPatientById(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + id));
        return PatientMapper.mapToPatientDto(patient);
    }

    @Override
    public List<PatientDto> getAllPatients() {
        List<Patient> patients = patientRepository.findAll();
        return patients.stream()
                .map(PatientMapper::mapToPatientDto)
                .toList();
    }

    @Override
    public PatientDto updatePatient(Long id, PatientDto patientDto) {
        Patient existingPatient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + id));
        
        existingPatient.setFirstName(patientDto.getFirstName());
        existingPatient.setLastName(patientDto.getLastName());
        existingPatient.setPhoneNum(patientDto.getPhoneNum());
        existingPatient.setEmail(patientDto.getEmail());

        Doctor doctor = doctorRepository.findById(patientDto.getDoctorId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with id: " + patientDto.getDoctorId()));
        existingPatient.setDoctor(doctor); // Set the doctor for the patient
        
        Patient updatedPatient = patientRepository.save(existingPatient);

        return PatientMapper.mapToPatientDto(updatedPatient);
    }

    @Override
    public void deletePatient(Long id) {
        Patient existingPatient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + id));
        
        patientRepository.delete(existingPatient);
        // patientRepository.deleteById(id);
    }
}