#!/bin/bash

echo "⚡ Quick Setup for MPT Auto-Deployment"
echo "======================================"

echo ""
echo "🎯 Current Status:"
echo "   ✅ Code pushed to GitHub"
echo "   ✅ GitHub Actions workflow created"
echo "   ✅ Ready for Render setup"
echo ""

echo "🔗 Quick Links:"
echo "   📱 Render Dashboard: https://dashboard.render.com/"
echo "   🌐 GitHub Repo: https://github.com/sujal715/MPT"
echo "   📊 GitHub Actions: https://github.com/sujal715/MPT/actions"
echo ""

echo "📋 What You Need to Do (5 minutes):"
echo ""

echo "1️⃣ Get Render API Key:"
echo "   - Dashboard → Profile → Account Settings → API Keys → New API Key"
echo ""

echo "2️⃣ Create Backend Service:"
echo "   - New + → Web Service → Connect GitHub → sujal715/MPT"
echo "   - Name: mpt-backend"
echo "   - Environment: Java"
echo "   - Build: ./mvnw clean package -DskipTests"
echo "   - Start: java -jar target/mpt-0.0.1-SNAPSHOT.jar"
echo ""

echo "3️⃣ Create Frontend Service:"
echo "   - New + → Static Site → Connect GitHub → sujal715/MPT"
echo "   - Name: mpt-frontend"
echo "   - Build: cd frontend && npm install && npm run build"
echo "   - Publish: frontend/build"
echo ""

echo "4️⃣ Add GitHub Secrets:"
echo "   - Repo → Settings → Secrets → Actions"
echo "   - Add: RENDER_API_KEY, RENDER_BACKEND_SERVICE_ID, RENDER_FRONTEND_SERVICE_ID"
echo ""

echo "🚀 After Setup:"
echo "   - Every git push = automatic deployment"
echo "   - Backend: https://mpt-backend.onrender.com"
echo "   - Frontend: https://mpt-frontend.onrender.com"
echo ""

echo "💡 Pro Tip: Copy the Service IDs from the URLs after creating services!"
echo "   They look like: srv-abc123def456..."
echo ""

echo "🎉 Ready to go? Run: ./deploy-auto.sh for guided setup!"
