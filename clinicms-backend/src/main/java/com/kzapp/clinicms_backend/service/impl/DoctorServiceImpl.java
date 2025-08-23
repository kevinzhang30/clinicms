package com.kzapp.clinicms_backend.service.impl;

import java.util.List;

import com.kzapp.clinicms_backend.dto.DoctorDto;
import com.kzapp.clinicms_backend.entity.Doctor;
import com.kzapp.clinicms_backend.mapper.DoctorMapper;
import com.kzapp.clinicms_backend.repository.DoctorRepository;
import com.kzapp.clinicms_backend.service.DoctorService;


public class DoctorServiceImpl implements DoctorService {

    private DoctorRepository doctorRepository;


    @Override
    public DoctorDto createDoctor(DoctorDto doctorDto) {
       Doctor doctor = DoctorMapper.mapToDoctor(doctorDto);
       Doctor savedDoctor = doctorRepository.save(doctor);
       return DoctorMapper.mapToDoctorDto(savedDoctor);
    }


    @Override
    public DoctorDto getDoctorById(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));
        return DoctorMapper.mapToDoctorDto(doctor);
    }


    @Override
    public List<DoctorDto> getAllDoctorsDto() {
        return doctorRepository.findAll().stream()
                .map(DoctorMapper::mapToDoctorDto)
                .toList();
        // List<Doctor> doctors = doctorRepository.findAll();
        // return doctors.stream()
        //         .map(DoctorMapper::mapToDoctorDto)
        //         .toList();
    }


    @Override
    public DoctorDto updateDoctor(Long id, DoctorDto doctorDto) {
        Doctor existingDoctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));
        
        existingDoctor.setFirstName(doctorDto.getFirstName());
        existingDoctor.setLastName(doctorDto.getLastName());
        existingDoctor.setSpecialty(doctorDto.getSpecialty());
        
        Doctor updatedDoctor = doctorRepository.save(existingDoctor);
        return DoctorMapper.mapToDoctorDto(updatedDoctor);
    }


    @Override
    public void deleteDoctor(Long id) {
        Doctor existingDoctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));
        
        doctorRepository.delete(existingDoctor);
        // Alternatively, you can use: 
        // doctorRepository.deleteById(id);
        
    }

}
