import React, { useState, useMemo } from 'react';
import { FaStar, FaHeart, FaEye, FaFilter, FaSort, FaShieldAlt, FaTrophy, FaUsers, FaClock, FaMapMarkerAlt, FaCheck, FaArrowRight } from 'react-icons/fa';
import './Products.css';

function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Programs', icon: '🌟' },
    { id: 'kitesurfing', name: 'Kitesurfing', icon: '🏄‍♂️' },
    { id: 'hydrofoil', name: 'Hydrofoil', icon: '🚁' },
    { id: 'wingfoil', name: 'Wing Foil', icon: '🪂' },
    { id: 'performance', name: 'Performance', icon: '💪' },
    { id: 'windsurfing', name: 'Windsurfing', icon: '⛵' }
  ];

  const packages = [
    {
      id: 1,
      name: "Elite Performance Mastery",
      category: "performance",
      price: 2499,
      originalPrice: 2999,
      duration: "12 weeks",
      level: "Advanced",
      rating: 4.9,
      reviews: 127,
      students: 89,
      location: "Gold Coast",
      features: [
        "Personalized training program",
        "1-on-1 coaching sessions",
        "Advanced performance metrics",
        "Nutrition consultation",
        "Recovery protocols",
        "Competition preparation"
      ],
      image: "🏆",
      badge: "Most Popular",
      badgeColor: "#fbbf24"
    },
    {
      id: 2,
      name: "Professional Kitesurfing Pro",
      category: "kitesurfing",
      price: 1899,
      originalPrice: 2299,
      duration: "8 weeks",
      level: "Intermediate",
      rating: 4.8,
      reviews: 94,
      students: 67,
      location: "Sunshine Coast",
      features: [
        "Professional certification",
        "Advanced techniques",
        "Safety protocols",
        "Equipment training",
        "Weather analysis",
        "Competition skills"
      ],
      image: "🏄‍♂️",
      badge: "Best Value",
      badgeColor: "#10b981"
    },
    {
      id: 3,
      name: "Hydrofoil Excellence Program",
      category: "hydrofoil",
      price: 2199,
      originalPrice: 2599,
      duration: "10 weeks",
      level: "Advanced",
      rating: 4.9,
      reviews: 78,
      students: 45,
      location: "Byron Bay",
      features: [
        "Cutting-edge hydrofoil tech",
        "Advanced balance training",
        "Speed optimization",
        "Competition techniques",
        "Equipment maintenance",
        "Performance analytics"
      ],
      image: "🚁",
      badge: "Premium",
      badgeColor: "#8b5cf6"
    },
    {
      id: 4,
      name: "Wing Foil Adventure",
      category: "wingfoil",
      price: 1699,
      originalPrice: 1999,
      duration: "6 weeks",
      level: "Beginner",
      rating: 4.7,
      reviews: 156,
      students: 112,
      location: "Noosa",
      features: [
        "Complete beginner guide",
        "Safety fundamentals",
        "Basic techniques",
        "Equipment familiarization",
        "Progressive learning",
        "Community access"
      ],
      image: "🪂",
      badge: "New",
      badgeColor: "#ef4444"
    },
    {
      id: 5,
      name: "Windsurfing Championship",
      category: "windsurfing",
      price: 1999,
      originalPrice: 2399,
      duration: "9 weeks",
      level: "Intermediate",
      rating: 4.8,
      reviews: 89,
      students: 58,
      location: "Margaret River",
      features: [
        "Championship techniques",
        "Advanced maneuvers",
        "Race strategies",
        "Equipment optimization",
        "Performance tracking",
        "Competition prep"
      ],
      image: "⛵",
      badge: "Limited",
      badgeColor: "#f59e0b"
    },
    {
      id: 6,
      name: "Ultimate Performance Elite",
      category: "performance",
      price: 3299,
      originalPrice: 3999,
      duration: "16 weeks",
      level: "Expert",
      rating: 5.0,
      reviews: 45,
      students: 23,
      location: "Gold Coast",
      features: [
        "Elite athlete program",
        "Olympic-level training",
        "Personal nutritionist",
        "Recovery specialist",
        "Performance psychologist",
        "International exposure"
      ],
      image: "👑",
      badge: "Elite",
      badgeColor: "#dc2626"
    }
  ];

  const sortedPackages = useMemo(() => {
    let filtered = packages.filter(pkg => 
      selectedCategory === 'all' || pkg.category === selectedCategory
    );

    if (searchTerm) {
      filtered = filtered.filter(pkg =>
        pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'popularity':
      default:
        return filtered.sort((a, b) => b.students - a.students);
    }
  }, [selectedCategory, sortBy, searchTerm]);

  const toggleFavorite = (packageId) => {
    setFavorites(prev => 
      prev.includes(packageId) 
        ? prev.filter(id => id !== packageId)
        : [...prev, packageId]
    );
  };

  const toggleCompare = (packageId) => {
    setCompareList(prev => 
      prev.includes(packageId) 
        ? prev.filter(id => id !== packageId)
        : [...prev, packageId]
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="premium-products">
      {/* Premium Hero Section */}
      <section className="products-hero">
        <div className="hero-content">
          <h1 className="hero-title">Elite Training Programs</h1>
          <p className="hero-subtitle">
            Discover world-class training programs designed to transform your performance 
            and unlock your full potential. Choose from our curated selection of premium experiences.
          </p>
          
          {/* Premium Search and Filters */}
          <div className="premium-controls">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <FaFilter className="search-icon" />
            </div>
            
            <div className="view-controls">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <FaEye />
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <FaSort />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Category Filters */}
      <section className="category-filters">
        <div className="container">
          <div className="filters-grid">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Sorting and Results */}
      <section className="products-main">
        <div className="container">
          <div className="results-header">
            <div className="results-info">
              <h2>Training Programs</h2>
              <p>{sortedPackages.length} programs available</p>
            </div>
            
            <div className="sort-controls">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="popularity">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Premium Packages Grid */}
          <div className={`packages-container ${viewMode}`}>
            {sortedPackages.map(pkg => (
              <div key={pkg.id} className="package-card premium">
                {pkg.badge && (
                  <div className="package-badge" style={{ backgroundColor: pkg.badgeColor }}>
                    {pkg.badge}
                  </div>
                )}
                
                <div className="package-header">
                  <div className="package-image">{pkg.image}</div>
                  <div className="package-actions">
                    <button
                      className={`action-btn ${favorites.includes(pkg.id) ? 'active' : ''}`}
                      onClick={() => toggleFavorite(pkg.id)}
                      title="Add to favorites"
                    >
                      <FaHeart />
                    </button>
                    <button
                      className={`action-btn ${compareList.includes(pkg.id) ? 'active' : ''}`}
                      onClick={() => toggleCompare(pkg.id)}
                      title="Add to compare"
                    >
                      <FaEye />
                    </button>
                  </div>
                </div>

                <div className="package-content">
                  <h3 className="package-name">{pkg.name}</h3>
                  
                  <div className="package-meta">
                    <div className="meta-item">
                      <FaClock />
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="meta-item">
                      <FaTrophy />
                      <span>{pkg.level}</span>
                    </div>
                    <div className="meta-item">
                      <FaMapMarkerAlt />
                      <span>{pkg.location}</span>
                    </div>
                  </div>

                  <div className="package-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.floor(pkg.rating) ? 'star active' : 'star'} />
                      ))}
                    </div>
                    <span className="rating-text">{pkg.rating} ({pkg.reviews} reviews)</span>
                  </div>

                  <div className="package-features">
                    <h4>Program Features:</h4>
                    <ul>
                      {pkg.features.slice(0, 4).map((feature, index) => (
                        <li key={index}>
                          <FaCheck />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="package-stats">
                    <div className="stat">
                      <FaUsers />
                      <span>{pkg.students} students</span>
                    </div>
                  </div>
                </div>

                <div className="package-footer">
                  <div className="package-pricing">
                    <div className="current-price">{formatPrice(pkg.price)}</div>
                    {pkg.originalPrice > pkg.price && (
                      <div className="original-price">{formatPrice(pkg.originalPrice)}</div>
                    )}
                  </div>
                  
                  <button className="enroll-btn premium">
                    <span>Enroll Now</span>
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Special Offers */}
      <section className="special-offers">
        <div className="container">
          <div className="offers-header">
            <h2>Exclusive Offers</h2>
            <p>Limited time opportunities for elite training</p>
          </div>
          
          <div className="offers-grid">
            <div className="offer-card premium">
              <div className="offer-icon">🎯</div>
              <h3>Early Bird Special</h3>
              <p>Book 3 months in advance and save up to 25% on all programs</p>
              <button className="offer-btn">Learn More</button>
            </div>
            
            <div className="offer-card premium">
              <div className="offer-icon">👥</div>
              <h3>Group Discounts</h3>
              <p>Bring friends and family for special group rates and shared experiences</p>
              <button className="offer-btn">View Rates</button>
            </div>
            
            <div className="offer-card premium">
              <div className="offer-icon">🏆</div>
              <h3>Elite Package</h3>
              <p>Combine multiple programs for comprehensive training at premium rates</p>
              <button className="offer-btn">Customize</button>
            </div>
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="products-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Begin Your Journey?</h2>
            <p>
              Transform your potential into reality with our world-class training programs. 
              Join the ranks of elite athletes who've chosen excellence.
            </p>
            <div className="cta-actions">
              <button className="cta-btn primary">
                <span>Schedule Consultation</span>
                <FaArrowRight />
              </button>
              <button className="cta-btn secondary">
                <span>Download Brochure</span>
                <FaShieldAlt />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Products; 