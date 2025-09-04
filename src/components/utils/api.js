import axios from 'axios'
import configService from '../../services/config.js'

class ApiService {
    constructor() {
        this.axiosInstance = null
    }

    async getAxiosInstance() {
        if (!this.axiosInstance) {
            const apiUrl = await configService.getApiUrl()
            this.axiosInstance = axios.create({
                baseURL: apiUrl,
                timeout: 10000,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        return this.axiosInstance
    }

    async get(endpoint) {
        const axios = await this.getAxiosInstance()
        return axios.get(endpoint)
    }

    async post(endpoint, data) {
        const axios = await this.getAxiosInstance()
        return axios.post(endpoint, data)
    }
}

export default new ApiService()