import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DEFAULT_THUMBNAIL = "/course-thumbnail.jpeg";

function PurchasedCourses() {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user && user.email) {
            fetchCourses();
        }
    }, [user]);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/proxy$/, '') || '';
            const apiKey = import.meta.env.VITE_API_KEY;

            const response = await fetch(`${apiUrl}/student/courses?email=${encodeURIComponent(user.email)}`, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            });

            if (!response.ok) throw new Error('Failed to fetch courses');
            const data = await response.json();
            setCourses(data);
        } catch (err) {
            console.error('Error fetching courses:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container" style={{ padding: '120px 1rem', textAlign: 'center' }}>
                <div className="glass-card" style={{ padding: '3rem' }}>
                    <h2 className="premium-gradient-text">Loading your courses...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: '120px', paddingBottom: '4rem' }}>
            <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '0.5rem' }}>My <span className="premium-gradient-text">Learning</span></h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Continue where you left off.</p>
                </div>
                <div className="glass-card" style={{ padding: '10px 20px', borderRadius: '50px', whiteSpace: 'nowrap' }}>
                    <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>{courses.length}</span> Active Courses
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {courses.map(course => (
                    <div key={course.courseId} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ position: 'relative', height: '180px' }}>
                            <img
                                src={course.thumbnail || DEFAULT_THUMBNAIL}
                                alt={course.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <Link to={`/course-viewer/${course.courseId}`} style={{
                                position: 'absolute',
                                bottom: '10px',
                                right: '10px',
                                background: 'var(--accent-primary)',
                                color: 'white',
                                padding: '8px 16px',
                                borderRadius: '50px',
                                fontSize: '0.85rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                textDecoration: 'none',
                                fontWeight: '600',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="none"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                                Watch Now
                            </Link>
                            {course.expiryDate && (
                                <div style={{
                                    position: 'absolute',
                                    top: '10px',
                                    left: '10px',
                                    background: 'rgba(239, 68, 68, 0.9)',
                                    color: 'white',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold'
                                }}>
                                    Expires: {course.expiryDate}
                                </div>
                            )}
                        </div>

                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{course.name}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                                {course.recordings?.length || 0} Lessons • Access until {course.expiryDate}
                            </p>

                            <div style={{ marginTop: 'auto' }}>
                                <Link to={`/course-viewer/${course.courseId}`}>
                                    <button className="premium-btn" style={{ width: '100%', padding: '10px', fontSize: '0.95rem' }}>
                                        Open Course
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Explore More Card */}
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', border: '1px dashed var(--glass-border)' }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1rem',
                        color: 'var(--accent-primary)'
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
                    </div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Explore More</h3>
                    <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                        Browse our shop for more courses and trading setups.
                    </p>
                    <Link to="/shop">
                        <button style={{
                            background: 'transparent',
                            border: '1px solid var(--accent-primary)',
                            color: 'var(--accent-primary)',
                            padding: '10px 25px',
                            borderRadius: '50px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}>
                            Go to Shop
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PurchasedCourses;
