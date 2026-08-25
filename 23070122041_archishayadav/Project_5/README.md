# Project 5: Containerizing and Scanning a Spring Boot Application

This project demonstrates the development of a **Spring Boot web application**, containerization using **Docker**, vulnerability scanning using **Docker Scout**, and version control using **Git and GitHub**.

---

## Phase 1: Repository Setup and Branching

### 1. Clone the Repository

```bash
git clone https://github.com/adroitathena2/Devops-Lab-L1_2023-27.git
```

### 2. Navigate to the Repository

```bash
cd Devops-Lab-L1_2023-27
```

### 3. Create and Switch to a Dedicated Assignment Branch

```bash
git checkout -b project-submissions
```

### 4. Create the Main Submission Directory

```bash
mkdir ArchishaYadav_23070122041
cd ArchishaYadav_23070122041
```

### 5. Create the Project Directory

```bash
mkdir Project_5
cd Project_5
```

---

## Phase 2: Application Development

### 1. Generate Spring Boot Files

The Spring Boot project was generated using [Spring Initializr](https://start.spring.io/) with the following configuration:

* **Project:** Maven
* **Language:** Java
* **Java Version:** 17
* **Dependency:** Spring Web

The generated project was extracted into the `Project_5` directory.

### 2. Create the Main Application Class

The main application class is located at:

```text
src/main/java/com/retail/retail_app/RetailAppApplication.java
```

```java
package com.retail.retail_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class RetailAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(RetailAppApplication.class, args);
    }

    @GetMapping("/")
    public String home() {
        return "Welcome to the Retail Company Web Application!";
    }
}
```

### 3. Build the Application

The application was compiled and packaged using Maven:

```bash
mvnw clean install
```

This generated the executable `.jar` file inside the `target` directory.

---

## Phase 3: Docker Containerization

### 1. Create the Dockerfile

A file named exactly `Dockerfile` was created in the root of the `Project_5` directory.

```dockerfile
FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

COPY target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
```

> **Note:** `eclipse-temurin:17-jdk-jammy` was used instead of `openjdk:17-jdk-slim` because the latter has been deprecated.

### 2. Build the Docker Image

```bash
docker build -t retail-app:v1 .
```

**Screenshot 1:** Successful Docker image build.

![Screenshot 1 - Docker Build](screenshot1.png)

---

## Phase 4: Application Deployment and Verification

### 1. Run the Docker Container

```bash
docker run -d -p 8080:8080 --name retail-web retail-app:v1
```

The application was started inside a Docker container and mapped to port `8080`.

### 2. Verify the Application

The application was accessed through:

```text
http://localhost:8080
```

The following message was displayed:

> Welcome to the Retail Company Web Application!

**Screenshot 2:** Successfully running Spring Boot web application.

![Screenshot 2 - Running Web Application](screenshot2.png)

### 3. Stop the Container

After verification, the container was stopped:

```bash
docker stop retail-web
```

---

## Phase 5: Image Vulnerability Scanning

To fulfill the Docker image vulnerability scanning requirement without using a dedicated enterprise registry, **Docker Scout** was used.

### 1. Authenticate with Docker Hub

```bash
docker login
```

### 2. Scan the Docker Image

```bash
docker scout cves retail-app:v1
```

Docker Scout was used to identify known Common Vulnerabilities and Exposures (CVEs) associated with the Docker image and its dependencies.

**Screenshot 3:** Docker Scout CVE scan results.

![Screenshot 3 - Docker Scout CVE Scan](screenshot3.png)

---

## Phase 6: Documentation and Version Control

### 1. Navigate to the Main Submission Directory

```bash
cd ..
```

### 2. Create the README.md File

A `README.md` file was created containing:

* Project information
* Implementation phases
* Commands used during execution
* Docker configuration
* Application verification steps
* Vulnerability scanning details
* Execution screenshots

### 3. Stage the Changes

```bash
git add .
```

### 4. Commit the Changes

```bash
git commit -m "Complete Project 5 and add README"
```

### 5. Push the Branch to GitHub

```bash
git push origin project-submissions
```

### 6. Finalize on GitHub

The three execution screenshots were uploaded and embedded into the `README.md` file using the GitHub web editor.

Finally, a **Pull Request** was opened from the `project-submissions` branch.

---

## Project Summary

| Phase   | Description                             |
| ------- | --------------------------------------- |
| Phase 1 | Repository setup and branching          |
| Phase 2 | Spring Boot application development     |
| Phase 3 | Docker containerization                 |
| Phase 4 | Application deployment and verification |
| Phase 5 | Docker Scout vulnerability scanning     |
| Phase 6 | Documentation and GitHub submission     |

### Technologies Used

* **Java 17**
* **Spring Boot**
* **Maven**
* **Docker**
* **Docker Scout**
* **Git**
* **GitHub**
