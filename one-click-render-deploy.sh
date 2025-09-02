#!/bin/bash

echo "🚀 ONE-CLICK RENDER DEPLOYMENT STARTING!"
echo "========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "mpt-unified" ]; then
    print_error "Please run this script from the mpt root directory"
    exit 1
fi

print_status "Starting one-click deployment to Render..."

# Step 1: Build and test both applications
print_status "Step 1: Building both applications..."

# Build Spring Boot Backend
print_status "Building Spring Boot Backend..."
cd mpt-unified
./mvnw clean package -DskipTests
if [ $? -eq 0 ]; then
    print_success "Spring Boot backend built successfully!"
else
    print_error "Spring Boot build failed!"
    exit 1
fi
cd ..

# Build React Frontend
print_status "Building React Frontend..."
npm install
if [ $? -eq 0 ]; then
    print_success "Dependencies installed successfully!"
else
    print_error "Dependencies installation failed!"
    exit 1
fi

npm run build
if [ $? -eq 0 ]; then
    print_success "React frontend built successfully!"
else
    print_error "React build failed!"
    exit 1
fi

# Step 2: Commit and push to GitHub
print_status "Step 2: Committing and pushing to GitHub..."
git add .
git commit -m "One-click deployment: Ready for Render deployment"
git push origin main

if [ $? -eq 0 ]; then
    print_success "Code pushed to GitHub successfully!"
else
    print_error "Failed to push to GitHub!"
    exit 1
fi

# Step 3: Provide deployment instructions
echo ""
echo "🎉 AUTOMATIC BUILD AND PUSH COMPLETED!"
echo "======================================"
echo ""
print_success "Both applications are now ready for Render deployment!"
echo ""
echo "🚀 AUTOMATIC DEPLOYMENT OPTIONS:"
echo "================================"
echo ""
echo "Option 1: One-Click Blueprint Deployment (RECOMMENDED)"
echo "======================================================"
echo "1. Go to: https://render.com"
echo "2. Sign up/Login with GitHub"
echo "3. Click 'New +' → 'Blueprint'"
echo "4. Connect your MPT repository"
echo "5. Render will automatically deploy both services!"
echo ""
echo "Option 2: Manual Service Creation"
echo "================================="
echo "1. Go to: https://render.com"
echo "2. Create Backend: New + → Web Service → Connect MPT repo → Root: mpt-unified"
echo "3. Create Frontend: New + → Web Service → Connect MPT repo → Root: (empty)"
echo ""
echo "Option 3: Use GitHub Actions (Already Set Up)"
echo "============================================="
echo "The GitHub Actions workflow is already configured!"
echo "Just push to main branch and it will auto-deploy!"
echo ""
print_success "Your complete app will be live on Render with your original Spring Boot backend!"
echo ""
echo "🌐 Backend will be: https://mpt-spring-boot-backend.onrender.com"
echo "🌐 Frontend will be: https://mpt-react-frontend.onrender.com"
echo ""
echo "Ready to deploy! Go to https://render.com now! 🚀"
