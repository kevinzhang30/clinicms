import React, { useState, useEffect } from 'react';
import { createDoctor, getDoctor, updateDoctor } from '../services/DoctorService';
import { useNavigate, useParams } from 'react-router-dom';

const DoctorComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        specialty: ''
    });
    const navigator = useNavigate();
    const{id} = useParams();

    const specialties = [
        "Diagnostic Medicine", // House
        "Nephrology",          // House
        "Oncology",            // House
        "Endocrinology",       // House
        "Cardiology",
        "Neurology",
        "Pediatrics",
        "Orthopedics",
        "Dermatology",
        "Psychiatry",
        "Gastroenterology",
        "Radiology"
    ];

    const handleFirstName = (e) => setFirstName(e.target.value);
    const handleLastName = (e) => setLastName(e.target.value);
    const handleSpecialty = (e) => setSpecialty(e.target.value);

    useEffect(() => {
            if (id) {
                getDoctor(id).then((response) => {
                    const doctor = response.data;
                    setFirstName(doctor.firstName);
                    setLastName(doctor.lastName);
                    setSpecialty(doctor.specialty);
                }
                ).catch((error) => {
                    console.error("Error fetching patient data:", error);
                    // Optionally, you can redirect or show an error message
                    navigator('/patients');
                }
                );
            }
        }, [id]);


    const validateForm = () => {
        let valid = true;
        const errs = { firstName: '', lastName: '', specialty: '' };

        if (!firstName.trim()) {
            errs.firstName = 'First name is required';
            valid = false;
        }
        if (!lastName.trim()) {
            errs.lastName = 'Last name is required';
            valid = false;
        }
        if (!specialty.trim()) {
            errs.specialty = 'Specialty is required';
            valid = false;
        }

        setErrors(errs);
        return valid;
    };

    const saveOrUpdateDoctor = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const doctor = { firstName, lastName, specialty };
            console.log("Doctor to save:", doctor);
            if (id) {
                updateDoctor(id, doctor).then((response) => {
                    console.log("Doctor updated successfully:", response.data);
                    navigator('/doctors');
                }).catch((error) => {
                    console.error("Error updating doctor:", error);
                });
            } else {
            createDoctor(doctor).then((response) => {
                console.log("Doctor saved successfully:", response.data);
                navigator('/doctors');
            }).catch((error) => {
                console.error("Error saving doctor:", error);
                // Optionally, you can show an error message to the user
            }
            );
        }
    
        }
    }



    return (
        <div className="container mt-5">
            <h3 className='text-bold text-center'>Add Doctor</h3>
            <div className="p-4 border rounded shadow-sm bg-light">
                <form onSubmit={saveOrUpdateDoctor}>
                    {/* First Name */}
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">
                            First Name <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                            id="firstName"
                            placeholder="Enter first name"
                            value={firstName}
                            onChange={handleFirstName}
                            required
                        />
                        {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                    </div>

                    {/* Last Name */}
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">
                            Last Name <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                            id="lastName"
                            placeholder="Enter last name"
                            value={lastName}
                            onChange={handleLastName}
                            required
                        />
                        {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                    </div>

                    {/* Specialty */}
                    <div className="mb-3">
                        <label htmlFor="specialty" className="form-label">
                            Specialty <span className="text-danger">*</span>
                        </label>
                        <select
                            className={`form-select ${errors.specialty ? 'is-invalid' : ''}`}
                            id="specialty"
                            value={specialty}
                            onChange={handleSpecialty}
                            required
                        >
                            <option value="">Select specialty</option>
                            {specialties.map((spec, idx) => (
                                <option key={idx} value={spec}>{spec}</option>
                            ))}
                        </select>
                        {errors.specialty && <div className="invalid-feedback">{errors.specialty}</div>}
                    </div>

                    {/* Submit */}
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default DoctorComponent;
