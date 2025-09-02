import React, { useState, useEffect } from 'react';
import authService from '../services/authService';
import { galleryService } from '../services/galleryService';
import { servicesService } from '../services/servicesService';
import { testimonialsService } from '../services/testimonialsService';
import { bookingsService } from '../services/bookingsService';
import { adminService } from '../services/adminService';
import { packagesService } from '../services/packagesService';
import './Admin.css';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login({ username, password });
      setIsLoggedIn(true);
      setUsername('');
      setPassword('');
      console.log('Login successful:', response);
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsLoggedIn(false);
      setActiveTab('dashboard');
    } catch (error) {
      console.error('Logout error:', error);
      // Still logout locally even if backend call fails
      setIsLoggedIn(false);
      setActiveTab('dashboard');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <div className="login-header">
            <div className="admin-logo">
              <div className="admin-logo-icon">🌊</div>
              <h1>Admin Dashboard</h1>
            </div>
            <p>Login to manage your website content</p>
          </div>
          
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="login-btn">Login</button>
          </form>
          
          <div className="login-info">
            <p><strong>Admin Login:</strong></p>
            <p>Use your backend admin credentials</p>
            <p>Contact your system administrator</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-header-content">
          <div className="admin-brand">
            <div className="admin-brand-icon">🌊</div>
            <h1>Admin Dashboard</h1>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-sidebar">
          <nav className="admin-nav">
            <button
              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              📊 Dashboard
            </button>
            <button
              className={`nav-item ${activeTab === 'gallery' ? 'active' : ''}`}
              onClick={() => setActiveTab('gallery')}
            >
              🖼️ Gallery Management
            </button>
            <button
              className={`nav-item ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => setActiveTab('services')}
            >
              🎯 Services Management
            </button>
            <button
              className={`nav-item ${activeTab === 'testimonials' ? 'active' : ''}`}
              onClick={() => setActiveTab('testimonials')}
            >
              💬 Testimonials
            </button>
            <button
              className={`nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
              onClick={() => setActiveTab('bookings')}
            >
              📅 Bookings
            </button>
          </nav>
        </div>

        <div className="admin-main">
          {activeTab === 'dashboard' && (
            <div className="dashboard-overview">
              <h2>Dashboard Overview</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total Gallery Items</h3>
                  <p className="stat-number">24</p>
                  <p className="stat-label">Images & Videos</p>
                </div>
                <div className="stat-card">
                  <h3>Active Services</h3>
                  <p className="stat-number">6</p>
                  <p className="stat-label">Training Programs</p>
                </div>
                <div className="stat-card">
                  <h3>Testimonials</h3>
                  <p className="stat-number">12</p>
                  <p className="stat-label">Customer Reviews</p>
                </div>
                <div className="stat-card">
                  <h3>Recent Bookings</h3>
                  <p className="stat-number">8</p>
                  <p className="stat-label">This Week</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="gallery-management">
              <div className="section-header">
                <h2>Gallery Management</h2>
                <button className="add-btn">+ Add New Item</button>
              </div>
              
              <div className="gallery-grid">
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop" alt="Gallery Item" />
                  <div className="gallery-item-actions">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=200&fit=crop" alt="Gallery Item" />
                  <div className="gallery-item-actions">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop" alt="Gallery Item" />
                  <div className="gallery-item-actions">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=200&fit=crop" alt="Gallery Item" />
                  <div className="gallery-item-actions">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="services-management">
              <div className="section-header">
                <h2>Services Management</h2>
                <button className="add-btn">+ Add New Service</button>
              </div>
              
              <div className="services-list">
                <div className="service-item">
                  <h3>Kitesurfing Training</h3>
                  <p>Comprehensive kitesurfing lessons for all skill levels</p>
                  <div className="service-actions">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </div>
                <div className="service-item">
                  <h3>Hydrofoil Training</h3>
                  <p>Master the art of hydrofoiling with expert instructors</p>
                  <div className="service-actions">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </div>
                <div className="service-item">
                  <h3>Wing Foil Training</h3>
                  <p>Discover the exciting world of wing foiling</p>
                  <div className="service-actions">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="testimonials-management">
              <div className="section-header">
                <h2>Testimonials Management</h2>
                <button className="add-btn">+ Add New Testimonial</button>
              </div>
              
              <div className="testimonials-list">
                <div className="testimonial-item">
                  <div className="testimonial-content">
                    <p>"im happy"</p>
                    <span className="testimonial-author">- Customer 1</span>
                  </div>
                  <div className="testimonial-actions">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </div>
                <div className="testimonial-item">
                  <div className="testimonial-content">
                    <p>"me too"</p>
                    <span className="testimonial-author">- Customer 2</span>
                  </div>
                  <div className="testimonial-actions">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="bookings-management">
              <div className="section-header">
                <h2>Bookings Management</h2>
                <button className="add-btn">+ Add New Booking</button>
              </div>
              
              <div className="bookings-list">
                <div className="booking-item">
                  <div className="booking-info">
                    <h3>John Doe</h3>
                    <p>Kitesurfing Lesson - Beginner</p>
                    <p>Date: Dec 15, 2024</p>
                    <p>Status: Confirmed</p>
                  </div>
                  <div className="booking-actions">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Cancel</button>
                  </div>
                </div>
                <div className="booking-item">
                  <div className="booking-info">
                    <h3>Jane Smith</h3>
                    <p>Hydrofoil Training - Intermediate</p>
                    <p>Date: Dec 18, 2024</p>
                    <p>Status: Pending</p>
                  </div>
                  <div className="booking-actions">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin; 