#!/bin/bash

echo "🔐 Adding GitHub Secrets for MPT Auto-Deployment"
echo "================================================="
echo ""

echo "✅ You have your Service IDs:"
echo "   Backend (MPT): srv-d2n7kmf5r7bs73f77q70"
echo "   Frontend (MPT-1): srv-d2n83l75r7bs73f7pue0"
echo ""

echo "🎯 Now you need to add these 3 secrets to GitHub:"
echo ""

echo "1️⃣ RENDER_API_KEY"
echo "   - Go to: https://dashboard.render.com/"
echo "   - Profile → Account Settings → API Keys → New API Key"
echo "   - Copy the API key"
echo ""

echo "2️⃣ RENDER_BACKEND_SERVICE_ID"
echo "   Value: srv-d2n7kmf5r7bs73f77q70"
echo ""

echo "3️⃣ RENDER_FRONTEND_SERVICE_ID"
echo "   Value: srv-d2n83l75r7bs73f7pue0"
echo ""

echo "🔗 Add Secrets Here:"
echo "   https://github.com/sujal715/MPT/settings/secrets/actions"
echo ""

echo "📋 Copy-Paste Instructions:"
echo "   - Click 'New repository secret'"
echo "   - Add each secret one by one"
echo "   - Use the exact names and values above"
echo ""

echo "🚀 After Adding Secrets:"
echo "   ✅ Every git push = automatic deployment"
echo "   ✅ Your services update automatically"
echo "   ✅ Backend: https://mpt.onrender.com"
echo "   ✅ Frontend: https://mpt-1.onrender.com"
echo ""

echo "🎉 Ready to add the secrets?"
echo "   Press Enter to open GitHub secrets page..."
read -p ""

open "https://github.com/sujal715/MPT/settings/secrets/actions"

echo ""
echo "🎯 GitHub Secrets page opened!"
echo "=============================="
echo "Add these 3 secrets:"
echo "1. RENDER_API_KEY → Your API key"
echo "2. RENDER_BACKEND_SERVICE_ID → srv-d2n7kmf5r7bs73f77q70"
echo "3. RENDER_FRONTEND_SERVICE_ID → srv-d2n83l75r7bs73f7pue0"
echo ""
echo "⏱️  Estimated time: 2 minutes"
echo "🎉 After that: FULLY AUTOMATIC!"
echo ""
echo "💡 Pro Tip: Copy-paste the service IDs exactly as shown!"
