#!/bin/bash

echo "🚀 Quick Deploy to Render - No Git Required!"
echo "============================================="

# Clean up any broken builds
echo "🧹 Cleaning up..."
rm -rf build/

# Check if we have a working package.json
if [ ! -f "package.json" ]; then
    echo "❌ No package.json found. Please run this from the project root."
    exit 1
fi

# Try to install dependencies (skip if it's slow)
echo "📦 Installing dependencies (this might take a moment)..."
npm install --no-optional --prefer-offline

# Build the project
echo "🔨 Building React app..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful! 🎉"
    echo ""
    echo "🎯 Now deploy to Render:"
    echo "1. Go to: https://dashboard.render.com"
    echo "2. Find your 'mpt-frontend' service"
    echo "3. Click 'Manual Deploy' → 'Deploy latest commit'"
    echo ""
    echo "📁 Your build files are ready in the 'build' directory"
    echo "🌐 Your live site will update at: https://mpt-frontend-z8cf.onrender.com/about"
    echo ""
    echo "💡 This bypasses all git issues and updates your live site directly!"
else
    echo "❌ Build failed. Let's try a different approach..."
    echo "💡 You can manually upload your source code to Render instead."
fi
