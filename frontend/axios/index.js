// ✨ implement axiosWithAuth
import axios from 'axios';

const axiosWithAuth = axios.create({
    //Set up the base URL for my API
    baseURL: 'http://localhost:9000/api',
    //Set headers for every request
    headers: {
        'Content-Type': 'application/json'
    
    }
})

axiosWithAuth.interceptors.request.use((config) => {
    //get token from localSTorage
    const token = localStorage.getItem('token');
    //If token exists, add it to the request headers
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default axiosWithAuth;