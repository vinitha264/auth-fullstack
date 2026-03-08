import axios from "axios";

const API = axios.create({
    baseURL: "https://auth-frontend-project-y98r.onrender.com",
    withCredentials: true,
});

export default API;
