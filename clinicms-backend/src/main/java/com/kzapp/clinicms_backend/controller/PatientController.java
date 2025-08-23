package com.kzapp.clinicms_backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kzapp.clinicms_backend.dto.PatientDto;
import com.kzapp.clinicms_backend.service.PatientService;

import lombok.AllArgsConstructor;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/patients")
public class PatientController {
    private PatientService patientService;

    // Build Add Patient REST API
    @PostMapping
    public ResponseEntity<PatientDto> createPatient(@RequestBody PatientDto patientDto) {
        PatientDto savedPatient = patientService.createPatient(patientDto);
        return new ResponseEntity<>(savedPatient, HttpStatus.CREATED);
    }

    // Build Get Patient REST API
    @GetMapping("{id}")
    public ResponseEntity<PatientDto> getPatientById(@PathVariable("id") Long id) {
        PatientDto patientDto = patientService.getPatientById(id);
        // return new ResponseEntity<>(patientDto, HttpStatus.OK);
        return ResponseEntity.ok(patientDto);
    }

    // Build Get All Patients REST API
    @GetMapping
    public ResponseEntity<List<PatientDto>> getAllPatients() {
        List<PatientDto> patients = patientService.getAllPatients();
        return ResponseEntity.ok(patients);
    }

    // Build Update Patient REST API
    @PutMapping("{id}")
    public ResponseEntity<PatientDto> updatePatient(@PathVariable("id") Long id, @RequestBody PatientDto patientDto) {
        PatientDto updatedPatient = patientService.updatePatient(id, patientDto);
        return ResponseEntity.ok(updatedPatient);
    }

    // Build Delete Patient REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deletePatient(@PathVariable("id") Long id) {
        patientService.deletePatient(id);
        return ResponseEntity.ok("Patient deleted successfully");
    }
}
