import React, { useEffect, useState } from 'react'
import { createPatient, getPatient, updatePatient } from '../services/PatientService';
import { useNavigate, useParams } from 'react-router-dom';
import { listDoctors } from '../services/DoctorService';

const PatientComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [doctorId, setDoctorId] = useState('');
    const [doctors, setDoctors] = useState([]);

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        doctorId: ''
    })

    const handleFirstName = (event) => setFirstName(event.target.value);
    const handleLastName = (event) => setLastName(event.target.value);
    const handlePhone = (event) => setPhone(event.target.value);
    const handleEmail = (event) => setEmail(event.target.value);
    const handleDoctor = (event) => setDoctorId(event.target.value);

    const navigator = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        listDoctors().then((response) => {
            setDoctors(response.data);
        }
        ).catch((error) => {
            console.error("Error fetching doctors:", error);
            // Optionally, you can show an error message to the user
        });

    }, []);

    useEffect(() => {
        if (id) {
            getPatient(id).then((response) => {
                const patient = response.data;
                setFirstName(patient.firstName);
                setLastName(patient.lastName);
                setPhone(patient.phoneNum);
                setEmail(patient.email);
                setDoctorId(patient.doctorId);
            }
            ).catch((error) => {
                console.error("Error fetching patient data:", error);
                // Optionally, you can redirect or show an error message
                navigator('/patients');
            }
            );
        }
    }, [id]);

    const formatPhoneNumber = (value) => {
        // Remove non-numeric
        const digits = value.replace(/\D/g, "");
        // Format as (123) 456-7890
        if (digits.length === 10) {
            return `(${digits.substring(0, 3)}) ${digits.substring(3, 6)}-${digits.substring(6)}`;
        }
        return value; // leave unchanged if not 10 digits
    };

    function saveOrUpdatePatient(event) {
        event.preventDefault();

        if (validateForm()) {
            const patient = {
                firstName: firstName,
                lastName: lastName,
                phoneNum: formatPhoneNumber(phone),
                email: email,
                doctorId: doctorId
            };
            if (id) {
                updatePatient(id, patient).then((response) => {
                    console.log("Patient updated successfully:", response.data);
                    navigator('/patients');
                }
                ).catch((error) => {
                    console.error("Error updating patient:", error);
                }
                );
            } else {
                console.log("Patient data to be saved:", patient);
                createPatient(patient).then((response) => {
                    console.log("Patient saved successfully:", response.data);
                    navigator('/patients');
                }).catch((error) => {
                    console.error("Error saving patient:", error);
                    // Optionally, you can show an error message to the user
                }
                );
            }



        }


    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };
        if (firstName.trim()) {
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }
        if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }
        if (phone.trim()) {
            errorsCopy.phone = '';
        } else {
            errorsCopy.phone = 'Phone number is required';
            valid = false;
        }
        if (!email.trim()) {
            errorsCopy.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errorsCopy.email = 'Email is not valid';
            valid = false;
        }
        if (!doctorId) {
            errorsCopy.doctorId = 'Doctor selection is required';
            valid = false;
        } else {
            errorsCopy.doctorId = '';
        }

        setErrors(errorsCopy);
        return valid;
    }
    function pageTitle() {
        if (id) {
            return <h3 className="mb-4">Edit Patient</h3>;
        } else {
            return <h3 className="mb-4">Add Patient</h3>;
        }
    }

    return (
        <div className="container mt-5">
            {pageTitle()}
            <div className="p-4 border rounded shadow-sm bg-light">
                <form>
                    {/* First Name */}
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">
                            First Name <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                            id="firstName"
                            name="firstName"
                            placeholder="Enter first name"
                            onChange={handleFirstName}
                            value={firstName}
                            required
                        />
                        {errors.firstName &&
                            <div className="invalid-feedback">
                                {errors.firstName}
                            </div>}

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
                            name="lastName"
                            placeholder="Enter last name"
                            onChange={handleLastName}
                            value={lastName}
                            required
                        />
                        {errors.lastName &&
                            <div className="invalid-feedback">
                                {errors.lastName}
                            </div>}
                    </div>

                    {/* Phone */}
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">
                            Phone <span className="text-danger">*</span>
                        </label>
                        <input
                            type="tel"
                            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                            id="phone"
                            name="phone"
                            placeholder="Enter phone number"
                            onChange={handlePhone}
                            value={phone}
                            required
                        />
                        {errors.phone &&
                            <div className="invalid-feedback">
                                {errors.phone}
                            </div>}
                    </div>

                    {/* Email (mandatory) */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email <span className="text-danger">*</span>
                        </label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            onChange={handleEmail}
                            value={email}
                            required
                        />

                        {errors.email &&
                            <div className="invalid-feedback">
                                {errors.email}
                            </div>}
                    </div>

                    {/* Doctor */}
                    <div className="mb-3">
                        <label htmlFor="doctor" className="form-label">
                            Assigned Doctor <span className="text-danger">*</span>
                        </label>
                        <select
                            className={`form-select ${errors.doctorId ? 'is-invalid' : ''}`}
                            id="doctor"
                            value={doctorId}
                            onChange={handleDoctor}
                            required
                        >
                            <option value="">Select a doctor</option>
                            {doctors.map((doc) => (
                                <option key={doc.id} value={doc.id}>
                                    {doc.firstName} {doc.lastName}
                                </option>
                            ))}
                        </select>
                        {errors.doctorId && (
                            <div className="invalid-feedback">
                                {errors.doctorId}
                            </div>
                        )}

                    </div>

                    {/* Submit button */}
                    <button type="submit" className="btn btn-success" onClick={saveOrUpdatePatient}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}



export default PatientComponent
