// src/context/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token'),
    });

    const login = (token) => {
        localStorage.setItem('token', token);
        setAuth({ token });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({ token: null });
    };

    return (
        <AuthContext.Provider value={{ token: auth.token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
