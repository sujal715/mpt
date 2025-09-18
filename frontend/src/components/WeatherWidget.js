import React, { useState, useEffect } from 'react';
import weatherService from '../services/weatherService';

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
      const weatherData = await weatherService.getCurrentWeather();
      setCurrentWeather(weatherData);
      
      const forecastData = await weatherService.getForecast();
      setForecast(forecastData);
    } catch (err) {
      setError('Failed to load weather data');
      console.error('Weather loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'bg-green-500';
    if (rating >= 6) return 'bg-yellow-500';
    if (rating >= 4) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getWindDirection = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(degrees / 22.5) % 16];
  };

  const getDifficultyBadgeColor = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-blue-100 text-blue-800';
      case 'all levels': return 'bg-green-100 text-green-800';
      case 'intermediate+': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionBadgeColor = (condition) => {
    switch (condition.toLowerCase()) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">🌤️</span>
              <h2 className="text-2xl font-bold">Live Weather & Conditions</h2>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="flex">
            {[
              { id: 'current', label: 'Current', icon: '🌤️' },
              { id: 'forecast', label: '5-Day Forecast', icon: '📅' },
              { id: 'recommendations', label: 'Recommendations', icon: '🎯' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading weather data...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Current Conditions Tab */}
          {activeTab === 'current' && currentWeather && (
            <div className="space-y-6">
              {/* Location & Time */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{currentWeather.location}</h3>
                    <p className="text-gray-600">Updated: {currentWeather.timestamp}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-gray-900">{currentWeather.temperature}°C</div>
                    <p className="text-gray-600">Feels like {currentWeather.feelsLike}°C</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center space-x-4">
                  <img 
                    src={`https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`} 
                    alt={currentWeather.description}
                    className="w-16 h-16"
                  />
                  <div>
                    <p className="text-lg font-semibold text-gray-900 capitalize">{currentWeather.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className={`w-3 h-3 rounded-full ${getRatingColor(currentWeather.waterSportsRating)}`}></div>
                      <span className="text-sm font-medium text-gray-700">
                        Water Sports Rating: {currentWeather.waterSportsRating}/10
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Wind', value: `${currentWeather.windSpeed} km/h`, icon: '💨', detail: getWindDirection(currentWeather.windDirection) },
                  { label: 'Humidity', value: `${currentWeather.humidity}%`, icon: '💧', detail: 'Relative' },
                  { label: 'Pressure', value: `${currentWeather.pressure} hPa`, icon: '📊', detail: 'Atmospheric' },
                  { label: 'Visibility', value: `${currentWeather.visibility} km`, icon: '👁️', detail: 'Clear' }
                ].map((stat, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{stat.icon}</span>
                      <div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
                        <p className="text-xs text-gray-500">{stat.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Forecast Tab */}
          {activeTab === 'forecast' && forecast.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <span className="mr-2">📅</span>
                5-Day Forecast
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {forecast.map((day, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-semibold text-gray-900">{formatDate(day.date)}</p>
                        <p className="text-sm text-gray-600 capitalize">{day.description}</p>
                      </div>
                      <img 
                        src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} 
                        alt={day.description}
                        className="w-12 h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Temperature</span>
                        <span className="font-semibold">{day.temperature}°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Wind</span>
                        <span className="font-semibold">{day.windSpeed} km/h</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Rating</span>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${getRatingColor(day.waterSportsRating)}`}></div>
                          <span className="text-sm font-medium">{day.waterSportsRating}/10</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations Tab */}
          {activeTab === 'recommendations' && currentWeather && (
            <div className="space-y-6 pb-6">
              {(() => {
                const comprehensiveRecs = weatherService.getComprehensiveRecommendations(currentWeather);
                const trainingRecs = weatherService.getTrainingRecommendations(currentWeather);
                
                return (
                  <>
                    {/* Modern Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">Live Weather & Conditions</h2>
                        <p className="text-gray-600 text-sm">Real-time recommendations for your water sports adventure</p>
                      </div>
                      <button 
                        onClick={loadWeatherData}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        <span className="text-lg">🔄</span>
                        <span>Refresh</span>
                      </button>
                    </div>

                    {/* Hero Status Card */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 rounded-2xl p-6 text-white shadow-2xl">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
                      <div className="relative z-10">
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">🌊</span>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">{comprehensiveRecs.overall}</h3>
                            <p className="text-blue-100 text-sm">Perfect conditions detected</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span>Excellent Visibility</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span>Ideal Wind</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                            <span>Safe Conditions</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Activities Grid */}
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <span className="text-white text-sm">🏄‍♀️</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Recommended Activities</h3>
                      </div>
                      
                      {comprehensiveRecs.activities.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {comprehensiveRecs.activities.map((activity, index) => (
                            <div key={index} className="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1">
                              <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                  <span className="text-xl">{activity.icon}</span>
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-bold text-gray-900 text-lg">{activity.activity}</h4>
                                    <div className="flex space-x-2">
                                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyBadgeColor(activity.level)}`}>
                                        {activity.level}
                                      </span>
                                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getConditionBadgeColor(activity.confidence)}`}>
                                        {activity.confidence}
                                      </span>
                                    </div>
                                  </div>
                                  
                                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{activity.recommendation}</p>
                                  
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center text-gray-500 text-sm">
                                      <span className="mr-2">⏱️</span>
                                      <span className="font-medium">{activity.duration}</span>
                                    </div>
                                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                      Learn More →
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-16 bg-gray-50 rounded-2xl">
                          <div className="text-6xl mb-4">🌤️</div>
                          <p className="text-gray-600 text-lg">No specific activity recommendations for current conditions.</p>
                        </div>
                      )}
                    </div>

                    {/* Services & Session Info Combined */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Services */}
                      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm">🎯</span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900">MPT Services</h3>
                        </div>
                        
                        {comprehensiveRecs.services.length > 0 ? (
                          <div className="space-y-3">
                            {comprehensiveRecs.services.map((service, index) => (
                              <div key={index} className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-100 hover:shadow-md transition-shadow duration-200">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-semibold text-gray-900">{service.name}</h4>
                                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    {service.price}
                                  </span>
                                </div>
                                <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                                <div className="flex items-center justify-between">
                                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionBadgeColor(service.suitability)}`}>
                                    {service.suitability} Conditions
                                  </span>
                                  <span className="text-sm text-gray-500 flex items-center">
                                    <span className="mr-1">⏱️</span>
                                    {service.duration}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <div className="text-4xl mb-2">💼</div>
                            <p className="text-gray-600">No service recommendations available.</p>
                          </div>
                        )}
                      </div>

                      {/* Session Info */}
                      {trainingRecs && (
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                              <span className="text-white text-sm">📚</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Session Details</h3>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-lg">📋</span>
                                  <h4 className="font-semibold text-gray-900 text-sm">Types</h4>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {trainingRecs.sessionTypes.slice(0, 2).map((type, index) => (
                                    <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                      {type}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-lg">⏰</span>
                                  <h4 className="font-semibold text-gray-900 text-sm">Duration</h4>
                                </div>
                                <p className="text-gray-700 text-sm font-medium">{trainingRecs.duration}</p>
                              </div>
                              
                              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-lg">👥</span>
                                  <h4 className="font-semibold text-gray-900 text-sm">Group Size</h4>
                                </div>
                                <p className="text-gray-700 text-sm font-medium">{trainingRecs.groupSize}</p>
                              </div>
                              
                              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-3">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-lg">🎓</span>
                                  <h4 className="font-semibold text-gray-900 text-sm">Instructor</h4>
                                </div>
                                <p className="text-gray-700 text-sm font-medium">{trainingRecs.instructorLevel}</p>
                              </div>
                            </div>
                            
                            {trainingRecs.bestTimes.length > 0 && (
                              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-3">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-lg">🌅</span>
                                  <h4 className="font-semibold text-gray-900 text-sm">Best Times</h4>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {trainingRecs.bestTimes.map((time, index) => (
                                    <span key={index} className="bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                      {time}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
          <button
            onClick={loadWeatherData}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Refreshing...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <span>🔄</span>
                <span>Refresh Data</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
