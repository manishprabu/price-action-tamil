const ProductCard = ({ product, onBuy }) => {
    return (
        <div className="glass-card product-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'transform 0.3s ease' }}>
            <div style={{
                width: '100%',
                aspectRatio: '1/1',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid var(--glass-border)',
                position: 'relative'
            }}>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {product.tag && (
                    <span style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'var(--accent-primary)',
                        color: '#fff',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold'
                    }}>
                        {product.tag}
                    </span>
                )}
            </div>
            <div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{product.category}</div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', lineHeight: '1.4' }}>{product.name}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent-secondary)' }}>{product.price}</span>
                    <button
                        className="premium-btn"
                        style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                        onClick={() => onBuy(product)}
                    >
                        Buy
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;

