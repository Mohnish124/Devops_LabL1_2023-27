# Project 5 – Containerizing Application and Scanning Docker Image with DTR

**Course:** DevOps Lab (TE7950)  
**Project:** 5

## Objective

Deploy a Spring Boot application on Docker for a retail company with multiple web applications, then demonstrate image scanning using a Docker Trusted Registry (DTR)-style workflow.

The course syllabus describes Project 5 as containerizing an application and scanning its Docker image with DTR, using a Spring Boot application for a retail company with multiple web applications.

## Included

- Spring Boot REST application
- Maven build
- Multi-stage Dockerfile
- Docker Compose
- Registry-ready image tagging
- DTR/registry scanning workflow documentation
- Health endpoint
- Product API
- Security-conscious container configuration
- Journal write-up
- Viva questions

## Run Locally

```bash
mvn clean package
docker build -t retail-web-app:1.0.0 .
docker run --rm -p 8080:8080 retail-web-app:1.0.0
```

Open:

```text
http://localhost:8080/api/health
http://localhost:8080/api/products
```

## Docker Compose

```bash
docker compose up --build
```

## Image Scan Workflow

Build:

```bash
docker build -t retail-web-app:1.0.0 .
```

Tag for your registry/DTR:

```bash
docker tag retail-web-app:1.0.0 <REGISTRY_HOST>/retail/retail-web-app:1.0.0
```

Authenticate:

```bash
docker login <REGISTRY_HOST>
```

Push:

```bash
docker push <REGISTRY_HOST>/retail/retail-web-app:1.0.0
```

After the image is pushed, open your DTR/registry UI and run or review the image vulnerability/security scan.

> The exact DTR commands and UI depend on the Docker Trusted Registry version and your institution's registry configuration. This project therefore uses placeholders rather than inventing a registry hostname or credentials.

## Multiple Web Applications

For a retail company with multiple web applications, use the same image pattern with separate repositories/tags, for example:

```text
retail/catalog-web
retail/order-web
retail/customer-web
```

This project provides the `catalog-web` style application as the demonstrator.

## Security Notes

- Do not put registry passwords in source code.
- Do not commit `.env` files containing secrets.
- Use a private registry for proprietary images.
- Scan images before deployment.
- Rebuild images regularly to receive updated base-image/security patches.
