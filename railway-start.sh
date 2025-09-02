#!/bin/bash

echo "🚀 Starting MPT Complete Spring Boot Application on Railway..."

# Set Java options for Railway
export JAVA_OPTS="-Xmx512m -Xms256m -Dserver.port=$PORT"

# Start the Spring Boot application with all your backend features
echo "Starting with Java options: $JAVA_OPTS"
echo "Port: $PORT"
echo "Profile: $SPRING_PROFILES_ACTIVE"

java $JAVA_OPTS -jar target/mpt-0.0.1-SNAPSHOT.jar
