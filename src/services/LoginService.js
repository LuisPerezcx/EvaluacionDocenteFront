import axiosInstance from '../api/axiosConfig';

const API_URL = '/login';

const login = async (usuario, contrasenia) => {
    try {

        const payload = {
            username: usuario,
            password: contrasenia
        }

        const response = await axiosInstance.post(API_URL, payload );
        return {data:response.data, status:response.status, error:response.error};
    } catch (error) {
        throw error.response.data;
    }
}


export default {
    login
};
