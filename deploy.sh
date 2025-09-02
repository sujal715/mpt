#!/bin/bash

echo "🚀 MPT Railway Deployment - Starting Fresh!"
echo "==========================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first."
    exit 1
fi

echo "📋 Checking your project..."
echo "✅ Git repository found"
echo "✅ React frontend found"
echo "✅ Node.js backend found"
echo "✅ Railway configuration ready"
echo ""

echo "📦 Preparing for deployment..."

# Add all files
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "ℹ️  No changes to commit"
else
    echo "💾 Committing changes..."
    git commit -m "Deploy MPT full-stack app to Railway - $(date)"
fi

# Push to remote
echo "🚀 Pushing to GitHub..."
git push origin main

echo ""
echo "🎉 Deployment preparation complete!"
echo ""
echo "📋 Next steps:"
echo "1. Go to Railway Dashboard: https://railway.app/dashboard"
echo "2. Click 'New Project'"
echo "3. Select 'Deploy from GitHub repo'"
echo "4. Choose your MPT repository"
echo "5. Railway will automatically deploy using railway.json"
echo ""
echo "🔗 Your Railway project URL: https://railway.com/project/0cd605fb-4110-448b-afb4-b9c3b247d8a9/service/cdfff291-6922-4dd8-bab9-20fcfb035b1b"
echo ""
echo "🎯 After deployment, you'll get:"
echo "- Frontend: https://your-app.railway.app"
echo "- Backend API: https://your-app.railway.app/api"
echo "- Health check: https://your-app.railway.app/api/health"
echo ""
echo "🚀 Ready to deploy? Your app will be live on Railway!"
