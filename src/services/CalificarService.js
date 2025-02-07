import axiosInstance from '../api/axiosConfig';

const API_URL = '/evaluar';

const evaluar = async (payload) => {
    try {
        const response = await axiosInstance.post(API_URL, payload );
        return {data:response.data, status:response.status};
    } catch (error) {
        const status = error.response?.status
        if (status === 403) {
            return {data:null, status};
        }
        throw error.response?.data || error.message;
    }
}


export default {
    evaluar
};
