import axiosInstance from '../api/axiosConfig';

const API_URL = '/alumnos';

const getAll = async () => {
    try {
        const response = await axiosInstance.get(API_URL);
        console.log(response);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const create = async (alumno) => {
    try {
        const response = await axiosInstance.post(API_URL, alumno);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const updatePassword = async (datosAct) => {
    try {
        const response = await axiosInstance.post(`${API_URL}/actualiza-contrasenia`, datosAct);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const update = async (id, alumno) => {
    console.log("Alumno Service", alumno);
    try {
        const response = await axiosInstance.put(`${API_URL}/${id}`, alumno);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const deleteAlumno = async (id) => {
    try {
        await axiosInstance.delete(`${API_URL}/${id}`);
    } catch (error) {
        throw error.response.data;
    }
};

export default {
    getAll,
    create,
    update,
    deleteAlumno,
    updatePassword
};
