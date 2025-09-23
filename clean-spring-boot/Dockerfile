# Use OpenJDK 17 as base image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom.xml first for better caching
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Copy source code
COPY src src

# Make Maven wrapper executable
RUN chmod +x ./mvnw

# Build the application
RUN ./mvnw clean package -DskipTests

# Expose port (Render will override this with $PORT)
EXPOSE 8080

# Run the application
CMD ["java", "-Xmx512m", "-jar", "target/mpt-0.0.1-SNAPSHOT.jar", "--server.port=${PORT}", "--spring.profiles.active=render"]
