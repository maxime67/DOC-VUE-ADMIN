import axios from 'axios';

const api = axios.create({
    baseURL: 'http://' + import.meta.env.VITE_APIURL + ':3000/api'
});

export default api;