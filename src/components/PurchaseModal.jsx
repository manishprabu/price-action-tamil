import React, { useState, useEffect } from 'react';

function PurchaseModal({ product, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        pincode: '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Dynamically load Razorpay script
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_placeholder", // Reads from .env file
            amount: parseInt(product.price.replace(/[^\d]/g, '')) * 100, // Amount in paise
            currency: "INR",
            name: "Price Action Tamil",
            description: `Purchase of ${product.name}`,
            image: "/logo.png", // Ensure you have a logo or remove this line
            handler: function (response) {
                alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
                setLoading(false);
                onClose();
            },
            prefill: {
                name: formData.name,
                contact: formData.phone
            },
            theme: {
                color: "#3399cc"
            },
            modal: {
                ondismiss: function () {
                    setLoading(false);
                }
            }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(5px)'
        }} onClick={onClose}>
            <div className="glass-card" style={{
                padding: '2rem',
                maxWidth: '500px',
                width: '90%',
                position: 'relative',
                maxHeight: '90vh',
                overflowY: 'auto'
            }} onClick={e => e.stopPropagation()}>

                <button onClick={onClose} style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    fontSize: '1.5rem',
                    cursor: 'pointer'
                }}>&times;</button>

                <h2 style={{ marginBottom: '1.5rem' }}>Complete Your Purchase</h2>

                <div style={{ marginBottom: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{product.name}</h3>
                    <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent-secondary)' }}>{product.price}</p>
                </div>

                <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '8px',
                                border: '1px solid var(--glass-border)',
                                background: 'rgba(255,255,255,0.05)',
                                color: 'var(--text-primary)',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Address Line 1</label>
                        <input
                            type="text"
                            name="address1"
                            required
                            placeholder="House No., Building Name"
                            value={formData.address1}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '8px',
                                border: '1px solid var(--glass-border)',
                                background: 'rgba(255,255,255,0.05)',
                                color: 'var(--text-primary)',
                                outline: 'none',
                                marginBottom: '1rem'
                            }}
                        />
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Address Line 2</label>
                        <input
                            type="text"
                            name="address2"
                            placeholder="Street, Area"
                            value={formData.address2}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '8px',
                                border: '1px solid var(--glass-border)',
                                background: 'rgba(255,255,255,0.05)',
                                color: 'var(--text-primary)',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>City</label>
                            <input
                                type="text"
                                name="city"
                                required
                                value={formData.city}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--glass-border)',
                                    background: 'rgba(255,255,255,0.05)',
                                    color: 'var(--text-primary)',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>State</label>
                            <input
                                type="text"
                                name="state"
                                required
                                value={formData.state}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--glass-border)',
                                    background: 'rgba(255,255,255,0.05)',
                                    color: 'var(--text-primary)',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Pincode</label>
                        <input
                            type="text"
                            name="pincode"
                            required
                            pattern="[0-9]{6}"
                            maxLength="6"
                            placeholder="6-digit Pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '8px',
                                border: '1px solid var(--glass-border)',
                                background: 'rgba(255,255,255,0.05)',
                                color: 'var(--text-primary)',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            pattern="[0-9]{10}"
                            placeholder="10-digit mobile number"
                            value={formData.phone}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '8px',
                                border: '1px solid var(--glass-border)',
                                background: 'rgba(255,255,255,0.05)',
                                color: 'var(--text-primary)',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        className="premium-btn"
                        disabled={loading}
                        style={{ marginTop: '1rem', width: '100%' }}
                    >
                        {loading ? 'Processing...' : 'Pay Now'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PurchaseModal;
