import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axiosSecure from "../api/axiosSecure";5788888
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