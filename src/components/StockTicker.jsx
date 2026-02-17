import React, { useEffect, useRef } from 'react';

function StockTicker() {
    const container = useRef();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = JSON.stringify({
            "symbols": [
                {
                    "proName": "BSE:SENSEX",
                    "title": "Sensex"
                },
                {
                    "description": "Reliance",
                    "proName": "BSE:RELIANCE"
                },
                {
                    "description": "HDFC Bank",
                    "proName": "BSE:HDFCBANK"
                },
                {
                    "description": "ICICI Bank",
                    "proName": "BSE:ICICIBANK"
                },
                {
                    "description": "Infosys",
                    "proName": "BSE:INFY"
                },
                {
                    "description": "TCS",
                    "proName": "BSE:TCS"
                }
            ],
            "showSymbolLogo": true,
            "colorTheme": "light",
            "isTransparent": false,
            "displayMode": "adaptive",
            "locale": "in"
        });

        if (container.current) {
            container.current.innerHTML = '';
            container.current.appendChild(script);
        }
    }, []);

    return (
        <div className="ticker-wrapper" style={{ padding: 0 }}>
            <div className="tradingview-widget-container" ref={container}>
                <div className="tradingview-widget-container__widget"></div>
            </div>
        </div>
    );
}

export default StockTicker;
