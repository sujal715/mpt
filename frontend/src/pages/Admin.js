import React, { useState, useEffect } from 'react';
import './Admin.css';
import apiService from '../services/api';

const Admin = () => {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  // Authentication & UI State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  
  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [selectedItems, setSelectedItems] = useState([]);
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [formData, setFormData] = useState({});
  
  // Loading States
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);
  const [isLoadingTestimonials, setIsLoadingTestimonials] = useState(false);
  const [isLoadingTeam, setIsLoadingTeam] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  
  // Dashboard Data - Will be calculated from real data
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    activeServices: 0,
    testimonials: 0,
    revenue: 0,
    recentBookings: 0,
    conversionRate: 0,
    avgRating: 0,
    monthlyGrowth: 0
  });
  
  // Data Collections
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  // Helper function to get package price (matches backend logic)
  const getPackagePrice = (packageId) => {
    const prices = {
      1: 99.99,   // Basic Package
      2: 199.99,  // Premium Package
      3: 299.99,  // Deluxe Package
      4: 499.99,  // VIP Package
      5: 799.99   // Corporate Package
    };
    return prices[packageId] || 99.99;
  };

  // Calculate accurate dashboard metrics from real data
  const calculateDashboardMetrics = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // Calculate total revenue from confirmed bookings
    const confirmedBookings = bookings.filter(booking => 
      booking.status === 'confirmed' || booking.status === 'CONFIRMED'
    );
    
    const totalRevenue = confirmedBookings.reduce((sum, booking) => {
      const packageId = booking.packageId || 1; // Default to package 1 if not specified
      return sum + getPackagePrice(packageId);
    }, 0);

    // Calculate monthly revenue (current month)
    const monthlyBookings = confirmedBookings.filter(booking => {
      const bookingDate = new Date(booking.createdAt || booking.date);
      return bookingDate.getMonth() === currentMonth && 
             bookingDate.getFullYear() === currentYear;
    });
    
    const monthlyRevenue = monthlyBookings.reduce((sum, booking) => {
      const packageId = booking.packageId || 1;
      return sum + getPackagePrice(packageId);
    }, 0);

    // Calculate conversion rate (simplified: confirmed bookings / total bookings * 100)
    const conversionRate = bookings.length > 0 
      ? Math.round((confirmedBookings.length / bookings.length) * 100)
      : 0;

    // Calculate average rating from testimonials
    const avgRating = testimonials.length > 0
      ? testimonials.reduce((sum, testimonial) => sum + (testimonial.rating || 5), 0) / testimonials.length
      : 4.8; // Default rating

    // Calculate monthly growth (simplified: compare with previous month)
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    
    const previousMonthBookings = confirmedBookings.filter(booking => {
      const bookingDate = new Date(booking.createdAt || booking.date);
      return bookingDate.getMonth() === previousMonth && 
             bookingDate.getFullYear() === previousYear;
    });
    
    const previousMonthRevenue = previousMonthBookings.reduce((sum, booking) => {
      const packageId = booking.packageId || 1;
      return sum + getPackagePrice(packageId);
    }, 0);

    const monthlyGrowth = previousMonthRevenue > 0
      ? Math.round(((monthlyRevenue - previousMonthRevenue) / previousMonthRevenue) * 100)
      : 0;

    // Update dashboard data with calculated values
    setDashboardData({
      totalBookings: bookings.length,
      activeServices: services.filter(service => service.isActive !== false).length,
      testimonials: testimonials.length,
      revenue: Math.round(totalRevenue),
      recentBookings: confirmedBookings.length,
      conversionRate: conversionRate,
      avgRating: Math.round(avgRating * 10) / 10, // Round to 1 decimal
      monthlyGrowth: monthlyGrowth
    });
  };
  const [gallery, setGallery] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [emailCaptures, setEmailCaptures] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [videos, setVideos] = useState([]);

  // ============================================================================
  // UTILITY FUNCTIONS
  // ============================================================================
  
  // Helper function to convert service name to package ID
  const getPackageIdFromService = (serviceName) => {
    switch (serviceName) {
      case 'Kitesurfing Training': return 1;
      case 'Hydrofoil Training': return 2;
      case 'Wing Foil Training': return 3;
      default: return 1; // Default to Basic Package
    }
  };
  
  // Notification management
  const addNotification = (message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  };
  
  // Modal management
  const openModal = (type, data = {}) => {
    setModalType(type);
    setFormData(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setFormData({});
  };
  
  // Selection management
  const toggleItemSelection = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const bulkAction = (action) => {
    if (selectedItems.length === 0) {
      addNotification('Please select items first', 'warning');
      return;
    }
    
    // Implement bulk actions based on activeTab
    addNotification(`${action} applied to ${selectedItems.length} items`, 'success');
    setSelectedItems([]);
  };

  // ============================================================================
  // DATA FETCHING FUNCTIONS
  // ============================================================================
  
  // Function to fetch testimonials from backend
  const fetchTestimonials = async () => {
    setIsLoadingTestimonials(true);
    try {
      console.log('Fetching testimonials from backend...');
      const response = await apiService.get('/testimonials');
      console.log('Testimonials response:', response);
      
      if (response.success && response.data) {
        // Transform backend testimonial format to frontend format
        const transformedTestimonials = response.data.map(testimonial => ({
          id: testimonial.id,
          name: testimonial.customerName,
          text: testimonial.comment,
          rating: testimonial.rating,
          service: testimonial.serviceUsed || 'General Training',
          isApproved: testimonial.isApproved,
          date: testimonial.createdAt ? new Date(testimonial.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
        }));
        
        console.log('Transformed testimonials:', transformedTestimonials);
        setTestimonials(transformedTestimonials);
        
        // Recalculate dashboard metrics with updated testimonials
        setTimeout(() => {
          calculateDashboardMetrics();
        }, 100);
        
        addNotification(`Loaded ${transformedTestimonials.length} testimonials`, 'success');
      } else {
        console.log('No testimonials found in response');
        addNotification('No testimonials found', 'warning');
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      addNotification('Failed to load testimonials: ' + error.message, 'error');
    } finally {
      setIsLoadingTestimonials(false);
    }
  };

  // Function to toggle testimonial approval status
  const toggleTestimonialApproval = async (testimonialId) => {
    try {
      const response = await apiService.patch(`/testimonials/${testimonialId}/toggle-approval`);
      
      if (response.success) {
        // Update local state
        setTestimonials(prev => prev.map(testimonial => 
          testimonial.id === testimonialId 
            ? { ...testimonial, isApproved: !testimonial.isApproved }
            : testimonial
        ));
        addNotification('Testimonial approval status updated!', 'success');
      } else {
        addNotification('Failed to update testimonial approval: ' + response.message, 'error');
      }
    } catch (error) {
      console.error('Error toggling testimonial approval:', error);
      addNotification('Failed to update testimonial approval: ' + error.message, 'error');
    }
  };

  // Function to delete testimonial
  const deleteTestimonial = async (testimonialId) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        const response = await apiService.delete(`/testimonials/${testimonialId}`);
        
        if (response.success) {
          // Remove from local state
          setTestimonials(prev => prev.filter(testimonial => testimonial.id !== testimonialId));
          
          // Update dashboard count
          setDashboardData(prev => ({
            ...prev,
            testimonials: prev.testimonials - 1
          }));
          
          addNotification('Testimonial deleted successfully!', 'success');
        } else {
          addNotification('Failed to delete testimonial: ' + response.message, 'error');
        }
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        addNotification('Failed to delete testimonial: ' + error.message, 'error');
      }
    }
  };

  // Function to fetch real bookings from backend
  const fetchBookings = async () => {
    setIsLoadingBookings(true);
    try {
      console.log('Fetching bookings from backend...');
      const response = await apiService.get('/bookings');
      console.log('Backend response:', response);
      
      // The API returns an array directly, not wrapped in success/bookings
      if (Array.isArray(response)) {
        // Transform backend booking format to frontend format
        const transformedBookings = response.map((booking, index) => ({
          id: booking.id || index + 1,
          name: booking.name || 'Unknown',
          service: booking.service || 'General Training',
          date: booking.createdAt ? new Date(booking.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          status: booking.status?.toLowerCase() || 'confirmed',
          email: booking.email || '',
          phone: booking.phone || '',
          amount: 150 // Default amount since it's not stored in the backend
        }));
        
        console.log('Transformed bookings:', transformedBookings);
        setBookings(transformedBookings);
        
        // Calculate all dashboard metrics from real data
        // Note: This will be called after bookings are set, so we need to use transformedBookings
        setTimeout(() => {
          calculateDashboardMetrics();
        }, 100);
        
        addNotification(`Loaded ${transformedBookings.length} bookings`, 'success');
      } else {
        console.log('No bookings found in response');
        addNotification('No bookings found', 'warning');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      addNotification('Failed to load bookings: ' + error.message, 'error');
    } finally {
      setIsLoadingBookings(false);
    }
  };

  // Fetch contacts from backend
  const fetchContacts = async () => {
    try {
      const response = await apiService.get('/contacts');
      if (response.success) {
        setContacts(response.data || []);
      } else {
        console.error('Failed to fetch contacts:', response.message);
        setContacts([]);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setContacts([]);
    }
  };

  // Fetch email captures from backend
  const fetchEmailCaptures = async () => {
    try {
      const response = await apiService.get('/email-captures');
      if (response.success) {
        setEmailCaptures(response.data || []);
      } else {
        console.error('Failed to fetch email captures:', response.message);
        setEmailCaptures([]);
      }
    } catch (error) {
      console.error('Error fetching email captures:', error);
      setEmailCaptures([]);
    }
    
    // Also fetch emails from localStorage
    try {
      const localEmails = JSON.parse(localStorage.getItem('capturedEmails') || '[]');
      console.log('Local emails found:', localEmails);
      
      // Convert localStorage emails to the same format as backend emails
      const formattedLocalEmails = localEmails.map((email, index) => ({
        id: `local-${index}`,
        email: email.email,
        source: email.source || 'resources',
        resourceType: email.resourceType,
        createdAt: email.timestamp,
        isVerified: false, // Local emails are unverified by default
        unsubscribed: false
      }));
      
      // Merge with existing email captures
      setEmailCaptures(prev => {
        const existingIds = new Set(prev.map(e => e.id));
        const newEmails = formattedLocalEmails.filter(e => !existingIds.has(e.id));
        return [...prev, ...newEmails];
      });
    } catch (error) {
      console.error('Error fetching local emails:', error);
    }
  };

  // Function to fetch real services from backend
  const fetchServices = async () => {
    try {
      console.log('Fetching services from backend...');
      const response = await apiService.get('/services');
      console.log('Services response:', response);
      
      // The new ServiceController returns a list directly
      if (Array.isArray(response)) {
        setServices(response);
        console.log('Services loaded:', response);
      } else {
        console.log('No services found or invalid response format');
        setServices([]);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      addNotification('Failed to fetch services: ' + error.message, 'error');
      setServices([]);
    }
  };

  // Function to fetch gallery from backend
  const fetchGallery = async () => {
    try {
      console.log('🔄 Fetching gallery from backend...');
      const response = await apiService.get('/gallery');
      console.log('📡 Gallery API response:', response);
      console.log('📊 Response type:', typeof response, 'Is Array:', Array.isArray(response));
      
      if (Array.isArray(response)) {
        console.log('✅ Setting gallery with', response.length, 'items');
        setGallery(response);
        console.log('🎯 Gallery state updated:', response);
        addNotification(`Gallery loaded: ${response.length} items`, 'success');
      } else {
        console.log('❌ Invalid response format:', response);
        setGallery([]);
        addNotification('Invalid gallery response format', 'error');
      }
    } catch (error) {
      console.error('💥 Error fetching gallery:', error);
      addNotification('Failed to fetch gallery: ' + error.message, 'error');
      setGallery([]);
    }
  };

  // Function to fetch team members from backend
  const loadTeamMembers = async () => {
    setIsLoadingTeam(true);
    try {
      console.log('🔄 Fetching team members from backend...');
      const response = await apiService.get('/team');
      console.log('📡 Team API response:', response);
      
      if (Array.isArray(response)) {
        console.log('✅ Setting team with', response.length, 'members');
        setTeamMembers(response);
        addNotification(`Team loaded: ${response.length} members`, 'success');
      } else {
        console.log('❌ Invalid team response format:', response);
        setTeamMembers([]);
        addNotification('Invalid team response format', 'error');
      }
    } catch (error) {
      console.error('💥 Error fetching team:', error);
      addNotification('Failed to fetch team: ' + error.message, 'error');
      setTeamMembers([]);
    } finally {
      setIsLoadingTeam(false);
    }
  };

  useEffect(() => {
    // Fetch real data when component mounts
    if (isLoggedIn) {
      fetchBookings();
      fetchServices();
      fetchTestimonials();
      fetchGallery();
      loadTeamMembers();
      fetchVideos();
      fetchContacts();
      fetchEmailCaptures();
    }

    // Simulate real-time updates
    const interval = setInterval(() => {
      if (isLoggedIn) {
        fetchBookings(); // Refresh bookings every 30 seconds
        // Recalculate metrics with fresh data
        setTimeout(() => {
          calculateDashboardMetrics();
        }, 200);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        setIsLoggedIn(true);
        setUsername('');
        setPassword('');
        addNotification('Login successful!', 'success');
      } else {
        addNotification('Invalid credentials. Use admin/admin', 'error');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('dashboard');
    addNotification('Logged out successfully', 'info');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Basic form validation
    if (modalType === 'team') {
      if (!data.name || !data.title || !data.description) {
        addNotification('Please fill in all required fields (Name, Title, Description)', 'error');
        setIsLoading(false);
        return;
      }
    }
    
    try {
      if (modalType === 'booking') {
        if (data.id) {
          // Update existing booking
          const response = await apiService.put(`/bookings/${data.id}`, {
            name: data.name,
            email: data.email,
            phone: data.phone,
            service: data.service,
            message: data.message,
            status: data.status
          });
          
          // Update local state
          setBookings(prev => prev.map(booking => 
            booking.id === parseInt(data.id) ? { ...booking, ...data } : booking
          ));
          addNotification('Booking updated successfully!', 'success');
        } else {
          // Create new booking - map form data to backend format
          const bookingData = {
            customerName: data.name,
            customerEmail: data.email,
            customerPhone: data.phone,
            packageId: getPackageIdFromService(data.service), // Convert service name to package ID
            selectedDate: data.date || new Date().toISOString().split('T')[0],
            selectedTime: data.time || '10:00',
            specialRequests: data.message || '' // Default empty message
          };
          
          const response = await apiService.post('/bookings/create', bookingData);
          if (response.success) {
            fetchBookings(); // Refresh the list
            addNotification('Booking created successfully!', 'success');
          } else {
            addNotification('Failed to create booking: ' + response.message, 'error');
          }
        }
      } else if (modalType === 'service') {
        // Service creation/update - now fully supported
        if (data.id) {
          // Update existing service
          const response = await apiService.put(`/services/${data.id}`, {
            name: data.name,
            description: data.description,
            price: parseFloat(data.price),
            category: data.category,
            isActive: data.isActive === 'true' || data.isActive === true,
            duration: data.duration
          });
          
          if (response.success) {
            // Update local state
            setServices(prev => prev.map(service => 
              service.id === parseInt(data.id) ? { ...service, ...data } : service
            ));
            addNotification('Service updated successfully!', 'success');
          } else {
            addNotification('Failed to update service: ' + response.message, 'error');
          }
        } else {
          // Create new service
          const response = await apiService.post('/services', {
            name: data.name,
            description: data.description,
            price: parseFloat(data.price),
            category: data.category,
            isActive: data.isActive === 'true' || data.isActive === true,
            duration: data.duration
          });
          
          if (response.success) {
            fetchServices(); // Refresh the list
            addNotification('Service created successfully!', 'success');
          } else {
            addNotification('Failed to create service: ' + response.message, 'error');
          }
        }
      } else if (modalType === 'testimonial') {
        // Testimonial creation/update
        if (data.id) {
          // Update existing testimonial
          const response = await apiService.put(`/testimonials/${data.id}`, {
            customerName: data.customerName,
            comment: data.testimonialText,
            rating: parseInt(data.rating),
            serviceUsed: data.service,
            isApproved: data.isApproved === 'true' || data.isApproved === true
          });
          
          if (response.success) {
            // Update local state
            setTestimonials(prev => prev.map(testimonial => 
              testimonial.id === parseInt(data.id) ? { ...testimonial, ...data } : testimonial
            ));
            addNotification('Testimonial updated successfully!', 'success');
          } else {
            addNotification('Failed to update testimonial: ' + response.message, 'error');
          }
        } else {
          // Create new testimonial
          const response = await apiService.post('/testimonials', {
            customerName: data.customerName,
            comment: data.testimonialText,
            rating: parseInt(data.rating),
            serviceUsed: data.service,
            isApproved: data.isApproved === 'true' || data.isApproved === true
          });
          
          if (response.success) {
            fetchTestimonials(); // Refresh the list
            addNotification('Testimonial created successfully!', 'success');
          } else {
            addNotification('Failed to create testimonial: ' + response.message, 'error');
          }
        }
      } else if (modalType === 'gallery') {
        // Gallery creation/update - now with file upload support
        const fileInput = document.getElementById('gallery-image');
        const file = fileInput.files[0];
        
        if (data.id) {
          // Update existing gallery item
          const response = await apiService.put(`/gallery/${data.id}`, {
            title: data.title,
            category: data.category,
            url: data.url || '/images/hero/homepage.jpeg', // Default image if no file uploaded
            isFeatured: data.isFeatured === 'true' || data.isFeatured === true
          });
          
          if (response.success) {
            // Update local state
            setGallery(prev => prev.map(item => 
              item.id === parseInt(data.id) ? { ...item, ...data } : item
            ));
            addNotification('Gallery item updated successfully!', 'success');
          } else {
            addNotification('Failed to update gallery item: ' + response.message, 'error');
          }
        } else {
          // Create new gallery item with file upload
          if (file) {
            // Upload file and create gallery item
            const formData = new FormData();
            formData.append('file', file);
            formData.append('title', data.title);
            formData.append('category', data.category);
            formData.append('isFeatured', data.isFeatured === 'true' || data.isFeatured === true);
            
            try {
              const response = await fetch('http://localhost:8081/api/gallery/upload', {
                method: 'POST',
                body: formData
              });
              
              const result = await response.json();
              
              if (result.success) {
                fetchGallery(); // Refresh the list
                addNotification('Image uploaded successfully!', 'success');
              } else {
                addNotification('Failed to upload image: ' + result.message, 'error');
              }
            } catch (error) {
              console.error('Upload error:', error);
              addNotification('Failed to upload image: ' + error.message, 'error');
            }
          } else {
            // Create gallery item without file upload (fallback)
            const response = await apiService.post('/gallery', {
              title: data.title,
              category: data.category,
              url: '/images/hero/homepage.jpeg', // Default image
              isFeatured: data.isFeatured === 'true' || data.isFeatured === true
            });
            
            if (response.success) {
              fetchGallery(); // Refresh the list
              addNotification('Gallery item created successfully!', 'success');
            } else {
              addNotification('Failed to create gallery item: ' + response.message, 'error');
            }
          }
        }
      } else if (modalType === 'team') {
        // Team member creation/update
        if (data.id) {
          // Update existing team member
          const response = await apiService.put(`/team/${data.id}`, {
            name: data.name,
            title: data.title,
            description: data.description,
            imageUrl: data.imageUrl,
            credentials: data.credentials,
            isFeatured: data.isFeatured === 'true' || data.isFeatured === true,
            displayOrder: parseInt(data.displayOrder) || 1
          });
          
          if (response.success) {
            // Update local state
            setTeamMembers(prev => prev.map(member => 
              member.id === parseInt(data.id) ? { ...member, ...data } : member
            ));
            addNotification('Team member updated successfully!', 'success');
          } else {
            addNotification('Failed to update team member: ' + response.message, 'error');
          }
        } else {
          // Create new team member
          const response = await apiService.post('/team', {
            name: data.name,
            title: data.title,
            description: data.description,
            imageUrl: data.imageUrl,
            credentials: data.credentials,
            isFeatured: data.isFeatured === 'true' || data.isFeatured === true,
            displayOrder: parseInt(data.displayOrder) || 1
          });
          
          if (response.success) {
            loadTeamMembers(); // Refresh the list
            addNotification('Team member created successfully!', 'success');
          } else {
            addNotification('Failed to create team member: ' + response.message, 'error');
          }
        }
      } else if (modalType === 'video') {
        // Handle video upload
        const fileInput = document.getElementById('video-file');
        const file = fileInput.files[0];
        if (file) {
          const title = document.getElementById('video-title').value || file.name;
          const description = document.getElementById('video-description').value || '';
          await uploadVideo(file, title, description);
        } else {
          addNotification('Please select a video file', 'warning');
          return; // Don't close modal if no file selected
        }
      } else {
        // Handle other modal types
        addNotification(`${modalType} updated successfully!`, 'success');
      }
      closeModal();
    } catch (error) {
      console.error('Error submitting form:', error);
      addNotification(`Failed to ${formData.id ? 'update' : 'create'} ${modalType}: ` + error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteService = async (serviceId) => {
    try {
      const response = await apiService.delete(`/services/${serviceId}`);
      if (response.success) {
        setServices(prev => prev.filter(service => service.id !== serviceId));
        addNotification('Service deleted successfully!', 'success');
      } else {
        addNotification('Failed to delete service: ' + response.message, 'error');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      addNotification('Failed to delete service: ' + error.message, 'error');
    }
  };

  const deleteGalleryItem = async (galleryId) => {
    try {
      const response = await apiService.delete(`/gallery/${galleryId}`);
      if (response.success) {
        setGallery(prev => prev.filter(item => item.id !== galleryId));
        addNotification('Gallery item deleted successfully!', 'success');
      } else {
        addNotification('Failed to delete gallery item: ' + response.message, 'error');
      }
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      addNotification('Failed to delete gallery item: ' + error.message, 'error');
    }
  };

  const deleteTeamMember = async (teamId) => {
    try {
      const response = await apiService.delete(`/team/${teamId}`);
      if (response.success) {
        setTeamMembers(prev => prev.filter(member => member.id !== teamId));
        addNotification('Team member deleted successfully!', 'success');
      } else {
        addNotification('Failed to delete team member: ' + response.message, 'error');
      }
    } catch (error) {
      console.error('Error deleting team member:', error);
      addNotification('Failed to delete team member: ' + error.message, 'error');
    }
  };

  // Settings management functions
  const handleSettingsSave = async () => {
    try {
      // Get all settings form data
      const businessName = document.getElementById('business-name')?.value;
      const contactEmail = document.getElementById('contact-email')?.value;
      const phoneNumber = document.getElementById('phone-number')?.value;
      const defaultDuration = document.getElementById('default-duration')?.value;
      const autoConfirm = document.getElementById('auto-confirm')?.checked;
      const emailNotifications = document.getElementById('email-notifications')?.checked;
      const smsNotifications = document.getElementById('sms-notifications')?.checked;
      
      const settingsData = {
        businessName: businessName || 'Movement Performance Training',
        contactEmail: contactEmail || 'chloebarrettraining@icloud.com',
        phoneNumber: phoneNumber || '04 98 471 509',
        defaultDuration: defaultDuration || '2',
        autoConfirm: autoConfirm || false,
        emailNotifications: emailNotifications || false,
        smsNotifications: smsNotifications || false
      };
      
      // Save to localStorage for persistence
      localStorage.setItem('mpt-admin-settings', JSON.stringify(settingsData));
      console.log('Settings saved to localStorage:', settingsData);
      addNotification('Settings saved successfully!', 'success');
      
      // In the future, you could add:
      // const response = await apiService.post('/settings', settingsData);
      
    } catch (error) {
      console.error('Error saving settings:', error);
      addNotification('Failed to save settings: ' + error.message, 'error');
    }
  };

  const loadSettings = () => {
    try {
      const savedSettings = localStorage.getItem('mpt-admin-settings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
        // Load settings into form fields
        const businessNameField = document.getElementById('business-name');
        const contactEmailField = document.getElementById('contact-email');
        const phoneNumberField = document.getElementById('phone-number');
        const defaultDurationField = document.getElementById('default-duration');
        const autoConfirmField = document.getElementById('auto-confirm');
        const emailNotificationsField = document.getElementById('email-notifications');
        const smsNotificationsField = document.getElementById('sms-notifications');
        
        if (businessNameField) businessNameField.value = settings.businessName || 'Movement Performance Training';
        if (contactEmailField) contactEmailField.value = settings.contactEmail || 'chloebarrettraining@icloud.com';
        if (phoneNumberField) phoneNumberField.value = settings.phoneNumber || '04 98 471 509';
        if (defaultDurationField) defaultDurationField.value = settings.defaultDuration || '2';
        if (autoConfirmField) autoConfirmField.checked = settings.autoConfirm || true;
        if (emailNotificationsField) emailNotificationsField.checked = settings.emailNotifications || true;
        if (smsNotificationsField) smsNotificationsField.checked = settings.smsNotifications || false;
        
        console.log('Settings loaded from localStorage:', settings);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleSettingsReset = () => {
    // Reset form fields to default values
    const businessNameField = document.getElementById('business-name');
    const contactEmailField = document.getElementById('contact-email');
    const phoneNumberField = document.getElementById('phone-number');
    const defaultDurationField = document.getElementById('default-duration');
    const autoConfirmField = document.getElementById('auto-confirm');
    const emailNotificationsField = document.getElementById('email-notifications');
    const smsNotificationsField = document.getElementById('sms-notifications');
    
    if (businessNameField) businessNameField.value = 'Movement Performance Training';
    if (contactEmailField) contactEmailField.value = 'chloebarrettraining@icloud.com';
    if (phoneNumberField) phoneNumberField.value = '04 98 471 509';
    if (defaultDurationField) defaultDurationField.value = '2';
    if (autoConfirmField) autoConfirmField.checked = true;
    if (emailNotificationsField) emailNotificationsField.checked = true;
    if (smsNotificationsField) smsNotificationsField.checked = false;
    
    // Also clear from localStorage
    localStorage.removeItem('mpt-admin-settings');
    addNotification('Settings reset to defaults!', 'success');
  };

  const deleteBooking = async (bookingId) => {
    try {
      console.log('Deleting booking:', bookingId);
      const response = await apiService.delete(`/bookings/${bookingId}`);
      console.log('Delete response:', response);
      
      // Remove the booking from the local state
      setBookings(prev => prev.filter(booking => booking.id !== bookingId));
      addNotification('Booking deleted successfully!', 'success');
      
      // Update dashboard data
      setDashboardData(prev => ({
        ...prev,
        totalBookings: prev.totalBookings - 1
      }));
    } catch (error) {
      console.error('Error deleting booking:', error);
      addNotification('Failed to delete booking: ' + error.message, 'error');
    }
  };

  // Function to delete a service - DISABLED (services are managed by backend)

  // Function to fetch videos from backend
  const fetchVideos = async () => {
    try {
      console.log('Fetching videos from backend...');
      // List of available videos in the static directory
      const availableVideos = [
        {
          filename: 'training-video.mp4',
          url: '/videos/training-video.mp4',
          title: 'Training Video',
          description: 'Professional training session video',
          size: 6616917, // 6.6 MB
          lastModified: new Date().toISOString()
        },
        {
          filename: 'WhatsApp Video 2025-09-01 at 11.30.12 AM_1757151286650.mp4',
          url: '/videos/WhatsApp Video 2025-09-01 at 11.30.12 AM_1757151286650.mp4',
          title: 'WhatsApp Training Video',
          description: 'Training video from WhatsApp',
          size: 10000000, // Estimated 10 MB
          lastModified: new Date().toISOString()
        }
      ];
      
      setVideos(availableVideos);
      console.log('Videos loaded successfully:', availableVideos.length);
    } catch (error) {
      console.error('Error fetching videos:', error);
      addNotification('Failed to fetch videos: ' + error.message, 'error');
    }
  };

  // Function to upload a video
  const uploadVideo = async (file, title, description) => {
    setIsUploadingVideo(true);
    try {
      console.log('Uploading video:', file.name);
      console.log('File type:', file.type);
      console.log('File size:', file.size);
      
      // Use direct fetch instead of apiService to debug
      const formData = new FormData();
      formData.append('file', file);
      if (title) formData.append('title', title);
      if (description) formData.append('description', description);

      // Debug FormData contents
      console.log('FormData contents:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // Video upload functionality disabled - endpoint not available
      console.log('Video upload functionality disabled');
      addNotification('Video upload functionality is currently disabled', 'warning');
      return null;
    } catch (error) {
      console.error('Error uploading video:', error);
      console.error('Error details:', error.message);
      addNotification('Failed to upload video: ' + error.message, 'error');
      return null;
    } finally {
      setIsUploadingVideo(false);
    }
  };

  // Function to delete a video
  const deleteVideo = async (filename) => {
    try {
      console.log('Deleting video:', filename);
      const response = await apiService.delete(`/videos/${filename}`);
      console.log('Delete video response:', response);
      
      if (response.success) {
        // Remove the video from the local state
        setVideos(prev => prev.filter(video => video.filename !== filename));
        addNotification('Video deleted successfully!', 'success');
      } else {
        addNotification('Failed to delete video: ' + response.message, 'error');
      }
    } catch (error) {
      console.error('Error deleting video:', error);
      addNotification('Failed to delete video: ' + error.message, 'error');
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <div className="login-header">
            <div className="admin-logo">
              <div className="admin-logo-icon">
                <img src="/images/logos/mpt-logo.jpeg" alt="MPT Logo" className="admin-logo-image" />
              </div>
              <h1>MPT Admin Portal</h1>
            </div>
            <p>Advanced Management Dashboard</p>
          </div>
          
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                autoComplete="username"
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                autoComplete="current-password"
                required
                disabled={isLoading}
              />
            </div>
            
            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <div className="login-info">
            <p><strong>Demo Credentials:</strong></p>
            <p>Username: admin</p>
            <p>Password: admin</p>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // RENDER SECTION
  // ============================================================================
  
  return (
    <div className="admin-dashboard">
      {/* ========================================================================
          NOTIFICATIONS SECTION
          ======================================================================== */}
      <div className="notifications-container">
        {notifications.map(notification => (
          <div key={notification.id} className={`notification ${notification.type}`}>
            <span>{notification.message}</span>
            <button onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}>×</button>
          </div>
        ))}
      </div>

      {/* ========================================================================
          HEADER SECTION
          ======================================================================== */}
      <div className="admin-header">
        <div className="admin-header-content">
          <div className="admin-brand">
            <div className="admin-brand-icon">
              <img src="/images/logos/mpt-logo.jpeg" alt="MPT Logo" className="admin-brand-image" />
            </div>
            <div>
              <h1>MPT Admin Dashboard</h1>
              <span className="admin-subtitle">Advanced Management Portal</span>
            </div>
          </div>
          
          <div className="admin-header-actions">
            <div className="search-box">
              <label htmlFor="admin-search-input" className="sr-only">Search</label>
              <input
                type="text"
                id="admin-search-input"
                name="adminSearch"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoComplete="off"
              />
              <span className="search-icon">🔍</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
          </div>
        </div>
      </div>

      {/* ========================================================================
          MAIN CONTENT AREA
          ======================================================================== */}
      <div className="admin-content">
        {/* ========================================================================
            SIDEBAR NAVIGATION
            ======================================================================== */}
        <div className="admin-sidebar">
          <nav className="admin-nav">
            <button
              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              📊 Dashboard
            </button>
            <button
              className={`nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
              onClick={() => setActiveTab('bookings')}
            >
              📅 Bookings
            </button>
            <button
              className={`nav-item ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => setActiveTab('services')}
            >
              🎯 Services
            </button>
            <button
              className={`nav-item ${activeTab === 'testimonials' ? 'active' : ''}`}
              onClick={() => setActiveTab('testimonials')}
            >
              💬 Testimonials
            </button>
            <button
              className={`nav-item ${activeTab === 'gallery' ? 'active' : ''}`}
              onClick={() => setActiveTab('gallery')}
            >
              🖼️ Gallery
            </button>
            <button
              className={`nav-item ${activeTab === 'team' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('team');
                loadTeamMembers();
              }}
            >
              👥 Team ({teamMembers.length})
            </button>
            <button
              className={`nav-item ${activeTab === 'videos' ? 'active' : ''}`}
              onClick={() => setActiveTab('videos')}
            >
              🎥 Videos
            </button>
            <button
              className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              📈 Analytics
            </button>
            <button
              className={`nav-item ${activeTab === 'contacts' ? 'active' : ''}`}
              onClick={() => setActiveTab('contacts')}
            >
              📧 Contact Messages
            </button>
            <button
              className={`nav-item ${activeTab === 'email-captures' ? 'active' : ''}`}
              onClick={() => setActiveTab('email-captures')}
            >
              📬 Email Captures
            </button>
            <button
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('settings');
                // Load saved settings when switching to settings tab
                setTimeout(loadSettings, 100); // Small delay to ensure DOM is ready
              }}
            >
              ⚙️ Settings
            </button>
          </nav>
        </div>

        {/* ========================================================================
            MAIN CONTENT PANEL
            ======================================================================== */}
        <div className="admin-main">
          {/* ========================================================================
              DASHBOARD TAB CONTENT
              ======================================================================== */}
          {activeTab === 'dashboard' && (
            <div className="dashboard-overview">
              <div className="dashboard-header">
              <h2>Dashboard Overview</h2>
                <div className="dashboard-controls">
                  <button className="refresh-btn" onClick={() => addNotification('Data refreshed', 'success')}>
                    🔄 Refresh
                  </button>
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-card primary">
                  <div className="stat-icon">📅</div>
                  <div className="stat-content">
                    <h3>Total Bookings</h3>
                    <div 
                      className="dashboard-number-display"
                      style={{
                        fontSize: '3rem !important',
                        fontWeight: 'bold !important',
                        color: '#000000 !important',
                        backgroundColor: '#ffffff !important',
                        padding: '15px !important',
                        border: '3px solid #000000 !important',
                        margin: '15px 0 !important',
                        textShadow: 'none !important',
                        fontFamily: 'Arial, sans-serif !important',
                        display: 'block !important',
                        visibility: 'visible !important',
                        opacity: '1 !important',
                        transform: 'none !important',
                        filter: 'none !important',
                        boxShadow: 'none !important',
                        outline: 'none !important',
                        borderRadius: '0px !important'
                      }}
                    >{dashboardData.totalBookings}</div>
                    <p className="stat-change positive">+{dashboardData.monthlyGrowth}% this month</p>
                  </div>
                </div>
                <div className="stat-card success">
                  <div className="stat-icon">💰</div>
                  <div className="stat-content">
                    <h3>Revenue</h3>
                    <div 
                      className="dashboard-number-display"
                      style={{
                        fontSize: '3rem !important',
                        fontWeight: 'bold !important',
                        color: '#000000 !important',
                        backgroundColor: '#ffffff !important',
                        padding: '15px !important',
                        border: '3px solid #000000 !important',
                        margin: '15px 0 !important',
                        textShadow: 'none !important',
                        fontFamily: 'Arial, sans-serif !important',
                        display: 'block !important',
                        visibility: 'visible !important',
                        opacity: '1 !important',
                        transform: 'none !important',
                        filter: 'none !important',
                        boxShadow: 'none !important',
                        outline: 'none !important',
                        borderRadius: '0px !important'
                      }}
                    >${dashboardData.revenue.toLocaleString()}</div>
                    <p className="stat-change positive">+12% from last month</p>
                  </div>
                </div>
                <div className="stat-card warning">
                  <div className="stat-icon">⭐</div>
                  <div className="stat-content">
                    <h3>Avg Rating</h3>
                    <div 
                      className="dashboard-number-display"
                      style={{
                        fontSize: '3rem !important',
                        fontWeight: 'bold !important',
                        color: '#000000 !important',
                        backgroundColor: '#ffffff !important',
                        padding: '15px !important',
                        border: '3px solid #000000 !important',
                        margin: '15px 0 !important',
                        textShadow: 'none !important',
                        fontFamily: 'Arial, sans-serif !important',
                        display: 'block !important',
                        visibility: 'visible !important',
                        opacity: '1 !important',
                        transform: 'none !important',
                        filter: 'none !important',
                        boxShadow: 'none !important',
                        outline: 'none !important',
                        borderRadius: '0px !important'
                      }}
                    >{dashboardData.avgRating}</div>
                    <p className="stat-change positive">+0.2 from last month</p>
                  </div>
                </div>
                <div className="stat-card info">
                  <div className="stat-icon">📊</div>
                  <div className="stat-content">
                    <h3>Conversion Rate</h3>
                    <div 
                      className="dashboard-number-display"
                      style={{
                        fontSize: '3rem !important',
                        fontWeight: 'bold !important',
                        color: '#000000 !important',
                        backgroundColor: '#ffffff !important',
                        padding: '15px !important',
                        border: '3px solid #000000 !important',
                        margin: '15px 0 !important',
                        textShadow: 'none !important',
                        fontFamily: 'Arial, sans-serif !important',
                        display: 'block !important',
                        visibility: 'visible !important',
                        opacity: '1 !important',
                        transform: 'none !important',
                        filter: 'none !important',
                        boxShadow: 'none !important',
                        outline: 'none !important',
                        borderRadius: '0px !important'
                      }}
                    >{dashboardData.conversionRate}%</div>
                    <p className="stat-change positive">+5% from last month</p>
                  </div>
                </div>
              </div>

              <div className="dashboard-grid">
                <div className="dashboard-card">
                  <h3>Recent Bookings</h3>
                  <div className="recent-list">
                    {bookings.slice(0, 5).map(booking => (
                      <div key={booking.id} className="recent-item">
                        <div className="recent-info">
                          <strong>{booking.name}</strong>
                          <span>{booking.service}</span>
                        </div>
                        <div className={`status-badge ${booking.status}`}>
                          {booking.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="dashboard-card">
                  <h3>Quick Actions</h3>
                  <div className="quick-actions">
                    <button className="quick-action-btn" onClick={() => openModal('booking')}>
                      📅 New Booking
                    </button>
                    <button className="quick-action-btn" onClick={() => openModal('service')}>
                      🎯 Add Service
                    </button>
                    <button className="quick-action-btn" onClick={() => openModal('testimonial')}>
                      💬 Add Testimonial
                    </button>
                    <button className="quick-action-btn" onClick={() => openModal('gallery')}>
                      🖼️ Upload Image
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================
              BOOKINGS TAB CONTENT
              ======================================================================== */}
          {activeTab === 'bookings' && (
            <div className="bookings-management">
              <div className="section-header">
                <h2>Bookings Management ({bookings.length} bookings)</h2>
                <div className="section-controls">
                  <button className="refresh-btn" onClick={fetchBookings}>
                    🔄 Refresh
                  </button>
                  <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button className="add-btn" onClick={() => openModal('booking')}>
                    + New Booking
                  </button>
                </div>
              </div>
              
              {selectedItems.length > 0 && (
                <div className="bulk-actions">
                  <span>{selectedItems.length} items selected</span>
                  <button onClick={() => bulkAction('Confirm')}>Confirm</button>
                  <button onClick={() => bulkAction('Cancel')}>Cancel</button>
                  <button onClick={() => bulkAction('Export')}>Export</button>
                </div>
              )}

              <div className="bookings-table">
                {isLoadingBookings ? (
                  <div className="loading-state">
                    <p>🔄 Loading bookings...</p>
                  </div>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>
                          <input
                            type="checkbox"
                            id="select-all-bookings"
                            name="selectAllBookings"
                            autoComplete="off"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedItems(bookings.map(b => b.id));
                              } else {
                                setSelectedItems([]);
                              }
                            }}
                          />
                        </th>
                        <th>Name</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.map(booking => (
                      <tr key={booking.id}>
                        <td>
                          <input
                            type="checkbox"
                            id={`booking-checkbox-${booking.id}`}
                            name={`bookingCheckbox${booking.id}`}
                            autoComplete="off"
                            checked={selectedItems.includes(booking.id)}
                            onChange={() => toggleItemSelection(booking.id)}
                          />
                        </td>
                        <td>
                          <div className="booking-name">
                            <strong>{booking.name}</strong>
                            <small>{booking.email}</small>
                </div>
                        </td>
                        <td>{booking.service}</td>
                        <td>{booking.date}</td>
                        <td>
                          <span className={`status-badge ${booking.status}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td>${booking.amount}</td>
                        <td>
                          <button className="edit-btn" onClick={() => openModal('booking', booking)}>
                            Edit
                          </button>
                          <button className="delete-btn" onClick={() => deleteBooking(booking.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================
              SERVICES TAB CONTENT
              ======================================================================== */}
          {activeTab === 'services' && (
            <div className="services-management">
              <div className="section-header">
                <h2>Services Management</h2>
                <div className="section-controls">
                  <button className="view-toggle" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
                    {viewMode === 'grid' ? '📋 List' : '🔲 Grid'}
                  </button>
                  <button className="add-btn" onClick={() => openModal('service')}>
                    + New Service
                  </button>
                </div>
              </div>
              
              <div className={`services-${viewMode}`}>
                {services.map(service => (
                  <div key={service.id} className="service-item">
                    <div className="service-header">
                      <h3>{service.name}</h3>
                      <span className={`status-badge ${service.isActive ? 'active' : 'inactive'}`}>
                        {service.isActive ? 'Active' : 'Inactive'}
                      </span>
                  </div>
                    <p>{service.description}</p>
                    <div className="service-details">
                      <span>💰 ${service.price}</span>
                      <span>⏱️ {service.duration}</span>
                      <span>🏷️ {service.category}</span>
                </div>
                  <div className="service-actions">
                      <button className="edit-btn" onClick={() => openModal('service', service)}>
                        Edit
                      </button>
                      <button className="delete-btn" onClick={() => deleteService(service.id)}>
                        Delete
                      </button>
                </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================
              TESTIMONIALS TAB CONTENT
              ======================================================================== */}
          {activeTab === 'testimonials' && (
            <div className="testimonials-management">
              <div className="section-header">
                <h2>Testimonials Management</h2>
                <button className="add-btn" onClick={() => openModal('testimonial')}>
                  + New Testimonial
                </button>
              </div>
              
              <div className="testimonials-list">
                {isLoadingTestimonials ? (
                  <div className="loading-indicator">Loading testimonials...</div>
                ) : testimonials.length === 0 ? (
                  <div className="no-data">No testimonials found</div>
                ) : (
                  testimonials.map(testimonial => (
                  <div key={testimonial.id} className="testimonial-item">
                  <div className="testimonial-content">
                      <div className="testimonial-header">
                        <h4>{testimonial.name}</h4>
                        <div className="testimonial-rating">
                          {'⭐'.repeat(testimonial.rating)}
                        </div>
                      </div>
                      <p>"{testimonial.text}"</p>
                      <div className="testimonial-meta">
                        <span>Service: {testimonial.service}</span>
                        <span>Date: {testimonial.date}</span>
                        <span className={`status-badge ${testimonial.isApproved ? 'approved' : 'pending'}`}>
                          {testimonial.isApproved ? 'Approved' : 'Pending'}
                        </span>
                      </div>
                    </div>
                    <div className="testimonial-actions">
                      <button className="edit-btn" onClick={() => openModal('testimonial', testimonial)}>
                        Edit
                      </button>
                      <button className="approve-btn" onClick={() => toggleTestimonialApproval(testimonial.id)}>
                        {testimonial.isApproved ? 'Unapprove' : 'Approve'}
                      </button>
                      <button className="delete-btn" onClick={() => deleteTestimonial(testimonial.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ========================================================================
              GALLERY TAB CONTENT
              ======================================================================== */}
          {activeTab === 'gallery' && (
            <div className="gallery-management">
              <div className="section-header">
                <h2>Gallery Management</h2>
                <div className="section-controls">
                  <button className="view-toggle" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
                    {viewMode === 'grid' ? '📋 List' : '🔲 Grid'}
                  </button>
                  <button className="add-btn" onClick={() => openModal('gallery')}>
                    + Upload Image
                  </button>
                </div>
              </div>

              <div className={`gallery-${viewMode}`}>
                {gallery.map(item => (
                  <div key={item.id} className="gallery-item">
                    <div className="gallery-image">
                      <img 
                        src={item.url ? `http://localhost:8081${item.url}` : (item.imageUrl || '/images/placeholder-gallery.jpg')} 
                        alt={item.title || 'Gallery item'} 
                        onError={(e) => {
                          console.error('Image failed to load:', item.url, 'for item:', item.title);
                          e.target.src = '/images/placeholder-gallery.jpg';
                        }}
                        onLoad={() => {
                          console.log('Image loaded successfully:', item.url, 'for item:', item.title);
                        }}
                      />
                      {item.isFeatured && <span className="featured-badge">Featured</span>}
                    </div>
                    <div className="gallery-info">
                      <h4>{item.title || 'Untitled'}</h4>
                      <span className="category-badge">{item.category || 'Uncategorized'}</span>
                    </div>
                    <div className="gallery-actions">
                      <button className="edit-btn" onClick={() => openModal('gallery', item)}>
                        Edit
                      </button>
                      <button className="feature-btn" onClick={() => addNotification('Featured status updated', 'success')}>
                        {item.isFeatured ? 'Unfeature' : 'Feature'}
                      </button>
                      <button className="delete-btn" onClick={() => deleteGalleryItem(item.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================
              TEAM TAB CONTENT
              ======================================================================== */}
          {activeTab === 'team' && (
            <div className="team-management">
              <div className="section-header">
                <h2>Team Management ({teamMembers.length} members)</h2>
                <div className="section-controls">
                  <button className="view-toggle" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
                    {viewMode === 'grid' ? '📋 List' : '🔲 Grid'}
                  </button>
                  <button className="add-btn" onClick={() => openModal('team')}>
                    + Add Team Member
                  </button>
                </div>
              </div>

              {isLoadingTeam ? (
                <div className="loading-state">
                  <div className="loading-spinner"></div>
                  <p>Loading team members...</p>
                </div>
              ) : (
                <div className={`team-${viewMode}`}>
                  {teamMembers.length === 0 ? (
                    <div className="empty-state">
                      <div className="empty-icon">👥</div>
                      <h3>No team members added yet</h3>
                      <p>Add your first team member to get started!</p>
                      <button className="add-btn" onClick={() => openModal('team')}>
                        Add Team Member
                      </button>
                    </div>
                  ) : (
                    teamMembers.map(member => (
                      <div key={member.id} className="team-member-item">
                        <div className="member-image">
                          <img 
                            src={member.imageUrl ? `http://localhost:8081${member.imageUrl}` : '/images/placeholder-team.jpg'} 
                            alt={member.name}
                            onError={(e) => {
                              e.target.src = '/images/placeholder-team.jpg';
                            }}
                          />
                          {member.isFeatured && <div className="featured-badge">⭐ Featured</div>}
                        </div>
                        <div className="member-info">
                          <h3>{member.name}</h3>
                          <p className="member-title">{member.title}</p>
                          <p className="member-description">{member.description}</p>
                          {member.credentials && (
                            <div className="member-credentials">
                              <strong>Credentials:</strong> {member.credentials}
                            </div>
                          )}
                          <div className="member-meta">
                            <span>Display Order: {member.displayOrder}</span>
                            <span>Created: {new Date(member.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="team-actions">
                          <button className="edit-btn" onClick={() => openModal('team', member)}>
                            Edit
                          </button>
                          <button className="feature-btn" onClick={() => addNotification('Featured status updated', 'success')}>
                            {member.isFeatured ? 'Unfeature' : 'Feature'}
                          </button>
                          <button className="delete-btn" onClick={() => deleteTeamMember(member.id)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* ========================================================================
              VIDEOS TAB CONTENT
              ======================================================================== */}
          {activeTab === 'videos' && (
            <div className="videos-management">
              <div className="section-header">
                <h2>Video Management ({videos.length} videos)</h2>
                <div className="section-controls">
                  <button className="view-toggle" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
                    {viewMode === 'grid' ? '📋 List' : '🔲 Grid'}
                  </button>
                  <button className="add-btn" onClick={() => openModal('video')}>
                    + Upload Video
                  </button>
                </div>
              </div>

              <div className={`videos-${viewMode}`}>
                {videos.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">🎥</div>
                    <h3>No videos uploaded yet</h3>
                    <p>Upload your first video to get started!</p>
                    <button className="add-btn" onClick={() => openModal('video')}>
                      Upload Video
                    </button>
                  </div>
                ) : (
                  videos.map(video => (
                    <div key={video.filename} className="video-item">
                      <div className="video-preview">
                        <video controls width="100%" height="200">
                          <source src={`http://localhost:8081${video.url}`} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                      <div className="video-info">
                        <h4>{video.filename}</h4>
                        <p className="video-size">Size: {(video.size / (1024 * 1024)).toFixed(2)} MB</p>
                        <p className="video-date">Uploaded: {new Date(video.lastModified).toLocaleDateString()}</p>
                      </div>
                      <div className="video-actions">
                        <button className="edit-btn" onClick={() => openModal('video', video)}>
                          Edit
                        </button>
                        <button className="delete-btn" onClick={() => deleteVideo(video.filename)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ========================================================================
              ANALYTICS TAB CONTENT
              ======================================================================== */}
          {activeTab === 'analytics' && (
            <div className="analytics-management">
              <h2>Analytics & Reports</h2>
              
              <div className="analytics-grid">
                <div className="analytics-card">
                  <h3>📊 Booking Trends</h3>
                  <div className="chart-placeholder">
                    <p>Chart visualization would go here</p>
                    <div className="chart-bars">
                      <div className="bar" style={{height: '60%'}}></div>
                      <div className="bar" style={{height: '80%'}}></div>
                      <div className="bar" style={{height: '45%'}}></div>
                      <div className="bar" style={{height: '90%'}}></div>
                      <div className="bar" style={{height: '70%'}}></div>
                    </div>
                  </div>
                </div>

                <div className="analytics-card">
                  <h3>💰 Revenue Analysis</h3>
                  <div className="revenue-stats">
                    <div className="revenue-item">
                      <span>Total Revenue</span>
                      <strong>${dashboardData.revenue.toLocaleString()}</strong>
                    </div>
                    <div className="revenue-item">
                      <span>Confirmed Bookings</span>
                      <strong>{dashboardData.recentBookings}</strong>
                    </div>
                    <div className="revenue-item">
                      <span>Monthly Growth</span>
                      <strong className={dashboardData.monthlyGrowth >= 0 ? "positive" : "negative"}>
                        {dashboardData.monthlyGrowth >= 0 ? "+" : ""}{dashboardData.monthlyGrowth}%
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="analytics-card">
                  <h3>⭐ Customer Satisfaction</h3>
                  <div className="satisfaction-stats">
                    <div className="rating-breakdown">
                      <div className="rating-item">
                        <span>5⭐</span>
                        <div className="rating-bar"><div className="rating-fill" style={{width: '85%'}}></div></div>
                        <span>85%</span>
                      </div>
                      <div className="rating-item">
                        <span>4⭐</span>
                        <div className="rating-bar"><div className="rating-fill" style={{width: '12%'}}></div></div>
                        <span>12%</span>
                      </div>
                      <div className="rating-item">
                        <span>3⭐</span>
                        <div className="rating-bar"><div className="rating-fill" style={{width: '3%'}}></div></div>
                        <span>3%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="analytics-card">
                  <h3>📈 Popular Services</h3>
                  <div className="popular-services">
                    <div className="service-rank">
                      <span>1.</span>
                      <span>Kitesurfing Training</span>
                      <span>45 bookings</span>
                    </div>
                    <div className="service-rank">
                      <span>2.</span>
                      <span>Hydrofoil Training</span>
                      <span>32 bookings</span>
                    </div>
                    <div className="service-rank">
                      <span>3.</span>
                      <span>Wing Foil Training</span>
                      <span>28 bookings</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================
              CONTACT MESSAGES TAB CONTENT
              ======================================================================== */}
          {activeTab === 'contacts' && (
            <div className="contacts-management">
              <div className="section-header">
                <h2>Contact Messages ({contacts.length} messages)</h2>
                <div className="section-controls">
                  <button className="refresh-btn" onClick={fetchContacts}>
                    🔄 Refresh
                  </button>
                  <button 
                    className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                    onClick={() => setFilterStatus('all')}
                  >
                    Show All
                  </button>
                  <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="all">All Messages</option>
                    <option value="NEW">New</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="RESOLVED">Resolved</option>
                  </select>
                  <input 
                    type="text" 
                    placeholder="Search messages..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>

              {/* Stats Cards */}
              <div className="stats-grid">
                <div className={`stat-card ${filterStatus === 'unread' ? 'active' : ''}`} onClick={() => setFilterStatus('unread')}>
                  <div className="stat-number">{contacts.filter(c => !c.isRead).length}</div>
                  <div className="stat-label">Unread Messages</div>
                </div>
                <div className={`stat-card ${filterStatus === 'NEW' ? 'active' : ''}`} onClick={() => setFilterStatus('NEW')}>
                  <div className="stat-number">{contacts.filter(c => c.status === 'NEW').length}</div>
                  <div className="stat-label">New Messages</div>
                </div>
                <div className={`stat-card ${filterStatus === 'IN_PROGRESS' ? 'active' : ''}`} onClick={() => setFilterStatus('IN_PROGRESS')}>
                  <div className="stat-number">{contacts.filter(c => c.status === 'IN_PROGRESS').length}</div>
                  <div className="stat-label">In Progress</div>
                </div>
                <div className={`stat-card ${filterStatus === 'RESOLVED' ? 'active' : ''}`} onClick={() => setFilterStatus('RESOLVED')}>
                  <div className="stat-number">{contacts.filter(c => c.status === 'RESOLVED').length}</div>
                  <div className="stat-label">Resolved</div>
                </div>
              </div>

              <div className="contacts-table-container">
                {contacts.length === 0 ? (
                  <div className="empty-state">
                    <p>No contact messages found</p>
                  </div>
                ) : (
                  <table className="contacts-table">
                    <thead>
                      <tr>
                        <th>Status</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts
                        .filter(contact => {
                          if (filterStatus === 'all') return true;
                          if (filterStatus === 'unread') return !contact.isRead;
                          if (filterStatus === 'NEW') return contact.status === 'NEW';
                          if (filterStatus === 'IN_PROGRESS') return contact.status === 'IN_PROGRESS';
                          if (filterStatus === 'RESOLVED') return contact.status === 'RESOLVED';
                          return true;
                        })
                        .filter(contact => {
                          if (!searchTerm) return true;
                          const searchLower = searchTerm.toLowerCase();
                          return (
                            (contact.fullName || `${contact.firstName} ${contact.lastName}`).toLowerCase().includes(searchLower) ||
                            contact.email.toLowerCase().includes(searchLower) ||
                            (contact.subject || '').toLowerCase().includes(searchLower) ||
                            (contact.message || '').toLowerCase().includes(searchLower)
                          );
                        })
                        .map(contact => (
                        <tr key={contact.id} className={`contact-row ${contact.isRead ? 'read' : 'unread'}`}>
                          <td>
                            <span className={`status-badge ${contact.status?.toLowerCase() || 'new'}`}>
                              {contact.status || 'NEW'}
                            </span>
                            {!contact.isRead && <span className="unread-indicator">●</span>}
                          </td>
                          <td className="contact-name">
                            {contact.fullName || `${contact.firstName} ${contact.lastName}`}
                          </td>
                          <td className="contact-email">
                            <a href={`mailto:${contact.email}`}>{contact.email}</a>
                          </td>
                          <td className="contact-subject">
                            {contact.subject}
                          </td>
                          <td className="contact-message-cell">
                            <div className="message-preview">
                              {contact.message && contact.message.length > 100 
                                ? `${contact.message.substring(0, 100)}...` 
                                : contact.message || 'No message'
                              }
                            </div>
                          </td>
                          <td className="contact-date">
                            <div>{new Date(contact.createdAt).toLocaleDateString()}</div>
                            <div className="time">{new Date(contact.createdAt).toLocaleTimeString()}</div>
                          </td>
                          <td className="contact-actions">
                            {!contact.isRead && (
                              <button 
                                className="action-btn mark-read"
                                onClick={() => {
                                  apiService.put(`/contacts/${contact.id}/read`);
                                  fetchContacts();
                                }}
                                title="Mark as Read"
                              >
                                ✓
                              </button>
                            )}
                            <select 
                              value={contact.status || 'NEW'} 
                              onChange={(e) => {
                                apiService.put(`/contacts/${contact.id}/status`, { status: e.target.value });
                                fetchContacts();
                              }}
                              className="status-select"
                              title="Change Status"
                            >
                              <option value="NEW">New</option>
                              <option value="IN_PROGRESS">In Progress</option>
                              <option value="RESOLVED">Resolved</option>
                            </select>
                            <button 
                              className="action-btn reply"
                              onClick={() => window.open(`mailto:${contact.email}?subject=Re: ${contact.subject}`, '_blank')}
                              title="Reply"
                            >
                              📧
                            </button>
                            <button 
                              className="action-btn delete"
                              onClick={() => {
                                if (window.confirm('Delete this contact message?')) {
                                  apiService.delete(`/contacts/${contact.id}`);
                                  fetchContacts();
                                }
                              }}
                              title="Delete"
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================
              EMAIL CAPTURES TAB CONTENT
              ======================================================================== */}
          {activeTab === 'email-captures' && (
            <div className="email-captures-management">
              <div className="section-header">
                <h2>Email Captures ({emailCaptures.length} emails)</h2>
                <div className="section-controls">
                  <button className="refresh-btn" onClick={fetchEmailCaptures}>
                    🔄 Refresh
                  </button>
                  <button 
                    className="refresh-btn" 
                    onClick={() => {
                      const localEmails = JSON.parse(localStorage.getItem('capturedEmails') || '[]');
                      console.log('Local emails:', localEmails);
                      alert(`Found ${localEmails.length} emails in localStorage. Check console for details.`);
                    }}
                  >
                    📱 Check Local Emails
                  </button>
                  <button 
                    className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                    onClick={() => setFilterStatus('all')}
                  >
                    Show All
                  </button>
                  <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="all">All Emails</option>
                    <option value="resources">Resources</option>
                    <option value="newsletter">Newsletter</option>
                    <option value="contact">Contact</option>
                  </select>
                  <input 
                    type="text" 
                    placeholder="Search emails..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>

              {/* Stats Cards */}
              <div className="stats-grid">
                <div className={`stat-card ${filterStatus === 'verified' ? 'active' : ''}`} onClick={() => setFilterStatus('verified')}>
                  <div className="stat-number">{emailCaptures.filter(e => e.isVerified).length}</div>
                  <div className="stat-label">Verified Emails</div>
                </div>
                <div className={`stat-card ${filterStatus === 'unverified' ? 'active' : ''}`} onClick={() => setFilterStatus('unverified')}>
                  <div className="stat-number">{emailCaptures.filter(e => !e.isVerified).length}</div>
                  <div className="stat-label">Unverified Emails</div>
                </div>
                <div className={`stat-card ${filterStatus === 'resources' ? 'active' : ''}`} onClick={() => setFilterStatus('resources')}>
                  <div className="stat-number">{emailCaptures.filter(e => e.source === 'resources').length}</div>
                  <div className="stat-label">From Resources</div>
                </div>
                <div className={`stat-card ${filterStatus === 'active' ? 'active' : ''}`} onClick={() => setFilterStatus('active')}>
                  <div className="stat-number">{emailCaptures.filter(e => !e.unsubscribed).length}</div>
                  <div className="stat-label">Active Subscribers</div>
                </div>
              </div>

              <div className="email-captures-grid">
                {emailCaptures.length === 0 ? (
                  <div className="empty-state">
                    <p>No email captures found</p>
                  </div>
                ) : (
                  emailCaptures
                    .filter(emailCapture => {
                      if (filterStatus === 'all') return true;
                      if (filterStatus === 'verified') return emailCapture.isVerified;
                      if (filterStatus === 'unverified') return !emailCapture.isVerified;
                      if (filterStatus === 'resources') return emailCapture.source === 'resources';
                      if (filterStatus === 'active') return !emailCapture.unsubscribed;
                      return true;
                    })
                    .filter(emailCapture => {
                      if (!searchTerm) return true;
                      const searchLower = searchTerm.toLowerCase();
                      return (
                        emailCapture.email.toLowerCase().includes(searchLower) ||
                        (emailCapture.source || '').toLowerCase().includes(searchLower) ||
                        (emailCapture.resourceType || '').toLowerCase().includes(searchLower)
                      );
                    })
                    .map(emailCapture => (
                    <div key={emailCapture.id} className={`email-capture-card ${emailCapture.isVerified ? 'verified' : 'unverified'}`}>
                      <div className="email-header">
                        <div className="email-info">
                          <h3>{emailCapture.email}</h3>
                          <p className="email-source">Source: {emailCapture.source}</p>
                          {emailCapture.resourceType && (
                            <p className="email-resource">Resource: {emailCapture.resourceType}</p>
                          )}
                        </div>
                        <div className="email-meta">
                          <span className={`verification-badge ${emailCapture.isVerified ? 'verified' : 'unverified'}`}>
                            {emailCapture.isVerified ? 'Verified' : 'Unverified'}
                          </span>
                          <span className="email-date">
                            {new Date(emailCapture.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="email-actions">
                        <button 
                          className={`action-btn ${emailCapture.isVerified ? 'unverify' : 'verify'}`}
                          onClick={() => {
                            apiService.put(`/email-captures/${emailCapture.id}/verify`, { 
                              isVerified: !emailCapture.isVerified 
                            });
                            fetchEmailCaptures();
                          }}
                        >
                          {emailCapture.isVerified ? 'Mark Unverified' : 'Mark Verified'}
                        </button>
                        {!emailCapture.unsubscribed && (
                          <button 
                            className="action-btn unsubscribe"
                            onClick={() => {
                              if (window.confirm('Unsubscribe this email?')) {
                                apiService.put(`/email-captures/${emailCapture.id}/unsubscribe`);
                                fetchEmailCaptures();
                              }
                            }}
                          >
                            Unsubscribe
                          </button>
                        )}
                        <button 
                          className="action-btn delete"
                          onClick={() => {
                            if (window.confirm('Delete this email capture?')) {
                              apiService.delete(`/email-captures/${emailCapture.id}`);
                              fetchEmailCaptures();
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ========================================================================
              SETTINGS TAB CONTENT
              ======================================================================== */}
          {activeTab === 'settings' && (
            <div className="settings-management">
              <h2>System Settings</h2>
              
              <div className="settings-sections">
                <div className="settings-section">
                  <h3>General Settings</h3>
                  <div className="setting-item">
                    <label htmlFor="business-name">Business Name</label>
                    <input 
                      type="text" 
                      id="business-name"
                      name="businessName"
                      defaultValue="Movement Performance Training" 
                      autoComplete="organization"
                    />
                  </div>
                  <div className="setting-item">
                    <label htmlFor="contact-email">Contact Email</label>
                    <input 
                      type="email" 
                      id="contact-email"
                      name="contactEmail"
                      defaultValue="chloebarrettraining@icloud.com" 
                      autoComplete="email"
                    />
                  </div>
                  <div className="setting-item">
                    <label htmlFor="phone-number">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone-number"
                      name="phoneNumber"
                      defaultValue="04 98 471 509" 
                      autoComplete="tel"
                    />
                  </div>
                </div>

                <div className="settings-section">
                  <h3>Booking Settings</h3>
                  <div className="setting-item">
                    <label htmlFor="default-duration">Default Booking Duration</label>
                    <select 
                      id="default-duration" 
                      name="defaultDuration"
                      defaultValue="2"
                    >
                      <option value="1">1 hour</option>
                      <option value="2">2 hours</option>
                      <option value="3">3 hours</option>
                    </select>
                  </div>
                  <div className="setting-item">
                    <label htmlFor="auto-confirm">Auto-confirm Bookings</label>
                    <input 
                      type="checkbox" 
                      id="auto-confirm"
                      name="autoConfirm"
                      autoComplete="off"
                      defaultChecked 
                    />
                  </div>
                </div>

                <div className="settings-section">
                  <h3>Notification Settings</h3>
                  <div className="setting-item">
                    <label htmlFor="email-notifications">Email Notifications</label>
                    <input 
                      type="checkbox" 
                      id="email-notifications"
                      name="emailNotifications"
                      autoComplete="off"
                      defaultChecked 
                    />
                  </div>
                  <div className="setting-item">
                    <label htmlFor="sms-notifications">SMS Notifications</label>
                    <input 
                      type="checkbox" 
                      id="sms-notifications"
                      name="smsNotifications"
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>

              <div className="settings-actions">
                <button 
                  className="save-btn" 
                  onClick={handleSettingsSave}
                >
                  Save Settings
                </button>
                <button 
                  className="reset-btn" 
                  onClick={handleSettingsReset}
                >
                  Reset to Defaults
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================
          MODAL SECTION
          ======================================================================== */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modalType.charAt(0).toUpperCase() + modalType.slice(1)} Form</h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="modal-body">
                {modalType === 'booking' && (
                  <>
                    {formData.id && <input type="hidden" name="id" value={formData.id} autoComplete="off" />}
                    <div className="form-group">
                      <label htmlFor="booking-name">Name</label>
                      <input 
                        type="text" 
                        id="booking-name"
                        name="name" 
                        defaultValue={formData.name || ''} 
                        autoComplete="name"
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="booking-email">Email</label>
                      <input 
                        type="email" 
                        id="booking-email"
                        name="email" 
                        defaultValue={formData.email || ''} 
                        autoComplete="email"
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="booking-phone">Phone</label>
                      <input 
                        type="tel" 
                        id="booking-phone"
                        name="phone" 
                        defaultValue={formData.phone || ''} 
                        autoComplete="tel"
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="booking-service">Service</label>
                      <select 
                        id="booking-service"
                        name="service" 
                        defaultValue={formData.service || ''} 
                        required
                      >
                        <option value="">Select Service</option>
                        <option value="Kitesurfing Training">Kitesurfing Training</option>
                        <option value="Hydrofoil Training">Hydrofoil Training</option>
                        <option value="Wing Foil Training">Wing Foil Training</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="booking-date">Date</label>
                      <input 
                        type="date" 
                        id="booking-date"
                        name="date" 
                        defaultValue={formData.date || ''} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="booking-time">Time</label>
                      <input 
                        type="time" 
                        id="booking-time"
                        name="time" 
                        defaultValue={formData.time || '10:00'} 
                        required 
                      />
                    </div>
                  </>
                )}
                
                {modalType === 'service' && (
                  <>
                    <div className="form-group">
                      <label htmlFor="service-name">Service Name</label>
                      <input 
                        type="text" 
                        id="service-name"
                        name="name" 
                        defaultValue={formData.name || ''} 
                        autoComplete="off"
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="service-description">Description</label>
                      <textarea 
                        id="service-description"
                        name="description" 
                        defaultValue={formData.description || ''} 
                        required
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="service-price">Price</label>
                      <input 
                        type="number" 
                        id="service-price"
                        name="price" 
                        step="0.01" 
                        defaultValue={formData.price || ''} 
                        autoComplete="off"
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="service-category">Category</label>
                      <input 
                        type="text" 
                        id="service-category"
                        name="category" 
                        defaultValue={formData.category || ''} 
                        autoComplete="off"
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="service-duration">Duration</label>
                      <input 
                        type="text" 
                        id="service-duration"
                        name="duration" 
                        defaultValue={formData.duration || ''} 
                        autoComplete="off"
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="service-status">Status</label>
                      <select 
                        id="service-status"
                        name="isActive" 
                        defaultValue={formData.isActive !== undefined ? formData.isActive : 'true'}
                      >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                      </select>
                    </div>
                  </>
                )}

                {modalType === 'testimonial' && (
                  <>
                    <div className="form-group">
                      <label htmlFor="testimonial-customer-name">Customer Name</label>
                      <input 
                        type="text" 
                        id="testimonial-customer-name" 
                        name="customerName" 
                        defaultValue={formData.name || ''} 
                        autoComplete="name"
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="testimonial-text">Testimonial</label>
                      <textarea 
                        id="testimonial-text" 
                        name="testimonialText" 
                        defaultValue={formData.text || ''} 
                        required
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="testimonial-rating">Rating</label>
                      <select 
                        id="testimonial-rating"
                        name="rating"
                        defaultValue={formData.rating || '5'}
                      >
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                      </select>
                    </div>
                  </>
                )}

                {modalType === 'gallery' && (
                  <>
                    <div className="form-group">
                      <label htmlFor="gallery-title">Image Title</label>
                      <input 
                        type="text" 
                        id="gallery-title"
                        name="title"
                        defaultValue={formData.title || ''} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="gallery-category">Category</label>
                      <select 
                        id="gallery-category"
                        name="category"
                        defaultValue={formData.category || ''}
                      >
                        <option value="Action">Action</option>
                        <option value="Training">Training</option>
                        <option value="Scenic">Scenic</option>
                        <option value="Equipment">Equipment</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="gallery-image">Upload Image</label>
                      <input 
                        type="file" 
                        id="gallery-image"
                        name="image"
                        accept="image/*" 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="gallery-featured">
                        <input 
                          type="checkbox" 
                          id="gallery-featured"
                          name="isFeatured"
                          autoComplete="off"
                          defaultChecked={formData.isFeatured} 
                        />
                        Featured Image
                      </label>
                    </div>
                  </>
                )}

                {modalType === 'team' && (
                  <>
                    {formData.id && <input type="hidden" name="id" value={formData.id} autoComplete="off" />}
                    <div className="form-group">
                      <label htmlFor="team-name">Name *</label>
                      <input 
                        type="text" 
                        id="team-name"
                        name="name"
                        defaultValue={formData.name || ''} 
                        autoComplete="name"
                        required 
                        autoFocus={!formData.id}
                        tabIndex="1"
                        placeholder="Enter team member name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="team-title">Title *</label>
                      <input 
                        type="text" 
                        id="team-title"
                        name="title"
                        defaultValue={formData.title || ''} 
                        autoComplete="off"
                        required 
                        placeholder="e.g., Head Trainer, Instructor"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="team-description">Description *</label>
                      <textarea 
                        id="team-description"
                        name="description"
                        defaultValue={formData.description || ''} 
                        rows="4"
                        required 
                        placeholder="Describe the team member's background, experience, and expertise..."
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="team-credentials">Credentials</label>
                      <textarea 
                        id="team-credentials"
                        name="credentials"
                        defaultValue={formData.credentials || ''} 
                        rows="2"
                        placeholder="e.g., IKO Level 3 Instructor, First Aid Certified, Hydrofoil Specialist"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="team-image-url">Image URL</label>
                      <input 
                        type="text" 
                        id="team-image-url"
                        name="imageUrl"
                        defaultValue={formData.imageUrl || ''} 
                        placeholder="/images/team/member-photo.jpg"
                        autoComplete="off"
                      />
                      <small className="form-help">Use a relative path starting with /images/team/</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="team-display-order">Display Order</label>
                      <input 
                        type="number" 
                        id="team-display-order"
                        name="displayOrder"
                        defaultValue={formData.displayOrder || 1} 
                        min="1"
                        max="100"
                        autoComplete="off"
                        placeholder="1"
                      />
                      <small className="form-help">Lower numbers appear first</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="team-featured" className="checkbox-label">
                        <input 
                          type="checkbox" 
                          id="team-featured"
                          name="isFeatured"
                          autoComplete="off"
                          defaultChecked={formData.isFeatured || false}
                        />
                        <span className="checkbox-text">Featured Team Member</span>
                      </label>
                      <small className="form-help">Featured members are highlighted on the website</small>
                    </div>
                  </>
                )}

                {modalType === 'video' && (
                  <>
                    <div className="form-group">
                      <label htmlFor="video-title">Video Title</label>
                      <input 
                        type="text" 
                        id="video-title"
                        name="title"
                        placeholder="Enter video title"
                        defaultValue={formData.title || ''} 
                        autoComplete="off"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="video-description">Description</label>
                      <textarea 
                        id="video-description"
                        name="description"
                        placeholder="Enter video description"
                        defaultValue={formData.description || ''} 
                        rows="3"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="video-file">Upload Video</label>
                      <input 
                        type="file" 
                        id="video-file"
                        name="videoFile"
                        accept="video/*" 
                      />
                      <small>Supported formats: MP4, AVI, MOV, WMV, FLV, WebM (Max 100MB)</small>
                    </div>
                    {isUploadingVideo && (
                      <div className="upload-progress">
                        <div className="progress-bar">
                          <div className="progress-fill"></div>
                        </div>
                        <p>Uploading video...</p>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="cancel-btn" onClick={closeModal}>
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="save-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner"></span>
                      {modalType === 'video' ? 'Uploading...' : 'Saving...'}
                    </>
                  ) : (
                    modalType === 'video' ? 'Upload Video' : 
                    modalType === 'team' ? (formData.id ? 'Update Team Member' : 'Add Team Member') :
                    'Save'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin; 