import React, { useState } from 'react';
import { FaUsers, FaCalendarAlt, FaChartBar, FaCog, FaSignOutAlt, FaEye, FaEdit, FaTrash, FaPlus, FaSearch, FaFilter, FaEnvelope, FaTimes, FaUserPlus, FaChartLine, FaMailBulk } from 'react-icons/fa';
import './Admin.css';

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  
  // New states for customer management
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showBulkEmail, setShowBulkEmail] = useState(false);
  const [showEditCustomer, setShowEditCustomer] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    sport: '',
    level: 'beginner'
  });
  const [emailData, setEmailData] = useState({
    subject: '',
    message: '',
    recipients: 'all'
  });

  const demoBookings = [
    { id: 1, customer: 'Sarah Johnson', date: '2024-01-15', time: '10:00 AM', sport: 'Kitesurfing', status: 'Confirmed' },
    { id: 2, customer: 'Mike Chen', date: '2024-01-16', time: '2:00 PM', sport: 'Hydrofoil', status: 'Pending' },
    { id: 3, customer: 'Emma Rodriguez', date: '2024-01-17', time: '9:00 AM', sport: 'Wing Foil', status: 'Completed' },
    { id: 4, customer: 'Alex Thompson', date: '2024-01-18', time: '3:00 PM', sport: 'Kitesurfing', status: 'Confirmed' }
  ];

  const demoStats = [
    { label: 'Total Bookings', value: '156', icon: '📅', color: '#667eea' },
    { label: 'Active Students', value: '89', icon: '👥', color: '#28a745' },
    { label: 'Revenue', value: '$12,450', icon: '💰', color: '#ffc107' },
    { label: 'Courses', value: '24', icon: '🏄‍♂️', color: '#dc3545' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
      alert('✅ Login successful! Welcome to the Admin Dashboard.');
    } else {
      alert('❌ Invalid credentials. Use admin/admin to login.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    alert('👋 Logged out successfully!');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleAction = (action, id) => {
    alert(`🔄 ${action} action for booking ${id} - This would perform the actual ${action.toLowerCase()} operation`);
  };

  const handleSearch = () => {
    alert(`🔍 Searching for: "${searchTerm}" - This would filter the bookings based on your search`);
  };

  const handleAddNew = () => {
    alert('➕ Add New Booking - This would open a booking form to create a new appointment');
  };

  // New customer management functions
  const handleAddCustomer = (e) => {
    e.preventDefault();
    alert(`✅ New customer "${newCustomer.name}" added successfully! This would save to your database.`);
    setNewCustomer({ name: '', email: '', phone: '', sport: '', level: 'beginner' });
    setShowAddCustomer(false);
  };

  const handleSendBulkEmail = (e) => {
    e.preventDefault();
    alert(`📧 Bulk email sent to ${emailData.recipients} recipients! Subject: "${emailData.subject}"`);
    setEmailData({ subject: '', message: '', recipients: 'all' });
    setShowBulkEmail(false);
  };

  const handleViewCustomer = (customerName) => {
    console.log('View customer clicked:', customerName);
    alert(`👁️ Viewing ${customerName}'s full profile, booking history, and preferences`);
  };

  const handleEditCustomer = (customerName) => {
    console.log('Edit customer clicked:', customerName);
    
    // Set the customer data for editing
    const customerData = {
      name: customerName,
      email: `${customerName.toLowerCase().replace(' ', '.')}@example.com`,
      phone: '+1 (555) 123-4567',
      sport: customerName === 'Chloe Anderson' ? 'Kitesurfing' : 
             customerName === 'Mike Chen' ? 'Hydrofoil' :
             customerName === 'Emma Rodriguez' ? 'Wing Foil' : 'Performance Training',
      level: customerName === 'Chloe Anderson' ? 'Advanced' :
             customerName === 'Mike Chen' ? 'Intermediate' :
             customerName === 'Emma Rodriguez' ? 'Beginner' : 'Advanced',
      status: customerName === 'Chloe Anderson' ? 'Active Student' :
              customerName === 'Mike Chen' ? 'Pending Payment' :
              customerName === 'Emma Rodriguez' ? 'Course Completed' : 'Active Student'
    };
    
    setEditingCustomer(customerData);
    setShowEditCustomer(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <div className="login-header">
            <h1>🔐 Admin Login</h1>
            <p>Access your business management dashboard</p>
          </div>
          
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
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
                placeholder="Enter password"
                required
              />
            </div>
            
            <button type="submit" className="login-btn">Login</button>
          </form>
          
          <div className="demo-credentials">
            <h3>Demo Credentials:</h3>
            <p><strong>Username:</strong> admin</p>
            <p><strong>Password:</strong> admin</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="header-info">
          <h1>🏢 Admin Dashboard</h1>
          <p>Welcome back, Administrator! Manage your business operations.</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          <FaSignOutAlt />
          Logout
        </button>
      </div>

      <div className="admin-navigation">
        <button 
          className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleTabChange('dashboard')}
        >
          <FaChartBar />
          Dashboard
        </button>
        <button 
          className={`nav-tab ${activeTab === 'bookings' ? 'active' : ''}`}
          onClick={() => handleTabChange('bookings')}
        >
          <FaCalendarAlt />
          Bookings
        </button>
        <button 
          className={`nav-tab ${activeTab === 'customers' ? 'active' : ''}`}
          onClick={() => handleTabChange('customers')}
        >
          <FaUsers />
          Customers
        </button>
        <button 
          className={`nav-tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => handleTabChange('settings')}
        >
          <FaCog />
          Settings
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard-tab">
            <h2>📊 Dashboard Overview</h2>
            <div className="stats-grid">
              {demoStats.map((stat, index) => (
                <div key={index} className="stat-card" style={{ borderLeftColor: stat.color }}>
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-info">
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="recent-activity">
              <h3>🕒 Recent Activity</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <span className="activity-time">2 min ago</span>
                  <span className="activity-text">New booking from Sarah Johnson</span>
                </div>
                <div className="activity-item">
                  <span className="activity-time">15 min ago</span>
                  <span className="activity-text">Payment received from Mike Chen</span>
                </div>
                <div className="activity-item">
                  <span className="activity-time">1 hour ago</span>
                  <span className="activity-text">Course completed by Emma Rodriguez</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bookings-tab">
            <div className="tab-header">
              <div className="search-section">
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <button onClick={handleSearch} className="search-btn">
                  <FaSearch />
                </button>
              </div>
              <button onClick={handleAddNew} className="add-btn">
                <FaPlus />
                Add New
              </button>
            </div>
            
            <div className="bookings-table">
              <table>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Sport</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {demoBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.customer}</td>
                      <td>{booking.date}</td>
                      <td>{booking.time}</td>
                      <td>{booking.sport}</td>
                      <td>
                        <span className={`status-badge ${booking.status.toLowerCase()}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="action-buttons">
                        <button onClick={() => handleAction('View', booking.id)} className="action-btn view">
                          <FaEye />
                        </button>
                        <button onClick={() => handleAction('Edit', booking.id)} className="action-btn edit">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleAction('Delete', booking.id)} className="action-btn delete">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="customers-tab">
            <h2>👥 Customer Management</h2>
            <p>Manage your customer database, view profiles, and track customer interactions.</p>
            
            <div className="customer-stats">
              <div className="stat-item">
                <span className="stat-number">94</span>
                <span className="stat-label">Total Customers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">48</span>
                <span className="stat-label">Active Students</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">13</span>
                <span className="stat-label">New This Month</span>
              </div>
            </div>

            <div className="customer-actions">
              <button onClick={() => setShowAddCustomer(true)} className="action-btn primary">
                <FaUserPlus />
                Add New Customer
              </button>
              <button onClick={() => setShowAnalytics(true)} className="action-btn secondary">
                <FaChartLine />
                View Analytics
              </button>
              <button onClick={() => setShowBulkEmail(true)} className="action-btn secondary">
                <FaMailBulk />
                Send Bulk Email
              </button>
            </div>

            <div className="customer-list">
              <h3>📋 Recent Customers</h3>
              
              <div className="customer-cards">
                <div className="customer-card">
                  <div className="customer-avatar">
                    <div style={{
                      width: '60px',
                      height: '60px',
                      fontSize: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '50%',
                      border: '3px solid #667eea'
                    }}>
                      👩‍🏫
                    </div>
                  </div>
                  <div className="customer-info">
                    <h4>Chloe Anderson</h4>
                    <p>Kitesurfing Pro</p>
                    <span className="customer-status active">Active Student</span>
                  </div>
                  <div className="customer-actions">
                    <button 
                      onMouseDown={() => {
                        console.log('View button clicked for Chloe');
                        alert(`👁️ Viewing Chloe Anderson's Profile!\n\n📋 Customer Details:\n• Name: Chloe Anderson\n• Sport: Kitesurfing Pro\n• Status: Active Student\n• Experience: Advanced Level\n\n📊 This would show:\n• Full customer profile\n• Booking history\n• Training progress\n• Contact information`);
                      }}
                      style={{
                        padding: '10px 18px',
                        backgroundColor: '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        marginRight: '10px',
                        boxShadow: '0 4px 8px rgba(102, 126, 234, 0.3)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 12px rgba(102, 126, 234, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 8px rgba(102, 126, 234, 0.3)';
                      }}
                    >
                      👁️ View
                    </button>
                    <button 
                      onMouseDown={() => {
                        console.log('Edit button clicked for Chloe');
                        alert(`✏️ Editing Chloe Anderson's Information!\n\n📝 This would open an edit form with:\n• Personal details\n• Contact information\n• Sport preferences\n• Skill level\n• Training history\n\n💾 Changes would be saved to the database.`);
                      }}
                      style={{
                        padding: '10px 18px',
                        backgroundColor: '#ffc107',
                        color: 'white',
                        border: 'none',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 8px rgba(255, 193, 7, 0.3)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 12px rgba(255, 193, 7, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 8px rgba(255, 193, 7, 0.3)';
                      }}
                    >
                      ✏️ Edit
                    </button>
                  </div>
                </div>

                <div className="customer-card">
                  <div className="customer-avatar">
                    <div style={{
                      width: '60px',
                      height: '60px',
                      fontSize: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '50%',
                      border: '3px solid #28a745'
                    }}>
                      👨‍🏫
                    </div>
                  </div>
                  <div className="customer-info">
                    <h4>Mike Chen</h4>
                    <p>Hydrofoil Enthusiast</p>
                    <span className="customer-status pending">Pending Payment</span>
                  </div>
                  <div className="customer-actions">
                    <button 
                      onMouseDown={() => {
                        console.log('View button clicked for Mike');
                        alert(`👁️ Viewing Mike Chen's Profile!\n\n📋 Customer Details:\n• Name: Mike Chen\n• Sport: Hydrofoil Enthusiast\n• Status: Pending Payment\n• Experience: Intermediate Level\n\n📊 This would show:\n• Full customer profile\n• Payment status\n• Training progress\n• Contact information`);
                      }}
                      style={{
                        padding: '10px 18px',
                        backgroundColor: '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        marginRight: '10px',
                        boxShadow: '0 4px 8px rgba(102, 126, 234, 0.3)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 12px rgba(102, 126, 234, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 8px rgba(102, 126, 234, 0.3)';
                      }}
                    >
                      👁️ View
                    </button>
                    <button 
                      onMouseDown={() => {
                        console.log('Edit button clicked for Mike');
                        alert(`✏️ Editing Mike Chen's Information!\n\n📝 This would open an edit form with:\n• Personal details\n• Contact information\n• Sport preferences\n• Skill level\n• Payment status\n\n💾 Changes would be saved to the database.`);
                      }}
                      style={{
                        padding: '10px 18px',
                        backgroundColor: '#ffc107',
                        color: 'white',
                        border: 'none',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 8px rgba(255, 193, 7, 0.3)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 12px rgba(255, 193, 7, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 8px rgba(255, 193, 7, 0.3)';
                      }}
                    >
                      ✏️ Edit
                    </button>
                  </div>
                </div>

                <div className="customer-card">
                  <div className="customer-avatar">
                    <div style={{
                      width: '60px',
                      height: '60px',
                      fontSize: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '50%',
                      border: '3px solid #dc3545'
                    }}>
                      🏄‍♀️
                    </div>
                  </div>
                  <div className="customer-info">
                    <h4>Emma Rodriguez</h4>
                    <p>Wing Foil Beginner</p>
                    <span className="customer-status completed">Course Completed</span>
                  </div>
                  <div className="customer-actions">
                    <button 
                      onMouseDown={() => {
                        console.log('View button clicked for Emma');
                        alert(`👁️ Viewing Emma Rodriguez's Profile!\n\n📋 Customer Details:\n• Name: Emma Rodriguez\n• Sport: Wing Foil Beginner\n• Status: Course Completed\n• Experience: Beginner Level\n\n📊 This would show:\n• Full customer profile\n• Course completion\n• Training progress\n• Contact information`);
                      }}
                      style={{
                        padding: '10px 18px',
                        backgroundColor: '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        marginRight: '10px',
                        boxShadow: '0 4px 8px rgba(102, 126, 234, 0.3)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 12px rgba(102, 126, 234, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 8px rgba(102, 126, 234, 0.3)';
                      }}
                    >
                      👁️ View
                    </button>
                    <button 
                      onMouseDown={() => {
                        console.log('Edit button clicked for Emma');
                        alert(`✏️ Editing Emma Rodriguez's Information!\n\n📝 This would open an edit form with:\n• Personal details\n• Contact information\n• Sport preferences\n• Skill level\n• Course history\n\n💾 Changes would be saved to the database.`);
                      }}
                      style={{
                        padding: '10px 18px',
                        backgroundColor: '#ffc107',
                        color: 'white',
                        border: 'none',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 8px rgba(255, 193, 7, 0.3)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 12px rgba(255, 193, 7, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 8px rgba(255, 193, 7, 0.3)';
                      }}
                    >
                      ✏️ Edit
                    </button>
                  </div>
                </div>

                <div className="customer-card">
                  <div className="customer-avatar">
                    <div style={{
                      width: '60px',
                      height: '60px',
                      fontSize: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '50%',
                      border: '3px solid #ffc107'
                    }}>
                      🏃‍♀️
                    </div>
                  </div>
                  <div className="customer-info">
                    <h4>Sarah Johnson</h4>
                    <p>Performance Training</p>
                    <span className="customer-status active">Active Student</span>
                  </div>
                  <div className="customer-actions">
                    <button 
                      onMouseDown={() => {
                        console.log('View button clicked for Sarah');
                        alert(`👁️ Viewing Sarah Johnson's Profile!\n\n📋 Customer Details:\n• Name: Sarah Johnson\n• Sport: Performance Training\n• Status: Active Student\n• Experience: Advanced Level\n\n📊 This would show:\n• Full customer profile\n• Training progress\n• Performance metrics\n• Contact information`);
                      }}
                      style={{
                        padding: '10px 18px',
                        backgroundColor: '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        marginRight: '10px',
                        boxShadow: '0 4px 8px rgba(102, 126, 234, 0.3)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 12px rgba(102, 126, 234, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 8px rgba(102, 126, 234, 0.3)';
                      }}
                    >
                      👁️ View
                    </button>
                    <button 
                      onMouseDown={() => {
                        console.log('Edit button clicked for Sarah');
                        alert(`✏️ Editing Sarah Johnson's Information!\n\n📝 This would open an edit form with:\n• Personal details\n• Contact information\n• Sport preferences\n• Skill level\n• Performance data\n\n💾 Changes would be saved to the database.`);
                      }}
                      style={{
                        padding: '10px 18px',
                        backgroundColor: '#ffc107',
                        color: 'white',
                        border: 'none',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 8px rgba(255, 193, 7, 0.3)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 12px rgba(255, 193, 7, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 8px rgba(255, 193, 7, 0.3)';
                      }}
                    >
                      ✏️ Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="customer-features">
              <h3>🚀 Advanced Customer Features</h3>
              <div className="features-grid">
                <div className="feature-card" onClick={() => alert('📊 Customer Analytics Dashboard - View detailed insights about customer behavior, preferences, and trends')}>
                  <div className="feature-icon">📊</div>
                  <h4>Analytics Dashboard</h4>
                  <p>Track customer behavior and preferences</p>
                </div>
                
                <div className="feature-card" onClick={() => alert('📧 Email Marketing - Send personalized emails, newsletters, and promotional campaigns to your customers')}>
                  <div className="feature-icon">📧</div>
                  <h4>Email Marketing</h4>
                  <p>Automated email campaigns</p>
                </div>
                
                <div className="feature-card" onClick={() => alert('🎯 Customer Segmentation - Group customers by activity level, preferences, and demographics for targeted marketing')}>
                  <div className="feature-icon">🎯</div>
                  <h4>Customer Segmentation</h4>
                  <p>Group customers by preferences</p>
                </div>
                
                <div className="feature-card" onClick={() => alert('💬 Customer Support - Integrated support system with ticket tracking and customer communication history')}>
                  <div className="feature-icon">💬</div>
                  <h4>Support System</h4>
                  <p>Track support tickets</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-tab">
            <h2>⚙️ System Settings</h2>
            <p>Configure your business settings, notifications, and system preferences.</p>
            <button onClick={() => alert('⚙️ Settings would be configured here - Business hours, notifications, payment methods, etc.')} className="demo-btn">
              Configure Settings
            </button>
          </div>
        )}
      </div>

      {/* Add Customer Modal */}
      {showAddCustomer && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>👤 Add New Customer</h3>
              <button onClick={() => setShowAddCustomer(false)} className="modal-close">
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleAddCustomer} className="modal-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                  placeholder="Enter email address"
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div className="form-group">
                <label>Sport Interest</label>
                <select
                  value={newCustomer.sport}
                  onChange={(e) => setNewCustomer({...newCustomer, sport: e.target.value})}
                  required
                >
                  <option value="">Select sport</option>
                  <option value="kitesurfing">Kitesurfing</option>
                  <option value="hydrofoil">Hydrofoil</option>
                  <option value="wingfoil">Wing Foil</option>
                  <option value="windsurfing">Windsurfing</option>
                </select>
              </div>
              <div className="form-group">
                <label>Skill Level</label>
                <select
                  value={newCustomer.level}
                  onChange={(e) => setNewCustomer({...newCustomer, level: e.target.value})}
                  required
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddCustomer(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Add Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {showAnalytics && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>📊 Customer Analytics</h3>
              <button onClick={() => setShowAnalytics(false)} className="modal-close">
                <FaTimes />
              </button>
            </div>
            <div className="analytics-content">
              <div className="analytics-grid">
                <div className="analytics-card">
                  <h4>📈 Customer Growth</h4>
                  <div className="analytics-chart">
                    <div className="chart-bar" style={{height: '60%', backgroundColor: '#667eea'}}></div>
                    <div className="chart-bar" style={{height: '80%', backgroundColor: '#764ba2'}}></div>
                    <div className="chart-bar" style={{height: '90%', backgroundColor: '#f093fb'}}></div>
                    <div className="chart-bar" style={{height: '100%', backgroundColor: '#4facfe'}}></div>
                  </div>
                  <p>Monthly customer acquisition trend</p>
                </div>
                <div className="analytics-card">
                  <h4>🎯 Popular Sports</h4>
                  <div className="sport-stats">
                    <div className="sport-item">
                      <span>Kitesurfing</span>
                      <span className="percentage">45%</span>
                    </div>
                    <div className="sport-item">
                      <span>Hydrofoil</span>
                      <span className="percentage">30%</span>
                    </div>
                    <div className="sport-item">
                      <span>Wing Foil</span>
                      <span className="percentage">25%</span>
                    </div>
                  </div>
                </div>
                <div className="analytics-card">
                  <h4>💰 Revenue by Sport</h4>
                  <div className="revenue-chart">
                    <div className="revenue-item">
                      <span>Kitesurfing</span>
                      <span className="amount">$8,450</span>
                    </div>
                    <div className="revenue-item">
                      <span>Hydrofoil</span>
                      <span className="amount">$2,800</span>
                    </div>
                    <div className="revenue-item">
                      <span>Wing Foil</span>
                      <span className="amount">$1,200</span>
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={() => setShowAnalytics(false)} className="btn-primary">
                Close Analytics
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Email Modal */}
      {showBulkEmail && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>📧 Send Bulk Email</h3>
              <button onClick={() => setShowBulkEmail(false)} className="modal-close">
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSendBulkEmail} className="modal-form">
              <div className="form-group">
                <label>Recipients</label>
                <select
                  value={emailData.recipients}
                  onChange={(e) => setEmailData({...emailData, recipients: e.target.value})}
                  required
                >
                  <option value="all">All Customers (94)</option>
                  <option value="active">Active Students (48)</option>
                  <option value="new">New This Month (13)</option>
                  <option value="completed">Completed Courses (33)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Subject Line</label>
                <input
                  type="text"
                  value={emailData.subject}
                  onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
                  placeholder="Enter email subject"
                  required
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  value={emailData.message}
                  onChange={(e) => setEmailData({...emailData, message: e.target.value})}
                  placeholder="Enter your email message..."
                  rows="6"
                  required
                ></textarea>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowBulkEmail(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Send Email
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
      {showEditCustomer && editingCustomer && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>✏️ Edit Customer: {editingCustomer.name}</h3>
              <button onClick={() => setShowEditCustomer(false)} className="modal-close">
                <FaTimes />
              </button>
            </div>
            
            {/* Ultra-Simple Test Form */}
            <div style={{
              padding: '20px', 
              backgroundColor: '#ffffff', 
              borderRadius: '8px', 
              margin: '20px 0',
              border: '3px solid #dc3545'
            }}>
              <h4 style={{color: '#dc3545', textAlign: 'center'}}>🚨 ULTRA-SIMPLE TEST FORM 🚨</h4>
              
              <p style={{textAlign: 'center', marginBottom: '20px'}}>
                <strong>If you can't type in these fields, there's a serious React issue!</strong>
              </p>
              
              <div style={{marginBottom: '15px'}}>
                <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#007bff'}}>🔵 Name Field (Type Here):</label>
                <input 
                  type="text" 
                  placeholder="CLICK HERE AND TYPE SOMETHING"
                  style={{
                    width: '100%',
                    padding: '15px',
                    border: '3px solid #007bff',
                    borderRadius: '8px',
                    fontSize: '18px',
                    backgroundColor: '#f8f9fa'
                  }}
                />
              </div>
              
              <div style={{marginBottom: '15px'}}>
                <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#28a745'}}>🟢 Email Field (Type Here):</label>
                <input 
                  type="email" 
                  placeholder="CLICK HERE AND TYPE SOMETHING"
                  style={{
                    width: '100%',
                    padding: '15px',
                    border: '3px solid #28a745',
                    borderRadius: '8px',
                    fontSize: '18px',
                    backgroundColor: '#f8f9fa'
                  }}
                />
              </div>
              
              <div style={{marginBottom: '15px'}}>
                <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#ffc107'}}>🟡 Sport Dropdown (Click Here):</label>
                <select 
                  style={{
                    width: '100%',
                    padding: '15px',
                    border: '3px solid #ffc107',
                    borderRadius: '8px',
                    fontSize: '18px',
                    backgroundColor: '#f8f9fa'
                  }}
                >
                  <option value="">SELECT A SPORT</option>
                  <option value="kitesurfing">Kitesurfing</option>
                  <option value="hydrofoil">Hydrofoil</option>
                  <option value="wingfoil">Wing Foil</option>
                </select>
              </div>
              
              <div style={{textAlign: 'center', marginTop: '20px'}}>
                <button 
                  onClick={() => {
                    alert('🧪 TESTING: If you can see this alert, JavaScript is working. Now check if you can type in the fields above!');
                    console.log('Test button clicked - JavaScript is working');
                  }}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '15px 30px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}
                >
                  🧪 CLICK THIS TEST BUTTON
                </button>
              </div>
              
              <div style={{
                backgroundColor: '#fff3cd',
                border: '1px solid #ffeaa7',
                borderRadius: '5px',
                padding: '15px',
                marginTop: '20px',
                textAlign: 'center'
              }}>
                <strong>🔍 Debug Info:</strong><br/>
                Form Open: {showEditCustomer ? 'YES' : 'NO'}<br/>
                Customer: {editingCustomer ? editingCustomer.name : 'NONE'}<br/>
                React Version: {React.version}<br/>
                Timestamp: {new Date().toLocaleTimeString()}
              </div>
            </div>
            
            {/* Original Form (Completely Hidden) */}
            <div style={{display: 'none'}}>
              <form onSubmit={(e) => {
                e.preventDefault();
                alert(`✅ Customer ${editingCustomer.name} updated successfully!`);
                setShowEditCustomer(false);
                setEditingCustomer(null);
              }} className="modal-form">
                
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    defaultValue={editingCustomer.name}
                    onChange={(e) => {
                      const newData = {...editingCustomer, name: e.target.value};
                      setEditingCustomer(newData);
                      console.log('Name updated:', newData);
                    }}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    defaultValue={editingCustomer.email}
                    onChange={(e) => {
                      const newData = {...editingCustomer, email: e.target.value};
                      setEditingCustomer(newData);
                      console.log('Email updated:', newData);
                    }}
                    placeholder="Enter email address"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    defaultValue={editingCustomer.phone}
                    onChange={(e) => {
                      const newData = {...editingCustomer, phone: e.target.value};
                      setEditingCustomer(newData);
                      console.log('Phone updated:', newData);
                    }}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Sport Interest</label>
                  <select
                    defaultValue={editingCustomer.sport}
                    onChange={(e) => {
                      const newData = {...editingCustomer, sport: e.target.value};
                      setEditingCustomer(newData);
                      console.log('Sport updated:', newData);
                    }}
                    required
                  >
                    <option value="Kitesurfing">Kitesurfing</option>
                    <option value="Hydrofoil">Hydrofoil</option>
                    <option value="Wing Foil">Wing Foil</option>
                    <option value="Performance Training">Performance Training</option>
                    <option value="Windsurfing">Windsurfing</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Skill Level</label>
                  <select
                    defaultValue={editingCustomer.level}
                    onChange={(e) => {
                      const newData = {...editingCustomer, level: e.target.value};
                      setEditingCustomer(newData);
                      console.log('Level updated:', newData);
                    }}
                    required
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Status</label>
                  <select
                    defaultValue={editingCustomer.status}
                    onChange={(e) => {
                      const newData = {...editingCustomer, status: e.target.value};
                      setEditingCustomer(newData);
                      console.log('Status updated:', newData);
                    }}
                    required
                  >
                    <option value="Active Student">Active Student</option>
                    <option value="Pending Payment">Pending Payment</option>
                    <option value="Course Completed">Course Completed</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                
                <div className="modal-actions">
                  <button type="button" onClick={() => setShowEditCustomer(false)} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Update Customer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin; 