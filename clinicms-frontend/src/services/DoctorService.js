import axios from "axios";

const DOCTOR_REST_API_URL = "http://localhost:8080/api/doctors";
export const listDoctors = () => axios.get(DOCTOR_REST_API_URL);

export const createDoctor = (doctor) => {
    return axios.post(DOCTOR_REST_API_URL, doctor);
}

export const getDoctor = (id) => {
    return axios.get(`${DOCTOR_REST_API_URL}/${id}`);
}
export const updateDoctor = (id, doctor) => {
    return axios.put(`${DOCTOR_REST_API_URL}/${id}`, doctor);
}
export const deleteDoctor = (id) => {
    return axios.delete(`${DOCTOR_REST_API_URL}/${id}`);
}