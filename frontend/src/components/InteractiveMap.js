import React, { useState, useEffect, useRef, useCallback } from 'react';
import './InteractiveMap.css';
import { getApiKey, isApiKeyConfigured } from '../config/apiKeys';

const InteractiveMap = ({
  location = {
    name: 'Ezyfit Health Club',
    address: 'Birtinya, QLD 4575',
    city: 'Sunshine Coast, Queensland, Australia',
    coordinates: { lat: -26.7500, lng: 153.1167 }
  }
}) => {
  const [mapError, setMapError] = useState(null);
  const [transportMode, setTransportMode] = useState('driving');

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  // Initialize the map
  const initializeMap = useCallback(() => {
    if (!window.google || !mapRef.current) return;

    try {
      // Create map instance
      const map = new window.google.maps.Map(mapRef.current, {
        center: location.coordinates,
        zoom: 15,
        mapTypeControl: false,
        fullscreenControl: true,
        streetViewControl: false,
        zoomControl: true
      });

      mapInstanceRef.current = map;

      // Add marker for MPT location
      const marker = new window.google.maps.Marker({
        position: location.coordinates,
        map: map,
        title: location.name
      });

    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Failed to initialize map. Please try again.');
    }
  }, [location.coordinates, location.name]);

  // Load Google Maps API
  useEffect(() => {
    const loadGoogleMaps = () => {
      // Check if Google Maps is already loaded
      if (window.google && window.google.maps) {
        initializeMap();
        return;
      }

      // Check if we have a valid API key
      if (!isApiKeyConfigured('GOOGLE_MAPS')) {
        // No API key provided, show fallback map
        setMapError('Google Maps API key not configured. Showing simple location info instead.');
        return;
      }

      const apiKey = getApiKey('GOOGLE_MAPS');

      // Load Google Maps API
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        // Map loaded successfully
        initializeMap();
      };
      
      script.onerror = () => {
        setMapError('Failed to load Google Maps. Please check your internet connection.');
      };
      
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, [initializeMap]);

  // Simple function to open Google Maps with directions
  const openGoogleMaps = (origin = null) => {
    let url;
    if (origin) {
      // From specific address
      const encodedOrigin = encodeURIComponent(origin);
      const encodedDestination = encodeURIComponent(`${location.name}, ${location.address}, ${location.city}`);
      url = `https://www.google.com/maps/dir/?api=1&origin=${encodedOrigin}&destination=${encodedDestination}&travelmode=${transportMode}`;
    } else {
      // From current location
      const encodedDestination = encodeURIComponent(`${location.name}, ${location.address}, ${location.city}`);
      url = `https://www.google.com/maps/dir/?api=1&destination=${encodedDestination}&travelmode=${transportMode}`;
    }
    window.open(url, '_blank');
  };

  // Handle address search
  const handleAddressSearch = (event) => {
    event.preventDefault();
    const addressInput = event.target.querySelector('input[name="address"]');
    const address = addressInput.value.trim();
    
    if (address) {
      openGoogleMaps(address);
      addressInput.value = ''; // Clear input after search
    }
  };

  // Initialize Google Places Autocomplete
  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      const addressInput = document.querySelector('input[name="address"]');
      if (addressInput) {
        const autocomplete = new window.google.maps.places.Autocomplete(addressInput, {
          types: ['geocode', 'establishment'],
          componentRestrictions: { country: 'au' }, // Restrict to Australia
          fields: ['formatted_address', 'geometry', 'name']
        });

        // Handle place selection
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (place.formatted_address) {
            addressInput.value = place.formatted_address;
            // Automatically get directions when place is selected
            openGoogleMaps(place.formatted_address);
          }
        });
      }
    }
  }, [mapError]); // Re-run when mapError changes (fallback vs full map)

  if (mapError) {
    return (
      <div className="simple-map">
        <div className="map-container">
          <div className="map-placeholder">
            <div className="map-icon">🗺️</div>
            <h3>{location.name}</h3>
            <div className="location-pin">📍</div>
          </div>
        </div>
        
        <div className="simple-controls">
          <div className="location-info">
            <h4>📍 Our Location</h4>
            <p><strong>{location.name}</strong></p>
            <p>{location.address}</p>
            <p>{location.city}</p>
          </div>
          
          <div className="transport-options">
            <h5>🚗 How to get here:</h5>
            <div className="transport-buttons">
              <button 
                className={`transport-btn ${transportMode === 'driving' ? 'active' : ''}`}
                onClick={() => setTransportMode('driving')}
              >
                🚗 Driving
              </button>
              <button 
                className={`transport-btn ${transportMode === 'walking' ? 'active' : ''}`}
                onClick={() => setTransportMode('walking')}
              >
                🚶 Walking
              </button>
              <button 
                className={`transport-btn ${transportMode === 'bicycling' ? 'active' : ''}`}
                onClick={() => setTransportMode('bicycling')}
              >
                🚴 Cycling
              </button>
            </div>
          </div>
          
          <div className="search-section">
            <h5>🔍 Get directions from:</h5>
            <form onSubmit={handleAddressSearch} className="search-form">
              <div className="search-input-wrapper">
                <input
                  type="text"
                  id="map-address-search"
                  name="address"
                  placeholder="Start typing your address..."
                  className="search-input"
                  autoComplete="off"
                />
                <div className="search-icon">🔍</div>
              </div>
              <button type="submit" className="search-btn">
                Get Directions
              </button>
            </form>
            <div className="search-tips">
              <small>💡 Type to see suggestions • Select from dropdown • Press Enter to search</small>
            </div>
          </div>
          
          <div className="quick-actions">
            <button 
              onClick={() => openGoogleMaps()}
              className="action-btn primary"
            >
              🧭 Directions from my location
            </button>
            <button 
              onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.name + ', ' + location.address + ', ' + location.city)}`, '_blank')}
              className="action-btn secondary"
            >
              🗺️ View on Google Maps
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="simple-map">
      {/* Map Container */}
      <div className="map-container">
        <div ref={mapRef} className="map-display" />
      </div>
      
      {/* Simple Controls */}
      <div className="simple-controls">
        <div className="location-info">
          <h4>📍 Our Location</h4>
          <p><strong>{location.name}</strong></p>
          <p>{location.address}</p>
          <p>{location.city}</p>
        </div>
        
        <div className="transport-options">
          <h5>🚗 How to get here:</h5>
          <div className="transport-buttons">
            <button 
              className={`transport-btn ${transportMode === 'driving' ? 'active' : ''}`}
              onClick={() => setTransportMode('driving')}
            >
              🚗 Driving
            </button>
            <button 
              className={`transport-btn ${transportMode === 'walking' ? 'active' : ''}`}
              onClick={() => setTransportMode('walking')}
            >
              🚶 Walking
            </button>
            <button 
              className={`transport-btn ${transportMode === 'bicycling' ? 'active' : ''}`}
              onClick={() => setTransportMode('bicycling')}
            >
              🚴 Cycling
            </button>
          </div>
        </div>
        
                  <div className="search-section">
            <h5>🔍 Get directions from:</h5>
            <form onSubmit={handleAddressSearch} className="search-form">
              <div className="search-input-wrapper">
                <input
                  type="text"
                  id="map-address-search"
                  name="address"
                  placeholder="Start typing your address..."
                  className="search-input"
                  autoComplete="off"
                />
                <div className="search-icon">🔍</div>
              </div>
              <button type="submit" className="search-btn">
                Get Directions
              </button>
            </form>
            <div className="search-tips">
              <small>💡 Type to see suggestions • Select from dropdown • Press Enter to search</small>
            </div>
          </div>
        
        <div className="quick-actions">
          <button 
            onClick={() => openGoogleMaps()}
            className="action-btn primary"
          >
            🧭 Directions from my location
          </button>
          <button 
            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.name + ', ' + location.address + ', ' + location.city)}`, '_blank')}
            className="action-btn secondary"
          >
            🗺️ View on Google Maps
          </button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
