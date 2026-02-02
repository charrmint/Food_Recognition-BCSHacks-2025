import axios from "axios"

export const api = axios.create({
    baseURL: '/api',
    withCredentials: true
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (response) => response,  // Success - pass through
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token')
            window.location.href = '/auth'  // Redirect to login
        }
        return Promise.reject(error)  // Pass error to caller
    }
)