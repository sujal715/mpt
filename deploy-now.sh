#!/bin/bash

echo "🚀 Instant Deploy to Render - No Waiting!"
echo "=========================================="

# Clean previous builds
echo "🧹 Cleaning up..."
rm -rf build/

# Build the project
echo "🔨 Building React app..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful! 🎉"
    echo ""
    echo "🎯 NOW DEPLOY TO RENDER:"
    echo "1. Go to: https://dashboard.render.com"
    echo "2. Find your 'mpt-frontend' service"
    echo "3. Click 'Manual Deploy' → 'Deploy latest commit'"
    echo ""
    echo "📁 Your build files are ready in the 'build' directory"
    echo "🌐 Your live site will update at: https://mpt-frontend-z8cf.onrender.com"
    echo ""
    echo "💡 The render.yaml is now fixed - deployment should work!"
    echo ""
    echo "🚀 Go deploy now - it'll take 2 minutes!"
else
    echo "❌ Build failed. Check your React setup."
fi
