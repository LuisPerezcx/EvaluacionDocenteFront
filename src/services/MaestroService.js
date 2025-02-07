import axiosInstance from '../api/axiosConfig';

const API_URL = '/maestros';

const getAll = async () => {
    try {
        const response = await axiosInstance.get(API_URL);
        return {data:response.data};
    } catch (error) {
        throw error.response.data;
    }
};

const create = async (maestro) => {
    try {
        const response = await axiosInstance.post(API_URL, maestro);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};


const update = async (id, maestro) => {
    try {
        const response = await axiosInstance.put(`${API_URL}/${id}`, maestro);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const deleteMaestro = async (id) => {
    try {
        await axiosInstance.delete(`${API_URL}/${id}`);
    } catch (error) {
        throw error.response.data;
    }
};

const getPromedioById = async(id) => {
    try {
        const response = await axiosInstance.get(`${API_URL}/promedio/${id}`);
        return {data:response.data, status:response.status};
    } catch (error) {
        const status = error.response?.status
        if(status === 404) {
            return {data:null, status};
        }
        throw error.response?.data || error.message;
    }
}

const getEvaluacionesPorMaestro = async (id) => {
    try {
        const response = await axiosInstance.get(`${API_URL}/evaluaciones/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}


export default {
    getAll,
    create,
    update,
    deleteMaestro,
    getPromedioById,
    getEvaluacionesPorMaestro
};
