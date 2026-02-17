import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import StockTicker from '../components/StockTicker';
import { useAuth } from '../context/AuthContext';
import bullBg from '../assets/bull2.jpg';

function Home() {
    const { user } = useAuth();

    return (
        <>
            <StockTicker />
            {/* Hero Section */}
            <section className="hero container" style={{ marginBottom: '8rem' }}>
                <div className="hero-content animate-fade">
                    <h1 className="hero-title">
                        Master the Markets with <span className="premium-gradient-text">Price Action Tamil</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                        Learn the proven strategies that transformed thousands of lives. Simplified trading education for the Indian and Global markets.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/about">
                            <button className="premium-btn">About Us</button>
                        </Link>
                    </div>
                </div>
                <div className="hero-image animate-fade">
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
                        alt="Hariharan"
                        style={{
                            width: '100%',
                            borderRadius: '30px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                            border: '1px solid var(--glass-border)'
                        }}
                    />
                </div>
            </section>

            {/* Courses Section */}
            {/* Courses Section */}
            <section id="courses" style={{ position: 'relative', overflow: 'hidden', isolation: 'isolate', marginBottom: '8rem' }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${bullBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.4,
                    zIndex: -1,
                    pointerEvents: 'none'
                }}></div>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: 'min(3rem, 10vw)', marginBottom: '1rem' }}>Our Signature <span className="premium-gradient-text">Programs</span></h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Choose the path that fits your trading goals</p>
                        {!user && (
                            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                Already a member? <Link to="/login" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Click login here</Link>
                            </p>
                        )}
                    </div>
                    <div className="course-grid">
                        <CourseCard
                            title="Indian Market Mastery"
                            price="₹14,999"
                            features={["50+ HD Videos", "Option Buying/Selling", "Intraday Hero-Zero", "Live Mentorship"]}
                        />
                        <CourseCard
                            title="Global Market & Crypto"
                            price="₹19,999"
                            features={["International Indices", "Crypto Scalping", "Gold & Commodities", "Risk Management"]}
                        />
                    </div>
                </div>
            </section>

            {/* Social Media Section */}
            <section className="container" style={{ textAlign: 'center', marginBottom: '8rem' }}>
                <h2 style={{ fontSize: 'min(2.5rem, 8vw)', marginBottom: '1rem' }}>
                    Find Price Action Tamil <span className="premium-gradient-text">On</span>
                </h2>
                <p style={{ fontSize: '1.2rem', color: 'var(--accent-primary)', marginBottom: '3rem', fontWeight: '500' }}>
                    Hari has a strong community of 135k+ Followers across all popular social media
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>

                    {/* YouTube */}
                    <a href="https://www.youtube.com/@Price_action_Tamil" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '220px', transition: 'transform 0.3s' }}>
                            <div style={{ width: '60px', height: '60px', background: '#FF0000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(255, 0, 0, 0.4)' }}>
                                <svg viewBox="0 0 24 24" width="30" height="30" fill="white"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                            </div>
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>YouTube</span>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>@Price_action_Tamil</span>
                        </div>
                    </a>

                    {/* Instagram */}
                    <a href="https://www.instagram.com/price_action_tamil_?igsh=cm8xcjYzYm13ZDc3" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '220px', transition: 'transform 0.3s' }}>
                            <div style={{ width: '60px', height: '60px', background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(220, 39, 67, 0.4)' }}>
                                <svg viewBox="0 0 24 24" width="30" height="30" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
                            </div>
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Instagram</span>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>price_action_tamil_</span>
                        </div>
                    </a>

                    {/* Telegram */}
                    <a href="https://t.me/priceactiontamiz" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '220px', transition: 'transform 0.3s' }}>
                            <div style={{ width: '60px', height: '60px', background: '#0088cc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0, 136, 204, 0.4)' }}>
                                <svg viewBox="0 0 24 24" width="30" height="30" fill="white" style={{ marginLeft: '-2px', marginTop: '2px' }}><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
                            </div>
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Telegram</span>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>priceactiontamiz</span>
                        </div>
                    </a>

                </div>
            </section>

            {/* Journal Section Teaser */}
            <section id="journal" className="container" style={{ textAlign: 'center', marginBottom: '8rem' }}>
                <div className="glass-card" style={{ padding: 'min(4rem, 10vw)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{
                        position: 'absolute',
                        bottom: '-50px',
                        right: '-50px',
                        width: '200px',
                        height: '200px',
                        background: 'var(--accent-secondary)',
                        filter: 'blur(100px)',
                        opacity: '0.1'
                    }}></div>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>The Ultimate <span className="premium-gradient-text">Trading Journal</span></h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
                        Track your trades, analyze patterns, and eliminate emotional mistakes with our proprietary digital journal.
                    </p>
                    <Link to="/shop">
                        <button className="premium-btn">Pre-book 2025 Edition</button>
                    </Link>
                </div>
            </section>
        </>
    );
}

export default Home;
