# Project 2: Deploy Angular Application in Docker Container

## Objective
Deploy an Angular application using Docker and Docker Compose for both development and production environments.

## Tech Stack
- Angular CLI
- Docker
- Docker Compose
- Nginx (Production)
- Node.js

## Project Structure

```
.
├── Dockerfile
├── Dockerfile.dev
├── docker-compose.yml
├── docker-compose.prod.yml
├── .dockerignore
├── src/
├── public/
└── README.md
```

## Steps Performed

| Step | Description | Screenshot |
|------|-------------|------------|
|1|Verified Angular CLI, Node.js and npm installation.|screenshots/step_01.png|
|2|Created a new Angular project and verified Docker containers.|screenshots/step_02.png|
|3|Verified Docker project files and started development build.|screenshots/step_03.png|
|4|Verified development container and application on localhost:4200.|screenshots/step_04.png|
|5|Built production Docker image and started production container.|screenshots/step_05.png|
|6|Verified production deployment on localhost.|screenshots/step_06.png|
|7|Checked running Docker containers.|screenshots/step_07.png|
|8|Stopped and removed Docker Compose containers.|screenshots/step_08.png|
|9|Verified Docker images.|screenshots/step_09.png|
|10|Verified Docker networks.|screenshots/step_10.png|
|11|Verified Docker volumes and final project structure.|screenshots/step_11.png|

## Commands Used

```bash
ng version
ng new angular-docker-app
ng serve
ng build
docker compose up --build
docker compose down
docker ps
docker images
docker network ls
docker volume ls
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up
```

## Result

The Angular application was successfully containerized using Docker. Development and production environments were configured using Docker Compose, and the production deployment was served through Nginx. All Docker resources including containers, images, networks, and volumes were verified successfully.
