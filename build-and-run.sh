#!/bin/bash

echo "🚀 MPT Unified Project - Build & Run Script"
echo "============================================="

# Check if we're in the right directory
if [ ! -f "pom.xml" ]; then
    echo "❌ Error: pom.xml not found. Please run this script from the mpt-unified directory."
    exit 1
fi

echo "🔨 Building React Frontend..."
if [ -d "frontend-src" ]; then
    cd frontend-src
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        echo "📦 Installing React dependencies..."
        npm install
    fi
    
    # Build React
    echo "🏗️  Building React app..."
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ React build successful!"
        
        # Copy build to Spring Boot resources
        echo "📁 Copying React build to Spring Boot..."
        cd ..
        if [ -d "src/main/resources/static" ]; then
            rm -rf src/main/resources/static/*
        else
            mkdir -p src/main/resources/static
        fi
        cp -r frontend-src/build/* src/main/resources/static/
        echo "✅ React build copied to Spring Boot resources"
    else
        echo "❌ React build failed!"
        exit 1
    fi
else
    echo "⚠️  frontend-src directory not found, skipping React build"
fi

echo ""
echo "☕ Starting Spring Boot Application..."
echo "🌐 Your app will be available at: http://localhost:8080"
echo ""

# Start Spring Boot
./mvnw spring-boot:run
