import axios from 'axios';
import auth from './auth';

const api = axios.create({
    baseURL: 'http://' + import.meta.env.VITE_APIURL + ':3000/api'
});

// Add token to requests
api.interceptors.request.use(config => {
    const token = auth.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;