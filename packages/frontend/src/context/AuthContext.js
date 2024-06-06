import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: null, user: null });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuth({ ...auth, token });
        }
    }, []);

    const register = async (userData) => {
        const res = await axios.post('/api/auth/register', userData);
        localStorage.setItem('token', res.data.token);
        setAuth({ ...auth, token: res.data.token });
    };

    const login = async (userData) => {
        const res = await axios.post('/api/auth/login', userData);
        localStorage.setItem('token', res.data.token);
        setAuth({ ...auth, token: res.data.token });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({ token: null, user: null });
    };

    return (
        <AuthContext.Provider value={{ auth, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
