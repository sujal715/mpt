# Use Maven with OpenJDK 17 as base image
FROM maven:3.8-openjdk-17

# Set working directory
WORKDIR /app

# Copy pom.xml first for better caching
COPY pom.xml .

# Download dependencies (this layer will be cached if pom.xml doesn't change)
RUN mvn dependency:go-offline -B

# Copy source code
COPY src src

# Build the application using Maven directly (since we're in a Maven container)
RUN mvn clean package -DskipTests

# Expose port (Render will override this with $PORT)
EXPOSE 8080

# Run the application
CMD ["java", "-Xmx512m", "-jar", "target/mpt-0.0.1-SNAPSHOT.jar", "--server.port=${PORT}", "--spring.profiles.active=render"]
