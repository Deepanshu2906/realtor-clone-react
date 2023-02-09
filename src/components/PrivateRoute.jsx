import React from 'react'
import { Outlet, Navigate } from 'react-router';
import { useAuthStatus } from '../hooks/useAuthStatus';

const PrivateRoute = () => {
    const { loggedIn, checkingStatus } = useAuthStatus();

    if (checkingStatus) {
        return <h1>Loding...</h1>;
    }
    return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default PrivateRoute