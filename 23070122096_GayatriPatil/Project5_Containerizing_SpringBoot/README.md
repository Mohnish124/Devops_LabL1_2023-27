# Project 5: Containerizing Spring Boot Application and Docker Image Scanning

## Objective
To containerize a Spring Boot retail application using Docker and perform security scanning of the Docker image.

## Technologies Used
- Java 21
- Spring Boot 4.1.0
- Maven
- Docker
- Docker Scout

## Docker Image
`retail-app:1.0`

## Docker Container
`retail-container`

## Port
`8080`

## Security Scan
Docker Scout was used to scan the Docker image.

### Scan Result
- Critical: 0
- High: 0
- Medium: 1
- Low: 0

### Vulnerability
- CVE: CVE-2026-59889
- Package: jackson-databind 3.1.4
- Severity: Medium
- Fixed Version: 3.1.5
