#!/bin/bash

echo "🚀 Setting up GitHub Actions Deployment for MPT..."
echo "=================================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo ""
    echo "🔗 Please add your GitHub repository as remote origin:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/MpT.git"
    echo ""
    echo "📝 Replace YOUR_USERNAME with your actual GitHub username"
    echo ""
else
    echo "✅ Remote origin already configured"
    echo "   Current remote: $(git remote get-url origin)"
fi

# Check if files are committed
if [ -z "$(git status --porcelain)" ]; then
    echo "✅ All files are committed"
else
    echo ""
    echo "📝 Please commit your changes:"
    echo "   git add ."
    echo "   git commit -m 'Initial commit - MPT full stack app'"
    echo ""
fi

echo ""
echo "🎯 Next Steps:"
echo "==============="
echo "1. 📚 Read: AUTOMATED_DEPLOYMENT_GUIDE.md"
echo "2. 🔑 Get your Render API key from dashboard"
echo "3. 🏗️ Create services on Render (one time setup)"
echo "4. 🔐 Add secrets to GitHub repository"
echo "5. 🚀 Push to GitHub to trigger deployment!"
echo ""
echo "📖 For detailed instructions, see: AUTOMATED_DEPLOYMENT_GUIDE.md"
echo ""
echo "🎉 Your MPT app will be automatically deployed after setup!"
