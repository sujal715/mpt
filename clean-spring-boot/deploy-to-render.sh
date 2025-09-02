#!/bin/bash

echo "🚀 Deploying MPT Spring Boot Backend to Render..."
echo "=================================================="

# Check if we have the necessary files
if [ ! -f "pom.xml" ]; then
    echo "❌ Error: pom.xml not found!"
    exit 1
fi

if [ ! -f "render.yaml" ]; then
    echo "❌ Error: render.yaml not found!"
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
echo "📦 JAR file: $(ls -la target/*.jar | head -1)"

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
echo "📱 Your backend will be available at: https://mpt-spring-boot-backend.onrender.com"
echo ""
echo "🎯 Next Steps:"
echo "1. Go to: https://dashboard.render.com/"
echo "2. Check deployment status"
echo "3. Test your API endpoints"
echo "4. Your Spring Boot app is now live!"
