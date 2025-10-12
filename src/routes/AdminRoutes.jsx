import React from 'react';
import useRole from '../customHook/useRole';
import { Navigate, useLocation } from 'react-router';

const AdminRoutes = ({ children }) => {

    const { role, loading } = useRole()
    const location = useLocation();

    if (loading) return "....loading";
    if (role !== "admin")

        return <Navigate to="/forbidden" state={{ from: location }} replace />
    return children;
};

export default AdminRoutes;