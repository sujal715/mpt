#!/bin/bash

echo "🧪 Testing MPT Application Locally..."
echo "====================================="

# Test Backend
echo ""
echo "📱 Testing Backend..."
cd backend

if [ ! -f "pom.xml" ]; then
    echo "❌ Backend pom.xml not found!"
    exit 1
fi

echo "✅ Backend structure looks good!"

# Test Frontend
echo ""
echo "🌐 Testing Frontend..."
cd ../frontend

if [ ! -f "package.json" ]; then
    echo "❌ Frontend package.json not found!"
    exit 1
fi

if [ ! -d "src" ]; then
    echo "❌ Frontend src directory not found!"
    exit 1
fi

echo "✅ Frontend structure looks good!"

# Test builds
echo ""
echo "🔨 Testing builds..."

echo "📦 Building backend..."
cd ../backend
./mvnw clean compile > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Backend builds successfully!"
else
    echo "❌ Backend build failed!"
    exit 1
fi

echo "🔨 Building frontend..."
cd ../frontend
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Frontend builds successfully!"
else
    echo "❌ Frontend build failed!"
    exit 1
fi

echo ""
echo "🎉 All tests passed! Your application is ready for deployment."
echo ""
echo "🚀 To deploy to Render:"
echo "   ./deploy-both.sh"
echo ""
echo "🌐 To run locally:"
echo "   # Terminal 1: cd backend && ./mvnw spring-boot:run"
echo "   # Terminal 2: cd frontend && npm start"
