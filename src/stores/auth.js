// src/stores/auth.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
    const isLoggedIn = ref(false);
    const user = ref(null);

    async function login(username, password) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_APIURL}/api/auth/login`, {
                username,
                password
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                isLoggedIn.value = true;
                await checkAuth(); // This will set the user data
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    }

    async function checkAuth() {
        const token = localStorage.getItem('token');
        if (!token) {
            isLoggedIn.value = false;
            return false;
        }

        try {
            const response = await axios.get(`${import.meta.env.VITE_APIURL}/api/auth/verify`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            isLoggedIn.value = response.data.isValid;
            if (response.data.user) {
                user.value = response.data.user;
            }
            return response.data.isValid;
        } catch (error) {
            logout();
            return false;
        }
    }

    function logout() {
        localStorage.removeItem('token');
        isLoggedIn.value = false;
        user.value = null;
    }

    return {
        isLoggedIn,
        user,
        login,
        checkAuth,
        logout
    };
});