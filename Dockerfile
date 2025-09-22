# Use OpenJDK 17 as base image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Set Maven options
ENV MAVEN_OPTS="-Xmx1024m"

# Copy the clean-spring-boot directory
COPY clean-spring-boot/ .

# Make mvnw executable
RUN chmod +x ./mvnw

# Build the application
RUN ./mvnw clean package -DskipTests

# Expose port
EXPOSE 8081

# Run the application
CMD ["java", "-jar", "target/mpt-0.0.1-SNAPSHOT.jar", "--server.port=${PORT:-8081}"]