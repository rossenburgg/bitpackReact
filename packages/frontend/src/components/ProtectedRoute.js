import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function ProtectedRoute({ component: Component }) {
    const { auth } = useContext(AuthContext);

    return auth.token ? <Component /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
