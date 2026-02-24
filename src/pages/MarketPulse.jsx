import React, { useState, useEffect } from 'react';
import StockHeatmap from '../components/StockHeatmap';

// Reusable Component for each Stock Section
const StockSection = ({ title, endpoint, type }) => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const targetUrl = `https://intradayscreener.com/api/CandlestickAnalysis/${endpoint}?filter=cash`;
                let fetchUrl;
                if (import.meta.env.VITE_API_URL) {
                    fetchUrl = `${import.meta.env.VITE_API_URL}?url=${encodeURIComponent(targetUrl)}`;
                } else {
                    fetchUrl = `/api/intraday/CandlestickAnalysis/${endpoint}?filter=cash`;
                }
                const response = await fetch(fetchUrl);
                const data = await response.json();
                if (Array.isArray(data)) setStocks(data);
            } catch (error) {
                console.error(`Error fetching ${title}:`, error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [endpoint, title]);

    if (loading) return <div style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Loading {title}...</div>;
    if (stocks.length === 0) return null;

    const displayStocks = expanded ? stocks : stocks.slice(0, 20);
    const remainingCount = stocks.length - 20;
    const isPositive = type === 'positive';
    const pillBg = isPositive ? '#e8f5e9' : '#ffebee';
    const pillColor = isPositive ? '#2e7d32' : '#c62828';
    const titleIcon = isPositive ? '📈' : '📉';

    return (
        <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}>
                <span style={{ color: isPositive ? '#4caf50' : '#f44336' }}>{titleIcon}</span> {title}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                {displayStocks.map((symbol, index) => (
                    <div
                        key={index}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '20px',
                            background: pillBg,
                            color: pillColor,
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            cursor: 'default',
                            transition: 'transform 0.2s',
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        {symbol}
                    </div>
                ))}

                {!expanded && remainingCount > 0 && (
                    <button
                        onClick={() => setExpanded(true)}
                        style={{
                            padding: '8px 16px', borderRadius: '20px', background: '#e0e0e0',
                            color: '#333', fontWeight: '600', fontSize: '0.9rem',
                            border: 'none', cursor: 'pointer'
                        }}
                    >
                        +{remainingCount} more
                    </button>
                )}
                {expanded && (
                    <button
                        onClick={() => setExpanded(false)}
                        style={{
                            padding: '8px 16px', borderRadius: '20px', background: '#e0e0e0',
                            color: '#333', fontWeight: '600', fontSize: '0.9rem',
                            border: 'none', cursor: 'pointer'
                        }}
                    >
                        Show Less
                    </button>
                )}
            </div>
        </div>
    );
};

// Top-level section cards — premium card switcher style
const sectionCardStyle = (active) => ({
    flex: 1,
    padding: '1.2rem 1.5rem',
    borderRadius: '14px',
    border: active ? '2px solid #facc15' : '2px solid transparent',
    background: active
        ? 'linear-gradient(135deg, rgba(250,204,21,0.15), rgba(250,204,21,0.05))'
        : 'rgba(255,255,255,0.03)',
    color: active ? '#facc15' : 'var(--text-secondary)',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '0.95rem',
    textAlign: 'center',
    boxShadow: active ? '0 0 20px rgba(250,204,21,0.2)' : 'none',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.3rem'
});

// Sub-tabs — original yellow style matching site theme
const subTabStyle = (active) => ({
    padding: '10px 20px',
    borderRadius: '10px',
    border: 'none',
    background: active ? '#facc15' : 'transparent',
    color: active ? '#000' : 'var(--text-secondary)',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease'
});


function MarketPulse() {
    const [activeSection, setActiveSection] = useState('screener');
    const [activeScreener, setActiveScreener] = useState('breakout');

    return (
        <div className="container" style={{ padding: '100px 1rem 2rem', minHeight: '100vh' }}>
            <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                    Market <span className="premium-gradient-text">Pulse</span>
                </h1>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Sector Heatmap & Intraday Stock Screener
                </p>
            </header>

            {/* Top-level section cards */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
                <button onClick={() => setActiveSection('screener')} style={sectionCardStyle(activeSection === 'screener')}>
                    <span style={{ fontSize: '1.8rem' }}>📊</span>
                    <span>Stock Screener</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: '400', opacity: 0.7 }}>Breakout Stocks</span>
                </button>
                <button onClick={() => setActiveSection('heatmap')} style={sectionCardStyle(activeSection === 'heatmap')}>
                    <span style={{ fontSize: '1.8rem' }}>🗺️</span>
                    <span>Sector Heatmap</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: '400', opacity: 0.7 }}>Market Overview</span>
                </button>
            </div>

            {/* Heatmap Section */}
            {activeSection === 'heatmap' && (
                <div className="glass-card" style={{ padding: '1rem', height: '80vh', overflow: 'hidden' }}>
                    <StockHeatmap />
                </div>
            )}

            {/* Stock Screener Section */}
            {activeSection === 'screener' && (
                <>
                    {/* Sub-tabs for screener */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                        <div className="glass-card" style={{ padding: '0.5rem', display: 'inline-flex', gap: '0.5rem' }}>
                            <button onClick={() => setActiveScreener('breakout')} style={subTabStyle(activeScreener === 'breakout')}>
                                Breakout Stocks (5/15 min)
                            </button>
                            <button onClick={() => setActiveScreener('shortterm')} style={subTabStyle(activeScreener === 'shortterm')}>
                                Short Term Breakout Stocks
                            </button>
                        </div>
                    </div>

                    <div className="glass-card animate-fade" style={{ padding: '2rem', minHeight: '400px' }}>
                        {activeScreener === 'breakout' && (
                            <>
                                <StockSection title="5 Mins Breakout" endpoint="5minbreakout" type="positive" />
                                <StockSection title="5 Mins Breakdown" endpoint="5minbreakdown" type="negative" />
                                <StockSection title="15 Mins Breakout" endpoint="15minbreakout" type="positive" />
                                <StockSection title="15 Mins Breakdown" endpoint="15minbreakdown" type="negative" />
                            </>
                        )}
                        {activeScreener === 'shortterm' && (
                            <>
                                <StockSection title="Hourly Gainers" endpoint="hourlygainers" type="positive" />
                                <StockSection title="Hourly Losers" endpoint="hourlylosers" type="negative" />
                                <StockSection title="Short Term Breakout (15 Min)" endpoint="shortbo" type="positive" />
                                <StockSection title="Short Term Breakdown (15 Min)" endpoint="shortbd" type="negative" />
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default MarketPulse;
