# Project 2 — Deploy Angular Application in Docker Container

Angular CLI application containerized with Docker, with Docker Compose configurations for development and production.

## Production
docker compose up --build
Open http://localhost:8080

## Development
docker compose -f docker-compose.dev.yml up --build
Open http://localhost:4200

Stop either setup with Ctrl+C, or `docker compose down`.
