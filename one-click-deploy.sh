#!/bin/bash

echo "🚀 ONE-CLICK MPT AUTO-DEPLOYMENT SETUP"
echo "======================================="
echo ""

# Check if we have all the necessary files
echo "🔍 Checking project setup..."
if [ ! -f "backend/pom.xml" ]; then
    echo "❌ Backend not found!"
    exit 1
fi

if [ ! -f "frontend/package.json" ]; then
    echo "❌ Frontend not found!"
    exit 1
fi

if [ ! -f ".github/workflows/deploy.yml" ]; then
    echo "❌ GitHub Actions workflow not found!"
    exit 1
fi

echo "✅ Project structure is perfect!"
echo ""

# Check if we're connected to GitHub
echo "🔗 Checking GitHub connection..."
if git remote get-url origin > /dev/null 2>&1; then
    echo "✅ Connected to GitHub: $(git remote get-url origin)"
else
    echo "❌ Not connected to GitHub!"
    exit 1
fi

echo ""
echo "🎯 AUTOMATED DEPLOYMENT READY!"
echo "=============================="
echo ""

echo "📋 What I've Already Done For You:"
echo "   ✅ Organized your Spring Boot backend (all Java files)"
echo "   ✅ Cleaned up your React frontend"
echo "   ✅ Created GitHub Actions workflow"
echo "   ✅ Pushed everything to GitHub"
echo "   ✅ Created deployment scripts"
echo ""

echo "🚀 What Happens Next (Automatic):"
echo "   1. You create 2 services on Render (5 minutes)"
echo "   2. You add 3 secrets to GitHub (2 minutes)"
echo "   3. EVERYTHING ELSE IS AUTOMATIC!"
echo ""

echo "⚡ SUPER QUICK SETUP (7 minutes total):"
echo ""

echo "🔑 STEP 1: Get Render API Key (2 min)"
echo "   - Open: https://dashboard.render.com/"
echo "   - Profile → Account Settings → API Keys → New API Key"
echo "   - Copy the key"
echo ""

echo "🏗️ STEP 2: Create Backend Service (3 min)"
echo "   - New + → Web Service"
echo "   - Connect: sujal715/MPT"
echo "   - Name: mpt-backend"
echo "   - Environment: Java"
echo "   - Build: ./mvnw clean package -DskipTests"
echo "   - Start: java -jar target/mpt-0.0.1-SNAPSHOT.jar"
echo "   - Create and copy Service ID from URL"
echo ""

echo "🌐 STEP 3: Create Frontend Service (2 min)"
echo "   - New + → Static Site"
echo "   - Connect: sujal715/MPT"
echo "   - Name: mpt-frontend"
echo "   - Build: cd frontend && npm install && npm run build"
echo "   - Publish: frontend/build"
echo "   - Create and copy Service ID from URL"
echo ""

echo "🔐 STEP 4: Add GitHub Secrets (1 min)"
echo "   - Go to: https://github.com/sujal715/MPT"
echo "   - Settings → Secrets → Actions"
echo "   - Add: RENDER_API_KEY, RENDER_BACKEND_SERVICE_ID, RENDER_FRONTEND_SERVICE_ID"
echo ""

echo "🎉 AFTER SETUP (FULLY AUTOMATIC):"
echo "   ✅ Every git push = automatic deployment"
echo "   ✅ Backend: https://mpt-backend.onrender.com"
echo "   ✅ Frontend: https://mpt-frontend.onrender.com"
echo "   ✅ No more manual work needed!"
echo ""

echo "🚀 READY TO START?"
echo "   Press Enter to open Render dashboard..."
read -p ""

# Open all necessary tabs
echo "🌐 Opening all necessary tabs..."
open "https://dashboard.render.com/"
sleep 2
open "https://github.com/sujal715/MPT/settings/secrets/actions"
sleep 2
open "https://github.com/sujal715/MPT/actions"

echo ""
echo "🎯 ALL TABS OPENED!"
echo "===================="
echo "1. Render Dashboard - Create services"
echo "2. GitHub Secrets - Add API keys"
echo "3. GitHub Actions - Monitor deployment"
echo ""
echo "⏱️  Estimated time: 7 minutes"
echo "🎉 After that: FULLY AUTOMATIC!"
echo ""
echo "💡 Pro Tip: Keep this terminal open for reference!"
echo "   Run this script again anytime: ./one-click-deploy.sh"
