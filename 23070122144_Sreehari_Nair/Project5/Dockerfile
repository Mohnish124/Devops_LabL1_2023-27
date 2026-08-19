# Stage 1: Build stage using Maven and OpenJDK 17
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /build

# Copy pom.xml and source files
COPY app/pom.xml .
COPY app/src ./src

# Package the application into an executable JAR
RUN mvn clean package -DskipTests

# Stage 2: Production runtime image
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Create non-root user for security best practices
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy compiled JAR from build stage
COPY --from=build /build/target/*.jar app.jar

# Set ownership to non-root user
RUN chown -R appuser:appgroup /app
USER appuser

# Expose application port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api/health || exit 1

# Start the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
