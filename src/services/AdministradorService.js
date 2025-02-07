import axiosInstance from '../api/axiosConfig';

const API_URL = '/administradores';

const getAll = async () => {
    try {
        const response = await axiosInstance.get(API_URL);
        console.log(response);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const create = async (administrador) => {
    try {
        const response = await axiosInstance.post(API_URL, administrador);
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

const update = async (id, administrador) => {
    console.log("Administrador Service", administrador);
    try {
        const response = await axiosInstance.put(`${API_URL}/${id}`, administrador);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const deleteAdministrador = async (id) => {
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
    deleteAdministrador,
    updatePassword
};
