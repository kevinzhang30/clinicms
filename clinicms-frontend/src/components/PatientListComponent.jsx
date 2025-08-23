import React, { use, useEffect, useState } from 'react'
import { deletePatient, listPatients } from '../services/PatientService';
import { useNavigate } from 'react-router-dom';
const PatientListComponent = () => {
    // const dummData = [
    //     {
    //         "id": 1,
    //         "firstName": "John",
    //         "lastName": "Doe",
    //         "phone": "123-456-7890",
    //         "email": "jd@gmail.com"
    //     },
    //     {
    //         "id": 2,
    //         "firstName": "Jane",
    //         "lastName": "Smith",
    //         "phone": "987-654-3210",
    //         "email": "js@gmail.com"
    //     }
    // ]
    const [patients, setPatients] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        getListPatients();

    }
        , []);

    function getListPatients() {
        listPatients().then((response) => {
            setPatients(response.data);
        }
        ).catch((error) => {
            console.error("Error fetching patients:", error);
        });
    }

    function addNewPatient() {
        navigator('/add-patient');
    }

    function updatePatient(id) {
        navigator(`/edit-patient/${id}`);
    }

    function removePatient(id) {
        deletePatient(id).then((response) => {
            getListPatients();
        }
        ).catch((error) => {
            console.error("Error deleting patient:", error);
        }
        );
    }

    return (
        <div className='container'>
            <div className="container-fluid mt-5">
                <h3 className='text-bold text-center'>Patient List</h3>
                <button className='btn btn-primary mb-2' onClick={addNewPatient}>Add Patient</button>
                <table className="table table-striped table-bordered w-100 px-10">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th><center>Actions</center></th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient) => (
                            <tr key={patient.id}>
                                <td>{patient.id}</td>
                                <td>{patient.firstName}</td>
                                <td>{patient.lastName}</td>
                                <td>{patient.phoneNum}</td>
                                <td>{patient.email}</td>
                                <td>
                                    <center>
                                    <button className='btn btn-secondary mx-2' onClick={() => updatePatient(patient.id)}>Edit</button>
                                    <button className='btn btn-danger' onClick={() => {
                                        if (window.confirm("Are you sure you want to delete this patient?")) {
                                            removePatient(patient.id);
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

export default PatientListComponent

