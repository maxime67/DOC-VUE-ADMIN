import axios from 'axios';

export default {
    async register(username, password) {
        return axios.post(`${import.meta.env.VITE_APIURL}/api/auth/register`, {
            username,
            password
        });
    },

    async login(username, password) {
        const response = await axios.post(`${import.meta.env.VITE_APIURL}/api/auth/login`, {
            username,
            password
        });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    logout() {
        localStorage.removeItem('token');
    },

    getToken() {
        return localStorage.getItem('token');
    },
};