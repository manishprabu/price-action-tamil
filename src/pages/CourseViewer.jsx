import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function CourseViewer() {
    const { courseId } = useParams();
    const { user } = useAuth();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentRecording, setCurrentRecording] = useState(null);

    useEffect(() => {
        if (user && user.email) {
            fetchCourseDetails();
        }
    }, [user, courseId]);

    const fetchCourseDetails = async () => {
        try {
            setLoading(true);
            const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/proxy$/, '') || '';
            const apiKey = import.meta.env.VITE_API_KEY;

            const response = await fetch(`${apiUrl}/student/courses?email=${encodeURIComponent(user.email)}`, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            });

            if (!response.ok) throw new Error('Failed to fetch course details');
            const courses = await response.json();
            const found = courses.find(c => c.courseId === courseId);

            if (!found) {
                throw new Error('Course not found or access expired');
            }

            setCourse(found);
            if (found.recordings && found.recordings.length > 0) {
                setCurrentRecording(found.recordings[0]);
            }
        } catch (err) {
            console.error('Error fetching course:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container" style={{ padding: '120px 1rem', textAlign: 'center' }}>
                <div className="glass-card" style={{ padding: '3rem' }}>
                    <h2 className="premium-gradient-text">Loading course content...</h2>
                </div>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="container" style={{ padding: '120px 1rem', textAlign: 'center' }}>
                <div className="glass-card" style={{ padding: '3rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    <h2 style={{ color: '#ef4444', marginBottom: '1rem' }}>Error</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{error || 'Course not found'}</p>
                    <Link to="/my-courses" className="premium-btn" style={{ padding: '10px 25px', textDecoration: 'none' }}>
                        Back to My Courses
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', padding: '2rem 1rem' }}>

                {/* Main Content: Video Player */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass-card" style={{ padding: '0', overflow: 'hidden', aspectRatio: '16/9', background: '#000', position: 'relative' }}>
                        {currentRecording ? (
                            <video
                                key={currentRecording.url}
                                controls
                                controlsList="nodownload"
                                style={{ width: '100%', height: '100%' }}
                                autoPlay
                            >
                                <source src={currentRecording.url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                                No recording selected
                            </div>
                        )}
                    </div>

                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }} className="premium-gradient-text">
                            {currentRecording?.title || course.name}
                        </h1>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            <span>Course: {course.name}</span>
                            <span>•</span>
                            <span>Expires: {course.expiryDate}</span>
                        </div>
                    </div>
                </div>

                {/* Sidebar: Lessons List */}
                <div className="glass-card" style={{ padding: '1.5rem', height: 'fit-content', position: 'sticky', top: '120px' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
                        Course Content
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {course.recordings?.map((rec, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentRecording(rec)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '12px',
                                    borderRadius: '12px',
                                    background: currentRecording?.title === rec.title ? 'rgba(255,255,255,0.08)' : 'transparent',
                                    border: currentRecording?.title === rec.title ? '1px solid var(--accent-primary)' : '1px solid transparent',
                                    color: currentRecording?.title === rec.title ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    transition: 'all 0.2s ease',
                                    width: '100%'
                                }}
                            >
                                <div style={{
                                    width: '28px',
                                    height: '28px',
                                    borderRadius: '50%',
                                    background: currentRecording?.title === rec.title ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: currentRecording?.title === rec.title ? 'black' : 'var(--text-secondary)',
                                    fontSize: '0.8rem',
                                    fontWeight: 'bold',
                                    flexShrink: 0
                                }}>
                                    {index + 1}
                                </div>
                                <span style={{ fontSize: '0.95rem', fontWeight: currentRecording?.title === rec.title ? '600' : '400' }}>
                                    {rec.title}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(52, 211, 153, 0.05)', borderRadius: '12px', border: '1px solid rgba(52, 211, 153, 0.1)' }}>
                        <p style={{ fontSize: '0.85rem', color: '#34d399', textAlign: 'center' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: 'middle' }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                            Secure Premium Content
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseViewer;
