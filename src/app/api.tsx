import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/apis"
});
api.defaults.headers.common["Content-Type"] = 'application/json';
api.interceptors.request.use((config) => {
    return config;
}, error => {
    return Promise.reject(error);
});

api.interceptors.response.use((response) => {
    return response;
}, error => {
    return Promise.reject(error);
});
export default api;