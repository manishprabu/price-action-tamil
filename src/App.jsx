import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Shop from './pages/Shop'
import Community from './pages/Community'
import Login from './pages/Login'
import PurchasedCourses from './pages/PurchasedCourses'
import AdminDashboard from './pages/AdminDashboard'
import MarketPulse from './pages/MarketPulse'
import { AuthProvider } from './context/AuthContext'
import './index.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main style={{ minHeight: 'calc(100vh - 300px)' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/market-pulse" element={<MarketPulse />} />
              <Route path="/market" element={<MarketPulse />} />
              <Route path="/stock-selection" element={<MarketPulse />} />
              <Route path="/community" element={<Community />} />
              <Route path="/login" element={<Login />} />
              <Route path="/my-courses" element={<PurchasedCourses />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

