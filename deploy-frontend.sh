#!/bin/bash

echo "🚀 Deploying MPT Frontend to Render..."

# Navigate to frontend directory
cd frontend

# Check if we have the necessary files
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found in frontend directory"
    exit 1
fi

if [ ! -f "render.yaml" ]; then
    echo "❌ Error: render.yaml not found in frontend directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Dependencies installation failed!"
    exit 1
fi

# Build the project
echo "🔨 Building React application..."
npm run build

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

echo "✅ Frontend deployment initiated!"
echo "🔗 Check your Render dashboard for deployment status"
echo "📱 Your frontend will be available at: https://mpt-frontend.onrender.com"
