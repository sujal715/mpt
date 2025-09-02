#!/bin/bash

echo "🚀 Deploying to Render.com..."
echo "=============================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from your React project directory."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building production version..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🌐 Your website is ready for Render deployment!"
    echo ""
    echo "📁 Build files created in: ./build/"
    echo ""
    echo "🚀 Next Steps for Render:"
    echo "1. Go to https://render.com"
    echo "2. Sign in to your account"
    echo "3. Click 'New +' → 'Static Site'"
    echo "4. Connect your GitHub repository (private is fine)"
    echo "5. Set these settings:"
    echo "   - Build Command: npm install && npm run build"
    echo "   - Publish Directory: build"
    echo "   - Environment Variable:"
    echo "     REACT_APP_API_URL=https://mpt-spring-boot-backend.onrender.com"
    echo ""
    echo "6. Click 'Create Static Site'"
    echo ""
    echo "🔗 Your frontend will be available at:"
    echo "   https://your-site-name.onrender.com"
    echo ""
    echo "🔒 Your source code remains private!"
    echo "📊 Only built files are deployed"
    echo ""
    echo "🎯 Ready to deploy on Render!"
else
    echo "❌ Build failed! Please check for errors."
    exit 1
fi
