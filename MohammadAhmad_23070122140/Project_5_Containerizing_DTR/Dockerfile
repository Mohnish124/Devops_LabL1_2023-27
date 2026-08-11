# Production Dockerfile for Containerized Retail Application
FROM eclipse-temurin:17-jre-alpine

# Set working directory inside container
WORKDIR /app

# Copy compiled Spring Boot executable JAR artifact
COPY target/retailapp-1.0.0.jar app.jar

# Expose Spring Boot web server application port
EXPOSE 8080

# Configure container startup execution command
ENTRYPOINT ["java", "-jar", "app.jar"]
