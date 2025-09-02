#!/bin/bash

echo "🚂 Railway All-in-One Deployment Script"
echo "======================================"

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

# Build React frontend
echo "🔨 Building React frontend..."
npm run build

# Check if build was successful
if [ ! -d "build" ]; then
    echo "❌ React build failed!"
    exit 1
fi

echo "✅ React frontend built successfully"

# Copy React build to Spring Boot resources
echo "📁 Copying React build to Spring Boot..."
if [ -d "../mpt-backend/src/main/resources/static" ]; then
    rm -rf ../mpt-backend/src/main/resources/static/*
    cp -r build/* ../mpt-backend/src/main/resources/static/
    echo "✅ React build copied to Spring Boot resources"
else
    echo "⚠️  Spring Boot resources directory not found, creating..."
    mkdir -p ../mpt-backend/src/main/resources/static
    cp -r build/* ../mpt-backend/src/main/resources/static/
    echo "✅ React build copied to Spring Boot resources"
fi

# Navigate to Spring Boot directory
cd ../mpt-backend

# Create Railway-specific application properties
echo "⚙️  Creating Railway configuration..."
cat > src/main/resources/application-railway.properties << EOF
# Railway-specific configuration
server.port=\${PORT:8080}
spring.profiles.active=railway

# CORS configuration for Railway
spring.web.cors.allowed-origins=*
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*

# Logging
logging.level.com.mpt.mpt=DEBUG
logging.level.org.springframework.web=DEBUG
EOF

echo "✅ Railway configuration created"

# Deploy to Railway
echo "🚀 Deploying to Railway..."
railway up

echo "🎉 Deployment complete!"
echo "Your Spring Boot + React app is now running on Railway!"
echo "No more port conflicts - everything runs on one domain!"
