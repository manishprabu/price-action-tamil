import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const isActive = (path) => {
        return location.pathname === path ? 'var(--accent-primary)' : '#fff';
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="glass-card navbar">
            <div className="logo" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    PRICE ACTION <span style={{ color: '#fff' }}>TAMIL</span>
                </Link>
            </div>

            <div className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
                <Link to="/" onClick={() => setIsMenuOpen(false)} style={{ color: isActive('/'), textDecoration: 'none', fontWeight: '500' }}>Home</Link>
                <Link to="/about" onClick={() => setIsMenuOpen(false)} style={{ color: isActive('/about'), textDecoration: 'none', fontWeight: '500' }}>About Us</Link>
                <Link to="/community" onClick={() => setIsMenuOpen(false)} style={{ color: isActive('/community'), textDecoration: 'none', fontWeight: '500' }}>Join Community</Link>
                <Link to="/market" onClick={() => setIsMenuOpen(false)} style={{ color: isActive('/market'), textDecoration: 'none', fontWeight: '500' }}>Market</Link>
                <Link to="/stock-selection" onClick={() => setIsMenuOpen(false)} style={{ color: isActive('/stock-selection'), textDecoration: 'none', fontWeight: '500' }}>Stock Selection</Link>
                <Link to="/shop" onClick={() => setIsMenuOpen(false)} style={{ color: isActive('/shop'), textDecoration: 'none', fontWeight: '500' }}>Our Merchandise</Link>

                {user && user.role === 'Admin' && (
                    <Link to="/admin-dashboard" onClick={() => setIsMenuOpen(false)} style={{ color: isActive('/admin-dashboard'), textDecoration: 'none', fontWeight: '500' }}>Admin Panel</Link>
                )}

                {user && user.role !== 'Admin' && (
                    <Link to="/my-courses" onClick={() => setIsMenuOpen(false)} style={{ color: isActive('/my-courses'), textDecoration: 'none', fontWeight: '500' }}>My Learning</Link>
                )}

                <div className="mobile-auth">
                    {user ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%' }}>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Hi, {user.name}</span>
                            <button
                                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                                style={{
                                    background: 'transparent',
                                    border: '1px solid var(--glass-border)',
                                    color: 'var(--text-secondary)',
                                    padding: '8px 20px',
                                    borderRadius: '20px',
                                    cursor: 'pointer',
                                    width: '100%'
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" onClick={() => setIsMenuOpen(false)} style={{ width: '100%' }}>
                            <button className="premium-btn" style={{ width: '100%' }}>Login</button>
                        </Link>
                    )}
                </div>
            </div>

            <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="desk-auth">
                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                Hi, <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>{user.name}</span>
                            </span>
                            <button
                                onClick={handleLogout}
                                style={{
                                    background: 'transparent',
                                    border: '1px solid var(--glass-border)',
                                    color: 'var(--text-secondary)',
                                    padding: '5px 12px',
                                    borderRadius: '20px',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem'
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login">
                            <button className="premium-btn login-btn" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>Login</button>
                        </Link>
                    )}
                </div>

                <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <span style={{ transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
                    <span style={{ opacity: isMenuOpen ? 0 : 1 }}></span>
                    <span style={{ transform: isMenuOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'none' }}></span>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
