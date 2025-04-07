// src/components/AdminRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        const decoded = jwtDecode(token);
        if (decoded.role !== 'admin') {
            return <Navigate to="/not-authorized" />; // 👈 redirect if not admin
        }
        return children;
    } catch (error) {
        console.error('Token decode error:', error);
        return <Navigate to="/login" />;
    }
};

export default AdminRoute;
