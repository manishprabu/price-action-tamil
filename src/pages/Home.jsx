import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import StockTicker from '../components/StockTicker';
import Counter from '../components/Counter';
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
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '3rem',
                    flexWrap: 'wrap',
                    marginTop: '5rem',
                    perspective: '1500px'
                }}>

                    {/* YouTube */}
                    <a href="https://www.youtube.com/@Price_action_Tamil"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="stagger-up"
                        style={{ textDecoration: 'none', color: 'inherit', animationDelay: '0.1s' }}>
                        <div className="social-card" style={{ '--brand-color': '#FF0000' }}>
                            <div className="social-bg-glow"></div>
                            <div className="social-shine"></div>
                            <div className="social-icon-wrapper">
                                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fff' }}>
                                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white" stroke="none" />
                                </svg>
                            </div>
                            <div style={{ textAlign: 'center', zIndex: 2 }}>
                                <div style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.4rem', color: '#fff', letterSpacing: '-0.02em' }}>YouTube</div>
                                <div style={{ color: 'var(--accent-primary)', fontSize: '1.3rem', fontWeight: '800', marginBottom: '0.2rem' }}>
                                    <Counter target="13.1" suffix="k" /> +
                                </div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Subscribers</div>
                            </div>
                        </div>
                    </a>

                    {/* Instagram */}
                    <a href="https://www.instagram.com/price_action_tamil_?igsh=cm8xcjYzYm13ZDc3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="stagger-up"
                        style={{ textDecoration: 'none', color: 'inherit', animationDelay: '0.2s' }}>
                        <div className="social-card" style={{ '--brand-color': '#E1306C' }}>
                            <div className="social-bg-glow"></div>
                            <div className="social-shine"></div>
                            <div className="social-icon-wrapper">
                                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fff' }}>
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                            </div>
                            <div style={{ textAlign: 'center', zIndex: 2 }}>
                                <div style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.4rem', color: '#fff', letterSpacing: '-0.02em' }}>Instagram</div>
                                <div style={{ color: 'var(--accent-primary)', fontSize: '1.3rem', fontWeight: '800', marginBottom: '0.2rem' }}>
                                    <Counter target="135" suffix="K" /> +
                                </div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Followers</div>
                            </div>
                        </div>
                    </a>

                    {/* Telegram */}
                    <a href="https://t.me/priceactiontamiz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="stagger-up"
                        style={{ textDecoration: 'none', color: 'inherit', animationDelay: '0.3s' }}>
                        <div className="social-card" style={{ '--brand-color': '#0088cc' }}>
                            <div className="social-bg-glow"></div>
                            <div className="social-shine"></div>
                            <div className="social-icon-wrapper">
                                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fff', marginLeft: '-2px' }}>
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            </div>
                            <div style={{ textAlign: 'center', zIndex: 2 }}>
                                <div style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.4rem', color: '#fff', letterSpacing: '-0.02em' }}>Telegram</div>
                                <div style={{ color: 'var(--accent-primary)', fontSize: '1.3rem', fontWeight: '800', marginBottom: '0.2rem' }}>
                                    <Counter target="20" suffix="K" /> +
                                </div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Members</div>
                            </div>
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
