import axios from "axios";

const REST_API_URL = "http://localhost:8080/api/patients";

export const listPatients = () => axios.get(REST_API_URL);

export const createPatient = (patient) => {
    return axios.post(REST_API_URL, patient);
}

export const getPatient = (id) => {
    return axios.get(`${REST_API_URL}/${id}`);
}

export const updatePatient = (id, patient) => {
    return axios.put(`${REST_API_URL}/${id}`, patient);
}
export const deletePatient = (id) => {
    return axios.delete(`${REST_API_URL}/${id}`);
}