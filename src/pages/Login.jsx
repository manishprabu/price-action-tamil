import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [requireNewPassword, setRequireNewPassword] = useState(false);
    const [tempCognitoUser, setTempCognitoUser] = useState(null);

    const navigate = useNavigate();
    const { login, userPool } = useAuth();

    const handleAuthSuccess = (result, userEmail) => {
        console.log('Login success');
        const idToken = result.getIdToken().payload;

        // Determine role (simplified check for now)
        const isAdmin = idToken['cognito:groups']?.includes('Admins') || userEmail === 'manishprabu85@gmail.com';

        login({
            email: userEmail,
            name: idToken['name'] || userEmail.split('@')[0],
            role: isAdmin ? 'Admin' : 'Student',
            isLoginTypeAdmin: isAdmin
        });

        if (isAdmin) {
            navigate('/admin-dashboard');
        } else {
            navigate('/my-courses');
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password,
        });

        const cognitoUser = new CognitoUser({
            Username: email,
            Pool: userPool,
        });

        cognitoUser.authenticateUser(authDetails, {
            onSuccess: (result) => {
                handleAuthSuccess(result, email);
            },
            onFailure: (err) => {
                console.error('Login failure:', err);
                setError(err.message || 'Verification failed');
                setIsSubmitting(false);
            },
            newPasswordRequired: (userAttributes, requiredAttributes) => {
                setRequireNewPassword(true);
                setTempCognitoUser(cognitoUser);
                setIsSubmitting(false);
            },
        });
    };

    const handleSetNewPassword = (e) => {
        e.preventDefault();
        if (!newPassword) {
            setError('Please enter a new password');
            return;
        }

        setIsSubmitting(true);
        tempCognitoUser.completeNewPasswordChallenge(newPassword, {}, {
            onSuccess: (result) => {
                handleAuthSuccess(result, email);
            },
            onFailure: (err) => {
                console.error('New password failure:', err);
                setError(err.message || 'Failed to set new password');
                setIsSubmitting(false);
            }
        });
    };

    return (
        <div className="container" style={{ padding: '120px 1rem 4rem', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="glass-card" style={{ padding: '2.5rem', width: '100%', maxWidth: '450px', borderRadius: '20px' }}>

                <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>
                    <span className="premium-gradient-text">Welcome Back</span>
                </h2>

                {error && (
                    <div style={{
                        background: 'rgba(255, 71, 87, 0.1)',
                        border: '1px solid #ff4757',
                        color: '#ff4757',
                        padding: '10px',
                        borderRadius: '10px',
                        marginBottom: '1.5rem',
                        fontSize: '0.9rem',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                {!requireNewPassword ? (
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px 15px',
                                    borderRadius: '10px',
                                    border: '1px solid var(--glass-border)',
                                    background: 'rgba(0,0,0,0.3)',
                                    color: '#fff',
                                    outline: 'none',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px 15px',
                                    borderRadius: '10px',
                                    border: '1px solid var(--glass-border)',
                                    background: 'rgba(0,0,0,0.3)',
                                    color: '#fff',
                                    outline: 'none',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="premium-btn"
                            style={{
                                marginTop: '1rem',
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '0.5rem',
                                opacity: isSubmitting ? 0.7 : 1
                            }}
                        >
                            {isSubmitting ? 'Logging in...' : 'Login'}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /></svg>
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleSetNewPassword} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>You are required to set a new password for your first login.</p>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px 15px',
                                    borderRadius: '10px',
                                    border: '1px solid var(--glass-border)',
                                    background: 'rgba(0,0,0,0.3)',
                                    color: '#fff',
                                    outline: 'none',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            className="premium-btn"
                            style={{
                                marginTop: '1rem',
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            Set New Password & Login
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Login;
