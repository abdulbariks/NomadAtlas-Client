import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';

const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_API}`
})

const useAxiosSecure = () => {
    const { user } = useSelector((state) => state.auth);

    axiosSecure.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user.accessToken}`
        return config;
    }, error => {
        return Promise.reject(error)
    })
    return axiosSecure;
};

export default useAxiosSecure;