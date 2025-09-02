import React, { useState, useEffect } from 'react';
import weatherService from '../services/weatherService';
import './WeatherWidget.css';

const WeatherWidget = ({ isOpen, onClose }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('current');

  useEffect(() => {
    if (isOpen) {
      loadWeatherData();
    }
  }, [isOpen]);

  const loadWeatherData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        weatherService.getCurrentWeather(),
        weatherService.getWeatherForecast()
      ]);
      
      setCurrentWeather(weatherData);
      setForecast(forecastData);
    } catch (error) {
      setError('Unable to load weather data. Showing sample data instead.');
      // Load mock data as fallback
      setCurrentWeather(weatherService.getMockWeatherData());
      setForecast(weatherService.getMockForecastData());
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return '#10b981'; // Green
    if (rating >= 6) return '#f59e0b'; // Yellow
    if (rating >= 4) return '#f97316'; // Orange
    return '#ef4444'; // Red
  };

  const getRatingText = (rating) => {
    if (rating >= 8) return 'Excellent';
    if (rating >= 6) return 'Good';
    if (rating >= 4) return 'Moderate';
    return 'Challenging';
  };

  if (!isOpen) return null;

  return (
    <div className="weather-widget-overlay" onClick={onClose}>
      <div className="weather-widget-modal" onClick={(e) => e.stopPropagation()}>
        <div className="weather-widget-header">
          <h2>🌤️ Live Weather & Conditions</h2>
          <button className="weather-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="weather-tabs">
          <button 
            className={`weather-tab ${activeTab === 'current' ? 'active' : ''}`}
            onClick={() => setActiveTab('current')}
          >
            Current
          </button>
          <button 
            className={`weather-tab ${activeTab === 'forecast' ? 'active' : ''}`}
            onClick={() => setActiveTab('forecast')}
          >
            5-Day Forecast
          </button>
          <button 
            className={`weather-tab ${activeTab === 'recommendations' ? 'active' : ''}`}
            onClick={() => setActiveTab('recommendations')}
          >
            Recommendations
          </button>
        </div>

        <div className="weather-content">
          {loading && (
            <div className="weather-loading">
              <div className="loading-spinner"></div>
              <p>Loading weather data...</p>
            </div>
          )}

          {error && (
            <div className="weather-error">
              <p>{error}</p>
            </div>
          )}

          {activeTab === 'current' && currentWeather && (
            <div className="current-weather">
              <div className="weather-location">
                <h3>{currentWeather.location}</h3>
                <p className="weather-timestamp">Updated: {currentWeather.timestamp}</p>
              </div>
              
              <div className="weather-main">
                <div className="weather-icon">
                  <img 
                    src={getWeatherIcon(currentWeather.icon)} 
                    alt={currentWeather.description}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <span className="weather-emoji" style={{ display: 'none' }}>
                    {currentWeather.description.includes('sunny') ? '☀️' : 
                     currentWeather.description.includes('cloudy') ? '☁️' : 
                     currentWeather.description.includes('rain') ? '🌧️' : '🌤️'}
                  </span>
                </div>
                
                <div className="weather-details">
                  <div className="temperature">
                    <span className="temp-value">{currentWeather.temperature}°C</span>
                    <span className="temp-feels">Feels like {currentWeather.feelsLike}°C</span>
                  </div>
                  <div className="weather-description">
                    {currentWeather.description.charAt(0).toUpperCase() + currentWeather.description.slice(1)}
                  </div>
                </div>
              </div>

              <div className="weather-stats">
                <div className="weather-stat">
                  <span className="stat-label">Wind</span>
                  <span className="stat-value">{currentWeather.windSpeed} km/h {currentWeather.windDirection}</span>
                </div>
                <div className="weather-stat">
                  <span className="stat-label">Humidity</span>
                  <span className="stat-value">{currentWeather.humidity}%</span>
                </div>
                <div className="weather-stat">
                  <span className="stat-label">Pressure</span>
                  <span className="stat-value">{currentWeather.pressure} hPa</span>
                </div>
                <div className="weather-stat">
                  <span className="stat-label">Visibility</span>
                  <span className="stat-value">{currentWeather.visibility} km</span>
                </div>
              </div>

              <div className="water-sports-rating">
                <h4>Water Sports Rating</h4>
                <div className="rating-display">
                  <div 
                    className="rating-circle" 
                    style={{ backgroundColor: getRatingColor(currentWeather.waterSportsRating) }}
                  >
                    {currentWeather.waterSportsRating}/10
                  </div>
                  <span className="rating-text">{getRatingText(currentWeather.waterSportsRating)}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'forecast' && forecast.length > 0 && (
            <div className="weather-forecast">
              <div className="forecast-grid">
                {forecast.map((day, index) => (
                  <div key={index} className="forecast-day">
                    <div className="forecast-date">
                      {day.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                    <div className="forecast-icon">
                      <img 
                        src={getWeatherIcon(day.icon)} 
                        alt={day.description}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      <span className="weather-emoji" style={{ display: 'none' }}>
                        {day.description.includes('sunny') ? '☀️' : 
                         day.description.includes('cloudy') ? '☁️' : 
                         day.description.includes('rain') ? '🌧️' : '🌤️'}
                      </span>
                    </div>
                    <div className="forecast-temp">{day.temperature}°C</div>
                    <div className="forecast-wind">{day.windSpeed} km/h</div>
                    <div className="forecast-rating">
                      <div 
                        className="rating-dot" 
                        style={{ backgroundColor: getRatingColor(day.waterSportsRating) }}
                        title={`Rating: ${day.waterSportsRating}/10`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'recommendations' && currentWeather && (
            <div className="weather-recommendations">
              <h4>🏄‍♀️ Water Sports Recommendations</h4>
              <div className="recommendations-list">
                {weatherService.getWaterSportsRecommendations(currentWeather).map((rec, index) => (
                  <div key={index} className="recommendation-item">
                    <span className="recommendation-bullet">•</span>
                    <span className="recommendation-text">{rec}</span>
                  </div>
                ))}
              </div>
              
              <div className="weather-tips">
                <h5>💡 Pro Tips</h5>
                <ul>
                  <li>Always check wind conditions before heading out</li>
                  <li>Start early when winds are typically lighter</li>
                  <li>Bring appropriate gear for the temperature</li>
                  <li>Check with instructors about current conditions</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="weather-footer">
          <button className="weather-refresh-btn" onClick={loadWeatherData}>
            🔄 Refresh Data
          </button>
          <p className="weather-note">
            Data provided by OpenWeatherMap API
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
