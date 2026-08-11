# Dockerizing an Angular Application using Docker Compose

## Project Title

**Project 2: Deploy Angular Application in Docker using Docker Compose (Development & Production)**

---

# Objective

The objective of this project is to deploy an Angular application using Docker and Docker Compose while understanding the difference between development and production environments. The project demonstrates containerization, multi-stage Docker builds, and deployment using Nginx.

---

# Technologies Used

- Angular CLI (v21)
- Docker
- Docker Compose
- Node.js
- Nginx
- Visual Studio Code

---

# Project Structure

```
angular-docker-demo/
│
├── Dockerfile.dev
├── Dockerfile.prod
├── docker-compose.yml
├── docker-compose.prod.yml
├── nginx.conf
├── package.json
├── src/
├── angular.json
└── README.md
```

---

# Software Requirements

- Docker Desktop
- Node.js
- Angular CLI
- Visual Studio Code

---

# Development Deployment

The development environment uses the Angular Development Server.

### Features

- Hot Reload
- Live Code Changes
- Docker Compose
- Node.js Container

### Dockerfile Used

```
Dockerfile.dev
```

### Run Command

```bash
docker compose up --build
```

Application URL

```
http://localhost:4000
```

(or 4200 depending on your configuration)

---

## Screenshot – Development Environment

---

# Production Deployment

The production environment uses a Multi-stage Docker Build.

### Stage 1

- Node.js Image
- Install Dependencies
- Angular Build

### Stage 2

- Nginx Image
- Copy Build Files
- Serve Static Website

### Dockerfile Used

```
Dockerfile.prod
```

### Run Command

```bash
docker compose -f docker-compose.prod.yml up --build
```

---

## Screenshot – Production Environment

![1785598698560](image/README/1785598698560.png)

---

# Docker Compose

Development uses

```
docker-compose.yml
```

Production uses

```
docker-compose.prod.yml
```

Docker Compose simplifies container management by defining all required services in a single YAML file.

---

# Multi-stage Docker Build

The production image uses two stages.

### Builder Stage

- Uses Node.js
- Installs Angular dependencies
- Builds the Angular application

### Runtime Stage

- Uses lightweight Nginx image
- Copies only production build files
- Reduces image size
- Improves performance

---

# Nginx Configuration

Nginx is used to serve the static Angular application.

Benefits:

- Fast
- Lightweight
- Production Ready
- Efficient Static File Serving

The `try_files` directive ensures Angular routing works correctly.

---

# Commands Used

## Development

Build and Run

```bash
docker compose up --build
```

Stop

```bash
docker compose down
```

---

## Production

Build

```bash
docker compose -f docker-compose.prod.yml build
```

Run

```bash
docker compose -f docker-compose.prod.yml up
```

Stop

```bash
docker compose -f docker-compose.prod.yml down
```

---

# Learning Outcomes

After completing this project, the following concepts were understood:

- Angular Application Deployment
- Docker Image Creation
- Docker Containers
- Docker Compose
- Multi-stage Docker Builds
- Development vs Production Deployment
- Nginx Configuration
- Containerized Application Deployment

---

# Conclusion

This project successfully demonstrates the deployment of an Angular application using Docker and Docker Compose. The development environment enables rapid development through the Angular development server, while the production environment uses a multi-stage Docker build and Nginx to create a lightweight, optimized, and production-ready deployment.

---


# References

- Docker Documentation
- Angular Documentation
- Docker Compose Documentation
- Nginx Documentation
