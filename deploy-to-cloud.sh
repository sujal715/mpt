#!/bin/bash

echo "🚀 Starting Private Cloud Deployment..."
echo "======================================"

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
    echo "🌐 Your website is now ready for cloud deployment!"
    echo ""
    echo "📁 Build files created in: ./build/"
    echo ""
    echo "🚀 Deployment Options:"
    echo "1. Render.com (Recommended - Free):"
    echo "   - Go to https://render.com"
    echo "   - Create account"
    echo "   - Deploy from GitHub (private repo) OR"
    echo "   - Manual deploy using build folder"
    echo ""
    echo "2. Netlify (Drag & Drop):"
    echo "   - Go to https://netlify.com"
    echo "   - Drag the 'build' folder to deploy"
    echo ""
    echo "3. Vercel (Simple):"
    echo "   - Go to https://vercel.com"
    echo "   - Import project and deploy"
    echo ""
    echo "🔒 Your source code remains private!"
    echo "📊 Only the built website files are deployed"
    echo ""
    echo "💡 To deploy manually:"
    echo "   - Upload the contents of ./build/ folder"
    echo "   - Or use the deployment scripts in your project"
    echo ""
    echo "🎯 Ready to deploy! Choose your platform above."
else
    echo "❌ Build failed! Please check for errors."
    exit 1
fi
