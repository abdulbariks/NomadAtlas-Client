import React from 'react';
import useRole from '../customHook/useRole';
import { Navigate, useLocation } from 'react-router';
import NomadAtlasLoader from '../components/Home/NomadAtlasLoader';

const AdminRoutes = ({ children }) => {

    const { role, loading } = useRole()
    const location = useLocation();

    if (loading) return <NomadAtlasLoader/>;
    if (role !== "admin")

        return <Navigate to="/forbidden" state={{ from: location }} replace />
    return children;
};

export default AdminRoutes;