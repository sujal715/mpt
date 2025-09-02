#!/bin/bash

echo "🚀 Deploying Complete MPT Spring Boot Backend to Railway!"
echo "=========================================================="

# Check if we're in the right directory
if [ ! -f "pom.xml" ]; then
    echo "❌ Error: pom.xml not found. Please run this script from the mpt-unified directory."
    exit 1
fi

echo "📦 Building complete Spring Boot application..."
./mvnw clean package -DskipTests

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🚂 Deploying to Railway..."
    echo "This will deploy your COMPLETE backend with:"
    echo "  ✅ All JPA Entities (Booking, Package, Service, Testimonial)"
    echo "  ✅ Complete Database Schema"
    echo "  ✅ All API Endpoints"
    echo "  ✅ Business Logic Services"
    echo "  ✅ Sample Data"
    echo ""
    
    # Deploy to Railway
    railway up
    
    echo ""
    echo "🎉 Your complete Spring Boot backend is now deployed to Railway!"
    echo "🌐 Access your app at: https://your-railway-url.up.railway.app"
    echo "🗄️  Database console: https://your-railway-url.up.railway.app/h2-console"
    echo "🔌 API base: https://your-railway-url.up.railway.app/api"
    
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi
