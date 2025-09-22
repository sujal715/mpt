# Use OpenJDK 17 as base image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Set Maven options to avoid memory issues
ENV MAVEN_OPTS="-Xmx1024m -XX:MaxPermSize=256m"

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

# Build the application with memory optimization
RUN ./mvnw clean package -DskipTests -Dmaven.test.skip=true

# Expose port (Render will set PORT environment variable)
EXPOSE 8081

# Run the application with memory optimization
CMD ["sh", "-c", "java -Xmx512m -jar target/mpt-0.0.1-SNAPSHOT.jar --server.port=${PORT:-8081} --spring.profiles.active=render"]
