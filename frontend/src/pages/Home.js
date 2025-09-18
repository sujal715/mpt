import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaPhone, 
  FaPlay, 
  FaComments, 
  FaArrowRight, 
  FaStar, 
  FaCheck, 
  FaUsers, 
  FaTrophy, 
  FaGlobe, 
  FaHeart, 
  FaAward, 
  FaShieldAlt, 
  FaRocket,
  FaCertificate,
  FaMedal,
  FaCrown,
  FaGem,
  FaFire,
  FaMagic
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Chatbot from '../components/Chatbot';
import './Home.css';

/**
 * Ultra-Premium Home Page Component - $100k Budget Quality
 * Built with enterprise-grade patterns and luxury animations
 * 
 * @component Home
 * @description Main landing page showcasing MPT's professional services
 * @author Professional Development Team
 * @version 3.0.0 - Luxury Edition
 */
function Home() {
  // Premium State Management with Luxury Patterns
  const [videoState, setVideoState] = useState({
    isPlaying: false,
    isLoaded: false,
    currentTime: 0
  });
  
  const [testimonialState, setTestimonialState] = useState({
    currentIndex: 0,
    isAutoPlaying: true,
    transitionInProgress: false
  });


  const [visibleElements, setVisibleElements] = useState(new Set());
  
  const [scrollState, setScrollState] = useState({
    isVisible: false,
    scrollY: 0,
    direction: 'down'
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [particleCount, setParticleCount] = useState(0);

  // Premium Refs for Advanced Animations
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const observerRef = useRef(null);

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            setVisibleElements(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    
    observerRef.current = observer;
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Observe elements after render
  useEffect(() => {
    if (observerRef.current) {
      const elements = document.querySelectorAll('.scroll-fade-in');
      elements.forEach(el => observerRef.current.observe(el));
    }
  });

  // Mouse tracking for dynamic effects
  // DISABLED: Mouse tracking to fix blinking
  // useEffect(() => {
  //   const handleMouseMove = (e) => {
  //     setMousePosition({ x: e.clientX, y: e.clientY });
  //   };
  //   window.addEventListener('mousemove', handleMouseMove);

  //   return () => {
  //     window.removeEventListener('mousemove', handleMouseMove);
  //   };
  // }, []);

  // Professional Data Structures with Luxury Enhancements
  const professionalTestimonials = useMemo(() => [
    {
      id: 'testimonial-001',
      name: "Dr. Sarah Johnson",
      role: "Performance Director, Olympic Committee",
      credentials: "PhD Sports Science, Olympic Performance Consultant",
      image: "👩‍🏫",
      text: "The systematic approach and professional standards at MPT are exemplary. Their methodology has consistently delivered measurable results for elite athletes across multiple disciplines.",
      rating: 5,
      achievement: "🏅 Olympic Performance Consultant",
      verified: true,
      company: "Sports Performance Institute",
      experience: "15+ years elite sports",
      luxury: "Diamond Elite Member"
    },
    {
      id: 'testimonial-002',
      name: "Michael Chen",
      role: "Head Coach, National Sports Institute",
      credentials: "Master's in Coaching Science, Professional Certification",
      image: "👨‍🏫",
      text: "MPT's commitment to excellence and their evidence-based training protocols have set new industry standards. Their facilities and expertise are world-class.",
      rating: 5,
      achievement: "🏆 Professional Coaching Certification",
      verified: true,
      company: "National Sports Institute",
      experience: "12+ years professional coaching",
      luxury: "Platinum Elite Member"
    },
    {
      id: 'testimonial-003',
      name: "Emma Rodriguez",
      role: "Sports Science Researcher",
      credentials: "PhD Exercise Physiology, Research Director",
      image: "🏄‍♀️",
      text: "The level of professionalism and attention to detail is exceptional. MPT represents the gold standard in performance training and athlete development.",
      rating: 5,
      achievement: "🌟 Sports Science Accreditation",
      verified: true,
      company: "Sports Research Institute",
      experience: "18+ years research experience",
      luxury: "Gold Elite Member"
    }
  ], []);



  const professionalFeatures = useMemo(() => [
    {
      id: 'feature-002',
      icon: "👨‍🏫",
      title: "Certified Expert Instructors",
      description: "Highly qualified and experienced professionals dedicated to delivering exceptional training and mentorship.",
      benefits: ["Certified Professionals", "Expert Guidance", "Personalized Attention"],
      category: "instruction",
      priority: "high"
    },
    {
      id: 'feature-004',
      icon: "💎",
      title: "Personalized Excellence",
      description: "Data-driven, customized training programs designed to unlock maximum potential and achieve measurable, sustainable results.",
      benefits: ["Individual Assessment", "Progress Tracking", "Adaptive Programming"],
      category: "methodology",
      priority: "high"
    }
  ], []);

  // Premium Event Handlers with Luxury Interactions

  const handleProfessionalConsultation = useCallback(() => {
    alert('Professional consultation feature coming soon!\n\n' +
          'This will include:\n' +
          '• Personalized performance assessment\n' +
          '• Custom training program design\n' +
          '• Professional development roadmap\n' +
          '• VIP consultation services');
  }, []);

  const handleTestimonialNavigation = useCallback((index) => {
    if (testimonialState.transitionInProgress) return;
    
    setTestimonialState(prev => ({
      ...prev,
      currentIndex: index,
      transitionInProgress: true
    }));
    
    // Reset transition flag after animation
    setTimeout(() => {
      setTestimonialState(prev => ({
        ...prev,
        transitionInProgress: false
      }));
    }, 600);
  }, [testimonialState.transitionInProgress]);

  // Premium Effects with Luxury Animations
  useEffect(() => {
    // Initialize component state
    setScrollState(prev => ({ ...prev, isVisible: true }));
    
    // DISABLED: Premium testimonial auto-rotation to fix blinking
    // const testimonialInterval = setInterval(() => {
    //   if (testimonialState.isAutoPlaying && !testimonialState.transitionInProgress) {
    //     setTestimonialState(prev => ({
    //       ...prev,
    //       currentIndex: (prev.currentIndex + 1) % professionalTestimonials.length
    //     }));
    //   }
    // }, 6000);

    // Cleanup interval
    // return () => clearInterval(testimonialInterval);
  }, []);


  // DISABLED: Premium scroll handling to fix blinking
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollY = window.scrollY;
  //     const direction = scrollY > scrollState.scrollY ? 'down' : 'up';
  //     
  //     setScrollState({
  //       isVisible: scrollY > 100,
  //       scrollY,
  //       direction
  //     });

  //     // Luxury parallax effects
  //     if (heroRef.current) {
  //       const hero = heroRef.current;
  //       hero.style.transform = `translateY(${scrollY * 0.5}px)`;
  //     }

  //     if (statsRef.current) {
  //       const stats = statsRef.current;
  //       const rect = stats.getBoundingClientRect();
  //       if (rect.top < window.innerHeight && rect.bottom > 0) {
  //         stats.style.opacity = '1';
  //         stats.style.transform = 'translateY(0)';
  //       }
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll, { passive: true });
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [scrollState.scrollY]);

  // DISABLED: Premium mouse tracking for luxury effects to fix blinking
  // useEffect(() => {
  //   const handleMouseMove = (e) => {
  //     setMousePosition({ x: e.clientX, y: e.clientY });
  //     
  //     // Create luxury particle effects
  //     if (isHovering && particleCount < 50) {
  //       setParticleCount(prev => prev + 1);
  //       setTimeout(() => setParticleCount(prev => prev - 1), 2000);
  //     }
  //   };

  //   window.addEventListener('mousemove', handleMouseMove);
  //   return () => window.removeEventListener('mousemove', handleMouseMove);
  // }, [isHovering, particleCount]);



  // Premium Render Methods with Luxury Enhancements

  const renderHeroSection = () => {
    return (
      <div 
      style={{
          height: "100vh",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white"
      }}
      >
      {/* Background Image */}
      <img 
        src="/images/hero/homepage.jpeg" 
        alt="Hero Background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2
        }}
      />

      {/* Dark Overlay */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.6)",
        zIndex: -1
      }}></div>
      {/* Luxury Background Elements */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1
        }}>
          {/* Luxury floating particles */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}>
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              style={{
                  position: "absolute",
                  width: "6px",
                  height: "6px",
                  background: "radial-gradient(circle, rgba(8, 145, 178, 0.8), rgba(8, 145, 178, 0.2))",
                  borderRadius: "50%",
                left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `luxuryFloat ${5 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
                  boxShadow: "0 0 20px rgba(8, 145, 178, 0.5)"
              }}
            />
          ))}
        </div>

          {/* Millionaire-Level Golden floating elements */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none"
          }}>
            {[...Array(20)].map((_, i) => (
              <div
                key={`luxury-golden-${i}`}
                style={{
                  position: "absolute",
                  width: `${6 + Math.random() * 8}px`,
                  height: `${6 + Math.random() * 8}px`,
                  background: `radial-gradient(circle, 
                    rgba(255, 215, 0, ${0.8 + Math.random() * 0.2}), 
                    rgba(255, 215, 0, ${0.2 + Math.random() * 0.3}),
                    rgba(255, 255, 255, ${0.1 + Math.random() * 0.2}))`,
                  borderRadius: "50%",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `goldenFloat ${3 + Math.random() * 4}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 3}s`,
                  boxShadow: `0 0 ${15 + Math.random() * 20}px rgba(255, 215, 0, ${0.4 + Math.random() * 0.4})`,
                  filter: `brightness(${0.8 + Math.random() * 0.4})`
                }}
              />
            ))}
          </div>

          {/* Millionaire-Level Golden sparkles */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none"
          }}>
            {[...Array(15)].map((_, i) => (
              <div
                key={`luxury-sparkle-${i}`}
                style={{
                  position: "absolute",
                  width: `${3 + Math.random() * 5}px`,
                  height: `${3 + Math.random() * 5}px`,
                  background: `linear-gradient(45deg, 
                    rgba(255, 215, 0, ${0.9 + Math.random() * 0.1}), 
                    rgba(255, 255, 255, ${0.6 + Math.random() * 0.3}),
                    rgba(255, 215, 0, ${0.7 + Math.random() * 0.2}))`,
                  borderRadius: "2px",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `goldenSparkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 4}s`,
                  transform: "rotate(45deg)",
                  filter: `drop-shadow(0 0 ${8 + Math.random() * 12}px rgba(255, 215, 0, ${0.5 + Math.random() * 0.4}))`
                }}
              />
            ))}
          </div>

          {/* Millionaire-Level Luxury glow effect */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "1200px",
            height: "1200px",
            background: `radial-gradient(circle, 
              rgba(255, 215, 0, 0.2), 
              rgba(255, 215, 0, 0.1) 30%,
              rgba(255, 255, 255, 0.08) 60%,
              transparent 80%)`,
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            animation: "luxuryGlow 6s ease-in-out infinite",
            filter: "blur(2px)"
          }} />
          
          {/* Additional luxury particle layer */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none"
          }}>
            {[...Array(25)].map((_, i) => (
              <div
                key={`luxury-particle-${i}`}
                style={{
                  position: "absolute",
                  width: `${1 + Math.random() * 4}px`,
                  height: `${1 + Math.random() * 4}px`,
                  background: `rgba(255, 215, 0, ${0.2 + Math.random() * 0.5})`,
                  borderRadius: "50%",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `luxuryFloat ${3 + Math.random() * 5}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 4}s`,
                  boxShadow: `0 0 ${8 + Math.random() * 15}px rgba(255, 215, 0, ${0.3 + Math.random() * 0.4})`
                }}
              />
            ))}
          </div>
        </div>

        {/* Premium Hero Content */}
        <div style={{ 
          zIndex: 10,
          animation: "slideInUp 1.2s ease-out 0.3s both"
        }}>
          {/* Simple Business Name */}
          <div className="scroll-fade-in" id="hero-title" style={{
            fontSize: "1.8rem",
            fontWeight: "600",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#ffffff",
            marginBottom: "2rem",
            textAlign: "center",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)"
          }}>
            Movement Performance Training
          </div>
          
          {/* Professional Main Headline */}
          <h1 className="scroll-fade-in" id="hero-headline" style={{ 
            fontSize: "3.2rem", 
            fontWeight: "300", 
            marginBottom: "1.5rem",
            lineHeight: "1.2",
            letterSpacing: "-0.02em",
            color: "#ffffff",
            textAlign: "center",
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)"
          }}>
            Unlock Your Performance Potential
          </h1>
          <p style={{ 
            fontSize: "1.2rem", 
            marginBottom: "2rem",
            maxWidth: "600px",
            margin: "0 auto 2rem auto",
            color: "#e2e8f0",
            animation: "slideInUp 1s ease-out 0.9s both, luxurySubtitleFade 2s ease-in-out infinite",
            textShadow: "0 0 20px rgba(226, 232, 240, 0.3)"
          }}>
            Experience world-class training methodologies backed by scientific research and proven results. Our comprehensive programs are designed to optimize performance, enhance capabilities, and deliver measurable outcomes for elite athletes and professionals.
          </p>
          <button 
            className="simple-hover scroll-fade-in"
            id="hero-button"
            style={{
              padding: "16px 32px",
              fontSize: "1.1rem",
              fontWeight: "600",
              background: "linear-gradient(135deg, #0891b2, #0ea5e9)",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(8, 145, 178, 0.3)"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 25px rgba(8, 145, 178, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(8, 145, 178, 0.3)";
            }}
            onClick={() => window.location.href = '/booking'}
          >
            Get Started Today
            {/* Luxury shimmer effect */}
            <div style={{
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
              animation: "luxuryShimmer 2s infinite",
              animationDelay: "1s"
            }} />
            {/* Golden shimmer effect */}
            <div style={{
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.3), transparent)",
              animation: "luxuryShimmer 3s infinite",
              animationDelay: "2s"
            }} />
          </button>
      </div>

      {/* Luxury Scroll Indicator */}
        <div style={{
          position: "absolute",
          bottom: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          animation: "luxuryScrollIndicator 2s ease-in-out infinite"
        }}>
          <div style={{
            width: "2px",
            height: "40px",
            background: "linear-gradient(to bottom, #0891b2, rgba(255, 215, 0, 0.6), transparent)",
            animation: "luxuryScrollLine 2s ease-in-out infinite",
            boxShadow: "0 0 10px rgba(255, 215, 0, 0.3)"
          }} />
          <div style={{
            color: "#0891b2",
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "2px",
            fontWeight: "600",
            animation: "luxuryScrollText 3s ease-in-out infinite",
            textShadow: "0 0 10px rgba(255, 215, 0, 0.5)"
          }}>
            Scroll to Explore
          </div>
        </div>
      </div>
    );
  };

  const renderMPTSection = () => (
    <section className="mpt-section luxury-mpt">
      <div className="container">
        <div className="mpt-content">
          <div className="mpt-text scroll-fade-in" id="mpt-text">
            <div className="mpt-header">
              <h2 className="luxury-mpt-title">Movement Performance Training</h2>
            </div>
            
            <div className="mpt-description">
              <p className="luxury-mpt-description">
                MPT specializes in movement performance training, helping athletes and professionals improve their movement quality, efficiency, and performance. We focus on enhancing movement patterns, strength, and overall athletic capabilities.
              </p>
            </div>
            
            <div className="mpt-features luxury-features">
              <div className="features-grid">
                <div className="feature-item luxury-feature-item">
                  <FaCheck />
                  <span>Movement Quality Assessment</span>
                </div>
                <div className="feature-item luxury-feature-item">
                  <FaCheck />
                  <span>Performance Enhancement</span>
                </div>
                <div className="feature-item luxury-feature-item">
                  <FaCheck />
                  <span>Injury Prevention Focus</span>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            className="mpt-image luxury-image scroll-fade-in"
            id="mpt-image"
            style={{
              backgroundImage: "url('/mp.jpeg?v=4')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              width: '100%',
              height: '400px',
              borderRadius: '15px',
              minHeight: '300px'
            }}
          >
          </div>
        </div>
      </div>
    </section>
  );

  const renderProfessionalServices = () => (
    <section className="thrill-seekers luxury-services">
      <div className="container">
        <div className="thrill-content">
          <div className="thrill-text">
            <div className="section-badge luxury-section-badge">
              <FaRocket />
              <span>Professional Services</span>
              <FaStar className="luxury-sparkle" />
            </div>
            <h3 className="luxury-services-subtitle">TRAINING SOLUTIONS</h3>
            <h2 className="luxury-services-title">Performance Development</h2>
            <p className="luxury-services-description">Our approach combines training methodologies with practical applications to help individuals improve their movement performance and achieve their goals.</p>
          </div>
          <div style={{padding: '20px', textAlign: 'center'}}>
            <video 
              controls
              style={{
                width: '100%',
                maxWidth: '800px',
                height: 'auto',
                aspectRatio: '16/9',
                borderRadius: '15px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                display: 'block',
                margin: '0 auto',
                backgroundColor: '#000'
              }}
              preload="metadata"
            >
              <source 
                src="/videos/training-video.mp4" 
                type="video/mp4" 
              />
              Your browser does not support the video tag.
              <a href="/videos/training-video.mp4" target="_blank" rel="noreferrer">Download video</a>
            </video>
          </div>
        </div>
      </div>
    </section>
  );

  const renderFeaturesSection = () => (
    <section className="features luxury-features" ref={featuresRef}>
      <div className="container">
        <div className="section-header luxury-header scroll-fade-in" id="features-header">
          <div className="section-badge luxury-section-badge">
            <FaStar />
            <span>Professional Excellence</span>
          </div>
          <h2 className="luxury-features-title">World-Class Training Programs</h2>
          <p className="luxury-features-description">Comprehensive programs designed to elevate your performance to elite standards</p>
        </div>
        
        <div className="features-grid luxury-features-grid">
          {professionalFeatures.map((feature, index) => (
            <div key={feature.id} className="feature-card luxury-feature-card scroll-fade-in" id={`feature-${index}`}>
              <h3 className="luxury-feature-title">{feature.title}</h3>
              <p className="luxury-feature-description">{feature.description}</p>
              <div className="feature-benefits luxury-benefits">
                {feature.benefits.map((benefit, idx) => (
                  <div key={`${feature.id}-benefit-${idx}`} className="benefit-item luxury-benefit-item">
                    <FaCheck />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="feature-luxury-border" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderTestimonials = () => (
    <section className="testimonials luxury-testimonials" ref={testimonialsRef}>
      <div className="container">
        <div className="section-header luxury-header scroll-fade-in" id="testimonials-header">
          <div className="section-badge luxury-section-badge">
            <FaStar />
            <span>Professional Endorsements</span>
            <FaCrown className="luxury-crown" />
          </div>
          <h2 className="luxury-testimonials-title">Client Success Stories</h2>
          <p className="luxury-testimonials-description">Testimonials from professionals and clients that validate our commitment to excellence and dedication to results</p>
        </div>
        
        <div className="testimonials-container luxury-testimonials-container">
          <div 
            className="testimonials-track luxury-track" 
            style={{ transform: `translateX(-${testimonialState.currentIndex * 100}%)` }}
          >
            {professionalTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card luxury-testimonial-card scroll-fade-in" id={`testimonial-${testimonial.id}`}>
                <div className="testimonial-header luxury-header">
                  <div className="testimonial-avatar luxury-avatar">{testimonial.image}</div>
                  <div className="testimonial-info luxury-info">
                    <h4 className="luxury-testimonial-name">{testimonial.name}</h4>
                    <span className="role luxury-role">{testimonial.role}</span>
                    <div className="credentials luxury-credentials">{testimonial.credentials}</div>
                    <div className="achievement-badge luxury-achievement">{testimonial.achievement}</div>
                    <div className="luxury-membership">
                      <FaCrown />
                      <span>{testimonial.luxury}</span>
                    </div>
                  </div>
                  <div className="testimonial-rating luxury-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="star luxury-star" />
                    ))}
                  </div>
                </div>
                <p className="testimonial-text luxury-text">{testimonial.text}</p>
                <div className="testimonial-credentials luxury-credentials">
                  <FaShieldAlt />
                  <span>Verified Professional</span>
                </div>
                <div className="testimonial-meta luxury-meta">
                  <span className="company luxury-company">{testimonial.company}</span>
                  <span className="experience luxury-experience">{testimonial.experience}</span>
                </div>
                <div className="testimonial-luxury-border" />
              </div>
            ))}
          </div>
          
          <div className="testimonial-indicators luxury-indicators">
            {professionalTestimonials.map((_, index) => (
              <button
                key={`indicator-${index}`}
                className={`indicator luxury-indicator ${index === testimonialState.currentIndex ? 'active' : ''}`}
                onClick={() => handleTestimonialNavigation(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );




  // Main Component Render
  return (
    <>
      <style>
        {`
        `}
      </style>
      <div className="home-page luxury-home-page">
      {renderHeroSection()}
      {renderMPTSection()}
      {renderProfessionalServices()}
      {renderFeaturesSection()}
      {renderTestimonials()}
      
      {/* Chatbot */}
      <Chatbot />
      
      {/* Luxury Mouse Follower */}
      <div 
        className="luxury-mouse-follower"
        style={{
          left: mousePosition.x,
          top: mousePosition.y
        }}
      />
      </div>
    </>
  );
}

export default Home; 