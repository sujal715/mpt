#!/bin/bash

echo "🔍 Getting Render Service IDs for MPT Auto-Deployment"
echo "====================================================="
echo ""

echo "📱 You already have services running: MPT and MPT-1"
echo ""

echo "🎯 To complete automated deployment, you need:"
echo ""

echo "1️⃣ Backend Service ID (MPT):"
echo "   - Go to: https://dashboard.render.com/"
echo "   - Click on your MPT service"
echo "   - Copy Service ID from URL (looks like: srv-abc123...)"
echo ""

echo "2️⃣ Frontend Service ID (MPT-1):"
echo "   - Click on your MPT-1 service"
echo "   - Copy Service ID from URL"
echo ""

echo "3️⃣ Render API Key:"
echo "   - Profile → Account Settings → API Keys → New API Key"
echo ""

echo "4️⃣ Add to GitHub Secrets:"
echo "   - Go to: https://github.com/sujal715/MPT"
echo "   - Settings → Secrets → Actions"
echo "   - Add: RENDER_API_KEY, RENDER_BACKEND_SERVICE_ID, RENDER_FRONTEND_SERVICE_ID"
echo ""

echo "🚀 After adding secrets:"
echo "   ✅ Every git push = automatic deployment"
echo "   ✅ Your services update automatically"
echo "   ✅ No more manual work needed!"
echo ""

echo "🔗 Quick Links:"
echo "   📱 Render Dashboard: https://dashboard.render.com/"
echo "   🌐 GitHub Secrets: https://github.com/sujal715/MPT/settings/secrets/actions"
echo ""

echo "💡 Pro Tip: Service IDs are in the URL when you click on a service!"
echo "   Example: https://dashboard.render.com/web/srv-abc123def456"
echo "   Service ID: srv-abc123def456"
echo ""

echo "🎉 Ready to complete the setup?"
echo "   Press Enter to open Render dashboard..."
read -p ""

open "https://dashboard.render.com/"
sleep 2
open "https://github.com/sujal715/MPT/settings/secrets/actions"

echo ""
echo "🎯 Both tabs opened!"
echo "===================="
echo "1. Render Dashboard - Get Service IDs"
echo "2. GitHub Secrets - Add the secrets"
echo ""
echo "⏱️  Estimated time: 3 minutes"
echo "🎉 After that: FULLY AUTOMATIC!"
