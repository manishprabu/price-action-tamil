import React, { useState } from 'react';

function Community() {
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        telegram: '',
        location: '',
        experience: '',
        upi: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        // Basic validation
        if (!formData.name || !formData.phone || !formData.location || !formData.experience) {
            setMessage({ type: 'error', text: 'Please fill in all required fields' });
            setLoading(false);
            return;
        }

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'https://o26tr82cn9.execute-api.ap-south-1.amazonaws.com';
            const apiKey = import.meta.env.VITE_API_KEY || 'pat-api-key-2026-secure';

            const response = await fetch(`${apiUrl}/community/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Thank you! Your request has been submitted successfully.' });
                setFormData({ name: '', phone: '', telegram: '', location: '', experience: '', upi: '' });
                setTimeout(() => setShowPopup(false), 2000);
            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to submit request' });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setMessage({ type: 'error', text: 'Network error. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

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
                    onClick={() => setShowPopup(true)}
                    style={{
                        fontSize: '1.1rem',
                        padding: '15px 40px'
                    }}
                >
                    Join Now
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

            {/* Popup Modal */}
            {showPopup && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '1rem'
                }}>
                    <div className="glass-card" style={{
                        maxWidth: '500px',
                        width: '100%',
                        padding: '2rem',
                        position: 'relative',
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    }}>
                        <button
                            onClick={() => setShowPopup(false)}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-primary)',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                padding: '0.5rem'
                            }}
                        >
                            ×
                        </button>

                        <h2 style={{ marginBottom: '1.5rem', color: 'var(--accent-secondary)' }}>Join Our Community</h2>

                        {message.text && (
                            <div style={{
                                padding: '1rem',
                                marginBottom: '1rem',
                                borderRadius: '8px',
                                background: message.type === 'success' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                                border: `1px solid ${message.type === 'success' ? '#4caf50' : '#f44336'}`,
                                color: message.type === 'success' ? '#4caf50' : '#f44336'
                            }}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                    Name <span style={{ color: '#f44336' }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '8px',
                                        color: 'var(--text-primary)',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                    Phone <span style={{ color: '#f44336' }}>*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    pattern="[0-9]{10}"
                                    placeholder="10 digit number"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '8px',
                                        color: 'var(--text-primary)',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                    Telegram Number
                                </label>
                                <input
                                    type="text"
                                    name="telegram"
                                    value={formData.telegram}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '8px',
                                        color: 'var(--text-primary)',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                    Location <span style={{ color: '#f44336' }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '8px',
                                        color: 'var(--text-primary)',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                    Trading Experience <span style={{ color: '#f44336' }}>*</span>
                                </label>
                                <select
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleInputChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        background: '#1a1a2e',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '8px',
                                        color: '#e0e0e0',
                                        fontSize: '1rem'
                                    }}
                                >
                                    <option value="" style={{ background: '#1a1a2e', color: '#e0e0e0' }}>Select experience level</option>
                                    <option value="beginner" style={{ background: '#1a1a2e', color: '#e0e0e0' }}>Beginner (0-1 year)</option>
                                    <option value="intermediate" style={{ background: '#1a1a2e', color: '#e0e0e0' }}>Intermediate (1-3 years)</option>
                                    <option value="advanced" style={{ background: '#1a1a2e', color: '#e0e0e0' }}>Advanced (3-5 years)</option>
                                    <option value="expert" style={{ background: '#1a1a2e', color: '#e0e0e0' }}>Expert (5+ years)</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                    UPI Number
                                </label>
                                <div style={{
                                    padding: '0.75rem',
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '8px',
                                    color: 'var(--text-secondary)',
                                    fontSize: '1rem',
                                    fontStyle: 'italic'
                                }}>
                                    12345xxxx@sbi
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="premium-btn"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    fontSize: '1rem',
                                    opacity: loading ? 0.6 : 1,
                                    cursor: loading ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Community;
