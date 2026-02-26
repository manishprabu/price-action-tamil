import React, { useState, useEffect } from 'react';

/**
 * NSEHeatmap Component
 * Fetches constituent data from IntradayScreener via Proxy
 * Renders a premium, interactive grid of stock tiles.
 */
function NSEHeatmap({ index = "Nifty 50" }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHeatmapData = async () => {
            setLoading(true);
            setError(null);
            try {
                const isSensex = index === 'Sensex';
                let targetUrl;
                let fetchUrl;

                if (isSensex) {
                    targetUrl = 'https://www.5paisa.com/share-market-today/indices-heatmap/bse-sensex';
                } else {
                    const apiIndexMap = {
                        'Nifty 50': 'NIFTY 50',
                        'Bank Nifty': 'NIFTY BANK',
                        'Fin Nifty': 'NIFTY FINANCIAL SERVICES'
                    };
                    const indexName = apiIndexMap[index] || index;
                    targetUrl = `https://www.nseindia.com/api/equity-stockIndices?index=${encodeURIComponent(indexName)}`;
                }

                if (import.meta.env.VITE_API_URL) {
                    fetchUrl = `${import.meta.env.VITE_API_URL}?url=${encodeURIComponent(targetUrl)}`;
                } else {
                    fetchUrl = isSensex
                        ? `/api/5paisa/bse-sensex` // This would need local proxy config if tested locally
                        : `/api/nse/equity-stockIndices?index=${encodeURIComponent(index)}`;
                }

                const response = await fetch(fetchUrl);
                if (!response.ok) throw new Error(`Failed to fetch heatmap data for ${index}`);

                if (isSensex) {
                    const html = await response.text();
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    const boxes = doc.querySelectorAll('.paisa-heatmap__box');

                    const sensexStocks = Array.from(boxes).map(box => {
                        const symbol = box.querySelector('.paisa__companytxt')?.textContent?.trim();
                        const lastPriceStr = box.querySelector('.paisa__valuetxt')?.textContent?.trim() || '0';
                        const pChangeStr = box.querySelector('.paisa__pertxt')?.textContent?.trim() || '0%';

                        return {
                            symbol,
                            lastPrice: parseFloat(lastPriceStr.replace(/,/g, '')),
                            pChange: parseFloat(pChangeStr.replace('%', ''))
                        };
                    }).filter(s => s.symbol);

                    setData(sensexStocks.sort((a, b) => b.pChange - a.pChange));
                } else {
                    const result = await response.json();
                    if (result && Array.isArray(result.data)) {
                        const indexName = index === 'Nifty 50' ? 'NIFTY 50' : (index === 'Bank Nifty' ? 'NIFTY BANK' : 'NIFTY FINANCIAL SERVICES');
                        const stocksOnly = result.data.filter(item => (item.priority === 0 || !item.priority) && item.symbol !== indexName);
                        setData(stocksOnly.sort((a, b) => b.pChange - a.pChange));
                    } else {
                        setData([]);
                    }
                }
            } catch (err) {
                console.error('Heatmap Error:', err);
                setError(`Unable to load live ${index} data. Please check your connection.`);
            } finally {
                setLoading(false);
            }
        };

        fetchHeatmapData();
    }, [index]);

    const getTileColor = (change) => {
        const val = parseFloat(change) || 0;
        if (val > 0) {
            const opacity = Math.min(0.2 + (val / 3) * 0.5, 0.8);
            return `rgba(76, 175, 80, ${opacity})`;
        } else if (val < 0) {
            const opacity = Math.min(0.2 + (Math.abs(val) / 3) * 0.5, 0.8);
            return `rgba(244, 67, 54, ${opacity})`;
        }
        return 'rgba(255, 255, 255, 0.05)';
    };

    const getBorderColor = (change) => {
        const val = parseFloat(change) || 0;
        if (val > 0) return 'rgba(76, 175, 80, 0.4)';
        if (val < 0) return 'rgba(244, 67, 54, 0.4)';
        return 'var(--glass-border)';
    };

    if (loading) return (
        <div style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '1rem'
        }}>
            <div className="animate-pulse" style={{ fontSize: '1.2rem', color: 'var(--accent-primary)' }}>
                Constructing {index} Heatmap...
            </div>
            <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Fetching live constituent performance</div>
        </div>
    );

    if (error) return (
        <div style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f44336',
            textAlign: 'center',
            padding: '2rem'
        }}>
            {error}
        </div>
    );

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
            gap: '10px',
            padding: '5px',
            overflowY: 'auto',
            maxHeight: '100%'
        }}>
            {data.map((stock, idx) => (
                <div
                    key={idx}
                    className="glass-card"
                    style={{
                        padding: '12px',
                        background: getTileColor(stock.pChange || 0),
                        border: `1px solid ${getBorderColor(stock.pChange || 0)}`,
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        cursor: 'default',
                        textAlign: 'center',
                        minHeight: '80px'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.zIndex = '10';
                        e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.zIndex = '1';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    <span style={{ fontWeight: '800', fontSize: '0.9rem', color: '#fff', marginBottom: '4px' }}>
                        {stock.symbol}
                    </span>
                    <span style={{ fontSize: '0.75rem', opacity: 0.9, fontWeight: '600' }}>
                        ₹{(stock.lastPrice || 0).toLocaleString('en-IN')}
                    </span>
                    <span style={{
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        marginTop: '4px',
                        color: parseFloat(stock.pChange) >= 0 ? '#4caf50' : '#f44336',
                        background: 'rgba(0,0,0,0.2)',
                        padding: '2px 6px',
                        borderRadius: '4px'
                    }}>
                        {parseFloat(stock.pChange) >= 0 ? '+' : ''}{parseFloat(stock.pChange || 0).toFixed(2)}%
                    </span>
                </div>
            ))}
        </div>
    );
}

export default NSEHeatmap;
