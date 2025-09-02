# 🌤️ Weather Feature Setup Guide

## **Getting Your Weather API Key**

Your MPT app now includes a **live weather feature** that shows real-time conditions for water sports! Here's how to set it up:

### **1. Get a Free API Key**
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key from the dashboard
4. The free tier includes:
   - Current weather data
   - 5-day forecast
   - 1,000 API calls per day (plenty for testing!)

### **2. Update Your Weather Service**
1. Open `src/services/weatherService.js`
2. Find this line: `this.apiKey = 'YOUR_API_KEY_HERE';`
3. Replace `'YOUR_API_KEY_HERE'` with your actual API key
4. Save the file

### **3. Test Your Weather Feature**
1. Go to the **Resources** page in your app
2. Click **"View Live Weather"**
3. See real-time weather data for Sydney Harbour!
4. Check the 5-day forecast
5. Get water sports recommendations

## **🌊 What the Weather Feature Shows**

- **Current Conditions**: Temperature, wind, humidity, pressure
- **Water Sports Rating**: 1-10 scale based on conditions
- **5-Day Forecast**: Plan your training sessions
- **Smart Recommendations**: Get advice for different activities
- **Pro Tips**: Expert guidance for water sports

## **📍 Default Location**

The app is currently set to **Sydney Harbour, Australia** (perfect for kitesurfing!). You can change this by updating the coordinates in `weatherService.js`.

## **🚀 Features**

✅ **Real-time weather data**  
✅ **Water sports suitability rating**  
✅ **5-day forecast**  
✅ **Smart recommendations**  
✅ **Professional UI with tabs**  
✅ **Mobile responsive**  
✅ **Fallback to sample data** (when API is unavailable)

## **💡 Pro Tips**

- **Best conditions**: 20-30°C, 15-25 km/h winds
- **Check early**: Winds are typically lighter in the morning
- **Monitor changes**: Weather can change quickly on the water
- **Safety first**: Always check conditions before heading out

## **🔧 Troubleshooting**

- **API key not working**: Check your key and daily limit
- **No data showing**: The app will show sample data as fallback
- **Location wrong**: Update coordinates in the service file

Your weather feature is now ready to help you plan the perfect water sports sessions! 🌊🏄‍♀️
