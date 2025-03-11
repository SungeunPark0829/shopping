import React from 'react'
import { useAuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProductedRoute({children, isAdmin = false}) {
    const {user} = useAuthContext();
    if(!user || (isAdmin && !user.isAdmin)) {
        return <Navigate to="/" replace />;
    }

    return children;
}
