# Project 5 – Retail Company Application

## Objective

To develop a Spring Boot retail application, build it using Maven, containerize it using Docker, run it as a Docker container, and perform security scanning using Docker Scout.

## Technologies Used

- Java 17
- Spring Boot
- Maven
- Docker
- Docker Scout
- Git and GitHub

## Project Structure

```text
retail-company/
├── pom.xml
├── Dockerfile
├── README.md
├── src/
├── target/
└── screenshots/

1. Spring Boot Application

A simple Spring Boot application was created with two endpoints:

/ – Displays Welcome to Retail Company!
/products – Displays Retail Company Products

Main application:

src/main/java/com/retail/company/RetailCompanyApplication.java
2. Build Using Maven

The application was packaged using Maven:

mvn clean package

The generated JAR file is:

target/retail-company-1.0.0.jar
3. Dockerfile
FROM eclipse-temurin:17-jre

WORKDIR /app

COPY target/retail-company-1.0.0.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
4. Build Docker Image

The Docker image was created using:

docker build -t aparna-retail-company:1.0 .

The image was verified using:

docker images
5. Run Docker Container

The application was started using:

docker run -d --name aparna-retail-container -p 8081:8080 aparna-retail-company:1.0

The running container was verified using:

docker ps
6. Test Application

The application was accessed at:

http://localhost:8081

Output:

Welcome to Retail Company!

Products endpoint:

http://localhost:8081/products

Output:

Retail Company Products
7. Docker Container Logs

Container logs can be checked using:

docker logs aparna-retail-container
8. Docker Scout Security Scan

Docker Scout was used to scan the Docker image for known vulnerabilities.

Quick security overview:

docker scout quickview aparna-retail-company:1.0

Detailed CVE scan:

docker scout cves aparna-retail-company:1.0

If authentication is required:

docker login

If Docker Scout reports a cache or disk-space issue:

docker scout cache prune

Docker disk usage can be checked using:

docker system df
9. Main Commands Used
Maven Build
mvn clean package
Docker Image Build
docker build -t aparna-retail-company:1.0 .
Run Container
docker run -d --name aparna-retail-container -p 8081:8080 aparna-retail-company:1.0
Check Containers
docker ps
Check Images
docker images
Docker Scout Scan
docker scout quickview aparna-retail-company:1.0
docker scout cves aparna-retail-company:1.0
10. Result

The Spring Boot retail application was successfully:

Built using Maven.
Packaged as a JAR file.
Containerized using Docker.
Run successfully inside a Docker container.
Tested through the browser.
Scanned for security vulnerabilities using Docker Scout.