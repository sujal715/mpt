// Weather Service for MPT Application
// This service fetches weather data from wttr.in (free service) with backend API fallback

import ApiService from './api';

class WeatherService {
  constructor() {
    // Use wttr.in as primary service, backend API as fallback
    this.apiService = ApiService;
  }

  // Get current weather for user's location using wttr.in (free service)
  async getCurrentWeather() {
    try {
      // Get user's location first
      const location = await this.getUserLocation();
      
      // Try wttr.in first (free service, no API key needed)
      try {
        const wttrResponse = await fetch(`https://wttr.in/${location.lat},${location.lon}?format=j1`);
        if (wttrResponse.ok) {
          const wttrData = await wttrResponse.json();
          return this.formatWttrData(wttrData, location.city);
        }
      } catch (wttrError) {
        console.log('wttr.in failed, trying backend API...', wttrError);
      }
      
      // Fallback to backend API
      const response = await this.apiService.request(`/weather/current?lat=${location.lat}&lon=${location.lon}`);
      
      if (response.success) {
        return this.formatBackendWeatherData(response.data, location.city);
      } else {
        throw new Error(response.message || 'Weather data unavailable');
      }
      
    } catch (error) {
      console.error('Error fetching weather:', error);
      
      // Fallback to mock data with user's location
      try {
        const location = await this.getUserLocation();
        const mockData = this.getMockWeatherData();
        mockData.location = location.city;
        mockData.timestamp = new Date().toLocaleTimeString();
        return mockData;
      } catch (locationError) {
        return this.getMockWeatherData();
      }
    }
  }

  // Alias for getWeatherForecast to match WeatherWidget expectations
  async getForecast() {
    return this.getWeatherForecast();
  }

  // Removed fetchWeatherFromMultipleSources - now using backend API exclusively

  // Get weather forecast for user's location using wttr.in (free service)
  async getWeatherForecast() {
    try {
      // Get user's location first
      const location = await this.getUserLocation();
      
      // Try wttr.in first (free service, no API key needed)
      try {
        const wttrResponse = await fetch(`https://wttr.in/${location.lat},${location.lon}?format=j1`);
        if (wttrResponse.ok) {
          const wttrData = await wttrResponse.json();
          return this.formatWttrForecastData(wttrData);
        }
      } catch (wttrError) {
        console.log('wttr.in forecast failed, trying backend API...', wttrError);
      }
      
      // Fallback to backend API
      const response = await this.apiService.request(`/weather/forecast?lat=${location.lat}&lon=${location.lon}`);
      
      if (response.success) {
        return this.formatBackendForecastData(response.data);
      } else {
        throw new Error(response.message || 'Forecast data unavailable');
      }
      
    } catch (error) {
      console.error('Error fetching forecast:', error);
      return this.getMockForecastData(); // Fallback to mock data
    }
  }

  // Get user's current location
  async getUserLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({
            lat: latitude,
            lon: longitude,
            city: 'Current Location'
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          // Provide more specific error handling
          if (error.code === 1) {
            console.log('Geolocation permission denied, using default location');
          } else if (error.code === 2) {
            console.log('Geolocation position unavailable, using default location');
          } else if (error.code === 3) {
            console.log('Geolocation timeout, using default location');
          }
          
          // Fallback to default location if geolocation fails
          resolve({
            lat: -33.8688, // Sydney coordinates as fallback
            lon: 151.2093,
            city: 'Sydney'
          });
        },
        {
          timeout: 5000, // Reduced timeout to 5 seconds
          enableHighAccuracy: false,
          maximumAge: 300000 // Cache location for 5 minutes
        }
      );
    });
  }

  // Format Open-Meteo weather data for display
  formatOpenMeteoData(data, city = 'Current Location') {
    const current = data.current_weather;
    
    return {
      temperature: Math.round(current.temperature),
      feelsLike: Math.round(current.temperature), // Open-Meteo doesn't provide feels-like
      humidity: 65, // Default value since not provided
      windSpeed: Math.round(current.windspeed * 3.6), // Convert m/s to km/h
      windDirection: this.getWindDirectionFromDegrees(current.winddirection),
      description: this.getWeatherDescription(current.weathercode),
      icon: this.getOpenMeteoIcon(current.weathercode),
      pressure: 1013, // Default value since not provided
      visibility: 10, // Default value since not provided
      timestamp: new Date().toLocaleTimeString(),
      location: city,
      waterSportsRating: this.calculateWaterSportsRatingFromOpenMeteo(current)
    };
  }

  // Format backend weather data for display
  formatBackendWeatherData(data, city = 'Current Location') {
    return {
      temperature: data.temperature,
      feelsLike: data.temperature, // Backend doesn't provide feels like, use same as temperature
      humidity: data.humidity,
      windSpeed: data.windSpeed,
      windDirection: 'N', // Default direction since backend doesn't provide
      description: data.condition,
      icon: this.getBackendIcon(data.condition),
      pressure: 1013, // Default value since backend doesn't provide
      visibility: 10, // Default value since backend doesn't provide
      timestamp: new Date().toLocaleTimeString(),
      location: data.location || city,
      waterSportsRating: this.calculateWaterSportsRatingFromBackend(data)
    };
  }

  // Format backend forecast data for display
  formatBackendForecastData(data) {
    // The backend returns forecast data in a specific format
    // We need to format it to match what the WeatherWidget expects
    if (data && data.forecast && Array.isArray(data.forecast)) {
      return data.forecast.map(day => ({
        day: day.day,
        temp: day.temp,
        condition: day.condition,
        wind: day.wind,
        icon: this.getBackendIcon(day.condition)
      }));
    }
    
    // Fallback to mock data if format is unexpected
    return this.getMockForecastData();
  }

  // Format wttr.in weather data for display
  formatWttrData(data, city = 'Current Location') {
    const current = data.current_condition[0];
    const nearest_area = data.nearest_area[0];
    
    return {
      temperature: parseInt(current.temp_C),
      feelsLike: parseInt(current.FeelsLikeC),
      humidity: parseInt(current.humidity),
      windSpeed: parseInt(current.windspeedKmph),
      windDirection: current.winddir16Point,
      description: current.weatherDesc[0].value,
      icon: this.getWttrIcon(current.weatherCode),
      pressure: parseInt(current.pressure),
      visibility: parseInt(current.visibility),
      timestamp: new Date().toLocaleTimeString(),
      location: nearest_area ? nearest_area.areaName[0].value : city,
      waterSportsRating: this.calculateWaterSportsRatingFromWttr(current)
    };
  }

  // Get icon code from wttr.in weather code
  getWttrIcon(weatherCode) {
    const iconMap = {
      '113': '01d', // Clear/sunny
      '116': '02d', // Partly cloudy
      '119': '03d', // Cloudy
      '122': '04d', // Overcast
      '143': '50d', // Mist
      '176': '10d', // Patchy rain
      '179': '09d', // Patchy sleet
      '182': '13d', // Patchy freezing drizzle
      '185': '13d', // Freezing drizzle
      '200': '11d', // Thundery outbreaks
      '227': '13d', // Blowing snow
      '230': '13d', // Blizzard
      '248': '50d', // Fog
      '260': '50d', // Freezing fog
      '263': '09d', // Patchy light drizzle
      '266': '09d', // Light drizzle
      '281': '13d', // Freezing drizzle
      '284': '13d', // Heavy freezing drizzle
      '293': '10d', // Patchy light rain
      '296': '10d', // Light rain
      '299': '10d', // Moderate rain at times
      '302': '10d', // Moderate rain
      '305': '10d', // Heavy rain at times
      '308': '10d', // Heavy rain
      '311': '13d', // Light freezing rain
      '314': '13d', // Moderate or heavy freezing rain
      '317': '13d', // Light sleet
      '320': '13d', // Moderate or heavy sleet
      '323': '13d', // Patchy light snow
      '326': '13d', // Light snow
      '329': '13d', // Patchy moderate snow
      '332': '13d', // Moderate snow
      '335': '13d', // Patchy heavy snow
      '338': '13d', // Heavy snow
      '350': '13d', // Ice pellets
      '353': '10d', // Light rain shower
      '356': '10d', // Moderate or heavy rain shower
      '359': '10d', // Torrential rain shower
      '362': '13d', // Light sleet showers
      '365': '13d', // Moderate or heavy sleet showers
      '368': '13d', // Light snow showers
      '371': '13d', // Moderate or heavy snow showers
      '374': '13d', // Light showers of ice pellets
      '377': '13d', // Moderate or heavy showers of ice pellets
      '386': '11d', // Patchy light rain with thunder
      '389': '11d', // Moderate or heavy rain with thunder
      '392': '11d', // Patchy light snow with thunder
      '395': '11d'  // Moderate or heavy snow with thunder
    };
    
    return iconMap[weatherCode] || '01d';
  }

  // Calculate water sports rating from wttr.in data
  calculateWaterSportsRatingFromWttr(current) {
    let rating = 5; // Base rating
    
    const temp = parseInt(current.temp_C);
    const windSpeed = parseInt(current.windspeedKmph);
    const humidity = parseInt(current.humidity);
    const visibility = parseInt(current.visibility);
    
    // Temperature factor (ideal: 20-30°C)
    if (temp >= 20 && temp <= 30) rating += 2;
    else if (temp >= 15 && temp <= 35) rating += 1;
    else if (temp < 10 || temp > 40) rating -= 2;
    
    // Wind factor (ideal: 15-25 km/h for kitesurfing)
    if (windSpeed >= 15 && windSpeed <= 25) rating += 3;
    else if (windSpeed >= 10 && windSpeed <= 30) rating += 1;
    else if (windSpeed < 5 || windSpeed > 40) rating -= 2;
    
    // Visibility factor
    if (visibility >= 10) rating += 1;
    else if (visibility < 5) rating -= 1;
    
    // Humidity factor (high humidity can affect comfort)
    if (humidity > 80) rating -= 1;
    
    return Math.max(1, Math.min(10, rating));
  }

  // Calculate water sports rating from backend data
  calculateWaterSportsRatingFromBackend(data) {
    let rating = 5; // Base rating
    
    const temp = data.temperature;
    const windSpeed = data.windSpeed;
    const humidity = data.humidity;
    
    // Temperature factor (ideal: 20-30°C)
    if (temp >= 20 && temp <= 30) rating += 2;
    else if (temp >= 15 && temp <= 35) rating += 1;
    else if (temp < 10 || temp > 40) rating -= 2;
    
    // Wind factor (ideal: 15-25 km/h for kitesurfing)
    if (windSpeed >= 15 && windSpeed <= 25) rating += 3;
    else if (windSpeed >= 10 && windSpeed <= 30) rating += 1;
    else if (windSpeed < 5 || windSpeed > 40) rating -= 2;
    
    // Humidity factor (high humidity can affect comfort)
    if (humidity > 80) rating -= 1;
    
    return Math.max(1, Math.min(10, rating));
  }

  // Get icon code from backend condition
  getBackendIcon(condition) {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) return '01d';
    if (conditionLower.includes('partly cloudy')) return '02d';
    if (conditionLower.includes('cloudy') || conditionLower.includes('overcast')) return '04d';
    if (conditionLower.includes('rain')) return '10d';
    if (conditionLower.includes('storm') || conditionLower.includes('thunder')) return '11d';
    if (conditionLower.includes('snow')) return '13d';
    if (conditionLower.includes('mist') || conditionLower.includes('fog')) return '50d';
    
    return '01d'; // Default to sunny
  }

  // Format current weather data for display (legacy OpenWeatherMap format)
  formatWeatherData(data, city = 'Current Location') {
    return {
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      windDirection: this.getWindDirection(data.wind.deg),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      pressure: data.main.pressure,
      visibility: data.visibility / 1000, // Convert to km
      timestamp: new Date().toLocaleTimeString(),
      location: city,
      waterSportsRating: this.calculateWaterSportsRating(data)
    };
  }

  // Format wttr.in forecast data for display
  formatWttrForecastData(data) {
    const dailyForecasts = [];
    
    // wttr.in provides weather data for the next few days
    const weatherData = data.weather;
    
    weatherData.forEach((day, index) => {
      if (index < 5) { // Limit to 5 days
        const avgTemp = parseInt(day.avgtempC);
        const maxWind = parseInt(day.maxwindspeedKmph);
        const description = day.hourly[0].weatherDesc[0].value;
        const weatherCode = day.hourly[0].weatherCode;
        
        dailyForecasts.push({
          date: new Date(day.date),
          temperature: avgTemp,
          windSpeed: maxWind,
          description: description,
          icon: this.getWttrIcon(weatherCode),
          waterSportsRating: this.calculateWaterSportsRatingFromWttr({
            temp_C: avgTemp,
            windspeedKmph: maxWind,
            humidity: day.hourly[0].humidity,
            visibility: day.hourly[0].visibility
          })
        });
      }
    });

    return dailyForecasts;
  }

  // Format forecast data for display (legacy OpenWeatherMap format)
  formatForecastData(data) {
    const dailyForecasts = [];
    
    // Group forecasts by day
    const dailyData = {};
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const day = date.toDateString();
      
      if (!dailyData[day]) {
        dailyData[day] = [];
      }
      dailyData[day].push(item);
    });

    // Get daily averages
    Object.keys(dailyData).forEach(day => {
      const dayData = dailyData[day];
      const avgTemp = dayData.reduce((sum, item) => sum + item.main.temp, 0) / dayData.length;
      const avgWind = dayData.reduce((sum, item) => sum + item.wind.speed, 0) / dayData.length;
      const description = dayData[0].weather[0].description;
      
      dailyForecasts.push({
        date: new Date(day),
        temperature: Math.round(avgTemp),
        windSpeed: Math.round(avgWind * 3.6),
        description: description,
        icon: dayData[0].weather[0].icon,
        waterSportsRating: this.calculateWaterSportsRating({
          main: { temp: avgTemp },
          wind: { speed: avgWind },
          weather: [{ description: description }]
        })
      });
    });

    return dailyForecasts.slice(0, 5); // Return next 5 days
  }

  // Calculate water sports suitability rating (1-10)
  calculateWaterSportsRating(weatherData) {
    let rating = 5; // Base rating
    
    // Temperature factor (ideal: 20-30°C)
    const temp = weatherData.main.temp;
    if (temp >= 20 && temp <= 30) rating += 2;
    else if (temp >= 15 && temp <= 35) rating += 1;
    else if (temp < 10 || temp > 40) rating -= 2;
    
    // Wind factor (ideal: 15-25 km/h for kitesurfing)
    const windSpeed = weatherData.wind.speed * 3.6;
    if (windSpeed >= 15 && windSpeed <= 25) rating += 3;
    else if (windSpeed >= 10 && windSpeed <= 30) rating += 1;
    else if (windSpeed < 5 || windSpeed > 40) rating -= 2;
    
    // Weather condition factor
    const description = weatherData.weather[0].description.toLowerCase();
    if (description.includes('clear') || description.includes('sunny')) rating += 1;
    else if (description.includes('rain') || description.includes('storm')) rating -= 2;
    else if (description.includes('cloudy') || description.includes('overcast')) rating -= 1;
    
    return Math.max(1, Math.min(10, rating));
  }

  // Get wind direction from degrees
  getWindDirection(degrees) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  }

  // Mock weather data for when API is unavailable
  getMockWeatherData() {
    return {
      temperature: 22,
      feelsLike: 24,
      humidity: 65,
      windSpeed: 18,
      windDirection: 'SE',
      description: 'Partly cloudy',
      icon: '02d',
      pressure: 1013,
      visibility: 10,
      timestamp: new Date().toLocaleTimeString(),
      location: 'Sydney Harbour',
      waterSportsRating: 8
    };
  }

  // Mock forecast data
  getMockForecastData() {
    return [
      {
        date: new Date(Date.now() + 24 * 60 * 60 * 1000),
        temperature: 23,
        windSpeed: 20,
        description: 'Sunny',
        icon: '01d',
        waterSportsRating: 9
      },
      {
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        temperature: 21,
        windSpeed: 15,
        description: 'Partly cloudy',
        icon: '02d',
        waterSportsRating: 7
      },
      {
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        temperature: 19,
        windSpeed: 25,
        description: 'Windy',
        icon: '03d',
        waterSportsRating: 6
      }
    ];
  }

  // Get water sports recommendations based on real weather data
  getWaterSportsRecommendations(weatherData) {
    const rating = weatherData.waterSportsRating;
    const windSpeed = weatherData.windSpeed;
    const temp = weatherData.temperature;
    const humidity = weatherData.humidity;
    const visibility = weatherData.visibility;
    const description = weatherData.description.toLowerCase();

    let recommendations = [];
    
    // Overall condition assessment
    if (rating >= 8) {
      recommendations.push('🌊 Excellent conditions for all water sports!');
      
      // Specific activity recommendations
      if (windSpeed >= 15 && windSpeed <= 25) {
        recommendations.push('🏄‍♀️ Perfect kitesurfing conditions - ideal wind speed');
      } else if (windSpeed >= 10 && windSpeed < 15) {
        recommendations.push('🏄‍♀️ Good kitesurfing for beginners - lighter winds');
      } else if (windSpeed > 25) {
        recommendations.push('🏄‍♀️ Strong winds - experienced kitesurfers only');
      }
      
      if (temp >= 22 && temp <= 30) {
        recommendations.push('🏊‍♂️ Perfect temperature for swimming and snorkeling');
      } else if (temp >= 18 && temp < 22) {
        recommendations.push('🏊‍♂️ Good for swimming with wetsuit recommended');
      }
      
      if (windSpeed >= 12 && windSpeed <= 20) {
        recommendations.push('🏄‍♂️ Great conditions for wing foiling');
      }
      
    } else if (rating >= 6) {
      recommendations.push('🌤️ Good conditions with some caution needed');
      
      if (windSpeed > 25) {
        recommendations.push('⚠️ High winds - experienced riders only, check equipment');
      } else if (windSpeed < 10) {
        recommendations.push('🌬️ Low wind - consider paddleboarding or kayaking instead');
      }
      
      if (temp < 18) {
        recommendations.push('🧥 Cool weather - wear proper wetsuit and layers');
      }
      
      if (humidity > 80) {
        recommendations.push('💧 High humidity - stay hydrated and take breaks');
      }
      
    } else if (rating >= 4) {
      recommendations.push('🌫️ Moderate conditions - check with instructors first');
      
      if (windSpeed < 8) {
        recommendations.push('🚣‍♀️ Very low wind - try paddleboarding or kayaking');
      } else if (windSpeed > 30) {
        recommendations.push('💨 Dangerous winds - avoid water sports today');
      }
      
      if (temp < 15) {
        recommendations.push('❄️ Cold conditions - full wetsuit required');
      }
      
      if (visibility < 5) {
        recommendations.push('🌫️ Poor visibility - stay close to shore');
      }
      
      if (description.includes('rain') || description.includes('storm')) {
        recommendations.push('⛈️ Rainy conditions - postpone water activities');
      }
      
    } else {
      recommendations.push('🚫 Challenging conditions - consider indoor alternatives');
      
      if (temp < 10) {
        recommendations.push('🥶 Too cold for water sports - try indoor training');
      }
      
      if (windSpeed > 35) {
        recommendations.push('💨 Dangerous wind conditions - avoid all water activities');
      }
      
      if (description.includes('storm') || description.includes('thunder')) {
        recommendations.push('⛈️ Storm conditions - water activities not recommended');
      }
      
      if (visibility < 2) {
        recommendations.push('🌫️ Very poor visibility - safety risk');
      }
      
      recommendations.push('🏋️‍♀️ Consider indoor fitness or theory sessions instead');
    }

    // Add general safety tips
    recommendations.push('🦺 Always wear proper safety gear and life jacket');
    recommendations.push('📱 Check with instructors about current conditions');
    
    // Time-based recommendations
    const hour = new Date().getHours();
    if (hour >= 6 && hour <= 10) {
      recommendations.push('🌅 Morning sessions often have calmer winds');
    } else if (hour >= 14 && hour <= 18) {
      recommendations.push('🌞 Afternoon sessions typically have stronger winds');
    }

    return recommendations;
  }

  // Get comprehensive water sports recommendations based on real weather data
  getComprehensiveRecommendations(weatherData) {
    const rating = weatherData.waterSportsRating;
    const windSpeed = weatherData.windSpeed;
    const temp = weatherData.temperature;
    const humidity = weatherData.humidity;
    const visibility = weatherData.visibility;
    const description = weatherData.description.toLowerCase();

    let recommendations = {
      overall: '',
      activities: [],
      safety: [],
      equipment: [],
      alternatives: [],
      services: []
    };
    
    // Overall condition assessment
    if (rating >= 8) {
      recommendations.overall = '🌊 Excellent conditions for all water sports!';
      
      // Specific activity recommendations
      if (windSpeed >= 15 && windSpeed <= 25) {
        recommendations.activities.push({
          activity: 'Kitesurfing',
          level: 'All Levels',
          recommendation: 'Perfect conditions - ideal wind speed for learning and progression',
          icon: '🏄‍♀️',
          confidence: 'High',
          duration: '2-3 hours'
        });
      } else if (windSpeed >= 10 && windSpeed < 15) {
        recommendations.activities.push({
          activity: 'Kitesurfing',
          level: 'Beginner',
          recommendation: 'Great for beginners - lighter winds perfect for learning',
          icon: '🏄‍♀️',
          confidence: 'High',
          duration: '2-3 hours'
        });
      } else if (windSpeed > 25) {
        recommendations.activities.push({
          activity: 'Kitesurfing',
          level: 'Advanced',
          recommendation: 'Strong winds - experienced riders only',
          icon: '🏄‍♀️',
          confidence: 'Medium',
          duration: '1-2 hours'
        });
      }
      
      if (windSpeed >= 12 && windSpeed <= 20) {
        recommendations.activities.push({
          activity: 'Wing Foiling',
          level: 'All Levels',
          recommendation: 'Excellent wing foiling conditions',
          icon: '🏄‍♂️',
          confidence: 'High',
          duration: '2-3 hours'
        });
      }
      
      if (windSpeed >= 8 && windSpeed <= 15) {
        recommendations.activities.push({
          activity: 'Hydrofoil Training',
          level: 'Intermediate+',
          recommendation: 'Good conditions for hydrofoil progression',
          icon: '🏄‍♂️',
          confidence: 'High',
          duration: '2 hours'
        });
      }
      
      if (temp >= 22 && temp <= 30) {
        recommendations.activities.push({
          activity: 'Swimming & Water Safety',
          level: 'All Levels',
          recommendation: 'Perfect temperature for water confidence training',
          icon: '🏊‍♂️',
          confidence: 'High',
          duration: '1-2 hours'
        });
      }
      
      // Service recommendations
      recommendations.services.push({
        name: 'Kitesurfing Training',
        price: '$149.99',
        duration: '2 hours',
        description: 'Perfect conditions for comprehensive kitesurfing instruction',
        suitability: 'Excellent'
      });
      
      if (windSpeed >= 12 && windSpeed <= 20) {
        recommendations.services.push({
          name: 'Wing Foil Training',
          price: '$129.99',
          duration: '2 hours',
          description: 'Ideal wind conditions for wing foiling progression',
          suitability: 'Excellent'
        });
      }
      
      // Safety recommendations
      recommendations.safety.push('✅ All safety protocols standard');
      recommendations.safety.push('✅ Buddy system recommended');
      
      // Equipment recommendations
      if (temp >= 20) {
        recommendations.equipment.push('👕 Shorty wetsuit or rash guard');
      } else {
        recommendations.equipment.push('🧥 Full wetsuit recommended');
      }
      
    } else if (rating >= 6) {
      recommendations.overall = '🌤️ Good conditions with some caution needed';
      
      if (windSpeed > 25) {
        recommendations.activities.push({
          activity: 'Kitesurfing',
          level: 'Advanced Only',
          recommendation: 'High winds - experienced riders only, check equipment thoroughly',
          icon: '🏄‍♀️',
          confidence: 'Medium',
          duration: '1 hour'
        });
        recommendations.safety.push('⚠️ Extra safety briefing required');
        recommendations.safety.push('⚠️ Check all equipment connections');
      } else if (windSpeed < 10) {
        recommendations.activities.push({
          activity: 'Paddleboarding',
          level: 'All Levels',
          recommendation: 'Low wind - perfect for paddleboarding and balance training',
          icon: '🚣‍♀️',
          confidence: 'High',
          duration: '1-2 hours'
        });
        recommendations.alternatives.push('🏄‍♂️ Try wing foiling with larger wing');
        recommendations.alternatives.push('🏊‍♂️ Focus on swimming technique');
      }
      
      // Service recommendations
      recommendations.services.push({
        name: 'Private Coaching',
        price: '$199.99',
        duration: '1 hour',
        description: 'Personalized instruction for challenging conditions',
        suitability: 'Good'
      });
      
      if (windSpeed < 10) {
        recommendations.services.push({
          name: 'Equipment Rental',
          price: '$79.99',
          duration: 'Full day',
          description: 'Try paddleboarding or kayaking in calm conditions',
          suitability: 'Excellent'
        });
      }
      
      if (temp < 18) {
        recommendations.equipment.push('🧥 Full wetsuit mandatory');
        recommendations.equipment.push('🧤 Neoprene gloves recommended');
        recommendations.safety.push('❄️ Monitor for hypothermia signs');
      }
      
      if (humidity > 80) {
        recommendations.safety.push('💧 Stay hydrated - take frequent breaks');
        recommendations.safety.push('☀️ Use sun protection despite clouds');
      }
      
    } else if (rating >= 4) {
      recommendations.overall = '🌫️ Moderate conditions - instructor guidance essential';
      
      if (windSpeed < 8) {
        recommendations.activities.push({
          activity: 'Land Training',
          level: 'All Levels',
          recommendation: 'Very low wind - perfect for kite setup and land training',
          icon: '🏃‍♂️',
          confidence: 'High',
          duration: '1-2 hours'
        });
        recommendations.alternatives.push('🏄‍♂️ Equipment maintenance session');
        recommendations.alternatives.push('📚 Theory and safety review');
      } else if (windSpeed > 30) {
        recommendations.overall = '💨 Dangerous winds - water activities not recommended';
        recommendations.alternatives.push('🏠 Indoor training session');
        recommendations.alternatives.push('📖 Equipment care workshop');
        recommendations.safety.push('🚫 Avoid all water activities');
      }
      
      // Service recommendations
      recommendations.services.push({
        name: 'Indoor Training',
        price: '$99.99',
        duration: '1 hour',
        description: 'Movement performance training in controlled environment',
        suitability: 'Good'
      });
      
      if (temp < 15) {
        recommendations.equipment.push('🧥 Full wetsuit with hood');
        recommendations.equipment.push('🧤 Neoprene gloves and boots');
        recommendations.safety.push('❄️ Cold water safety protocols');
      }
      
      if (visibility < 5) {
        recommendations.safety.push('🌫️ Stay close to shore');
        recommendations.safety.push('📡 Use communication devices');
      }
      
      if (description.includes('rain') || description.includes('storm')) {
        recommendations.alternatives.push('🏠 Indoor movement training');
        recommendations.alternatives.push('💪 Strength and conditioning');
        recommendations.safety.push('⛈️ Postpone water activities');
      }
      
    } else {
      recommendations.overall = '🚫 Challenging conditions - indoor alternatives recommended';
      
      if (temp < 10) {
        recommendations.alternatives.push('🏠 Indoor training facility');
        recommendations.alternatives.push('💪 Strength and conditioning');
        recommendations.alternatives.push('🧘‍♀️ Flexibility and mobility work');
        recommendations.safety.push('🥶 Too cold for water sports');
      }
      
      if (windSpeed > 35) {
        recommendations.alternatives.push('🏠 Indoor kite simulator training');
        recommendations.alternatives.push('📚 Advanced theory and meteorology');
        recommendations.safety.push('💨 Dangerous wind conditions');
      }
      
      if (description.includes('storm') || description.includes('thunder')) {
        recommendations.alternatives.push('🏠 Indoor movement performance training');
        recommendations.alternatives.push('🎯 Goal setting and planning session');
        recommendations.safety.push('⛈️ Storm conditions - avoid water');
      }
      
      // Service recommendations
      recommendations.services.push({
        name: 'Indoor Training',
        price: '$99.99',
        duration: '1 hour',
        description: 'Movement performance training in controlled environment',
        suitability: 'Excellent'
      });
    }

    // Add general recommendations based on conditions
    if (rating >= 6) {
      recommendations.safety.push('📱 Check weather updates regularly');
      recommendations.safety.push('👥 Inform someone of your plans');
    }

    return recommendations;
  }

  // Get specific training recommendations for MPT services
  getTrainingRecommendations(weatherData) {
    const recommendations = this.getComprehensiveRecommendations(weatherData);
    const rating = weatherData.waterSportsRating;

    let trainingRecommendations = {
      recommendedServices: recommendations.services,
      sessionTypes: [],
      duration: '',
      groupSize: '',
      instructorLevel: '',
      bestTimes: []
    };

    // Session type recommendations
    if (rating >= 8) {
      trainingRecommendations.sessionTypes.push('Group Classes (up to 6 students)');
      trainingRecommendations.sessionTypes.push('Private Coaching');
      trainingRecommendations.duration = '2-3 hours recommended';
      trainingRecommendations.groupSize = 'Optimal for group learning';
      trainingRecommendations.instructorLevel = 'Any certified instructor';
      trainingRecommendations.bestTimes.push('Morning (6-10 AM) - Calmer winds');
      trainingRecommendations.bestTimes.push('Afternoon (2-6 PM) - Stronger winds');
      
    } else if (rating >= 6) {
      trainingRecommendations.sessionTypes.push('Private Sessions Only');
      trainingRecommendations.sessionTypes.push('Equipment Training');
      trainingRecommendations.duration = '1-2 hours maximum';
      trainingRecommendations.groupSize = 'Small groups (2-3 students)';
      trainingRecommendations.instructorLevel = 'Senior instructor recommended';
      trainingRecommendations.bestTimes.push('Morning sessions preferred');
      
    } else {
      trainingRecommendations.sessionTypes.push('Indoor Sessions');
      trainingRecommendations.sessionTypes.push('Theory and Planning');
      trainingRecommendations.duration = '1 hour sessions';
      trainingRecommendations.groupSize = 'Small groups (4-6 students)';
      trainingRecommendations.instructorLevel = 'Any certified instructor';
      trainingRecommendations.bestTimes.push('Any time - Indoor conditions');
    }

    return trainingRecommendations;
  }
}

const weatherService = new WeatherService();
export default weatherService;
