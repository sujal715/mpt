#!/bin/bash

echo "🚀 MPT Frontend Quick Start"
echo "============================"
echo "Starting React development server..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ No package.json found. Please run this from the project root."
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies first..."
    npm install
fi

echo "✅ Starting React app on http://localhost:3000"
echo "🌐 Your app will open automatically in your browser"
echo "🔄 The server will reload when you make changes"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the React development server
npm start
