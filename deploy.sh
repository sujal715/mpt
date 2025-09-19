#!/bin/bash

# MPT Website Deployment Script
echo "🚀 Starting MPT Website Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "clean-spring-boot/pom.xml" ]; then
    print_error "Please run this script from the MpT project root directory"
    exit 1
fi

print_status "Found MPT project structure"

# Step 1: Build Frontend
echo "📦 Building React frontend..."
cd frontend

if [ ! -d "node_modules" ]; then
    print_warning "Installing frontend dependencies..."
    npm install
fi

npm run build
if [ $? -eq 0 ]; then
    print_status "Frontend build successful"
else
    print_error "Frontend build failed"
    exit 1
fi

# Step 2: Build Backend
echo "☕ Building Spring Boot backend..."
cd ../clean-spring-boot

# Clean and package
mvn clean package -DskipTests
if [ $? -eq 0 ]; then
    print_status "Backend build successful"
else
    print_error "Backend build failed"
    exit 1
fi

# Step 3: Check if git is initialized
cd ..
if [ ! -d ".git" ]; then
    print_warning "Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit - Ready for deployment"
fi

# Step 4: Check git status
echo "📋 Checking git status..."
git status

print_status "Build completed successfully!"
echo ""
echo "🎯 Next Steps:"
echo "1. Push to GitHub: git add . && git commit -m 'Ready for deployment' && git push origin main"
echo "2. Go to render.com and connect your GitHub repository"
echo "3. Render will auto-detect your render.yaml configuration"
echo "4. Set environment variables in Render dashboard:"
echo "   - SPRING_PROFILES_ACTIVE=render"
echo "   - JAVA_VERSION=17"
echo "   - REACT_APP_API_URL=https://your-app-name.onrender.com"
echo ""
echo "🌐 Your website will be available at: https://your-app-name.onrender.com"
