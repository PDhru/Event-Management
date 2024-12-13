import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider to manage auth state
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true); // For handling async loading state

    // Check if token exists in localStorage when the app loads
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuth(token);  // If token is found, set the auth state
        }
        setLoading(false);  // Mark loading as false once the check is complete
    }, []);

    // Login and set token in both state and localStorage
    const login = (token) => {
        localStorage.setItem('token', token);
        setAuth(token);
    };

    // Logout and clear token from both state and localStorage
    const logout = () => {
        localStorage.removeItem('token');
        setAuth(null);  // Clear auth state
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout, loading }}>
            {!loading && children} {/* Render children only when loading is done */}
        </AuthContext.Provider>
    );
};
