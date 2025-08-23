package com.kzapp.clinicms_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String specialty;
}
