# Project 5 — Containerizing a Spring Boot Application and Scanning Its Docker Image

## 1. Project Overview
This project demonstrates how to containerize a Spring Boot retail web application, deploy it as a Docker container, test its endpoints, inspect the Docker image, and scan the image for known vulnerabilities.

**Final configuration used for the main run:**
- **Application**: retail-app
- **Java**: 17
- **Spring Boot**: 4.1.0
- **Build tool**: Maven
- **Docker image**: retail-app:latest
- **Container**: retail-container1
- **Port mapping**: 8085:8080
- **Image scanner**: Docker Scout

### Architecture
```text
Spring Boot Application
        |
        v
     Maven Build
        |
        v
Executable JAR
        |
        v
    Dockerfile
        |
        v
Docker Image: retail-app:latest
        |
        v
Docker Container: retail-container1
        |
        v
localhost:8085
        |
        v
Docker Scout CVE Scan
```

## 2. Prerequisites
The following were used for the project:
- Java JDK 17
- Maven Wrapper included in the Spring Boot project
- Docker Desktop
- PowerShell on Windows
- A Spring Boot application exposing `/`, `/products`, and `/orders`

## 3. Spring Boot Application
The application represents a retail company's web application and exposes these endpoints:

| Endpoint | Purpose |
|----------|---------|
| `/` | Retail application home page |
| `/products` | Product catalog |
| `/orders` | Order management |

### Controller
The controller provides:
```java
@GetMapping("/")
public String home() {
    return "Retail Company Web Application is Running!";
}

@GetMapping("/products")
public String products() {
    return "Product Catalog: Laptop, Smartphone, Headphones, Smart Watch";
}

@GetMapping("/orders")
public String orders() {
    return "Order Management Service is Running!";
}
```

## 4. Run the Application Locally
The application was started using the Maven Wrapper:
```bash
.\mvnw.cmd spring-boot:run
```
**Evidence:**
![Spring Boot local run](screenshots/01-spring-boot-local.png)

## 5. Build the Spring Boot JAR
The executable JAR was generated using:
```bash
.\mvnw.cmd clean package -DskipTests
```
**Evidence:**
![Maven build](screenshots/02-maven-build-and-jar.png)

The target directory contains the executable JAR used by Docker:
`retail-app-0.0.1-SNAPSHOT.jar`

**JAR selection evidence:**
![Generated JAR files](screenshots/03-jar-files.png)

## 6. Dockerfile
The Dockerfile uses a Java 17 JRE image and copies the executable Spring Boot JAR into the container.

```dockerfile
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY target/retail-app-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
```

## 7. Build the Docker Image
The image was built with:
```bash
docker build -t retail-app:latest .
```
**Evidence:**
![Docker build](screenshots/04-docker-build.png)

## 8. Verify the Docker Image
The created images were checked with:
```bash
docker images
```
**Evidence:**
![Docker images](screenshots/05-docker-image-list.png)

## 9. Run the Docker Container
The Spring Boot application was deployed in a Docker container using:
```bash
docker run -d --name retail-container1 -p 8085:8080 retail-app:latest
```
The running container was verified with `docker ps`.
**Evidence:**
![Docker container running](screenshots/06-container-run-and-ps.png)

## 10. Test the Home Endpoint
Open `http://localhost:8085` in a browser.
**Expected response:** `Retail Company Web Application is Running!`
**Evidence:**
![Retail home page](screenshots/07-home-page.png)

## 11. Test the Products Endpoint
Open `http://localhost:8085/products` in a browser.
**Expected response:** `Product Catalog: Laptop, Smartphone, Headphones, Smart Watch`
**Evidence:**
![Products endpoint](screenshots/08-products-endpoint.png)

## 12. Test the Orders Endpoint
Open `http://localhost:8085/orders` in a browser.
**Expected response:** `Order Management Service is Running!`
**Evidence:**
![Orders endpoint](screenshots/09-orders-endpoint.png)

## 13. Check Docker Container Logs
The application logs were checked using:
```bash
docker logs retail-container1
```
**Evidence:**
![Docker logs](screenshots/10-container-logs.png)

## 14. Inspect Docker Image Layers
The image history was inspected using:
```bash
docker history retail-app:latest
```
**Evidence:**
![Docker image history](screenshots/11-docker-history.png)

## 15. Scan the Docker Image for Vulnerabilities
Docker Scout was used to scan the image:
```bash
docker scout cves local://retail-app:latest
```
**Evidence:**
![Docker Scout vulnerability scan](screenshots/12-scout-vulnerability-scan.png)

*Important note: A vulnerability finding does not mean the Docker build failed. The purpose of this step is to identify security issues in the image so that the base image or affected dependency can be updated.*

## 16. Final Result
The Spring Boot retail application was successfully:
- Built with Maven.
- Packaged as an executable JAR.
- Containerized using Docker.
- Built as the image `retail-app:latest`.
- Deployed as `retail-container1`.
- Exposed through port `8085`.
- Tested through the home, products, and orders endpoints.
- Verified through Docker logs and image history.
- Scanned using Docker Scout for known vulnerabilities.
