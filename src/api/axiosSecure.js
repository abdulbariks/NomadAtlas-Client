import axios from "axios";
import { getIdToken } from "firebase/auth";
import { auth } from "../firebase/firebase.init";



const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API, // ✅ your API base URL
});

axiosSecure.interceptors.request.use(async (config) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
        const token = await getIdToken(currentUser, true);
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosSecure;