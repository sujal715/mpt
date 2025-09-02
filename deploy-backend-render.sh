#!/bin/bash

echo "🚀 Deploying MPT Spring Boot Backend to Render!"
echo "=================================================="

# Check if we're in the right directory
if [ ! -f "pom.xml" ]; then
    echo "❌ Error: pom.xml not found. Please run this script from the mpt-unified directory."
    exit 1
fi

echo "📦 Building Spring Boot application..."
./mvnw clean package -DskipTests

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🚀 Your Spring Boot backend is ready for Render deployment!"
    echo ""
    echo "🌐 To deploy to Render:"
    echo "1. Go to: https://render.com"
    echo "2. Sign up/Login with GitHub"
    echo "3. Click 'New +' → 'Web Service'"
    echo "4. Connect your GitHub repository"
    echo "5. Select this 'mpt-unified' repository"
    echo "6. Render will auto-detect it's a Java app"
    echo "7. Click 'Create Web Service'"
    echo ""
    echo "✅ Render will automatically:"
    echo "   - Install Java 17"
    echo "   - Build your app (./mvnw clean package)"
    echo "   - Start your app (java -jar target/mpt-0.0.1-SNAPSHOT.jar)"
    echo "   - Give you a live URL!"
    echo ""
    echo "🎯 Your backend will be available at:"
    echo "   - Main API: https://your-app-name.onrender.com/api"
    echo "   - Health Check: https://your-app-name.onrender.com/api/health"
    echo "   - H2 Console: https://your-app-name.onrender.com/h2-console"
    echo ""
    echo "🚀 Ready to deploy! Go to https://render.com now!"
    
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi
