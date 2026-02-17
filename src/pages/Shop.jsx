import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';

// Mock Data
const PRODUCTS = [
    {
        id: 1,
        name: "Ultimate Trading Journal 2024",
        category: "Journals",
        price: "₹10",
        image: "/trading_journal.png",
        tag: "Bestseller"
    },
    {
        id: 2,
        name: "Harshad Mehta 'Big Bull' Poster",
        category: "Wall Posters",
        price: "₹10",
        image: "/harshad_poster.png",
        tag: ""
    },
    {
        id: 3,
        name: "Ratan Tata 'Icon' Poster",
        category: "Wall Posters",
        price: "₹10",
        image: "/ratan_poster.png",
        tag: ""
    },
    {
        id: 4,
        name: "Pro Trading Monitor 27\" 144Hz",
        category: "PC Setup",
        price: "₹10",
        image: "/trading_monitor.png",
        tag: "High Refresh"
    },
    {
        id: 5,
        name: "Trading Station CPU (i7, 32GB)",
        category: "PC Setup",
        price: "₹10",
        image: "/trading_cpu.png",
        tag: "Powerhouse"
    },
    {
        id: 6,
        name: "Leather Bound Trader's Log",
        category: "Journals",
        price: "₹10",
        image: "/trading_journal.png",
        tag: "Premium"
    }
];

const CATEGORIES = ["All", "Journals", "Wall Posters", "PC Setup"];

import PurchaseModal from '../components/PurchaseModal';

function Shop() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedProduct, setSelectedProduct] = useState(null);

    const filteredProducts = selectedCategory === "All"
        ? PRODUCTS
        : PRODUCTS.filter(p => p.category === selectedCategory);

    const handleBuy = (product) => {
        setSelectedProduct(product);
    };

    const handleClose = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="container" style={{ padding: '120px 1rem 2rem' }}>
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Our <span className="premium-gradient-text">Merchandise</span></h1>
                <p style={{ color: 'var(--text-secondary)' }}>Premium gear to elevate your trading setup and mindset.</p>
            </header>

            <div className="shop-layout" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                {/* Filters - Responsive Top Bar for now, could be sidebar on large screens */}
                <div className="filters" style={{
                    display: 'flex',
                    gap: '1rem',
                    overflowX: 'auto',
                    paddingBottom: '1rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            style={{
                                background: selectedCategory === cat ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                                color: '#fff',
                                border: '1px solid var(--glass-border)',
                                padding: '8px 20px',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                fontSize: '0.9rem'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '2rem'
                }}>
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} onBuy={handleBuy} />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                        No products found in this category.
                    </div>
                )}
            </div>

            {selectedProduct && (
                <PurchaseModal product={selectedProduct} onClose={handleClose} />
            )}
        </div>
    );
}

export default Shop;
