#!/bin/bash

# MPT Backend Startup Script
# This script ensures the backend always starts on port 8081

echo "🚀 Starting MPT Backend on port 8081..."

# Kill any existing Spring Boot processes
pkill -f "spring-boot:run" 2>/dev/null

# Wait a moment for processes to stop
sleep 2

# Start the backend
cd /Users/sujaljoshi/Desktop/MpT/clean-spring-boot
mvn spring-boot:run

echo "✅ Backend started on http://localhost:8081"
echo "📋 Test endpoints:"
echo "   - Health: http://localhost:8081/api/test"
echo "   - Bookings: http://localhost:8081/api/bookings"
echo "   - Payment: http://localhost:8081/api/payments/create-intent"
