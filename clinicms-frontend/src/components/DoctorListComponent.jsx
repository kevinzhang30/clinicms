import React, { useEffect, useState } from 'react'
import { listDoctors, deleteDoctor } from '../services/DoctorService';
import { useNavigate } from 'react-router-dom';
import { specialties } from '../constants/Specialties';

function DoctorListComponent() {

    // let dummyDoctors = [
    //     {"id": 1,
    //     "firstName": "John",
    //     "lastName": "Doe",
    //     "specialty": "Cardiology",
    //     },
    //     {"id": 2,
    //     "firstName": "Jane",
    //     "lastName": "Smith",
    //     "specialty": "Neurology",
    //     },
    //     {"id": 3,
    //     "firstName": "Alice",
    //     "lastName": "Johnson",
    //     "specialty": "Pediatrics",
    //     },
    //     {"id": 4,
    //     "firstName": "Bob",
    //     "lastName": "Brown",
    //     "specialty": "Orthopedics",
    //     }
    // ]

    const [doctors, setDoctors] = useState([])
    const navigator = useNavigate();
    const [selectedSpecialty, setSelectedSpecialty] = useState('');

    function addNewDoctor() {
        navigator('/add-doctor');
    }

    function getListDoctors() {
        listDoctors().then((response) => {
            setDoctors(response.data);
        }
        ).catch((error) => {
            console.error("Error fetching doctors:", error);
        });
    }

    function removeDoctor(id) {
            deleteDoctor(id).then((response) => {
                getListDoctors();
            }
            ).catch((error) => {
                console.error("Error deleting patient:", error);
            }
            );
        }

    function updateDoctor(id) {
        navigator(`/edit-doctor/${id}`);
    }

    const filteredDoctors = selectedSpecialty
        ? doctors.filter((doc) => doc.specialty === selectedSpecialty)
        : doctors;

    useEffect(() => {
        listDoctors().then((response) => {
            setDoctors(response.data);
        }
        ).catch((error) => {
            console.error("Error fetching doctors:", error);
        });
    }, []);
      return (
        <div className='container'>
            <div className="container-fluid mt-5">
                <h3 className='text-bold text-center'>Doctor List</h3>
                <div className="d-flex justify-content-between align-items-center mb-3">
                <button className='btn btn-dark mb-2' onClick={addNewDoctor}>Add Doctor</button>
                <select
                    className="form-select w-auto"
                    style={{ minWidth: '200px' }}
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                >
                    <option value="">All Specialties</option>
                    {specialties.map((spec, idx) => (
                        <option key={idx} value={spec}>{spec}</option>
                    ))}
                </select>
                </div>
                <table className="table table-striped table-bordered w-100 px-10">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Specialty</th>
                            <th><center>Actions</center></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDoctors.map((doctor) => (
                            <tr key={doctor.id}>
                                <td>{doctor.id}</td>
                                <td>{doctor.firstName}</td>
                                <td>{doctor.lastName}</td>
                                <td>{doctor.specialty}</td>
                                <td>
                                    <center>
                                    <button className='btn btn-secondary mx-2' onClick={() => updateDoctor(doctor.id)}>Edit</button>
                                    <button className='btn btn-danger' onClick={() => {
                                        if (window.confirm("Are you sure you want to delete this doctor?")) {
                                            removeDoctor(doctor.id);
                                        }
                                    }}>Delete</button>
                                    </center>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DoctorListComponent
