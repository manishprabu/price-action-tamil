import React, { useState, useEffect } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';

function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <DashboardOverview />;
            case 'courses':
                return <ManageCourses />;
            case 'shop':
                return <ManageShop />;
            case 'community':
                return <ManageCommunity />;
            case 'users':
                return <ManageUsers />;
            default:
                return <DashboardOverview />;
        }
    };

    return (
        <div className="admin-container">
            {/* Sidebar */}
            <div className="glass-card admin-sidebar">
                <h3 style={{ marginBottom: '2rem', color: 'var(--accent-primary)' }}>Admin Panel</h3>
                <ul>
                    {['Dashboard', 'Courses', 'Shop', 'Community', 'Users'].map((item) => {
                        const tabKey = item.toLowerCase();
                        return (
                            <li
                                key={tabKey}
                                onClick={() => setActiveTab(tabKey)}
                                style={{
                                    cursor: 'pointer',
                                    padding: '10px',
                                    borderRadius: '10px',
                                    background: activeTab === tabKey ? 'var(--accent-primary)' : 'transparent',
                                    color: activeTab === tabKey ? '#000' : 'var(--text-secondary)',
                                    fontWeight: activeTab === tabKey ? 'bold' : 'normal',
                                    transition: 'all 0.3s'
                                }}
                            >
                                {item}
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Main Content */}
            <div className="admin-content">
                <div className="container" style={{ padding: 0 }}>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

// Sub-components for sections

// Mock Data for Charts
const SALES_DATA = [
    { name: 'Jan', sales: 4000, profit: 2400 },
    { name: 'Feb', sales: 3000, profit: 1398 },
    { name: 'Mar', sales: 2000, profit: 9800 },
    { name: 'Apr', sales: 2780, profit: 3908 },
    { name: 'May', sales: 1890, profit: 4800 },
    { name: 'Jun', sales: 2390, profit: 3800 },
    { name: 'Jul', sales: 3490, profit: 4300 },
];

const USER_ACTIVITY_DATA = [
    { name: 'Mon', users: 120 },
    { name: 'Tue', users: 200 },
    { name: 'Wed', users: 150 },
    { name: 'Thu', users: 300 },
    { name: 'Fri', users: 250 },
    { name: 'Sat', users: 400 },
    { name: 'Sun', users: 380 },
];

const COURSE_DISTRIBUTION = [
    { name: 'Price Action', value: 400 },
    { name: 'Options', value: 300 },
    { name: 'Swing Trading', value: 300 },
    { name: 'Crypto', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function DashboardOverview() {
    return (
        <div>
            <h2 style={{ marginBottom: '2rem' }}>Dashboard Overview</h2>

            {/* Stats Cards */}
            <div className="stat-grid" style={{ marginBottom: '2rem' }}>
                <StatCard title="Total Users" value="1,245" change="+12%" />
                <StatCard title="Active Students" value="856" change="+5%" />
                <StatCard title="Total Sales" value="₹45.2L" change="+18%" />
                <StatCard title="Community Members" value="3,400" change="+8%" />
            </div>

            <div className="charts-grid" style={{ marginBottom: '2rem' }}>

                {/* Sales & Profit Chart */}
                <div className="glass-card chart-card" style={{ padding: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>Revenue Analytics</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={SALES_DATA}>
                            <defs>
                                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="var(--text-secondary)" />
                            <YAxis stroke="var(--text-secondary)" />
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <RechartsTooltip
                                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid var(--glass-border)' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Legend />
                            <Area type="monotone" dataKey="sales" stroke="#8884d8" fillOpacity={1} fill="url(#colorSales)" />
                            <Area type="monotone" dataKey="profit" stroke="#82ca9d" fillOpacity={1} fill="url(#colorProfit)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* User Activity Bar Chart */}
                <div className="glass-card chart-card" style={{ padding: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>Weekly User Activity</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={USER_ACTIVITY_DATA}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="name" stroke="var(--text-secondary)" />
                            <YAxis stroke="var(--text-secondary)" />
                            <RechartsTooltip
                                cursor={{ fill: 'rgba(255,255,255,0.1)' }}
                                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid var(--glass-border)' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Legend />
                            <Bar dataKey="users" fill="var(--accent-primary)" radius={[10, 10, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Course Distribution Pie Chart */}
                <div className="glass-card chart-card" style={{ padding: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>Course Distribution</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={COURSE_DISTRIBUTION}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                label
                            >
                                {COURSE_DISTRIBUTION.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <RechartsTooltip
                                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid var(--glass-border)' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    );
}

function StatCard({ title, value, change }) {
    return (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{title}</p>
            <h3 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{value}</h3>
            <span style={{ color: '#4ade80', fontSize: '0.9rem' }}>{change} from last month</span>
        </div>
    );
}

function ManageCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [editCourse, setEditCourse] = useState(null);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [uploadProgress, setUploadProgress] = useState(0);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        validity: '3 months',
        recordings: [{ title: '', file: null, s3Key: null }]
    });

    const VALIDITY_OPTIONS = [
        '1 month',
        '3 months',
        '6 months',
        '1 year'
    ];

    const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/proxy$/, '') || '';

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch(`${apiUrl}/admin/courses`, {
                headers: { 'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}` }
            });
            if (response.ok) {
                const data = await response.json();
                setCourses(data);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleRecordingChange = (index, field, value) => {
        const newRecordings = [...formData.recordings];
        newRecordings[index][field] = value;
        setFormData({ ...formData, recordings: newRecordings });
    };

    const addRecordingRow = () => {
        setFormData({
            ...formData,
            recordings: [...formData.recordings, { title: '', file: null, s3Key: null }]
        });
    };

    const removeRecordingRow = (index) => {
        const newRecordings = formData.recordings.filter((_, i) => i !== index);
        setFormData({ ...formData, recordings: newRecordings });
    };

    const handleSaveCourse = async (e) => {
        e.preventDefault();

        if (formData.recordings.length === 0) {
            setStatus({ type: 'error', message: 'At least one recording is required.' });
            return;
        }

        setLoading(true);
        setUploadProgress(0);
        setStatus({ type: 'info', message: 'Processing course...' });

        try {
            const finalRecordings = [];

            for (let i = 0; i < formData.recordings.length; i++) {
                const rec = formData.recordings[i];

                if (rec.file) {
                    setStatus({ type: 'info', message: `Uploading recording ${i + 1}: ${rec.title}...` });

                    const urlResponse = await fetch(`${apiUrl}/admin/courses/upload-url`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
                        },
                        body: JSON.stringify({
                            fileName: rec.file.name,
                            contentType: rec.file.type
                        })
                    });

                    if (!urlResponse.ok) throw new Error(`Failed to get upload URL for ${rec.title}`);
                    const { uploadUrl, s3Key } = await urlResponse.json();

                    // Upload to S3 directly
                    await new Promise((resolve, reject) => {
                        const xhr = new XMLHttpRequest();
                        xhr.open('PUT', uploadUrl);
                        xhr.setRequestHeader('Content-Type', rec.file.type);

                        xhr.upload.onprogress = (event) => {
                            if (event.lengthComputable) {
                                const percent = Math.round((event.loaded / event.total) * 100);
                                setUploadProgress(percent);
                            }
                        };

                        xhr.onload = () => {
                            if (xhr.status === 200) resolve();
                            else reject(new Error(`S3 Upload Failed for ${rec.title}`));
                        };
                        xhr.onerror = () => reject(new Error(`Network Error during upload of ${rec.title}`));
                        xhr.send(rec.file);
                    });

                    finalRecordings.push({ title: rec.title, s3Key });
                } else if (rec.s3Key) {
                    // Existing recording
                    finalRecordings.push({ title: rec.title, s3Key: rec.s3Key });
                }
            }

            // 2. Save metadata to DynamoDB
            const method = editCourse ? 'PUT' : 'POST';
            const endpoint = editCourse ? `${apiUrl}/admin/courses/${editCourse.courseId}` : `${apiUrl}/admin/courses`;

            const metaResponse = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
                },
                body: JSON.stringify({
                    name: formData.name,
                    price: parseFloat(formData.price),
                    validity: formData.validity,
                    recordings: finalRecordings
                })
            });

            if (!metaResponse.ok) throw new Error('Failed to save course metadata');

            setStatus({ type: 'success', message: `Course ${editCourse ? 'updated' : 'created'} successfully!` });
            setTimeout(() => {
                setIsAdding(false);
                setEditCourse(null);
                setFormData({ name: '', price: '', validity: '3 months', recordings: [{ title: '', file: null, s3Key: null }] });
                fetchCourses();
            }, 1500);
        } catch (error) {
            console.error('Error:', error);
            setStatus({ type: 'error', message: error.message });
        } finally {
            setLoading(false);
            setUploadProgress(0);
        }
    };

    const handleDeleteCourse = async (id) => {
        if (!window.confirm('Are you sure you want to delete this course?')) return;

        try {
            const response = await fetch(`${apiUrl}/admin/courses/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}` }
            });
            if (response.ok) {
                fetchCourses();
            }
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    const handleEditClick = (course) => {
        setEditCourse(course);
        setFormData({
            name: course.name,
            price: course.price,
            validity: course.validity,
            recordings: course.recordings?.length > 0 ?
                course.recordings.map(r => ({ ...r, file: null })) :
                [{ title: '', file: null, s3Key: null }]
        });
        setIsAdding(true);
    };

    if (isAdding) {
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2>{editCourse ? 'Edit Course' : 'Add New Course'}</h2>
                    <button className="premium-btn" style={{ padding: '8px 20px' }} onClick={() => { setIsAdding(false); setEditCourse(null); }}>Back to List</button>
                </div>

                <div className="glass-card" style={{ padding: '2rem', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
                    <form onSubmit={handleSaveCourse} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {status.message && (
                            <div style={{
                                padding: '10px', borderRadius: '10px',
                                background: status.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(74, 222, 128, 0.1)',
                                color: status.type === 'error' ? '#f87171' : '#4ade80',
                                border: `1px solid ${status.type === 'error' ? '#f87171' : '#4ade80'}`
                            }}>
                                {status.message}
                            </div>
                        )}

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Course Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                style={{ width: '100%', padding: '12px', borderRadius: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: '#fff' }}
                            />
                        </div>

                        <div className="stat-grid" style={{ gap: '1rem', marginBottom: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Price (₹)</label>
                                <input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    required
                                    style={{ width: '100%', padding: '12px', borderRadius: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: '#fff' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Validity</label>
                                <select
                                    value={formData.validity}
                                    onChange={(e) => setFormData({ ...formData, validity: e.target.value })}
                                    style={{ width: '100%', padding: '12px', borderRadius: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: '#fff' }}
                                >
                                    {VALIDITY_OPTIONS.map(opt => <option key={opt} value={opt} style={{ background: '#000' }}>{opt}</option>)}
                                </select>
                            </div>
                        </div>


                        <div style={{ marginTop: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <label style={{ color: 'var(--text-secondary)', fontWeight: 'bold' }}>Recordings</label>
                                <button
                                    type="button"
                                    onClick={addRecordingRow}
                                    style={{ background: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', border: '1px solid #4ade80', padding: '5px 12px', borderRadius: '5px', cursor: 'pointer', fontSize: '0.8rem' }}
                                >
                                    + Add Recording
                                </button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {formData.recordings.map((rec, index) => (
                                    <div key={index} className="recording-row" style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--glass-border)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Recording #{index + 1}</span>
                                            {formData.recordings.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeRecordingRow(index)}
                                                    style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.8rem' }}
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                            <input
                                                type="text"
                                                placeholder="Recording Title (e.g. Session 01)"
                                                value={rec.title}
                                                onChange={(e) => handleRecordingChange(index, 'title', e.target.value)}
                                                required
                                                style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: '#fff' }}
                                            />
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <input
                                                    type="file"
                                                    accept="video/*"
                                                    onChange={(e) => handleRecordingChange(index, 'file', e.target.files[0])}
                                                    required={!rec.s3Key}
                                                    style={{ flex: 1, padding: '8px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: '#fff' }}
                                                />
                                                {rec.s3Key && !rec.file && (
                                                    <span style={{ fontSize: '0.7rem', color: '#4ade80' }}>✓ Video Uploaded</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {loading && uploadProgress > 0 && (
                            <div style={{ marginTop: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem' }}>
                                    <span>Uploading...</span>
                                    <span>{uploadProgress}%</span>
                                </div>
                                <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{ width: `${uploadProgress}%`, height: '100%', background: 'var(--accent-primary)', transition: 'width 0.3s' }} />
                                </div>
                            </div>
                        )}

                        <button
                            className="premium-btn"
                            style={{ marginTop: '1rem', width: '100%', opacity: loading ? 0.7 : 1 }}
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : (editCourse ? 'Update Course' : 'Upload & Create Course')}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h2>Manage Courses</h2>
                <button
                    className="premium-btn"
                    style={{ padding: '8px 20px' }}
                    onClick={() => { setIsAdding(true); setStatus({ type: '', message: '' }); }}
                >
                    + Add New Course
                </button>
            </div>

            <div className="glass-card" style={{ padding: '1rem' }}>
                <div className="table-responsive">
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)', minWidth: '600px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
                                <th style={{ padding: '1rem' }}>Course Name</th>
                                <th style={{ padding: '1rem' }}>Price</th>
                                <th style={{ padding: '1rem' }}>Validity</th>
                                <th style={{ padding: '1rem' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.length === 0 ? (
                                <tr>
                                    <td colSpan="4" style={{ padding: '2rem', textAlign: 'center' }}>No courses found. Add your first course!</td>
                                </tr>
                            ) : (
                                courses.map(course => (
                                    <tr key={course.courseId} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '1rem', color: '#fff' }}>
                                            <div>{course.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                                {course.recordings?.length || 0} Recordings
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem' }}>₹{course.price}</td>
                                        <td style={{ padding: '1rem' }}>{course.validity}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span
                                                style={{ color: 'var(--accent-primary)', cursor: 'pointer', marginRight: '1.5rem' }}
                                                onClick={() => handleEditClick(course)}
                                            >
                                                Edit
                                            </span>
                                            <span
                                                style={{ color: '#ef4444', cursor: 'pointer' }}
                                                onClick={() => handleDeleteCourse(course.courseId)}
                                            >
                                                Delete
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function ManageShop() {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Manage Shop</h2>
                <button className="premium-btn" style={{ padding: '8px 20px' }}>+ Add Product</button>
            </div>
            <div className="glass-card" style={{ padding: '1rem' }}>
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Shop management interface...</p>
            </div>
        </div>
    );
}

function ManageCommunity() {
    return (
        <div>
            <h2 style={{ marginBottom: '2rem' }}>Manage Community</h2>
            <div style={{ display: 'grid', gap: '2rem' }}>
                <div className="glass-card" style={{ padding: '2rem' }}>
                    <h3>Update Live Mentorship Image</h3>
                    <input type="file" style={{ marginTop: '1rem', width: '100%' }} />
                    <button className="premium-btn" style={{ marginTop: '1rem', padding: '10px 20px', width: '100%' }}>Upload</button>
                </div>
                <div className="glass-card" style={{ padding: '2rem' }}>
                    <h3>Post Announcement</h3>
                    <textarea style={{ width: '100%', height: '100px', marginTop: '1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: '#fff', padding: '10px' }} placeholder="Write your announcement..."></textarea>
                    <button className="premium-btn" style={{ marginTop: '1rem', padding: '10px 20px', width: '100%' }}>Post</button>
                </div>
            </div>
        </div>
    );
}

function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newUser, setNewUser] = useState({ email: '', phone: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    const [assignmentForm, setAssignmentForm] = useState({
        courseId: '',
        expiryDate: ''
    });

    const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/proxy$/, '') || '';

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [usersRes, coursesRes] = await Promise.all([
                fetch(`${apiUrl}/admin/users`, {
                    headers: { 'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}` }
                }),
                fetch(`${apiUrl}/admin/courses`, {
                    headers: { 'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}` }
                })
            ]);

            if (usersRes.ok) setUsers(await usersRes.json());
            if (coursesRes.ok) setCourses(await coursesRes.json());
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: 'info', message: 'Creating user...' });

        try {
            const response = await fetch(`${apiUrl}/admin/create-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
                },
                body: JSON.stringify(newUser)
            });

            const data = await response.json();
            if (response.ok) {
                setStatus({ type: 'success', message: 'User created successfully!' });
                setNewUser({ email: '', phone: '' });
                setTimeout(() => {
                    setShowAddModal(false);
                    setStatus({ type: '', message: '' });
                }, 1000);
                fetchData();
            } else {
                throw new Error(data.error || 'Failed to create user');
            }
        } catch (error) {
            setStatus({ type: 'error', message: error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveCourse = async (email, courseId) => {
        if (!window.confirm('Are you sure you want to remove this course from the user?')) return;

        try {
            const response = await fetch(`${apiUrl}/admin/remove-course`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
                },
                body: JSON.stringify({ email, courseId })
            });

            if (response.ok) {
                fetchData();
            } else {
                const data = await response.json();
                throw new Error(data.error || 'Failed to remove course');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDeleteUser = async (email) => {
        if (!window.confirm(`Are you sure you want to PERMANENTLY delete user ${email}? This cannot be undone.`)) return;

        try {
            const response = await fetch(`${apiUrl}/admin/delete-user?email=${encodeURIComponent(email)}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
                }
            });

            if (response.ok) {
                fetchData();
            } else {
                const data = await response.json();
                throw new Error(data.error || 'Failed to delete user');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const handleCourseSelect = (courseId) => {
        const course = courses.find(c => c.courseId === courseId);
        if (course) {
            const expiry = new Date();
            const valMatch = (course.validity || "3 months").match(/(\d+)\s*(month|year)/);
            if (valMatch) {
                const num = parseInt(valMatch[1]);
                const unit = valMatch[2];
                if (unit === 'month') expiry.setMonth(expiry.getMonth() + num);
                if (unit === 'year') expiry.setFullYear(expiry.getFullYear() + num);
            } else {
                expiry.setMonth(expiry.getMonth() + 3);
            }
            setAssignmentForm({
                courseId,
                expiryDate: expiry.toISOString().split('T')[0]
            });
        } else {
            setAssignmentForm({ courseId: '', expiryDate: '' });
        }
    };

    const handleAssignCourse = async (e) => {
        e.preventDefault();
        if (!selectedUser || !assignmentForm.courseId) return;

        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/admin/assign-course`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
                },
                body: JSON.stringify({
                    email: selectedUser.email,
                    courseId: assignmentForm.courseId
                })
            });

            if (response.ok) {
                setShowAssignModal(false);
                fetchData();
            } else {
                const data = await response.json();
                throw new Error(data.error || 'Assignment failed');
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(u =>
        u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.phone?.includes(searchTerm)
    );

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ margin: 0 }}>User Management</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        style={{ padding: '8px 15px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--accent-primary)', color: '#fff', width: '250px' }}
                    />
                    <button
                        className="premium-btn"
                        style={{ padding: '8px 20px', whiteSpace: 'nowrap' }}
                        onClick={() => setShowAddModal(true)}
                    >
                        + Add New User
                    </button>
                </div>
            </div>

            {/* Users Table */}
            <div className="glass-card" style={{ padding: '1rem' }}>
                <div className="table-responsive">
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)', minWidth: '800px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
                                <th style={{ padding: '1rem' }}>User / Identity</th>
                                <th style={{ padding: '1rem' }}>Courses Access</th>
                                <th style={{ padding: '1rem' }}>Status</th>
                                <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.length === 0 ? (
                                <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center' }}>No users found matching your search.</td></tr>
                            ) : (
                                currentUsers.map(user => (
                                    <tr key={user.email} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ color: '#fff', fontWeight: '500' }}>{user.email}</div>
                                            <div style={{ fontSize: '0.8rem' }}>{user.phone || 'No phone'}</div>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            {user.courses?.length > 0 ? (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                    {user.courses.map((c, i) => (
                                                        <div key={i} style={{
                                                            fontSize: '0.75rem',
                                                            background: 'rgba(255,255,255,0.03)',
                                                            padding: '4px 8px',
                                                            borderRadius: '6px',
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            border: '1px solid rgba(255,255,255,0.05)'
                                                        }}>
                                                            <span>{c.courseTitle} <span style={{ color: 'var(--accent-primary)', marginLeft: '5px' }}>({c.expiryDate})</span></span>
                                                            <button
                                                                onClick={() => handleRemoveCourse(user.email, c.courseId)}
                                                                style={{ background: 'transparent', border: 'none', color: '#ff4757', cursor: 'pointer', padding: '0 4px', fontSize: '1rem', fontWeight: 'bold' }}
                                                                title="Remove Access"
                                                            >
                                                                &times;
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span style={{ fontSize: '0.8rem', fontStyle: 'italic', opacity: 0.5 }}>No active courses</span>
                                            )}
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', background: user.status === 'Active' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: user.status === 'Active' ? '#4ade80' : '#f87171' }}>
                                                {user.status || 'Active'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                                <button
                                                    onClick={() => { setSelectedUser(user); setShowAssignModal(true); }}
                                                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                                                >
                                                    Assign Course
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteUser(user.email)}
                                                    style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                                                >
                                                    Delete User
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            style={{ padding: '5px 10px', borderRadius: '5px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: '#fff', cursor: 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}
                        >
                            Prev
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                style={{
                                    padding: '5px 12px',
                                    borderRadius: '5px',
                                    background: currentPage === i + 1 ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                                    border: '1px solid var(--glass-border)',
                                    color: currentPage === i + 1 ? 'black' : '#fff',
                                    cursor: 'pointer'
                                }}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            style={{ padding: '5px 10px', borderRadius: '5px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: '#fff', cursor: 'pointer', opacity: currentPage === totalPages ? 0.5 : 1 }}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            {/* Add User Modal */}
            {showAddModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1001, padding: '1rem' }}>
                    <div className="glass-card" style={{ padding: '2rem 1.5rem', maxWidth: '450px', width: '100%', position: 'relative' }}>
                        <button onClick={() => setShowAddModal(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                        <h3 style={{ marginBottom: '2rem', color: 'var(--accent-primary)', fontSize: '1.5rem' }}>Add New Student</h3>

                        <form onSubmit={handleAddUser} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {status.message && (
                                <div style={{
                                    padding: '12px', borderRadius: '8px',
                                    background: status.type === 'error' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(74, 222, 128, 0.15)',
                                    color: status.type === 'error' ? '#f87171' : '#4ade80',
                                    border: `1px solid ${status.type === 'error' ? '#f87171' : '#4ade80'}`
                                }}>{status.message}</div>
                            )}
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="student@example.com"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    required
                                    style={{ width: '100%', padding: '12px', borderRadius: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: '#fff' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Phone Number (Optional)</label>
                                <input
                                    type="tel"
                                    placeholder="+91 98765 43210"
                                    value={newUser.phone}
                                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                                    style={{ width: '100%', padding: '12px', borderRadius: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: '#fff' }}
                                />
                            </div>
                            <button className="premium-btn" disabled={loading} style={{ marginTop: '1rem', padding: '14px' }}>
                                {loading ? 'Creating Account...' : 'Create Student Account'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Assign Course Modal */}
            {showAssignModal && selectedUser && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1001, padding: '1rem' }}>
                    <div className="glass-card" style={{ padding: '2rem 1.5rem', maxWidth: '450px', width: '100%', position: 'relative' }}>
                        <button onClick={() => setShowAssignModal(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--accent-primary)', fontSize: '1.5rem' }}>Assign Course</h3>
                        <p style={{ marginBottom: '2rem', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', textAlign: 'center' }}>
                            Assigning to: <span style={{ color: '#fff' }}>{selectedUser.email}</span>
                        </p>

                        <form onSubmit={handleAssignCourse} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Choose Course</label>
                                <select
                                    value={assignmentForm.courseId}
                                    onChange={(e) => handleCourseSelect(e.target.value)}
                                    required
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: '#fff' }}
                                >
                                    <option value="">-- Select from library --</option>
                                    {courses
                                        .filter(c => !selectedUser.courses?.some(uc => uc.courseId === c.courseId))
                                        .map(c => <option key={c.courseId} value={c.courseId} style={{ background: '#000' }}>{c.name}</option>)}
                                </select>

                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Access Expires On</label>
                                <input
                                    type="date"
                                    value={assignmentForm.expiryDate}
                                    onChange={(e) => setAssignmentForm({ ...assignmentForm, expiryDate: e.target.value })}
                                    required
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: '#fff' }}
                                />
                                <p style={{ fontSize: '0.7rem', marginTop: '5px', color: 'var(--accent-primary)', opacity: 0.8 }}>* Auto-calculated based on course validity</p>
                            </div>

                            <button className="premium-btn" disabled={loading} style={{ marginTop: '1rem', padding: '14px' }}>
                                {loading ? 'Processing...' : 'Grant Access'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;
