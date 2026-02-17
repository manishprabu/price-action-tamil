import React from 'react';

function About() {
    return (
        <div className="container" style={{ padding: '120px 1rem 4rem' }}>
            {/* Hero Section */}
            {/* Hero Section */}
            {/* Header Section */}
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="hero-title" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
                    Meet <span className="premium-gradient-text">Harish</span>
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto' }}>
                    The Visionary Behind Price Action Tamil
                </p>
            </div>

            {/* Content Section */}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '2rem',
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}>
                {/* Biography (Left) */}
                <div style={{ flex: '1 1 280px', textAlign: 'left', lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#fff' }}>My Journey</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Hello, I'm Harish. My journey in the stock market began with a curiosity to understand the hidden patterns of price movement. Like many, I started with indicators and complex strategies, only to realize that the true language of the market is Price Action.
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Over the years, I have dedicated myself to mastering the art of trading without the noise. My mission with <strong>Price Action Tamil</strong> is simple: to demystify trading for the common man. I believe that anyone can achieve financial independence through the stock market with the right knowledge, discipline, and mindset.
                    </p>
                    <p>
                        I have had the privilege of mentoring thousands of students, helping them transform from loss-making traders to profitable professionals. My approach focuses on simplicity, risk management, and understanding market psychology.
                    </p>
                </div>

                {/* Image (Right) */}
                <div style={{ flex: '1 1 280px', width: '100%', maxWidth: '400px', position: 'relative' }}>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        height: '100%',
                        background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
                        opacity: '0.15',
                        zIndex: -1
                    }}></div>
                    <img
                        src="/trader.png"
                        alt="Harish - Price Action Tamil"
                        style={{
                            width: '100%',
                            borderRadius: '30px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                            border: '1px solid var(--glass-border)'
                        }}
                    />
                </div>
            </div>

            {/* Testimonials Section */}
            <section style={{ marginTop: '6rem' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>What Our <span className="premium-gradient-text">Students Say</span></h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <p style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                            "Harish's teaching style is incredibly simple yet powerful. I used to struggle with complex indicators, but Price Action has changed everything for me. I'm finally profitable!"
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(45deg, #facc15, #fde047)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold' }}>RK</div>
                            <div>
                                <h4 style={{ margin: 0 }}>Rajesh Kumar</h4>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Bangalore</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <p style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                            "The mentorship program is a game-changer. The live market analysis and community support are unmatched. Thank you, Harish sir, for guiding me."
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(45deg, #22d3ee, #67e8f9)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold' }}>AS</div>
                            <div>
                                <h4 style={{ margin: 0 }}>Anitha S.</h4>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Chennai</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <p style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                            "I've attended many courses, but nothing beats the clarity of Price Action Tamil. The focus on psychology and risk management is what separates this from the rest."
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(45deg, #a78bfa, #c4b5fd)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold' }}>VM</div>
                            <div>
                                <h4 style={{ margin: 0 }}>Vikram M.</h4>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Coimbatore</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}

export default About;
