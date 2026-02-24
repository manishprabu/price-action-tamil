import React, { createContext, useContext, useState, useEffect } from 'react';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { cognitoConfig } from '../config/cognitoConfig';

const AuthContext = createContext(null);

const userPool = new CognitoUserPool({
    UserPoolId: cognitoConfig.UserPoolId,
    ClientId: cognitoConfig.ClientId,
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for persisted Cognito session
        const cognitoUser = userPool.getCurrentUser();
        if (cognitoUser) {
            cognitoUser.getSession((err, session) => {
                if (err || !session.isValid()) {
                    console.error('Session invalid:', err);
                    setUser(null);
                    setLoading(false);
                    return;
                }

                const idToken = session.getIdToken().payload;
                const userEmail = idToken.email || cognitoUser.getUsername();
                const isAdmin = idToken['cognito:groups']?.includes('Admins') || userEmail === 'manishprabu85@gmail.com';

                cognitoUser.getUserAttributes((err, attributes) => {
                    if (err) {
                        console.error('Error fetching attributes:', err);
                        setUser({
                            email: userEmail,
                            name: userEmail.split('@')[0],
                            role: isAdmin ? 'Admin' : 'Student',
                            isLoginTypeAdmin: isAdmin
                        });
                    } else {
                        const userData = {
                            email: userEmail,
                            name: attributes.find(a => a.getName() === 'name')?.getValue() || userEmail.split('@')[0],
                            role: isAdmin ? 'Admin' : 'Student',
                            isLoginTypeAdmin: isAdmin
                        };
                        setUser(userData);
                    }
                    setLoading(false);
                });
            });
        } else {
            setLoading(false);
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        // localStorage persistence is handled by Cognito SDK automatically
    };

    const logout = () => {
        const cognitoUser = userPool.getCurrentUser();
        if (cognitoUser) {
            cognitoUser.signOut();
        }
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, userPool }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
