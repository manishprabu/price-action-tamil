import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const STATIC_COURSES = [
    {
        id: 1,
        title: "Price Action Mastery",
        progress: 45,
        thumbnail: "https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&q=80&w=1000",
        lastWatched: "Module 3: Candlestick Patterns"
    },
    {
        id: 2,
        title: "Option Buying Strategy",
        progress: 10,
        thumbnail: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=1000",
        lastWatched: "Introduction to Greeks"
    },
    {
        id: 3,
        title: "Swing Trading Secrets",
        progress: 0,
        thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=1000",
        lastWatched: "Not Started"
    }
];

function PurchasedCourses() {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Load assigned courses from localStorage
        const assignedCourses = JSON.parse(localStorage.getItem('assignedCourses') || '[]');

        // Filter for current user (if user is logged in)
        const userAssignments = user ? assignedCourses.filter(a => a.username === user.username) : [];

        // Map assignments to course object structure
        const dynamicCourses = userAssignments.map((assignment, index) => ({
            id: `assigned-${index}`,
            title: assignment.courseTitle || 'Assigned Course',
            progress: 0,
            thumbnail: "https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&q=80&w=1000",
            lastWatched: "Not Started",
            expiryDate: assignment.expiryDate
        }));

        // Combine static demo courses with dynamically assigned ones
        setCourses([...STATIC_COURSES, ...dynamicCourses]);
    }, [user]);

    return (
        <div className="container" style={{ padding: '120px 1rem 4rem' }}>
            <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>My <span className="premium-gradient-text">Learning</span></h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Continue where you left off.</p>
                </div>
                <div className="glass-card" style={{ padding: '10px 20px', borderRadius: '50px' }}>
                    <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>{courses.length}</span> Active Courses
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                {courses.map(course => (
                    <div key={course.id} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ position: 'relative', height: '180px' }}>
                            <img
                                src={course.thumbnail}
                                alt={course.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{
                                position: 'absolute',
                                bottom: '10px',
                                right: '10px',
                                background: 'rgba(0,0,0,0.8)',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '0.8rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px'
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                                Play
                            </div>
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
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{course.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                {course.progress > 0 ? `Last watched: ${course.lastWatched}` : 'Start your journey'}
                            </p>

                            <div style={{ marginTop: 'auto' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '5px', color: 'var(--text-secondary)' }}>
                                    <span>Progress</span>
                                    <span>{course.progress}%</span>
                                </div>
                                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{ width: `${course.progress}%`, height: '100%', background: 'var(--accent-primary)', borderRadius: '3px' }}></div>
                                </div>

                                <button className="premium-btn" style={{ width: '100%', marginTop: '1.5rem', padding: '10px', fontSize: '0.95rem' }}>
                                    {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                                </button>
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
