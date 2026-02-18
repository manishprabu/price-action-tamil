import React, { useState, useEffect } from 'react';

// Reusable Component for each Stock Section (e.g., "5 mins breakout")
const StockSection = ({ title, endpoint, type }) => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Construct the target URL for intradayscreener.com
                const targetUrl = `https://intradayscreener.com/api/CandlestickAnalysis/${endpoint}?filter=cash`;

                let fetchUrl;
                if (import.meta.env.VITE_API_URL) {
                    // Production: Use Lambda Proxy with ?url= parameter
                    fetchUrl = `${import.meta.env.VITE_API_URL}?url=${encodeURIComponent(targetUrl)}`;
                } else {
                    // Local Dev: Use Vite Proxy
                    fetchUrl = `/api/intraday/CandlestickAnalysis/${endpoint}?filter=cash`;
                }

                const response = await fetch(fetchUrl);
                const data = await response.json();
                if (Array.isArray(data)) {
                    setStocks(data);
                }
            } catch (error) {
                console.error(`Error fetching ${title}:`, error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [endpoint, title]);

    if (loading) return <div style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Loading {title}...</div>;
    if (stocks.length === 0) return null; // Don't show empty sections

    const displayStocks = expanded ? stocks : stocks.slice(0, 20);
    const remainingCount = stocks.length - 20;

    // Styles based on type (breakout/gainer = green, breakdown/loser = red)
    const isPositive = type === 'positive';
    const pillBg = isPositive ? '#e8f5e9' : '#ffebee'; // Light Green / Light Red
    const pillColor = isPositive ? '#2e7d32' : '#c62828'; // Dark Green / Dark Red
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
                            padding: '8px 16px',
                            borderRadius: '20px',
                            background: '#e0e0e0',
                            color: '#333',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                        }}
                    >
                        +{remainingCount} more
                    </button>
                )}

                {expanded && (
                    <button
                        onClick={() => setExpanded(false)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '20px',
                            background: '#e0e0e0',
                            color: '#333',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Show Less
                    </button>
                )}
            </div>
        </div>
    );
};

function StockSelection() {
    const [activeTab, setActiveTab] = useState('breakout');

    return (
        <div className="container" style={{ padding: '100px 1rem 2rem', minHeight: '100vh' }}>
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                    Stock <span className="premium-gradient-text">Selection</span>
                </h1>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Swing & Intraday Opportunities
                </p>
            </header>

            {/* Tabs */}
            <div className="glass-card" style={{ padding: '0.5rem', display: 'inline-flex', gap: '0.5rem', marginBottom: '2rem', left: '50%', position: 'relative', transform: 'translateX(-50%)' }}>
                <button
                    onClick={() => setActiveTab('breakout')}
                    style={{
                        padding: '10px 20px',
                        borderRadius: '10px',
                        border: 'none',
                        background: activeTab === 'breakout' ? 'var(--accent-primary)' : 'transparent',
                        color: activeTab === 'breakout' ? '#000' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease'
                    }}
                >
                    Breakout Stocks (5/15 min)
                </button>
                <button
                    onClick={() => setActiveTab('shortterm')}
                    style={{
                        padding: '10px 20px',
                        borderRadius: '10px',
                        border: 'none',
                        background: activeTab === 'shortterm' ? 'var(--accent-primary)' : 'transparent',
                        color: activeTab === 'shortterm' ? '#000' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease'
                    }}
                >
                    Short Term Breakout Stocks
                </button>
            </div>

            {/* Content Area */}
            <div className="glass-card animate-fade" style={{ padding: '2rem', minHeight: '400px' }}>
                {activeTab === 'breakout' && (
                    <>
                        <StockSection title="5 Mins Breakout" endpoint="5minbreakout" type="positive" />
                        <StockSection title="5 Mins Breakdown" endpoint="5minbreakdown" type="negative" />
                        <StockSection title="15 Mins Breakout" endpoint="15minbreakout" type="positive" />
                        <StockSection title="15 Mins Breakdown" endpoint="15minbreakdown" type="negative" />
                    </>
                )}

                {activeTab === 'shortterm' && (
                    <>
                        <StockSection title="Hourly Gainers" endpoint="hourlygainers" type="positive" />
                        <StockSection title="Hourly Losers" endpoint="hourlylosers" type="negative" />
                        <StockSection title="Short Term Breakout (15 Min)" endpoint="shortbo" type="positive" />
                        <StockSection title="Short Term Breakdown (15 Min)" endpoint="shortbd" type="negative" />
                    </>
                )}
            </div>
        </div>
    );
}

export default StockSelection;
