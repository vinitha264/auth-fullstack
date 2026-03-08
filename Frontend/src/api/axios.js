import axios from "axios";

const API = axios.create({
    baseURL: "https://auth-backend-project.onrender.com",
    withCredentials: true,
});

export default API;
