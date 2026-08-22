# Stage 1: Build the application using Maven and JDK 17
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
# Copy the project files into the container
COPY pom.xml .
COPY src ./src
# Compile the code into a .jar file
RUN mvn clean package -DskipTests

# Stage 2: Create the lightweight production image
FROM eclipse-temurin:17-jre
WORKDIR /app
# Copy ONLY the compiled .jar file from Stage 1
COPY --from=build /app/target/*.jar app.jar
# Expose the standard Spring Boot port
EXPOSE 8080
# Command to start the application
ENTRYPOINT ["java", "-jar", "app.jar"]