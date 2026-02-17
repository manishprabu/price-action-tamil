import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const [isLoginTypeAdmin, setIsLoginTypeAdmin] = useState(false);
    const [loginMethod, setLoginMethod] = useState('otp'); // 'otp' or 'password'

    // Form State
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSendOtp = (e) => {
        e.preventDefault();
        if (phoneNumber.length >= 10) {
            setIsOtpSent(true);
            alert(`OTP sent to ${phoneNumber}. (Use any 4-digit OTP for testing)`);
        } else {
            alert("Please enter a valid phone number.");
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();

        let isAuthenticated = false;

        if (loginMethod === 'password') {
            if (username && password) {
                isAuthenticated = true;
            } else {
                alert("Please enter username and password.");
            }
        } else {
            // OTP Login
            if (otp.length === 4) {
                isAuthenticated = true;
            } else {
                alert("Please enter a valid 4-digit OTP.");
            }
        }


        if (isAuthenticated) {
            const userRole = isLoginTypeAdmin ? 'Admin' : 'Student';
            // Use phone number or username as the identifier
            let identifier = username;

            if (loginMethod === 'otp') {
                const randomNames = ["Trader_Pro", "Bullish_User", "Chart_Master", "Stock_Wizard", "Alpha_Trader"];
                identifier = randomNames[Math.floor(Math.random() * randomNames.length)];
            }

            console.log(`Logging in as ${userRole}`);

            // Update Auth Context
            login({
                name: identifier || 'User',
                role: userRole,
                phone: phoneNumber,
                isLoginTypeAdmin: isLoginTypeAdmin
            });

            if (isLoginTypeAdmin) {
                navigate('/admin-dashboard');
            } else {
                navigate('/my-courses');
            }
        }
    };

    const getMaskedPhoneNumber = (phone) => {
        if (phone.length < 4) return phone;
        return '*'.repeat(phone.length - 4) + phone.slice(-4);
    };

    return (
        <div className="container" style={{ padding: '120px 1rem 4rem', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="glass-card" style={{ padding: '2.5rem', width: '100%', maxWidth: '450px', borderRadius: '20px' }}>

                <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>
                    <span className="premium-gradient-text">Welcome Back</span>
                </h2>

                {/* Toggle Admin/User */}
                <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '50px', padding: '5px', marginBottom: '2rem' }}>
                    <button
                        onClick={() => setIsLoginTypeAdmin(false)}
                        style={{
                            flex: 1,
                            padding: '10px',
                            borderRadius: '40px',
                            border: 'none',
                            background: !isLoginTypeAdmin ? 'var(--accent-primary)' : 'transparent',
                            color: !isLoginTypeAdmin ? '#000' : 'var(--text-secondary)',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        User Login
                    </button>
                    <button
                        onClick={() => setIsLoginTypeAdmin(true)}
                        style={{
                            flex: 1,
                            padding: '10px',
                            borderRadius: '40px',
                            border: 'none',
                            background: isLoginTypeAdmin ? 'var(--accent-primary)' : 'transparent',
                            color: isLoginTypeAdmin ? '#000' : 'var(--text-secondary)',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Admin Login
                    </button>
                </div>

                {/* Login Method Tabs */}
                <div style={{ display: 'flex', borderBottom: '1px solid var(--glass-border)', marginBottom: '1.5rem' }}>
                    <button
                        onClick={() => setLoginMethod('otp')}
                        style={{
                            flex: 1,
                            padding: '10px',
                            background: 'transparent',
                            border: 'none',
                            color: loginMethod === 'otp' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                            borderBottom: loginMethod === 'otp' ? '2px solid var(--accent-primary)' : 'none',
                            cursor: 'pointer',
                            fontWeight: '500'
                        }}
                    >
                        Login via OTP
                    </button>
                    <button
                        onClick={() => setLoginMethod('password')}
                        style={{
                            flex: 1,
                            padding: '10px',
                            background: 'transparent',
                            border: 'none',
                            color: loginMethod === 'password' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                            borderBottom: loginMethod === 'password' ? '2px solid var(--accent-primary)' : 'none',
                            cursor: 'pointer',
                            fontWeight: '500'
                        }}
                    >
                        Password
                    </button>
                </div>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {loginMethod === 'password' && (
                        <>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Username / Email</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter username"
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
                        </>
                    )}

                    {loginMethod === 'otp' && (
                        <>
                            {!isOtpSent ? (
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Phone Number</label>
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="Enter phone number"
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
                                    <button
                                        onClick={handleSendOtp}
                                        className="premium-btn"
                                        style={{ marginTop: '1rem', width: '100%', padding: '10px' }}
                                    >
                                        Get OTP
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <p style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                                        OTP sent to {getMaskedPhoneNumber(phoneNumber)}
                                        <button
                                            type="button"
                                            onClick={() => setIsOtpSent(false)}
                                            style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', marginLeft: '10px', cursor: 'pointer', textDecoration: 'underline' }}>
                                            Change
                                        </button>
                                    </p>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Enter OTP</label>
                                    <input
                                        type="text"
                                        maxLength="4"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        placeholder="X X X X"
                                        style={{
                                            width: '100%',
                                            padding: '12px 15px',
                                            borderRadius: '10px',
                                            border: '1px solid var(--glass-border)',
                                            background: 'rgba(0,0,0,0.3)',
                                            color: '#fff',
                                            outline: 'none',
                                            fontSize: '1.5rem',
                                            letterSpacing: '10px',
                                            textAlign: 'center'
                                        }}
                                    />
                                </div>
                            )}
                        </>
                    )}

                    {(loginMethod === 'password' || isOtpSent) && (
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
                            Login as {isLoginTypeAdmin ? 'Admin' : 'Student'}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /></svg>
                        </button>
                    )}
                </form>

                <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Don't have an account? <span style={{ color: 'var(--accent-primary)', cursor: 'pointer' }}>Register here</span>
                </p>

            </div>
        </div>
    );
}

export default Login;
