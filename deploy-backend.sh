#!/bin/bash

echo "🚀 Deploying MPT Backend to Render..."

# Navigate to backend directory
cd backend

# Check if we have the necessary files
if [ ! -f "pom.xml" ]; then
    echo "❌ Error: pom.xml not found in backend directory"
    exit 1
fi

if [ ! -f "render.yaml" ]; then
    echo "❌ Error: render.yaml not found in backend directory"
    exit 1
fi

# Build the project
echo "📦 Building Spring Boot application..."
./mvnw clean package -DskipTests

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"

# Check if render CLI is installed
if ! command -v render &> /dev/null; then
    echo "📥 Installing Render CLI..."
    curl -s https://render.com/download-cli/install.sh | bash
    export PATH="$HOME/.local/bin:$PATH"
fi

# Deploy to Render
echo "🌐 Deploying to Render..."
render deploy

echo "✅ Backend deployment initiated!"
echo "🔗 Check your Render dashboard for deployment status"
echo "📱 Your backend will be available at: https://mpt-backend.onrender.com"
