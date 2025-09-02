#!/bin/bash

echo "🔍 MPT Build Issue Diagnosis"
echo "============================"
echo ""

echo "📱 Backend Diagnosis:"
echo "====================="
cd backend

echo "1️⃣ Maven Wrapper Check:"
if [ -f "./mvnw" ]; then
    echo "   ✅ mvnw exists"
    echo "   📁 Permissions: $(ls -la mvnw)"
    echo "   📦 Size: $(du -h mvnw)"
else
    echo "   ❌ mvnw missing!"
fi

echo ""

echo "2️⃣ .mvn Directory Check:"
if [ -d ".mvn" ]; then
    echo "   ✅ .mvn directory exists"
    echo "   📁 Contents: $(ls -la .mvn/)"
    if [ -f ".mvn/wrapper/maven-wrapper.properties" ]; then
        echo "   ✅ maven-wrapper.properties exists"
        echo "   📋 Content: $(cat .mvn/wrapper/maven-wrapper.properties)"
    else
        echo "   ❌ maven-wrapper.properties missing!"
    fi
else
    echo "   ❌ .mvn directory missing!"
fi

echo ""

echo "3️⃣ pom.xml Check:"
if [ -f "pom.xml" ]; then
    echo "   ✅ pom.xml exists"
    echo "   📦 Size: $(du -h pom.xml)"
    echo "   🔍 Java version: $(grep -o '<java.version>[^<]*</java.version>' pom.xml || echo 'Not specified')"
else
    echo "   ❌ pom.xml missing!"
fi

echo ""

echo "4️⃣ Source Files Check:"
if [ -d "src/main/java" ]; then
    echo "   ✅ src/main/java exists"
    echo "   📁 Java files: $(find src/main/java -name '*.java' | wc -l) files"
    echo "   📁 Main class: $(find src/main/java -name '*Application.java' | head -1)"
else
    echo "   ❌ src/main/java missing!"
fi

echo ""

echo "5️⃣ Local Build Test:"
echo "   🔨 Testing Maven build..."
if timeout 60 ./mvnw clean package -DskipTests > build-test.log 2>&1; then
    echo "   ✅ Local build successful!"
    echo "   📦 JAR file: $(ls -la target/*.jar 2>/dev/null | head -1)"
    echo "   📊 JAR size: $(du -h target/*.jar 2>/dev/null | head -1)"
else
    echo "   ❌ Local build failed!"
    echo "   📋 Last 10 lines of build log:"
    tail -10 build-test.log
fi

cd ..

echo ""
echo "🌐 Frontend Diagnosis:"
echo "====================="
cd frontend

echo "1️⃣ Package.json Check:"
if [ -f "package.json" ]; then
    echo "   ✅ package.json exists"
    echo "   📦 Size: $(du -h package.json)"
    echo "   🔍 Scripts: $(grep -o '"scripts": {[^}]*}' package.json | head -1)"
else
    echo "   ❌ package.json missing!"
fi

echo ""

echo "2️⃣ Dependencies Check:"
if [ -d "node_modules" ]; then
    echo "   ✅ node_modules exists"
    echo "   📁 Size: $(du -sh node_modules/)"
else
    echo "   ❌ node_modules missing!"
fi

echo ""

echo "3️⃣ Source Files Check:"
if [ -d "src" ]; then
    echo "   ✅ src directory exists"
    echo "   📁 Files: $(find src -type f | wc -l) files"
    echo "   📁 Main files: $(ls src/index.js src/App.js 2>/dev/null | wc -l) main files"
else
    echo "   ❌ src directory missing!"
fi

echo ""

echo "4️⃣ Local Build Test:"
echo "   🔨 Testing npm build..."
if timeout 60 npm run build > build-test.log 2>&1; then
    echo "   ✅ Local build successful!"
    echo "   📁 Build directory: $(ls -la build/ 2>/dev/null | head -1)"
    echo "   📊 Build size: $(du -sh build/ 2>/dev/null | head -1)"
else
    echo "   ❌ Local build failed!"
    echo "   📋 Last 10 lines of build log:"
    tail -10 build-test.log
fi

cd ..

echo ""
echo "🎯 Summary:"
echo "==========="
echo "• Backend: Check Maven wrapper and source files"
echo "• Frontend: Check package.json and source files"
echo "• Both should build locally before deploying"
echo "• Check GitHub Actions logs for specific errors"
echo ""
echo "🚀 Next Steps:"
echo "=============="
echo "1. Fix any issues found above"
echo "2. Test builds locally"
echo "3. Check GitHub Actions workflow"
echo "4. Monitor Render deployment logs"
