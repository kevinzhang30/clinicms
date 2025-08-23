package com.kzapp.clinicms_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PatientDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String phoneNum;
    private String email;
    private Long doctorId; // Assuming you want to include the doctor's ID as well
}
