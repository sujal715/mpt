#!/bin/bash

echo "🚀 Deploying to Netlify..."

# Build the project
cd frontend
npm run build

# Install Netlify CLI if not installed
if ! command -v netlify &> /dev/null; then
    echo "📦 Installing Netlify CLI..."
    npm install -g netlify-cli
fi

# Deploy to Netlify
echo "🌐 Deploying..."
netlify deploy --prod --dir=build

echo "✅ Deployment complete!"
