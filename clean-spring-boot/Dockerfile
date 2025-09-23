# Use OpenJDK 17 with Maven as base image
FROM maven:3.8.6-openjdk-17

# Set working directory
WORKDIR /app

# Copy pom.xml first for better caching
COPY pom.xml .

# Download dependencies (this layer will be cached if pom.xml doesn't change)
RUN mvn dependency:go-offline -B

# Copy source code
COPY src src

# Copy Maven wrapper files
COPY mvnw .
COPY .mvn .mvn

# Make Maven wrapper executable
RUN chmod +x ./mvnw

# Build the application
RUN ./mvnw clean package -DskipTests

# Expose port (Render will override this with $PORT)
EXPOSE 8080

# Run the application
CMD ["java", "-Xmx512m", "-jar", "target/mpt-0.0.1-SNAPSHOT.jar", "--server.port=${PORT}", "--spring.profiles.active=render"]
