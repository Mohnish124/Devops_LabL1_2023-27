# Project 8 – Docker Compose Multi-Container Application

## Objective

To demonstrate Docker Compose by running a multi-container application consisting of an Nginx web server and Redis service.

## Technologies Used

- Docker
- Docker Compose
- Nginx
- Redis

## 1. Docker Compose Configuration

The `docker-compose.yml` file contains:

```yaml
services:
  web:
    image: nginx:latest
    ports:
      - "8084:80"
    depends_on:
      - redis

  redis:
    image: redis:latest

2. Pull Required Images
docker pull nginx
docker pull redis:latest
3. Start the Services
docker compose up -d
4. Check Running Services
docker compose ps

Both the Nginx (web) and Redis (redis) services were successfully started.

5. Test the Web Service

The Nginx application was accessed using:

http://localhost:8084

The Nginx welcome page was displayed successfully.

6. Check Docker Networks
docker network ls

Docker Compose automatically created a network for communication between the services.

7. View Service Logs
docker compose logs
8. Stop and Remove the Compose Application
docker compose down

The containers and Compose network were successfully stopped and removed.

Main Commands
docker pull nginx
docker pull redis:latest
docker compose up -d
docker compose ps
docker network ls
docker compose logs
docker compose down
Result

The multi-container application was successfully deployed using Docker Compose. Nginx and Redis were started as separate services and managed together using Docker Compose.