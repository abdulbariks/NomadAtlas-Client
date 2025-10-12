import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { logOutUser } from "../redux/authSlice";
import { getIdToken } from "firebase/auth";
import { auth } from "../firebase/firebase.init";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API,
});

const useAxiosSecure = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const reqInterceptor = axiosSecure.interceptors.request.use(
            async (config) => {
                if (user) {
                    const token = await getIdToken(auth.currentUser, true); // get fresh token
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const resInterceptor = axiosSecure.interceptors.response.use(
            (res) => res,
            (error) => {
                const status = error.response?.status;
                if (status === 403) {
                    navigate("/forbidden");
                } else if (status === 401) {
                    dispatch(logOutUser())
                        .then(() => navigate("/login"))
                        .catch(() => { });
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        };
    }, [user, dispatch, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;


// import axios from 'axios';
// import React from 'react';
// import {
//     useDispatch,
//     useSelector
// } from 'react-redux';
// import { useNavigate } from 'react-router';
// import { logOutUser } from '../redux/authSlice';

// const axiosSecure = axios.create({
//     baseURL: `${import.meta.env.VITE_API}`
// })

// const useAxiosSecure = () => {
//     const { user } = useSelector((state) => state.auth);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     axiosSecure.interceptors.request.use(config => {
//         config.headers.Authorization = `Bearer ${user.accessToken}`
//         return config;
//     }, error => {
//         return Promise.reject(error)
//     })

//     axiosSecure.interceptors.response.use(res => {
//         return res
//     }, error => {
//         console.log(error.status)
//         const status = error.response?.status;
//         if (status === 403) {
//             navigate('/forbidden')
//         }
//         else if (status === 401) {
//             dispatch(logOutUser())
//                 .then(() => {
//                     navigate('login')
//                 })
//                 .catch(() => { })
//         }
//         return Promise.reject(error)
//     })
//     return axiosSecure;
// };

// export default useAxiosSecure;