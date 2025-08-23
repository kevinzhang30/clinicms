import React, { useEffect, useState } from 'react'
import { deletePatient, listPatients } from '../services/PatientService';
import { listDoctors } from '../services/DoctorService';
import { useNavigate } from 'react-router-dom';

const PatientListComponent = () => {
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const navigator = useNavigate();

    useEffect(() => {
        getListPatients();
        getListDoctors();
    }, []);

    function getListPatients() {
        listPatients()
            .then((response) => {
                setPatients(response.data);
            })
            .catch((error) => {
                console.error("Error fetching patients:", error);
            });
    }

    function getListDoctors() {
        listDoctors()
            .then((response) => {
                setDoctors(response.data);
            })
            .catch((error) => {
                console.error("Error fetching doctors:", error);
            });
    }

    function addNewPatient() {
        navigator('/add-patient');
    }

    function updatePatient(id) {
        navigator(`/edit-patient/${id}`);
    }

    function removePatient(id) {
        deletePatient(id)
            .then(() => {
                getListPatients();
            })
            .catch((error) => {
                console.error("Error deleting patient:", error);
            });
    }

    // helper to resolve doctor name from patientId
    function patientDoctorName(patientId) {
        const patient = patients.find((p) => p.id === patientId);
        if (!patient || !patient.doctorId) return 'No Doctor Assigned';

        const doctor = doctors.find((d) => d.id === patient.doctorId);
        return doctor ? `${doctor.firstName} ${doctor.lastName}` : 'No Doctor Assigned';
    }

    const filteredPatients = selectedDoctor
    ? patients.filter((p) => p.doctorId === parseInt(selectedDoctor))
    : patients;

    return (
        <div className='container'>
            <div className="container-fluid mt-5">
                <h3 className='text-bold text-center'>Patient List</h3>
                {/* <button className='btn btn-primary mb-2' onClick={addNewPatient}>
                    Add Patient
                </button>
                <div className="mb-3 w-25">
                    <label htmlFor="doctorFilter" className="form-label">
                        Filter by Doctor
                    </label>
                    <select
                        id="doctorFilter"
                        className="form-select"
                        value={selectedDoctor}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                    >
                        <option value="">All Doctors</option>
                        {doctors.map((doc) => (
                            <option key={doc.id} value={doc.id}>
                                {doc.firstName} {doc.lastName}
                            </option>
                        ))}
                    </select>
                </div> */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <button className="btn btn-primary" onClick={addNewPatient}>
                        Add Patient
                    </button>

                    <select
                        className="form-select w-auto"
                        style={{ minWidth: '200px' }}
                        value={selectedDoctor}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                    >
                        <option value="">All Doctors</option>
                        {doctors.map((doc) => (
                            <option key={doc.id} value={doc.id}>
                                {doc.firstName} {doc.lastName}
                            </option>
                        ))}
                    </select>
                </div>
                <table className="table table-striped table-bordered w-100 px-10">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Doctor</th>
                            <th><center>Actions</center></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients.map((patient) => (
                            <tr key={patient.id}>
                                <td>{patient.id}</td>
                                <td>{patient.firstName}</td>
                                <td>{patient.lastName}</td>
                                <td>{patient.phoneNum}</td>
                                <td>{patient.email}</td>
                                <td>{patientDoctorName(patient.id)}</td>
                                <td>
                                    <center>
                                        <button
                                            className='btn btn-secondary mx-2'
                                            onClick={() => updatePatient(patient.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className='btn btn-danger'
                                            onClick={() => {
                                                if (window.confirm("Are you sure you want to delete this patient?")) {
                                                    removePatient(patient.id);
                                                }
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </center>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PatientListComponent;
