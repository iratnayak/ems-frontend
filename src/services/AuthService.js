import axios from "axios";

const AUTH_API_BASE_URL = "https://ems-backend-zeta.vercel.app/api/auth";

export const registerAPICall = (registerObj) => {
    return axios.post(AUTH_API_BASE_URL + '/register', registerObj);
}

export const loginAPICall = (username, password) => {
    return axios.post(AUTH_API_BASE_URL + '/login', { username, password });
}

// Save the Token
export const storeToken = (token) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");

// Save the Role 
export const saveLoggedInUser = (username, role) => {
    sessionStorage.setItem("authenticatedUser", username);
    sessionStorage.setItem("role", role);
}

// Check whether user already login
export const isUserLoggedIn = () => {
    const username = sessionStorage.getItem("authenticatedUser");
    return username != null;
}

// Get role previously log user
export const getLoggedInUserRole = () => {
    return sessionStorage.getItem("role");
}

// Logout
export const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
}