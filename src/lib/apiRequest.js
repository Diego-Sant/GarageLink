import axios from "axios";

const apiRequest = axios.create({
    baseURL: "https://garage-link-api.vercel.app/api",
    withCredentials: true,
});

export default apiRequest;