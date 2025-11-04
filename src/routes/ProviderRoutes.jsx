import React from 'react';
import useRole from '../customHook/useRole';
import { Navigate, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import Spinner from '../components/Spinner/Spinner';

const ProviderRoutes = ({ children }) => {

    const { role, loading: roleLoading } = useRole()
    const location = useLocation();
    const { user, loading: authLoading } = useSelector((state) => state.auth);

    const loading = authLoading || roleLoading;

    if (loading) return <Spinner/>;
    if (!user || role !== "provider") {
        return <Navigate to="/forbidden" state={{ from: location }} replace />;
    }
    return children;
};


export default ProviderRoutes;