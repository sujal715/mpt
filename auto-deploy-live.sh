#!/bin/bash

echo "🚀 Auto-Deploy to Live Site - MPT Frontend"
echo "==========================================="

# Check if we're in the right directory
if [ ! -d ".git" ]; then
    echo "❌ Not a git repository. Please run this from your project root."
    exit 1
fi

# Check git status
echo "📊 Checking git status..."
git status

# Add all changes
echo "📁 Adding all changes..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Auto-deploy: Fixed production config and deployment settings"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🎯 Next steps:"
    echo "1. Go to: https://dashboard.render.com"
    echo "2. Find your 'mpt-frontend' service"
    echo "3. Click 'Manual Deploy' → 'Deploy latest commit'"
    echo "4. Wait for deployment to complete"
    echo ""
    echo "🌐 Your live site will be updated at:"
    echo "   https://mpt-frontend-z8cf.onrender.com/about"
    echo ""
    echo "💡 The deployment will use your updated config files automatically!"
else
    echo "❌ Failed to push to GitHub"
    exit 1
fi
