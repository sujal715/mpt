#!/bin/bash

echo "🚀 Setting up Automatic Deployment for MPT..."
echo "=============================================="

echo ""
echo "📋 To enable automatic deployment, you need to complete these steps:"
echo ""

echo "🔑 Step 1: Get Render API Key"
echo "   - Go to: https://dashboard.render.com/"
echo "   - Click your profile → Account Settings"
echo "   - Go to API Keys tab"
echo "   - Click 'New API Key'"
echo "   - Copy the API key"
echo ""

echo "🏗️ Step 2: Create Backend Service on Render"
echo "   - New + → Web Service"
echo "   - Connect GitHub repo: sujal715/MPT"
echo "   - Name: mpt-backend"
echo "   - Environment: Java"
echo "   - Build Command: ./mvnw clean package -DskipTests"
echo "   - Start Command: java -jar target/mpt-0.0.1-SNAPSHOT.jar"
echo "   - Create service and copy Service ID from URL"
echo ""

echo "🌐 Step 3: Create Frontend Service on Render"
echo "   - New + → Static Site"
echo "   - Connect same GitHub repo"
echo "   - Name: mpt-frontend"
echo "   - Build Command: cd frontend && npm install && npm run build"
echo "   - Publish Directory: frontend/build"
echo "   - Create service and copy Service ID from URL"
echo ""

echo "🔐 Step 4: Add GitHub Secrets"
echo "   - Go to: https://github.com/sujal715/MPT"
echo "   - Settings → Secrets and variables → Actions"
echo "   - Add these secrets:"
echo "     * RENDER_API_KEY → Your API key from Step 1"
echo "     * RENDER_BACKEND_SERVICE_ID → Backend service ID from Step 2"
echo "     * RENDER_FRONTEND_SERVICE_ID → Frontend service ID from Step 3"
echo ""

echo "🎯 After completing these steps:"
echo "   ✅ Every push to GitHub will automatically deploy your app"
echo "   ✅ Backend: https://mpt-backend.onrender.com"
echo "   ✅ Frontend: https://mpt-frontend.onrender.com"
echo ""

echo "📚 For detailed instructions, see: AUTOMATED_DEPLOYMENT_GUIDE.md"
echo ""

echo "🚀 Ready to set up? Let's go!"
echo "   Press Enter to open Render dashboard..."
read -p ""

# Open Render dashboard
open "https://dashboard.render.com/"

echo ""
echo "🎉 Setup complete! Your MPT app will deploy automatically!"
echo "   Check progress at: https://github.com/sujal715/MPT/actions"
