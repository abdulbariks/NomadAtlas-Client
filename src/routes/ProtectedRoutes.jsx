import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';



const ProtectedRoutes = ({ children }) => {
    const { user,loading } = useSelector(state => state.auth)
    const location = useLocation();


    if (loading) return 'loading....';
    if (!user) return <Navigate to="/login" state={location.pathname} replace />;
    return children
};

export default ProtectedRoutes;