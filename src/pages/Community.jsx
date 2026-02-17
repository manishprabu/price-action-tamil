import React from 'react';

function Community() {
    return (
        <div className="container" style={{ padding: '120px 1rem 4rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
                    Join Our <span className="premium-gradient-text">Pro Community</span>
                </h1>
                <p style={{
                    fontSize: '1.2rem',
                    color: 'var(--text-secondary)',
                    maxWidth: '800px',
                    margin: '0 auto 2rem',
                    lineHeight: '1.8'
                }}>
                    Get exclusive access to live mentorship, daily market analysis, and a network of serious traders.
                    Level up your trading journey with real-time guidance.
                </p>

                <button
                    className="premium-btn"
                    disabled
                    style={{
                        fontSize: '1.1rem',
                        padding: '15px 40px',
                        opacity: 0.6,
                        cursor: 'not-allowed',
                        background: 'var(--bg-card)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--glass-border)',
                        boxShadow: 'none'
                    }}
                >
                    Join Now (Opening Soon)
                </button>
            </div>

            <div className="glass-card" style={{ padding: '2.5rem', maxWidth: '1000px', margin: '0 auto' }}>
                <h3 style={{ marginBottom: '2rem', fontSize: '1.8rem', color: 'var(--accent-secondary)', textAlign: 'center' }}>Live Mentorship & Updates</h3>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '2rem',
                    alignItems: 'start'
                }}>
                    <div style={{ flex: '1 1 250px', maxWidth: '300px' }}>
                        <img
                            src="/live1.png"
                            alt="Live Class Details"
                            style={{ width: '100%', borderRadius: '10px', border: '1px solid var(--glass-border)' }}
                        />
                    </div>
                    <div style={{ flex: '1 1 250px', maxWidth: '300px' }}>
                        <img
                            src="/live2.png"
                            alt="Community Announcements"
                            style={{ width: '100%', borderRadius: '10px', border: '1px solid var(--glass-border)' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Community;
