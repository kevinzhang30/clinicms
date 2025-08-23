package com.kzapp.clinicms_backend.mapper;

import com.kzapp.clinicms_backend.dto.DoctorDto;
import com.kzapp.clinicms_backend.entity.Doctor;

public class DoctorMapper {
    // convert doctor entity to DTO
    public static DoctorDto mapToDoctorDto(Doctor doctor) {
        return new DoctorDto(
            doctor.getId(),
            doctor.getFirstName(),
            doctor.getLastName(),
            doctor.getSpecialty()
        );
    }

    // convert doctor DTO to entity
    public static Doctor mapToDoctor(DoctorDto doctorDto) {
        Doctor doctor = new Doctor();
        doctor.setId(doctorDto.getId());
        doctor.setFirstName(doctorDto.getFirstName());
        doctor.setLastName(doctorDto.getLastName());
        doctor.setSpecialty(doctorDto.getSpecialty());
        return doctor;
    }
}
