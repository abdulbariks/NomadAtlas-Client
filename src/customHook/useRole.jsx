import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const { user } = useSelector((state) => state.auth);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        if (!user?.email) {
            setLoading(false);
            return;
        }

        const checkRole = async () => {
            try {
                const res = await axiosSecure.post(`${import.meta.env.VITE_API}/users/role/${user.email}`);
                setRole(res.data.role);
            } catch (error) {
                console.error("Error fetching role:", error);
            } finally {
                setLoading(false);
            }
        };
        checkRole();
    }, [user, axiosSecure]);

    return { role, loading };
};

export default useRole;
