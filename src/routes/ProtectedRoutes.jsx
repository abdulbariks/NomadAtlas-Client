import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';
import NomadAtlasLoader from '../components/Home/NomadAtlasLoader';



const ProtectedRoutes = ({ children }) => {
    const { user,loading } = useSelector(state => state.auth)
    const location = useLocation();


    if (loading) return <NomadAtlasLoader/>;
    if (!user) return <Navigate to="/login" state={location.pathname} replace />;
    return children
};


export default ProtectedRoutes;