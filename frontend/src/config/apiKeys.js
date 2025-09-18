// API Keys Configuration for MPT Application
// Update these keys with your actual API credentials

export const API_KEYS = {
  // Google Maps API Key
  // Get your free key from: https://console.cloud.google.com/
  GOOGLE_MAPS: 'YOUR_GOOGLE_MAPS_API_KEY_HERE',
  
  // OpenWeatherMap API Key
  // Get your free key from: https://openweathermap.org/api
  // Note: This is used by the backend, not the frontend directly
  OPENWEATHER: 'demo'
};

// Helper function to check if API keys are configured
export const isApiKeyConfigured = (keyName) => {
  const key = API_KEYS[keyName];
  return key && key !== `YOUR_${keyName}_API_KEY_HERE`;
};

// Helper function to get API key with validation
export const getApiKey = (keyName) => {
  const key = API_KEYS[keyName];
  if (!key || key === `YOUR_${keyName}_API_KEY_HERE`) {
    console.warn(`API key for ${keyName} is not configured. Please update src/config/apiKeys.js`);
    return null;
  }
  return key;
};
