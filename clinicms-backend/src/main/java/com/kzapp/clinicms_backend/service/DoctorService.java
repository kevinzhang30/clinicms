package com.kzapp.clinicms_backend.service;

import java.util.List;

import com.kzapp.clinicms_backend.dto.DoctorDto;


public interface DoctorService {
    DoctorDto createDoctor(DoctorDto doctorDto);
    DoctorDto getDoctorById(Long id);
    List<DoctorDto> getAllDoctorsDto();
    DoctorDto updateDoctor(Long id, DoctorDto doctorDto);
    void deleteDoctor(Long id);
    
}
