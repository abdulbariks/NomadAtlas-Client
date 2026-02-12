// src/hooks/useAxiosSecure.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axiosSecure from "../api/axiosSecure";
import { logOutUser } from "../redux/authSlice";
import { useNavigate } from "react-router";

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const resInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                const status = error.response?.status;
                if (status === 401) {
                    await dispatch(logOutUser());
                    navigate("/login");
                } else if (status === 403) {
                    navigate("/forbidden");
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.response.eject(resInterceptor);
        };
    }, [dispatch, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;























// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router";
// import { useEffect } from "react";
// import { logOutUser } from "../redux/authSlice";
// import { getIdToken } from "firebase/auth";
// import { auth } from "../firebase/firebase.init";

// const axiosSecure = axios.create({
//     baseURL: import.meta.env.VITE_API,
// });

// const useAxiosSecure = () => {
//     const { user } = useSelector((state) => state.auth);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const reqInterceptor = axiosSecure.interceptors.request.use(
//             async (config) => {
//                 if (user) {
//                     const token = await getIdToken(auth.currentUser, true); // get fresh token
//                     config.headers.Authorization = `Bearer ${token}`;
//                 }
//                 return config;
//             },
//             (error) => Promise.reject(error)
//         );

//         const resInterceptor = axiosSecure.interceptors.response.use(
//             (res) => res,
//             (error) => {
//                 const status = error.response?.status;
//                 if (status === 403) {
//                     navigate("/forbidden");
//                 } else if (status === 401) {
//                     dispatch(logOutUser())
//                         .then(() => navigate("/login"))
//                         .catch(() => { });
//                 }
//                 return Promise.reject(error);
//             }
//         );

//         return () => {
//             axiosSecure.interceptors.request.eject(reqInterceptor);
//             axiosSecure.interceptors.response.eject(resInterceptor);
//         };
//     }, [user, dispatch, navigate]);

//     return axiosSecure;
// };

// export default useAxiosSecure;




