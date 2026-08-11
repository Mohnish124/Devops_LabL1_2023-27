cat > README.md <<'EOF'

# Project 5 - Containerizing application and scanning its Docker image with DTR

## Objective

Deploy a Spring Boot retail web application inside a Docker container and scan the Docker image for security vulnerabilities. The project demonstrates Maven-based application packaging, Docker image creation, container execution, Docker Scout vulnerability scanning, and Docker Hub registry operations.

## Application

The application is a Spring Boot based retail web application.

The application provides a simple retail store interface with multiple web application categories:

- Electronics
- Clothing
- Groceries
- Home Appliances

## Technologies Used

- Java
- Spring Boot
- Maven
- Docker
- Docker Scout
- Docker Hub
- HTML/CSS
- Git and GitHub

## Project Structure

```text
Project 5/
│
├── README.md
│
├── Screenshots/
│   ├── Docker images.jpeg
│   ├── Docker Hub pull.jpeg
│   ├── Docker Hub push.jpeg
│   ├── Docker Hub repository.jpeg
│   ├── Docker Hub tag 1.1.jpeg
│   ├── Docker Scout vulnerability scan.jpeg
│   ├── Docker containers.jpeg
│   ├── Docker image build.jpeg
│   ├── Dockerfile.jpeg
│   ├── Maven - pom.xml.jpeg
│   └── Retail Store application.jpeg
│
└── Source Code/
    ├── Dockerfile
    ├── HELP.md
    ├── mvnw
    ├── mvnw.cmd
    ├── pom.xml
    └── src/
        ├── main/
        │   ├── java/com/retail/app/
        │   │   ├── RetailAppApplication.java
        │   │   └── RetailController.java
        │   └── resources/
        │       └── application.properties
        └── test/
            └── java/com/retail/app/
                └── RetailAppApplicationTests.java
```
