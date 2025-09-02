#!/bin/bash

echo "🚀 AUTOMATIC DEPLOYMENT TO RENDER STARTING!"
echo "============================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
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

print_status "Starting automatic deployment to Render..."

# Step 1: Build Spring Boot Backend
print_status "Step 1: Building Spring Boot Backend..."
cd mpt-unified

if [ ! -f "pom.xml" ]; then
    print_error "pom.xml not found in mpt-unified directory"
    exit 1
fi

print_status "Building with Maven..."
./mvnw clean package -DskipTests

if [ $? -eq 0 ]; then
    print_success "Spring Boot backend built successfully!"
else
    print_error "Spring Boot build failed!"
    exit 1
fi

cd ..

# Step 2: Build React Frontend
print_status "Step 2: Building React Frontend..."
print_status "Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    print_success "Dependencies installed successfully!"
else
    print_error "Dependencies installation failed!"
    exit 1
fi

print_status "Building React app..."
npm run build

if [ $? -eq 0 ]; then
    print_success "React frontend built successfully!"
else
    print_error "React build failed!"
    exit 1
fi

# Step 3: Commit and push to GitHub
print_status "Step 3: Committing and pushing to GitHub..."
git add .
git commit -m "Auto-deploy: Build both backend and frontend for Render deployment"
git push origin main

if [ $? -eq 0 ]; then
    print_success "Code pushed to GitHub successfully!"
else
    print_error "Failed to push to GitHub!"
    exit 1
fi

# Step 4: Provide deployment instructions
echo ""
echo "🎉 AUTOMATIC BUILD AND PUSH COMPLETED!"
echo "======================================"
echo ""
print_success "Both your Spring Boot backend and React frontend are now ready for Render!"
echo ""
echo "🚀 NEXT STEPS - Deploy to Render:"
echo "=================================="
echo ""
echo "1. Go to: https://render.com"
echo "2. Sign up/Login with GitHub"
echo "3. Deploy Backend:"
echo "   - Click 'New +' → 'Web Service'"
echo "   - Connect your MPT repository"
echo "   - Root Directory: mpt-unified"
echo "   - Environment: Java"
echo "   - Build: ./mvnw clean package -DskipTests"
echo "   - Start: java -jar target/mpt-0.0.1-SNAPSHOT.jar"
echo ""
echo "4. Deploy Frontend:"
echo "   - Click 'New +' → 'Web Service' again"
echo "   - Connect same MPT repository"
echo "   - Root Directory: (leave empty for root)"
echo "   - Environment: Node"
echo "   - Build: npm install && npm run build"
echo "   - Start: npm start"
echo ""
echo "5. Connect them:"
echo "   - Get backend URL from Render"
echo "   - Add REACT_APP_API_URL environment variable to frontend"
echo "   - Redeploy frontend"
echo ""
print_success "Your complete app will be live on Render with your original Spring Boot backend!"
echo ""
echo "🌐 Backend will be: https://your-backend-name.onrender.com"
echo "🌐 Frontend will be: https://your-frontend-name.onrender.com"
echo ""
echo "Ready to deploy! Go to https://render.com now! 🚀"
