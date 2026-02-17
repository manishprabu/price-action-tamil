import React from 'react';

function Footer() {
    return (
        <footer className="container" style={{ padding: '4rem 0', borderTop: '1px solid var(--glass-border)', marginTop: '4rem' }}>
            <div className="footer-content" style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <div>
                    <div className="logo" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff', marginBottom: '1rem' }}>PRICE ACTION TAMIL</div>
                    <p>© 2024 Price Action Tamil. All rights reserved.</p>
                </div>
                <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '1rem' }}>Links</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
                            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
                        </div>
                    </div>
                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '1rem' }}>Follow</h4>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>YouTube</a>
                            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Twitter</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
