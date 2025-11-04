import React from 'react';
import useRole from '../customHook/useRole';
import { Navigate, useLocation } from 'react-router';
import Spinner from '../components/Spinner/Spinner';

const AdminRoutes = ({ children }) => {

    const { role, loading } = useRole()
    const location = useLocation();



    if (loading) return <Spinner></Spinner>;
    if (role !== "admin")

        return <Navigate to="/forbidden" state={{ from: location }} replace />
    return children;
};

export default AdminRoutes;