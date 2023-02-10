import React from 'react'
import { Outlet, Navigate } from 'react-router';
import { useAuthStatus } from '../hooks/useAuthStatus';
import Spinner from './Spinner';

const PrivateRoute = () => {
    const { loggedIn, checkingStatus } = useAuthStatus();

    if (checkingStatus) {
        return <Spinner />
    }
    return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default PrivateRoute