#!/bin/bash

echo "🌐 Opening All Pages for GitHub Secrets Setup"
echo "============================================="
echo ""

echo "🎯 I'm opening these pages for you:"
echo ""

echo "1️⃣ GitHub Secrets Page (Main page to add secrets)"
echo "   - https://github.com/sujal715/MPT/settings/secrets/actions"
echo ""

echo "2️⃣ Render API Keys Page (Get your API key)"
echo "   - https://dashboard.render.com/account/api-keys"
echo ""

echo "3️⃣ GitHub Actions Page (Monitor deployment)"
echo "   - https://github.com/sujal715/MPT/actions"
echo ""

echo "4️⃣ Your MPT Repository (Main page)"
echo "   - https://github.com/sujal715/MPT"
echo ""

echo "🚀 Opening all pages now..."
echo ""

# Open all pages with delays
open "https://github.com/sujal715/MPT/settings/secrets/actions"
sleep 2
open "https://dashboard.render.com/account/api-keys"
sleep 2
open "https://github.com/sujal715/MPT/actions"
sleep 2
open "https://github.com/sujal715/MPT"

echo ""
echo "🎯 All Pages Opened!"
echo "===================="
echo ""

echo "📋 Quick Setup Steps:"
echo ""

echo "🔑 Step 1: Get API Key"
echo "   - Go to Render API Keys page (already open)"
echo "   - Click 'New API Key'"
echo "   - Give it a name (e.g., 'MPT Deployment')"
echo "   - Copy the key (looks like: rnd_abc123...)"
echo ""

echo "🔐 Step 2: Add GitHub Secrets"
echo "   - Go to GitHub Secrets page (already open)"
echo "   - Click 'New repository secret' for each:"
echo ""

echo "   Secret 1:"
echo "   - Name: RENDER_API_KEY"
echo "   - Value: Your API key from step 1"
echo ""

echo "   Secret 2:"
echo "   - Name: RENDER_BACKEND_SERVICE_ID"
echo "   - Value: srv-d2n7kmf5r7bs73f77q70"
echo ""

echo "   Secret 3:"
echo "   - Name: RENDER_FRONTEND_SERVICE_ID"
echo "   - Value: srv-d2n83l75r7bs73f7pue0"
echo ""

echo "🎉 After adding secrets:"
echo "   ✅ Every git push = automatic deployment"
echo "   ✅ Your MPT app updates automatically"
echo ""

echo "💡 Pro Tip: Keep this terminal open for reference!"
echo "   Run this script again anytime: ./open-all-pages.sh"
