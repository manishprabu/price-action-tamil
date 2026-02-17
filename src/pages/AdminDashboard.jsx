import React, { useState } from 'react';
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

            <div className="charts-grid">

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
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h2>Manage Courses</h2>
                <button className="premium-btn" style={{ padding: '8px 20px' }}>+ Add New Course</button>
            </div>
            <div className="glass-card" style={{ padding: '1rem' }}>
                <div className="table-responsive">
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)', minWidth: '600px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
                                <th style={{ padding: '1rem' }}>Course Name</th>
                                <th style={{ padding: '1rem' }}>Price</th>
                                <th style={{ padding: '1rem' }}>Sales</th>
                                <th style={{ padding: '1rem' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '1rem' }}>Indian Market Mastery</td>
                                <td style={{ padding: '1rem' }}>₹14,999</td>
                                <td style={{ padding: '1rem' }}>450</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{ color: 'var(--accent-primary)', cursor: 'pointer', marginRight: '1rem' }}>Edit</span>
                                    <span style={{ color: '#ef4444', cursor: 'pointer' }}>Delete</span>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '1rem' }}>Global Market & Crypto</td>
                                <td style={{ padding: '1rem' }}>₹19,999</td>
                                <td style={{ padding: '1rem' }}>320</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{ color: 'var(--accent-primary)', cursor: 'pointer', marginRight: '1rem' }}>Edit</span>
                                    <span style={{ color: '#ef4444', cursor: 'pointer' }}>Delete</span>
                                </td>
                            </tr>
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
                    <button className="premium-btn" style={{ marginTop: '1rem', padding: '10px 20px' }}>Upload</button>
                </div>
                <div className="glass-card" style={{ padding: '2rem' }}>
                    <h3>Post Announcement</h3>
                    <textarea style={{ width: '100%', height: '100px', marginTop: '1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: '#fff', padding: '10px' }} placeholder="Write your announcement..."></textarea>
                    <button className="premium-btn" style={{ marginTop: '1rem', padding: '10px 20px' }}>Post</button>
                </div>
            </div>
        </div>
    );
}

function ManageUsers() {
    const [newUser, setNewUser] = useState({ username: '', phone: '', password: '' });
    const [assignment, setAssignment] = useState({ username: '', courseId: '', expiryDate: '' });

    const AVAILABLE_COURSES = [
        { id: 1, title: 'Price Action Mastery' },
        { id: 2, title: 'Option Buying Strategy' },
        { id: 3, title: 'Swing Trading Secrets' },
        { id: 4, title: 'Intraday Algo Setup' },
        { id: 5, title: 'Crypto Trading 101' }
    ];

    const handleAddUser = (e) => {
        e.preventDefault();
        alert(`User ${newUser.username} added!`);
        setNewUser({ username: '', phone: '', password: '' });
    };

    const handleAssignCourse = (e) => {
        e.preventDefault();
        if (!assignment.username || !assignment.courseId || !assignment.expiryDate) {
            alert('Please fill all fields');
            return;
        }

        const newAssignment = {
            ...assignment,
            courseTitle: AVAILABLE_COURSES.find(c => c.id === parseInt(assignment.courseId))?.title,
            assignedAt: new Date().toISOString()
        };

        // Save to localStorage for demo purposes
        const existingAssignments = JSON.parse(localStorage.getItem('assignedCourses') || '[]');
        localStorage.setItem('assignedCourses', JSON.stringify([...existingAssignments, newAssignment]));

        alert(`Course assigned to ${assignment.username} valid until ${assignment.expiryDate}`);
        setAssignment({ username: '', courseId: '', expiryDate: '' });
    };

    return (
        <div>
            <h2 style={{ marginBottom: '2rem' }}>Manage Users</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                {/* Add New User Form */}
                <div className="glass-card" style={{ padding: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>Add New User</h3>
                    <form onSubmit={handleAddUser} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={newUser.username}
                            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                            style={{ padding: '10px', borderRadius: '5px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: '#fff' }}
                        />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={newUser.phone}
                            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                            style={{ padding: '10px', borderRadius: '5px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: '#fff' }}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            style={{ padding: '10px', borderRadius: '5px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: '#fff' }}
                        />
                        <button className="premium-btn" style={{ marginTop: '0.5rem' }}>Add User</button>
                    </form>
                </div>

                {/* Assign Course Form */}
                <div className="glass-card" style={{ padding: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>Assign Course</h3>
                    <form onSubmit={handleAssignCourse} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input
                            type="text"
                            placeholder="Username (e.g. demo_user)"
                            value={assignment.username}
                            onChange={(e) => setAssignment({ ...assignment, username: e.target.value })}
                            style={{ padding: '10px', borderRadius: '5px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: '#fff' }}
                        />
                        <select
                            value={assignment.courseId}
                            onChange={(e) => setAssignment({ ...assignment, courseId: e.target.value })}
                            style={{ padding: '10px', borderRadius: '5px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: '#fff' }}
                        >
                            <option value="">Select Course</option>
                            {AVAILABLE_COURSES.map(course => (
                                <option key={course.id} value={course.id}>{course.title}</option>
                            ))}
                        </select>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Expiration Date</label>
                            <input
                                type="date"
                                value={assignment.expiryDate}
                                onChange={(e) => setAssignment({ ...assignment, expiryDate: e.target.value })}
                                style={{ padding: '10px', borderRadius: '5px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: '#fff', width: '100%' }}
                            />
                        </div>
                        <button className="premium-btn" style={{ marginTop: '0.5rem' }}>Assign Course</button>
                    </form>
                </div>
            </div>

            <div className="glass-card" style={{ padding: '1rem' }}>
                <h3 style={{ marginBottom: '1rem', paddingLeft: '1rem' }}>Recent Users</h3>
                <div className="table-responsive">
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)', minWidth: '600px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
                                <th style={{ padding: '1rem' }}>Username</th>
                                <th style={{ padding: '1rem' }}>Phone</th>
                                <th style={{ padding: '1rem' }}>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '1rem' }}>demo_user</td>
                                <td style={{ padding: '1rem' }}>9876543210</td>
                                <td style={{ padding: '1rem' }}>Student</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '1rem' }}>admin_usr</td>
                                <td style={{ padding: '1rem' }}>******9999</td>
                                <td style={{ padding: '1rem' }}>Admin</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
