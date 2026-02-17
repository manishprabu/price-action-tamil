import React from 'react';
import StockHeatmap from '../components/StockHeatmap';

function MarketOverview() {
    return (
        <div className="container" style={{ padding: '100px 1rem 2rem', height: '140vh', display: 'flex', flexDirection: 'column' }}>
            <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Market <span className="premium-gradient-text">Overview</span></h1>
                <p style={{ color: 'var(--text-secondary)' }}>Visualizing Indian Market Sector Performance</p>
            </header>

            <div className="glass-card" style={{ flex: 1, padding: '1rem', height: '100%', overflow: 'hidden' }}>
                <StockHeatmap />
            </div>
        </div>
    );
}

export default MarketOverview;
