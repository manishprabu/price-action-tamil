import React, { useState, useEffect } from 'react';
import NSEHeatmap from '../components/NSEHeatmap';

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

    if (loading) return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <div className="animate-pulse" style={{ color: 'var(--text-secondary)' }}>Analyzing {title}...</div>
        </div>
    );

    if (stocks.length === 0) return null;

    const displayStocks = expanded ? stocks : stocks.slice(0, 15);
    const remainingCount = stocks.length - 15;
    const isPositive = type === 'positive';
    const titleIcon = isPositive ? '↑' : '↓';

    return (
        <div style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{
                    fontSize: '1.1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    color: isPositive ? '#4caf50' : '#f44336',
                    letterSpacing: '0.02em',
                    fontWeight: '700'
                }}>
                    <span style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        background: isPositive ? 'rgba(76,175,80,0.1)' : 'rgba(244,67,54,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem'
                    }}>{titleIcon}</span>
                    {title}
                </h3>
                {stocks.length > 15 && (
                    <button
                        onClick={() => setExpanded(!expanded)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--accent-primary)',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}
                    >
                        {expanded ? 'Show Less' : `View All (${stocks.length})`}
                    </button>
                )}
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: '0.8rem'
            }}>
                {displayStocks.map((symbol, index) => (
                    <div key={index} className={`stock-badge ${isPositive ? 'positive' : 'negative'}`}>
                        {symbol}
                    </div>
                ))}
            </div>
        </div>
    );
};

function MarketPulse() {
    const [activeSection, setActiveSection] = useState('screener');
    const [activeScreener, setActiveScreener] = useState('breakout');
    const [activeHeatmapIndex, setActiveHeatmapIndex] = useState('Nifty 50');

    const heatmapSources = [
        { id: 'Nifty 50', label: 'Nifty 50' },
        { id: 'Bank Nifty', label: 'Bank Nifty' },
        { id: 'Fin Nifty', label: 'Fin Nifty' },
        { id: 'Sensex', label: 'Sensex' }
    ];

    const menuItems = [
        { id: 'screener', label: 'Stock Screener', icon: '🎯', sub: 'Intraday Edge' },
        { id: 'heatmap', label: 'Sector Heatmap', icon: '🌡️', sub: 'Market Breadth' }
    ];

    return (
        <div className="admin-container" style={{ marginTop: '80px' }}>
            {/* Sidebar */}
            <div className="glass-card admin-sidebar">
                <h3 style={{ marginBottom: '2rem', color: 'var(--accent-primary)', fontSize: '1.2rem' }}>Market Pulse</h3>
                <ul>
                    {menuItems.map((item) => (
                        <li
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={`market-sidebar-item ${activeSection === item.id ? 'active' : ''}`}
                            style={{
                                cursor: 'pointer',
                                padding: '15px',
                                borderRadius: '12px',
                                transition: 'all 0.3s ease',
                                marginBottom: '0.8rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}
                        >
                            <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{item.label}</span>
                                <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>{item.sub}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content */}
            <div className="admin-content">
                <div className="container" style={{ padding: '0 1rem 4rem', position: 'relative' }}>
                    <div className="market-glow" style={{ opacity: activeSection === 'heatmap' ? 0.03 : 0.08 }}></div>

                    <header style={{ marginBottom: '3rem', textAlign: 'left' }}>
                        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                            {activeSection === 'screener' ? 'Stock ' : 'Sector '}
                            <span className="premium-gradient-text">{activeSection === 'screener' ? 'Screener' : 'Heatmap'}</span>
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                            {activeSection === 'screener'
                                ? 'Institutional-grade intraday engine to spot high-probability setups.'
                                : 'Visualizing market breadth and sector rotation in real-time.'}
                        </p>
                    </header>

                    <div className="animate-fade">
                        {activeSection === 'heatmap' ? (
                            <div>
                                <div style={{ marginBottom: '2.5rem' }}>
                                    <div className="segmented-control" style={{ width: 'fit-content' }}>
                                        {heatmapSources.map(source => (
                                            <button
                                                key={source.id}
                                                className={activeHeatmapIndex === source.id ? 'active' : ''}
                                                onClick={() => setActiveHeatmapIndex(source.id)}
                                            >
                                                {source.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="glass-card" style={{
                                    padding: '1.5rem',
                                    height: '75vh',
                                    overflow: 'hidden',
                                    border: '1px solid var(--glass-border)',
                                    boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
                                }}>
                                    <NSEHeatmap index={activeHeatmapIndex} />
                                </div>
                            </div>
                        ) : (
                            <div>
                                {/* Screener Tabs */}
                                <div style={{ marginBottom: '2.5rem' }}>
                                    <div className="segmented-control">
                                        <button
                                            className={activeScreener === 'breakout' ? 'active' : ''}
                                            onClick={() => setActiveScreener('breakout')}
                                        >
                                            Breakout Engine
                                        </button>
                                        <button
                                            className={activeScreener === 'shortterm' ? 'active' : ''}
                                            onClick={() => setActiveScreener('shortterm')}
                                        >
                                            Short-Term Momentum
                                        </button>
                                    </div>
                                </div>

                                <div className="glass-card" style={{
                                    padding: '2.5rem 2rem',
                                    minHeight: '500px',
                                    background: 'rgba(255,255,255,0.01)',
                                    border: '1px solid var(--glass-border)'
                                }}>
                                    {activeScreener === 'breakout' ? (
                                        <>
                                            <StockSection title="5 Mins Breakout" endpoint="5minbreakout" type="positive" />
                                            <StockSection title="5 Mins Breakdown" endpoint="5minbreakdown" type="negative" />
                                            <StockSection title="15 Mins Breakout" endpoint="15minbreakout" type="positive" />
                                            <StockSection title="15 Mins Breakdown" endpoint="15minbreakdown" type="negative" />
                                        </>
                                    ) : (
                                        <>
                                            <StockSection title="Hourly Gainers" endpoint="hourlygainers" type="positive" />
                                            <StockSection title="Hourly Losers" endpoint="hourlylosers" type="negative" />
                                            <StockSection title="Short Term Breakout (15 Min)" endpoint="shortbo" type="positive" />
                                            <StockSection title="Short Term Breakdown (15 Min)" endpoint="shortbd" type="negative" />
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MarketPulse;
