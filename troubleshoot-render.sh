#!/bin/bash

echo "🔍 MPT Render Deployment Troubleshooting"
echo "========================================"
echo ""

echo "📱 Current Status Check:"
echo "========================"

# Check if backend builds locally
echo "1️⃣ Testing Backend Build..."
cd backend
if ./mvnw clean package -DskipTests > /dev/null 2>&1; then
    echo "   ✅ Backend builds successfully locally"
    echo "   📦 JAR file: $(ls -la target/*.jar 2>/dev/null | head -1)"
else
    echo "   ❌ Backend build failed locally"
fi
cd ..

echo ""

# Check if frontend builds locally
echo "2️⃣ Testing Frontend Build..."
cd frontend
if npm run build > /dev/null 2>&1; then
    echo "   ✅ Frontend builds successfully locally"
    echo "   📁 Build directory: $(ls -la build/ 2>/dev/null | head -1)"
else
    echo "   ❌ Frontend build failed locally"
fi
cd ..

echo ""

echo "🌐 Render Service Status:"
echo "========================"
echo "   Backend (MPT): https://mpt.onrender.com"
echo "   Frontend (MPT-1): https://mpt-1.onrender.com"
echo ""

echo "🔧 Common Render Issues & Solutions:"
echo "===================================="
echo ""

echo "❌ Build Command Failed:"
echo "   - Check Maven wrapper permissions"
echo "   - Verify Java version (should be 17)"
echo "   - Check for missing dependencies"
echo ""

echo "❌ Start Command Failed:"
echo "   - Verify JAR file exists in target/"
echo "   - Check start command: java -jar target/mpt-0.0.1-SNAPSHOT.jar"
echo "   - Verify environment variables"
echo ""

echo "❌ Health Check Failed:"
echo "   - Check if /api/health endpoint exists"
echo "   - Verify service is actually running"
echo "   - Check application logs"
echo ""

echo "🚀 Next Steps:"
echo "=============="
echo "1. Check GitHub Actions: https://github.com/sujal715/MPT/actions"
echo "2. Check Render Dashboard: https://dashboard.render.com/"
echo "3. Review Render service logs for specific errors"
echo "4. Verify service configuration matches render.yaml"
echo ""

echo "💡 Quick Fixes:"
echo "==============="
echo "• Restart Render services"
echo "• Check service environment variables"
echo "• Verify build and start commands"
echo "• Check for port conflicts"
echo ""

echo "📞 Need Help?"
echo "============="
echo "• Render Docs: https://render.com/docs"
echo "• GitHub Actions: Check workflow logs"
echo "• Service Logs: Check Render dashboard"
