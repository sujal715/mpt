package com.mpt.mpt.controller;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = {"http://localhost:8081", "http://localhost:3000", "http://localhost:3001", "https://ppt-app-y42f.onrender.com"})
public class WeatherController {

    @Value("${weather.api.key}")
    private String weatherApiKey;
    
    @Value("${weather.api.url}")
    private String weatherApiUrl;
    
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;
    
    public WeatherController() {
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
        this.objectMapper = new ObjectMapper();
    }

    @GetMapping("/current")
    public Map<String, Object> getCurrentWeather(@RequestParam(required = false) Double lat, 
                                                @RequestParam(required = false) Double lon) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Default to Sydney coordinates if not provided
            if (lat == null) lat = -33.8688;
            if (lon == null) lon = 151.2093;
            
            // Check if we have a valid API key
            if ("demo".equals(weatherApiKey) || weatherApiKey == null || weatherApiKey.trim().isEmpty()) {
                // Return mock data if no API key is configured
                Map<String, Object> weatherData = getMockWeatherData(lat, lon);
                response.put("success", true);
                response.put("data", weatherData);
                response.put("message", "Using demo data - configure WEATHER_API_KEY for real weather data");
            } else {
                // Fetch real weather data from OpenWeatherMap
                Map<String, Object> weatherData = fetchRealWeatherData(lat, lon);
                response.put("success", true);
                response.put("data", weatherData);
            }
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching weather: " + e.getMessage());
            // Fallback to mock data on error
            try {
                Map<String, Object> weatherData = getMockWeatherData(lat != null ? lat : -33.8688, lon != null ? lon : 151.2093);
                response.put("success", true);
                response.put("data", weatherData);
                response.put("message", "Using fallback data due to API error");
            } catch (Exception fallbackError) {
                response.put("success", false);
                response.put("message", "Error fetching weather: " + e.getMessage());
            }
        }
        
        return response;
    }

    @GetMapping("/forecast")
    public Map<String, Object> getWeatherForecast(@RequestParam(required = false) Double lat, 
                                                 @RequestParam(required = false) Double lon) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Default to Sydney coordinates if not provided
            if (lat == null) lat = -33.8688;
            if (lon == null) lon = 151.2093;
            
            // Check if we have a valid API key
            if ("demo".equals(weatherApiKey) || weatherApiKey == null || weatherApiKey.trim().isEmpty()) {
                // Return mock forecast data if no API key is configured
                Map<String, Object> forecastData = getMockForecastData(lat, lon);
                response.put("success", true);
                response.put("data", forecastData);
                response.put("message", "Using demo data - configure WEATHER_API_KEY for real weather data");
            } else {
                // Fetch real forecast data from OpenWeatherMap
                Map<String, Object> forecastData = fetchRealForecastData(lat, lon);
                response.put("success", true);
                response.put("data", forecastData);
            }
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching forecast: " + e.getMessage());
            // Fallback to mock data on error
            try {
                Map<String, Object> forecastData = getMockForecastData(lat != null ? lat : -33.8688, lon != null ? lon : 151.2093);
                response.put("success", true);
                response.put("data", forecastData);
                response.put("message", "Using fallback data due to API error");
            } catch (Exception fallbackError) {
                response.put("success", false);
                response.put("message", "Error fetching forecast: " + e.getMessage());
            }
        }
        
        return response;
    }

    @GetMapping("/hourly")
    public Map<String, Object> getHourlyForecast(@RequestParam(required = false) Double lat, 
                                                @RequestParam(required = false) Double lon,
                                                @RequestParam(defaultValue = "24") Integer hours) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Default to Sydney coordinates if not provided
            if (lat == null) lat = -33.8688;
            if (lon == null) lon = 151.2093;
            
            // Limit hours to reasonable range (1-96 hours)
            hours = Math.max(1, Math.min(96, hours));
            
            // Check if we have a valid API key
            if ("demo".equals(weatherApiKey) || weatherApiKey == null || weatherApiKey.trim().isEmpty()) {
                // Return mock hourly data if no API key is configured
                Map<String, Object> hourlyData = getMockHourlyData(lat, lon, hours);
                response.put("success", true);
                response.put("data", hourlyData);
                response.put("message", "Using demo data - configure WEATHER_API_KEY for real weather data");
            } else {
                // Fetch real hourly forecast data from OpenWeatherMap
                Map<String, Object> hourlyData = fetchRealHourlyData(lat, lon, hours);
                response.put("success", true);
                response.put("data", hourlyData);
            }
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching hourly forecast: " + e.getMessage());
            // Fallback to mock data on error
            try {
                Map<String, Object> hourlyData = getMockHourlyData(lat != null ? lat : -33.8688, lon != null ? lon : 151.2093, hours);
                response.put("success", true);
                response.put("data", hourlyData);
                response.put("message", "Using fallback data due to API error");
            } catch (Exception fallbackError) {
                response.put("success", false);
                response.put("message", "Error fetching hourly forecast: " + e.getMessage());
            }
        }
        
        return response;
    }
    
    private Map<String, Object> getMockWeatherData(Double lat, Double lon) {
        Map<String, Object> weatherData = new HashMap<>();
        
        // Generate more realistic current weather with some randomness
        int hour = java.time.LocalTime.now().getHour();
        int baseTemp = 20 + (int)(Math.random() * 8); // 20-27°C range
        int windSpeed = 10 + (int)(Math.random() * 15); // 10-25 km/h range
        
        // Vary conditions based on time of day
        String condition;
        if (hour >= 6 && hour <= 10) {
            condition = "Clear";
        } else if (hour >= 11 && hour <= 15) {
            condition = "Partly Cloudy";
        } else if (hour >= 16 && hour <= 20) {
            condition = "Cloudy";
        } else {
            condition = "Clear";
        }
        
        weatherData.put("temperature", baseTemp);
        weatherData.put("humidity", 60 + (int)(Math.random() * 20)); // 60-80%
        weatherData.put("windSpeed", windSpeed);
        weatherData.put("condition", condition);
        weatherData.put("location", "Sydney, AU");
        weatherData.put("latitude", lat);
        weatherData.put("longitude", lon);
        weatherData.put("timestamp", java.time.LocalTime.now().toString());
        return weatherData;
    }
    
    private Map<String, Object> getMockForecastData(Double lat, Double lon) {
        Map<String, Object> forecastData = new HashMap<>();
        forecastData.put("location", "Sydney, AU");
        forecastData.put("latitude", lat);
        forecastData.put("longitude", lon);
        
        // Create more varied forecast data that's different from current weather
        Object[] forecast = new Object[]{
            createForecastDay("Today", 23, "Sunny", 18),
            createForecastDay("Tomorrow", 25, "Clear", 15),
            createForecastDay("Day 3", 21, "Partly Cloudy", 22),
            createForecastDay("Day 4", 19, "Cloudy", 12),
            createForecastDay("Day 5", 24, "Clear", 20)
        };
        
        forecastData.put("forecast", forecast);
        return forecastData;
    }
    
    private Map<String, Object> getMockHourlyData(Double lat, Double lon, Integer hours) {
        Map<String, Object> hourlyData = new HashMap<>();
        hourlyData.put("location", "Sydney, AU");
        hourlyData.put("latitude", lat);
        hourlyData.put("longitude", lon);
        hourlyData.put("hours", hours);
        
        // Generate mock hourly data
        Object[] hourlyForecasts = new Object[hours];
        for (int i = 0; i < hours; i++) {
            Map<String, Object> hourData = new HashMap<>();
            
            // Calculate time (current time + i hours)
            long currentTime = System.currentTimeMillis();
            long hourTime = currentTime + (i * 60 * 60 * 1000);
            
            hourData.put("dt", hourTime / 1000); // Unix timestamp
            hourData.put("dt_txt", new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new java.util.Date(hourTime)));
            
            // Generate realistic hourly variations
            int baseTemp = 22;
            int tempVariation = (int) (Math.sin(i * 0.3) * 3); // Temperature varies throughout the day
            hourData.put("temp", baseTemp + tempVariation);
            hourData.put("feels_like", baseTemp + tempVariation + 1);
            
            // Wind varies throughout the day
            int windVariation = (int) (Math.sin(i * 0.2) * 5);
            hourData.put("windSpeed", Math.round(15 + windVariation));
            hourData.put("windDirection", "SE");
            
            // Humidity varies slightly
            hourData.put("humidity", 60 + (int)(Math.random() * 20));
            
            // Pressure stays relatively stable
            hourData.put("pressure", 1013);
            
            // Visibility
            hourData.put("visibility", 10);
            
            // Weather conditions vary
            String[] conditions = {"Clear", "Partly Cloudy", "Cloudy", "Light Rain"};
            hourData.put("condition", conditions[i % conditions.length]);
            hourData.put("description", conditions[i % conditions.length].toLowerCase());
            
            // Weather icon
            String[] icons = {"01d", "02d", "03d", "10d"};
            hourData.put("icon", icons[i % icons.length]);
            
            // Precipitation probability
            hourData.put("pop", Math.random() * 0.3); // 0-30% chance
            
            // Cloudiness
            hourData.put("clouds", 20 + (int)(Math.random() * 60));
            
            hourlyForecasts[i] = hourData;
        }
        
        hourlyData.put("hourly", hourlyForecasts);
        return hourlyData;
    }
    
    private Map<String, Object> createForecastDay(String day, int temp, String condition, int wind) {
        Map<String, Object> dayData = new HashMap<>();
        dayData.put("day", day);
        dayData.put("temp", temp);
        dayData.put("condition", condition);
        dayData.put("wind", wind);
        return dayData;
    }
    
    private Map<String, Object> fetchRealWeatherData(Double lat, Double lon) throws IOException, InterruptedException {
        String url = String.format("%s/weather?lat=%.4f&lon=%.4f&appid=%s&units=metric", 
                                 weatherApiUrl, lat, lon, weatherApiKey);
        
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .timeout(Duration.ofSeconds(10))
                .GET()
                .build();
        
        HttpResponse<String> httpResponse = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        
        if (httpResponse.statusCode() != 200) {
            throw new RuntimeException("Weather API returned status: " + httpResponse.statusCode());
        }
        
        JsonNode jsonResponse = objectMapper.readTree(httpResponse.body());
        
        Map<String, Object> weatherData = new HashMap<>();
        weatherData.put("temperature", Math.round(jsonResponse.get("main").get("temp").asDouble()));
        weatherData.put("humidity", jsonResponse.get("main").get("humidity").asInt());
        weatherData.put("windSpeed", Math.round(jsonResponse.get("wind").get("speed").asDouble() * 3.6)); // Convert m/s to km/h
        weatherData.put("condition", jsonResponse.get("weather").get(0).get("description").asText());
        weatherData.put("location", jsonResponse.get("name").asText() + ", " + jsonResponse.get("sys").get("country").asText());
        weatherData.put("latitude", lat);
        weatherData.put("longitude", lon);
        
        return weatherData;
    }
    
    private Map<String, Object> fetchRealForecastData(Double lat, Double lon) throws IOException, InterruptedException {
        String url = String.format("%s/forecast?lat=%.4f&lon=%.4f&appid=%s&units=metric", 
                                 weatherApiUrl, lat, lon, weatherApiKey);
        
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .timeout(Duration.ofSeconds(10))
                .GET()
                .build();
        
        HttpResponse<String> httpResponse = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        
        if (httpResponse.statusCode() != 200) {
            throw new RuntimeException("Weather API returned status: " + httpResponse.statusCode());
        }
        
        JsonNode jsonResponse = objectMapper.readTree(httpResponse.body());
        
        Map<String, Object> forecastData = new HashMap<>();
        forecastData.put("location", jsonResponse.get("city").get("name").asText() + ", " + jsonResponse.get("city").get("country").asText());
        forecastData.put("latitude", lat);
        forecastData.put("longitude", lon);
        
        // Process forecast data - get daily forecasts
        JsonNode forecastList = jsonResponse.get("list");
        Map<String, Object[]> dailyForecasts = new HashMap<>();
        
        for (JsonNode forecast : forecastList) {
            String date = forecast.get("dt_txt").asText().split(" ")[0]; // Get date part
            if (!dailyForecasts.containsKey(date)) {
                dailyForecasts.put(date, new Object[0]);
            }
        }
        
        // Create simplified forecast for next 3 days
        Object[] forecastArray = new Object[3];
        String[] dayNames = {"Today", "Tomorrow", "Day 3"};
        
        String[] dates = dailyForecasts.keySet().toArray(new String[0]);
        for (int i = 0; i < 3 && i < dates.length; i++) {
            JsonNode dayForecast = forecastList.get(i * 8); // Get first forecast of each day (every 3 hours)
            
            Map<String, Object> dayData = new HashMap<>();
            dayData.put("day", dayNames[i]);
            dayData.put("temp", Math.round(dayForecast.get("main").get("temp").asDouble()));
            dayData.put("condition", dayForecast.get("weather").get(0).get("description").asText());
            dayData.put("wind", Math.round(dayForecast.get("wind").get("speed").asDouble() * 3.6));
            
            forecastArray[i] = dayData;
        }
        
        forecastData.put("forecast", forecastArray);
        
        return forecastData;
    }
    
    private Map<String, Object> fetchRealHourlyData(Double lat, Double lon, Integer hours) throws IOException, InterruptedException {
        String url = String.format("%s/forecast/hourly?lat=%.4f&lon=%.4f&appid=%s&units=metric&cnt=%d", 
                                 weatherApiUrl, lat, lon, weatherApiKey, hours);
        
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .timeout(Duration.ofSeconds(10))
                .GET()
                .build();
        
        HttpResponse<String> httpResponse = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        
        if (httpResponse.statusCode() != 200) {
            throw new RuntimeException("Weather API returned status: " + httpResponse.statusCode());
        }
        
        JsonNode jsonResponse = objectMapper.readTree(httpResponse.body());
        
        Map<String, Object> hourlyData = new HashMap<>();
        hourlyData.put("location", jsonResponse.get("city").get("name").asText() + ", " + jsonResponse.get("city").get("country").asText());
        hourlyData.put("latitude", lat);
        hourlyData.put("longitude", lon);
        hourlyData.put("hours", hours);
        
        // Process hourly forecast data
        JsonNode hourlyList = jsonResponse.get("list");
        Object[] hourlyForecasts = new Object[Math.min(hours, hourlyList.size())];
        
        for (int i = 0; i < hourlyForecasts.length; i++) {
            JsonNode hourForecast = hourlyList.get(i);
            
            Map<String, Object> hourData = new HashMap<>();
            hourData.put("dt", hourForecast.get("dt").asLong());
            hourData.put("dt_txt", hourForecast.get("dt_txt").asText());
            
            // Temperature data
            JsonNode main = hourForecast.get("main");
            hourData.put("temp", Math.round(main.get("temp").asDouble()));
            hourData.put("feels_like", Math.round(main.get("feels_like").asDouble()));
            hourData.put("humidity", main.get("humidity").asInt());
            hourData.put("pressure", main.get("pressure").asInt());
            
            // Wind data
            JsonNode wind = hourForecast.get("wind");
            hourData.put("windSpeed", Math.round(wind.get("speed").asDouble() * 3.6)); // Convert m/s to km/h
            hourData.put("windDirection", wind.has("deg") ? wind.get("deg").asInt() : 0);
            
            // Weather conditions
            JsonNode weather = hourForecast.get("weather").get(0);
            hourData.put("condition", weather.get("main").asText());
            hourData.put("description", weather.get("description").asText());
            hourData.put("icon", weather.get("icon").asText());
            
            // Clouds
            JsonNode clouds = hourForecast.get("clouds");
            hourData.put("clouds", clouds.get("all").asInt());
            
            // Visibility
            hourData.put("visibility", hourForecast.has("visibility") ? hourForecast.get("visibility").asInt() / 1000 : 10); // Convert m to km
            
            // Precipitation probability
            hourData.put("pop", hourForecast.has("pop") ? hourForecast.get("pop").asDouble() : 0.0);
            
            // Rain data if available
            if (hourForecast.has("rain")) {
                JsonNode rain = hourForecast.get("rain");
                hourData.put("rain_1h", rain.has("1h") ? rain.get("1h").asDouble() : 0.0);
            } else {
                hourData.put("rain_1h", 0.0);
            }
            
            // Snow data if available
            if (hourForecast.has("snow")) {
                JsonNode snow = hourForecast.get("snow");
                hourData.put("snow_1h", snow.has("1h") ? snow.get("1h").asDouble() : 0.0);
            } else {
                hourData.put("snow_1h", 0.0);
            }
            
            hourlyForecasts[i] = hourData;
        }
        
        hourlyData.put("hourly", hourlyForecasts);
        
        return hourlyData;
    }
}
