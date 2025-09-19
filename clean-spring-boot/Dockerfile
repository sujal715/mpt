# Multi-stage build: First build frontend, then build Spring Boot
FROM node:18-alpine AS frontend-build

# Set working directory for frontend
WORKDIR /frontend

# Copy frontend package files
COPY ../frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy frontend source code
COPY ../frontend/src ./src
COPY ../frontend/public ./public

# Build frontend
RUN npm run build

# Second stage: Build Spring Boot with embedded frontend
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom.xml first (for better caching)
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Make mvnw executable
RUN chmod +x ./mvnw

# Download dependencies (this layer will be cached if pom.xml doesn't change)
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src src

# Copy built frontend files to Spring Boot static resources
COPY --from=frontend-build /frontend/build/* src/main/resources/static/

# Build the application
RUN ./mvnw clean package -DskipTests

# Expose port (Render will set PORT environment variable)
EXPOSE $PORT

# Run the application with PORT environment variable
CMD ["sh", "-c", "java -jar target/mpt-0.0.1-SNAPSHOT.jar --server.port=${PORT:-8081}"]
