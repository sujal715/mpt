#!/bin/bash

echo "🚀 MPT Quick Start - Bypassing Maven Issues"
echo "============================================="

# Check if we have a pre-built JAR
if [ -f "target/mpt-0.0.1-SNAPSHOT.jar" ]; then
    echo "✅ Found pre-built JAR, starting directly..."
    java -jar target/mpt-0.0.1-SNAPSHOT.jar
else
    echo "❌ No pre-built JAR found"
    echo "🔧 Let's build it quickly with Maven..."
    
    # Try a quick Maven compile (not run)
    echo "📦 Compiling with Maven..."
    ./mvnw compile -q
    
    if [ $? -eq 0 ]; then
        echo "✅ Compile successful! Now packaging..."
        ./mvnw package -q -DskipTests
        
        if [ $? -eq 0 ]; then
            echo "✅ Package successful! Starting JAR..."
            java -jar target/mpt-0.0.1-SNAPSHOT.jar
        else
            echo "❌ Package failed"
        fi
    else
        echo "❌ Compile failed - Maven has issues"
        echo "💡 Try: ./mvnw clean compile -U"
    fi
fi
