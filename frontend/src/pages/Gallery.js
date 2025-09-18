import React, { useState, useEffect, useRef, useCallback } from 'react';
import { galleryService } from '../services/galleryService';
import './Gallery.css';

const Gallery = () => {
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid, masonry, list
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, title
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [categoryCounts, setCategoryCounts] = useState({
    all: 0,
    training: 0,
    team: 0,
    logos: 0
  });
  const modalRef = useRef(null);

  const categories = [
    { id: 'all', name: 'All Photos', icon: '📸', color: '#6366f1', count: 0 },
    { id: 'training', name: 'Training', icon: '💪', color: '#f59e0b', count: 0 },
    { id: 'team', name: 'Team', icon: '👥', color: '#10b981', count: 0 },
    { id: 'logos', name: 'Logos', icon: '🎨', color: '#06b6d4', count: 0 }
  ];

  // Get image path with proper fallback
  const getImagePath = (item, index) => {
    // Try backend URL (relative path) - construct full URL
    if (item.url) {
      // Use the same base URL as API calls
      const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8081';
      // URL encode the path to handle spaces in filenames
      const encodedUrl = item.url.split('/').map(segment => encodeURIComponent(segment)).join('/');
      const fullUrl = `${apiBaseUrl}${encodedUrl}`;
      console.log('Constructed image URL:', fullUrl, 'for item:', item.title);
      return fullUrl;
    }
    
    // Try imageUrl (fallback for full URLs)
    if (item.imageUrl) {
      console.log('Using imageUrl:', item.imageUrl, 'for item:', item.title);
      return item.imageUrl;
    }
    
    // Fallback to placeholder
    console.log('Using placeholder for item:', item.title);
    return '/images/placeholder-gallery.jpg';
  };

  // Fetch gallery data from backend
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        console.log('Fetching fresh gallery data...');
        const response = await galleryService.getAllItems();
        
        // Handle both backend response format and fallback format
        let galleryData = [];
        if (response.success && response.data) {
          galleryData = response.data;
        } else if (Array.isArray(response)) {
          galleryData = response;
        } else {
          throw new Error('Invalid response format');
        }
        
        // Map backend format to frontend format with enhanced metadata
        const mappedGalleryItems = galleryData.map((item, index) => ({
          id: item.id,
          src: getImagePath(item, index),
          alt: item.title || 'Gallery image',
          category: item.category || 'training',
          title: item.title || 'Untitled',
          description: item.description || 'A beautiful image from our gallery',
          uploadDate: item.createdAt || new Date().toISOString(),
          tags: item.tags || [],
          aspectRatio: item.aspectRatio || '16:9',
          size: item.size || 'medium',
          isFeatured: item.isFeatured || false,
          imageUrl: item.url ? `${process.env.REACT_APP_API_URL || 'http://localhost:8081'}${item.url.split('/').map(segment => encodeURIComponent(segment)).join('/')}` : item.imageUrl,
          url: item.url
        }));
        
        console.log('Gallery data loaded successfully:', mappedGalleryItems.length, 'items');
        console.log('First few items:', mappedGalleryItems.slice(0, 3));
        console.log('All gallery URLs:', mappedGalleryItems.map(item => item.src));
        console.log('Sample image paths:', mappedGalleryItems.slice(0, 3).map(item => ({ title: item.title, src: item.src })));
        setGalleryItems(mappedGalleryItems);
        setError(null);
      } catch (err) {
        console.error('Gallery loading error:', err);
        console.log('Using fallback gallery data due to error:', err.message);
        
        // Use hardcoded fallback data
        const fallbackData = [
          {
            id: 1,
            title: "Training Session 1",
            category: "training",
            imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.21.30 AM.jpeg",
            description: "High-intensity training session"
          },
          {
            id: 2,
            title: "Training Session 2",
            category: "training",
            imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.21.31 AM.jpeg",
            description: "Strength training workout"
          },
          {
            id: 3,
            title: "Training Session 3",
            category: "training",
            imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.21.33 AM.jpeg",
            description: "Functional fitness training"
          },
          {
            id: 4,
            title: "Training Session 4",
            category: "training",
            imageUrl: "/images/training/WhatsApp Image 2025-09-01 at 11.21.34 AM.jpeg",
            description: "Core strength workout"
          },
          {
            id: 5,
            title: "Team Member",
            category: "team",
            imageUrl: "/images/team/chloe-headshot.jpg",
            description: "Chloe Barrett - Head Instructor"
          },
          {
            id: 6,
            title: "MPT Logo",
            category: "logos",
            imageUrl: "/images/logos/mpt-logo.jpeg",
            description: "Movement Performance Training Logo"
          }
        ];
        
        const mappedFallbackItems = fallbackData.map((item, index) => ({
          id: item.id,
          src: item.imageUrl,
          alt: item.title || 'Gallery image',
          category: item.category || 'training',
          title: item.title || 'Untitled',
          description: item.description || 'A beautiful image from our gallery',
          uploadDate: new Date().toISOString(),
          tags: [],
          aspectRatio: '16:9',
          size: 'medium',
          isFeatured: false
        }));
        
        console.log('Using hardcoded fallback data:', mappedFallbackItems.length, 'items');
        setGalleryItems(mappedFallbackItems);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, [refreshKey]);

  const forceRefresh = () => {
    console.log('Force refreshing gallery data...');
    setRefreshKey(prev => prev + 1);
    setGalleryItems([]);
    
    // Clear browser cache for gallery images
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          if (name.includes('gallery') || name.includes('image')) {
            caches.delete(name);
          }
        });
      });
    }
  };

  // Update category counts
  useEffect(() => {
    const updatedCategories = categories.map(cat => ({
      ...cat,
      count: cat.id === 'all' ? galleryItems.length : galleryItems.filter(item => item.category === cat.id).length
    }));
    // Note: We'll use this in the render
  }, [galleryItems]);
    
  // Calculate category counts when galleryItems change
  useEffect(() => {
    if (galleryItems.length > 0) {
      const newCounts = {
        all: galleryItems.length,
        training: galleryItems.filter(item => item.category === 'training').length,
        team: galleryItems.filter(item => item.category === 'team').length,
        logos: galleryItems.filter(item => item.category === 'logos').length
      };
      
      console.log('🔍 CALCULATING COUNTS:', newCounts);
      console.log('🔍 Team items:', galleryItems.filter(item => item.category === 'team'));
      console.log('🔍 Logo items:', galleryItems.filter(item => item.category === 'logos'));
      
      setCategoryCounts(newCounts);
    }
  }, [galleryItems]);

  // Advanced filtering and sorting
  const filteredAndSortedItems = useCallback(() => {
    let filtered;
    
    if (selectedCategory === 'all') {
      // In "All" view, show only one Chloe entry (the Team one)
      filtered = galleryItems.filter(item => {
        if (item.title && item.title.includes('Chloe')) {
          return item.category === 'team'; // Only show the Team version
        }
        return true;
      });
    } else {
      // In category views, show items based on their category
      filtered = galleryItems.filter(item => {
        if (item.title && item.title.includes('Chloe')) {
          // Show Chloe only in Team category
          return selectedCategory === 'team' && item.category === 'team';
        }
        // Map frontend category IDs to backend category names
        const categoryMapping = {
          'training': 'training',
          'team': 'team', 
          'logos': 'logos'
        };
        return item.category === categoryMapping[selectedCategory];
      });
    }


    // Sorting - Featured items first, then by selected criteria
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => {
          // Featured items first
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          // Then by date
          return new Date(b.uploadDate) - new Date(a.uploadDate);
        });
        break;
      case 'oldest':
        filtered.sort((a, b) => {
          // Featured items first
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          // Then by date
          return new Date(a.uploadDate) - new Date(b.uploadDate);
        });
        break;
      case 'title':
        filtered.sort((a, b) => {
          // Featured items first
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          // Then by title
          return a.title.localeCompare(b.title);
        });
        break;
      default:
        // Default: Featured items first, then by upload date
        filtered.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return new Date(b.uploadDate) - new Date(a.uploadDate);
        });
        break;
    }

    return filtered;
  }, [galleryItems, selectedCategory, sortBy]);

  const openImageModal = (item, index = 0) => {
    setSelectedImage(item);
    setCurrentImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
    setIsFullscreen(false);
  };

  const navigateImage = (direction) => {
    const items = filteredAndSortedItems();
    const newIndex = currentImageIndex + direction;
    
    if (newIndex >= 0 && newIndex < items.length) {
      setCurrentImageIndex(newIndex);
      setSelectedImage(items[newIndex]);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!selectedImage) return;
      
      switch (e.key) {
        case 'Escape':
          closeImageModal();
          break;
        case 'ArrowLeft':
          navigateImage(-1);
          break;
        case 'ArrowRight':
          navigateImage(1);
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, currentImageIndex]);

  const currentItems = filteredAndSortedItems();
  
  // Use state-based counts instead of calculating in render
  const updatedCategories = categories.map(cat => ({
    ...cat,
    count: categoryCounts[cat.id] || 0
  }));
  
  console.log('🔍 USING STATE COUNTS:', categoryCounts);
  console.log('🔍 UPDATED CATEGORIES:', updatedCategories);


  return (
    <div className="gallery-page">
      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="hero-content">
          <h1>Professional Gallery</h1>
          <p>Explore our curated collection of professional photos showcasing training sessions, team members, and our brand identity.</p>
        </div>
      </section>

      {/* Professional Controls */}
      <section className="gallery-controls">
        <div className="container">
          <div className="controls-grid">

            {/* View Mode Toggle */}
            <div className="view-controls">
              <div className="view-mode-toggle">
                <button 
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                >
                  ⊞
                </button>
                <button 
                  className={`view-btn ${viewMode === 'masonry' ? 'active' : ''}`}
                  onClick={() => setViewMode('masonry')}
                  title="Masonry View"
                >
                  ⊡
                </button>
                <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="List View"
                >
                  ☰
                </button>
              </div>
            </div>

            {/* Sort Controls */}
            <div className="sort-controls">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Alphabetical</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="gallery-filter">
        <div className="container">
          <div className="filter-buttons">
            {updatedCategories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
                style={{ '--category-color': category.color }}
              >
                <span className="filter-icon">{category.icon}</span>
                <span className="filter-name">{category.name}</span>
                <span className="filter-count">{category.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-section">
        <div className="container">
          {loading && (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading professional gallery...</p>
            </div>
          )}
          
          {error && (
            <div className="error-state">
              <p>⚠️ {error}</p>
            </div>
          )}
          
          {!loading && !error && (
            <>
              {currentItems.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📷</div>
                  <h3>No images found</h3>
                  <p>Try adjusting your search criteria or selecting a different category.</p>
                </div>
              ) : (
                <div className={`gallery-container ${viewMode}`}>
                  {currentItems.map((item, index) => (
                    <div 
                      key={item.id} 
                      className={`gallery-item ${viewMode}`}
                      onClick={() => openImageModal(item, index)}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="gallery-image">
                        <img 
                          src={item.src} 
                          alt={item.alt}
                          loading="lazy"
                          onError={(e) => {
                            console.log('Image failed to load:', item.src, 'for item:', item.title);
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZjNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
                            e.target.alt = 'Image not available';
                          }}
                          onLoad={() => {
                            console.log('Image loaded successfully:', item.src, 'for item:', item.title);
                          }}
                        />
                        <div className="gallery-overlay">
                          <div className="gallery-info">
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <div className="gallery-meta">
                              <span className="gallery-date">
                                {new Date(item.uploadDate).toLocaleDateString()}
                              </span>
                              <span className="gallery-category">
                                {updatedCategories.find(cat => cat.id === item.category)?.name}
                              </span>
                            </div>
                            <span className="view-btn">
                              {viewMode === 'list' ? 'View Details' : 'Click to View'}
                            </span>
                          </div>
                        </div>
                        <div className="gallery-category-badge">
                          {updatedCategories.find(cat => cat.id === item.category)?.icon}
                        </div>
                        {item.tags && item.tags.length > 0 && (
                          <div className="gallery-tags">
                            {item.tags.slice(0, 2).map((tag, tagIndex) => (
                              <span key={tagIndex} className="tag">#{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Professional Image Modal */}
      {selectedImage && (
        <div 
          className={`image-modal ${isFullscreen ? 'fullscreen' : ''}`} 
          onClick={closeImageModal}
          ref={modalRef}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                <h3>{selectedImage.title}</h3>
                <span className="modal-category">
                  {updatedCategories.find(cat => cat.id === selectedImage.category)?.name}
                </span>
              </div>
              <div className="modal-controls">
                <button 
                  className="modal-btn fullscreen-btn"
                  onClick={toggleFullscreen}
                  title="Toggle Fullscreen (F)"
                >
                  {isFullscreen ? '⤓' : '⤢'}
                </button>
                <button className="modal-btn close-btn" onClick={closeImageModal} title="Close (Esc)">
                  ×
                </button>
              </div>
            </div>
            
            <div className="modal-image-container">
              <button 
                className="nav-btn prev-btn"
                onClick={() => navigateImage(-1)}
                disabled={currentImageIndex === 0}
                title="Previous (←)"
              >
                ‹
              </button>
              
              <div className="modal-image">
                <img src={selectedImage.src} alt={selectedImage.alt} />
              </div>
              
              <button 
                className="nav-btn next-btn"
                onClick={() => navigateImage(1)}
                disabled={currentImageIndex === currentItems.length - 1}
                title="Next (→)"
              >
                ›
              </button>
            </div>
            
            <div className="modal-info">
              <p>{selectedImage.description}</p>
              <div className="modal-meta">
                <span className="modal-date">
                  📅 {new Date(selectedImage.uploadDate).toLocaleDateString()}
                </span>
                <span className="modal-index">
                  {currentImageIndex + 1} of {currentItems.length}
                </span>
              </div>
              {selectedImage.tags && selectedImage.tags.length > 0 && (
                <div className="modal-tags">
                  {selectedImage.tags.map((tag, index) => (
                    <span key={index} className="modal-tag">#{tag}</span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="modal-footer">
              <div className="keyboard-hints">
                <span>← → Navigate</span>
                <span>F Fullscreen</span>
                <span>Esc Close</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Gallery; 