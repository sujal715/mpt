import React, { useState, useEffect } from 'react';
import { galleryService } from '../services/galleryService';
import './Gallery.css';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { id: 'all', name: 'All Photos', icon: '📸' },
    { id: 'kitesurfing', name: 'Kitesurfing', icon: '🏄‍♂️' },
    { id: 'hydrofoil', name: 'Hydrofoil', icon: '🪁' },
    { id: 'wingfoil', name: 'Wing Foil', icon: '🌊' },
    { id: 'training', name: 'Training', icon: '💪' },
    { id: 'locations', name: 'Locations', icon: '📍' }
  ];

  // Fetch gallery data from backend
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        const response = await galleryService.getAllItems();
        if (response.success && response.data) {
          setGalleryItems(response.data);
          setError(null);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.log('Using fallback gallery data due to error:', err.message);
        setError('Failed to load gallery. Using sample data.');
        // Fallback to sample data if backend is not available
        setGalleryItems([
          {
            id: 1,
            src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
            alt: 'Kitesurfing on the waves',
            category: 'kitesurfing',
            title: 'Wave Riding',
            description: 'Advanced kitesurfing techniques in perfect conditions'
          },
          {
            id: 2,
            src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
            alt: 'Hydrofoil gliding above water',
            category: 'hydrofoil',
            title: 'Hydrofoil Mastery',
            description: 'Smooth hydrofoil riding with expert instruction'
          },
          {
            id: 3,
            src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
            alt: 'Wing foiling adventure',
            category: 'wingfoil',
            title: 'Wing Foil Adventure',
            description: 'Exploring the exciting world of wing foiling'
          },
          {
            id: 4,
            src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
            alt: 'Training session in progress',
            category: 'training',
            title: 'Skill Development',
            description: 'Focused training sessions for all skill levels'
          },
          {
            id: 5,
            src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
            alt: 'Beautiful training location',
            category: 'locations',
            title: 'Perfect Conditions',
            description: 'Our stunning training locations around the Gold Coast'
          },
          {
            id: 6,
            src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
            alt: 'Group training session',
            category: 'training',
            title: 'Group Learning',
            description: 'Fun and effective group sessions'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);
    

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const openImageModal = (item) => {
    setSelectedImage(item);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="gallery-page">
      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="hero-content">
          <h1>Our Gallery</h1>
          <p>Explore the exciting world of water sports through our collection of stunning photos and videos from training sessions, adventures, and beautiful locations.</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="gallery-filter">
        <div className="container">
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="filter-icon">{category.icon}</span>
                {category.name}
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
              <p>Loading gallery...</p>
            </div>
          )}
          
          {error && (
            <div className="error-state">
              <p>⚠️ {error}</p>
            </div>
          )}
          
          {!loading && !error && (
            <div className="gallery-grid">
            {filteredItems.map(item => (
              <div key={item.id} className="gallery-item" onClick={() => openImageModal(item)}>
                <div className="gallery-image">
                  <img src={item.src} alt={item.alt} />
                  <div className="gallery-overlay">
                    <div className="gallery-info">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <span className="view-btn">Click to View</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={closeImageModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeImageModal}>×</button>
            <div className="modal-image">
              <img src={selectedImage.src} alt={selectedImage.alt} />
            </div>
            <div className="modal-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.description}</p>
              <span className="modal-category">
                {categories.find(cat => cat.id === selectedImage.category)?.name}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="gallery-cta">
        <div className="container">
          <h2>Ready to Create Your Own Memories?</h2>
          <p>Join our training programs and capture your own amazing moments on the water!</p>
          <div className="cta-buttons">
            <a href="/booking" className="cta-btn primary">Book Your Session</a>
            <a href="/contact" className="cta-btn secondary">Contact Us</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery; 