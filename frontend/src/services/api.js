// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users'; // Adjust if your backend is hosted elsewhere

// User Registration
export const registerUser = async (name, email, password) => {
    const response = await axios.post(`${API_URL}/register`, { name, email, password });
    return response.data;
};

// User Login
export const loginUser = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
};

// Get User Profile
export const getUserProfile = async (token) => {
    const response = await axios.get(`${API_URL}/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};