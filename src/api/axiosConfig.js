import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://172.25.3.50:5000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
