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

import com.kzapp.clinicms_backend.dto.DoctorDto;
import com.kzapp.clinicms_backend.service.DoctorService;

import lombok.AllArgsConstructor;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/doctors")
@AllArgsConstructor
public class DoctorController {
    private DoctorService doctorService;
    // Build Add Doctor REST API
    @PostMapping
   public ResponseEntity<DoctorDto> createDoctor(@RequestBody DoctorDto doctorDto) {
        DoctorDto doctor = doctorService.createDoctor(doctorDto);
        return new ResponseEntity<>(doctor, HttpStatus.CREATED);
    }

    // Build Get Doctor REST API
    @GetMapping("{id}")
    public ResponseEntity<DoctorDto> getDoctorById(@PathVariable("id") Long id) {
        DoctorDto doctorDto = doctorService.getDoctorById(id);
        return ResponseEntity.ok(doctorDto);
    }
    
    // Build Get All Doctors REST API
    @GetMapping
    public ResponseEntity<List<DoctorDto>> getAllDoctors() {
        List<DoctorDto> doctors = doctorService.getAllDoctorsDto();
        return ResponseEntity.ok(doctors);
    }

    // Build Update Doctor REST API
    @PutMapping("{id}")
    public ResponseEntity<DoctorDto> updateDoctor(@PathVariable("id") Long id, @RequestBody DoctorDto doctorDto) {
        DoctorDto updatedDoctor = doctorService.updateDoctor(id, doctorDto);
        return ResponseEntity.ok(updatedDoctor);
    }

    // Build delete Doctor REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteDoctor(@PathVariable("id") Long id) {
        doctorService.deleteDoctor(id);
        return ResponseEntity.ok("Doctor deleted successfully!");
    }
}
