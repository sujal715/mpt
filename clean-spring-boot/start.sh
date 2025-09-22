#!/bin/bash

# Render.com startup script
echo "Starting MPT Spring Boot Application..."

# Set Java options for production
export JAVA_OPTS="-Xmx512m -Xms256m"

# Start the application with the render profile
java $JAVA_OPTS -jar target/mpt-0.0.1-SNAPSHOT.jar --spring.profiles.active=render

echo "Application started successfully!"
