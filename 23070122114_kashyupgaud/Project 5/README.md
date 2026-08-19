# Project 5: Containerizing Retail Application

## Overview
This project demonstrates how to containerize a Java Spring Boot microservice (retail-app) using Docker. By creating a Dockerfile and building an image, the application can run consistently across any environment.

## Prerequisites
- Docker Engine / Docker Desktop installed and running.
- Java and Maven installed (optional, for local builds).
- Access to a terminal to execute Docker commands.

## How to Run
1. Navigate to the `retail-app` directory.
2. Build the Maven project to generate the `.jar` artifact:
   ```bash
   mvn clean package -DskipTests
   ```
3. Build the Docker image:
   ```bash
   docker build -t retail-app:latest .
   ```
4. Run the Docker container:
   ```bash
   docker run -p 8080:8080 retail-app:latest
   ```
5. Verify the application is running by visiting `http://localhost:8080`.

## Execution Flow & Screenshots

### 1. Maven Build
Building the Java artifact locally.
![Maven Build](screenshots/maven_build.png)

### 2. Docker Image Build
Building the Docker image successfully.
![Docker Build](screenshots/docker_build.png)

### 3. Running the Container
Starting the container and mapping ports.
![Docker Run](screenshots/docker_run.png)

### 4. Application Verification
Accessing the Spring Boot app in the browser or via curl.
![App Verification](screenshots/app_verification.png)
