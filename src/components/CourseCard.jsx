import React from 'react';
import { Link } from 'react-router-dom';

function CourseCard({ title, price, features }) {
    return (
        <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{title}</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-primary)', marginBottom: '1.5rem' }}>{price}</div>
            <ul style={{ listStyle: 'none', marginBottom: '2.5rem', flex: 1 }}>
                {features.map((f, i) => (
                    <li key={i} style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: 'var(--accent-primary)' }}>✓</span> {f}
                    </li>
                ))}
            </ul>
            <Link to="/community" style={{ width: '100%', textDecoration: 'none' }}>
                <button className="premium-btn" style={{ width: '100%' }}>Enroll Now</button>
            </Link>
        </div>
    );
}

export default CourseCard;
