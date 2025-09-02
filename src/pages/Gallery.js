import React, { useState } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Beautiful, diverse gallery data
  const galleryItems = [
    {
      id: 1,
      category: 'kitesurfing',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
      title: 'Kitesurfing Action',
      description: 'Amazing kitesurfing moments on the Gold Coast',
      featured: true
    },
    {
      id: 2,
      category: 'hydrofoil',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=600&fit=crop',
      title: 'Hydrofoil Training',
      description: 'Master the art of hydrofoiling',
      featured: false
    },
    {
      id: 3,
      category: 'wing-foil',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=350&fit=crop',
      title: 'Wing Foil Adventure',
      description: 'Discover the exciting world of wing foiling',
      featured: true
    },
    {
      id: 4,
      category: 'training',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
      title: 'Training Sessions',
      description: 'Professional training with expert instructors',
      featured: false
    },
    {
      id: 5,
      category: 'kitesurfing',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=500&h=450&fit=crop',
      title: 'Advanced Techniques',
      description: 'Advanced kitesurfing techniques and tricks',
      featured: false
    },
    {
      id: 6,
      category: 'hydrofoil',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=550&fit=crop&crop=entropy',
      title: 'Hydrofoil Mastery',
      description: 'Perfect your hydrofoil skills',
      featured: true
    },
    {
      id: 7,
      category: 'wing-foil',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=400&fit=crop&crop=entropy',
      title: 'Wing Foil Freedom',
      description: 'Experience the freedom of wing foiling',
      featured: false
    },
    {
      id: 8,
      category: 'training',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=600&fit=crop&crop=entropy',
      title: 'Performance Training',
      description: 'Boost your strength and flexibility',
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Photos', icon: '📸' },
    { id: 'kitesurfing', name: 'Kitesurfing', icon: '🌊' },
    { id: 'hydrofoil', name: 'Hydrofoil', icon: '🚁' },
    { id: 'wing-foil', name: 'Wing Foil', icon: '🦅' },
    { id: 'training', name: 'Training', icon: '💪' }
  ];

  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  const handleViewImage = (item) => {
    setSelectedImage(item);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="gallery-page">
      {/* Hero Section */}
      <div className="gallery-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-line">Our Amazing</span>
            <span className="title-line highlight">Gallery</span>
          </h1>
          <p className="hero-subtitle">Capture the thrill, beauty, and excitement of water sports</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">{galleryItems.length}</span>
              <span className="stat-label">Photos</span>
            </div>
            <div className="stat">
              <span className="stat-number">{categories.length - 1}</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Awesome</span>
            </div>
          </div>
        </div>
        <div className="hero-background">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <div className="filter-container">
          <h3 className="filter-title">Choose Your Adventure</h3>
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="filter-icon">{category.icon}</span>
                <span className="filter-name">{category.name}</span>
                <span className="filter-count">
                  {category.id === 'all' 
                    ? galleryItems.length 
                    : galleryItems.filter(item => item.category === category.id).length
                  }
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="gallery-section">
        <div className="gallery-container">
          <div className="gallery-header-info">
            <h2>Showing {filteredItems.length} amazing photos</h2>
            {selectedCategory !== 'all' && (
              <button 
                className="clear-filter-btn"
                onClick={() => setSelectedCategory('all')}
              >
                ✕ Clear Filter
              </button>
            )}
          </div>
          
          <div className="gallery-masonry">
            {filteredItems.map((item, index) => (
              <div 
                key={item.id} 
                className={`gallery-item ${item.featured ? 'featured' : ''} ${hoveredItem === item.id ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="item-image">
                  <img src={item.image} alt={item.title} />
                  {item.featured && <div className="featured-badge">⭐ Featured</div>}
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <div className="overlay-actions">
                        <button 
                          className="view-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewImage(item);
                          }}
                        >
                          👁️ View
                        </button>
                        <button className="share-btn">📤 Share</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item-info">
                  <div className="item-category">
                    <span className="category-icon">
                      {categories.find(cat => cat.id === item.category)?.icon}
                    </span>
                    <span className="category-name">{item.category}</span>
                  </div>
                  <h4 className="item-title">{item.title}</h4>
                  <p className="item-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="gallery-cta">
        <div className="cta-content">
          <h2>Ready to Join the Adventure?</h2>
          <p>Book your first lesson and start creating your own amazing moments!</p>
          <div className="cta-buttons">
            <button className="cta-btn primary">🚀 Book Now</button>
            <button className="cta-btn secondary">📞 Contact Us</button>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            <div className="modal-image">
              <img src={selectedImage.image} alt={selectedImage.title} />
            </div>
            <div className="modal-info">
              <div className="modal-header">
                <h2>{selectedImage.title}</h2>
                {selectedImage.featured && <span className="modal-featured">⭐ Featured</span>}
              </div>
              <p className="modal-description">{selectedImage.description}</p>
              <div className="modal-category">
                <span className="category-icon">
                  {categories.find(cat => cat.id === selectedImage.category)?.icon}
                </span>
                <span className="category-name">{selectedImage.category}</span>
              </div>
              <div className="modal-actions">
                <button className="modal-btn primary">📖 Learn More</button>
                <button className="modal-btn secondary">📤 Share</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery; 