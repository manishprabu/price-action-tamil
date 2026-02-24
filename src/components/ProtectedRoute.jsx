import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div style={{
                height: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)'
            }}>
                <div className="loading-spinner">Loading session...</div>
            </div>
        );
    }

    if (!user) {
        // Redirect to login but save the attempted location
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        // Redirect to home if user doesn't have required role
        console.warn(`Access denied: Required role ${requiredRole}, user has ${user.role}`);
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
