#!/bin/bash

echo "🚀 MPT Frontend Deployment to Render - Fixed Version"
echo "===================================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ No package.json found. Please run this from the project root."
    exit 1
fi

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf build/
rm -rf node_modules/

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Set production environment
export NODE_ENV=production

# Build the app
echo "🔨 Building React app for production..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎯 Next steps:"
    echo "1. Go to https://dashboard.render.com"
    echo "2. Create a new 'Static Site' service"
    echo "3. Connect your GitHub repository"
    echo "4. Set build command: npm install && npm run build"
    echo "5. Set publish directory: build"
    echo "6. Add environment variable: REACT_APP_API_URL=https://your-backend-url.onrender.com"
    echo ""
    echo "📁 Your build files are ready in the 'build' directory"
    echo "🌐 You can also manually upload the 'build' folder to Render"
else
    echo "❌ Build failed!"
    exit 1
fi
