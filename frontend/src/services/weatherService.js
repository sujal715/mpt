// Weather Service for MPT Application
// This service fetches real weather data for water sports activities

import { getApiKey } from '../config/apiKeys';

class WeatherService {
  constructor() {
    // Using OpenWeatherMap API (free tier)
    // You can get a free API key from: https://openweathermap.org/api
    this.apiKey = getApiKey('OPENWEATHER') || 'DEMO_KEY'; // Use configured key or fallback
    this.baseUrl = 'https://api.openweathermap.org/data/2.5';
  }

  // Get current weather for a specific location
  async getCurrentWeather(lat = -33.8688, lon = 151.2093) { // Default: Sydney, Australia
    try {
      const response = await fetch(
        `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('Weather data unavailable');
      }
      
      const data = await response.json();
      return this.formatWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
      return this.getMockWeatherData(); // Fallback to mock data
    }
  }

  // Get weather forecast for the next few days
  async getWeatherForecast(lat = -33.8688, lon = 151.2093) {
    try {
      const response = await fetch(
        `${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('Forecast data unavailable');
      }
      
      const data = await response.json();
      return this.formatForecastData(data);
    } catch (error) {
      console.error('Error fetching forecast:', error);
      return this.getMockForecastData(); // Fallback to mock data
    }
  }

  // Format current weather data for display
  formatWeatherData(data) {
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
      location: 'Sydney Harbour', // Default location
      waterSportsRating: this.calculateWaterSportsRating(data)
    };
  }

  // Format forecast data for display
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

  // Get water sports recommendations based on weather
  getWaterSportsRecommendations(weatherData) {
    const rating = weatherData.waterSportsRating;
    const windSpeed = weatherData.windSpeed;
    const temp = weatherData.temperature;

    let recommendations = [];
    
    if (rating >= 8) {
      recommendations.push('Excellent conditions for all water sports!');
      if (windSpeed >= 15 && windSpeed <= 25) {
        recommendations.push('Perfect kitesurfing conditions');
      }
      if (temp >= 20) {
        recommendations.push('Great for swimming and snorkeling');
      }
    } else if (rating >= 6) {
      recommendations.push('Good conditions with some caution');
      if (windSpeed > 25) {
        recommendations.push('High winds - experienced riders only');
      }
    } else if (rating >= 4) {
      recommendations.push('Moderate conditions - check with instructors');
      if (windSpeed < 10) {
        recommendations.push('Low wind - may need different activities');
      }
    } else {
      recommendations.push('Challenging conditions - consider indoor alternatives');
    }

    return recommendations;
  }
}

export default new WeatherService();
