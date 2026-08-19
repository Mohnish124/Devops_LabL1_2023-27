# Docker Commands

## Build Docker Image

```bash
docker build -t flask-app .
```

## Run Docker Container

Initially:

```bash
docker run -p 5000:5000 flask-app
```

Since port **5000** was already in use:

```bash
docker run -p 5001:5000 flask-app
```

## Verify Running Containers

```bash
docker ps
```

## Check Port Usage

```bash
lsof -i :5000
```

## Learning Outcome

- Built a Docker image for the Flask application.
- Ran the application inside a Docker container.
- Resolved a port conflict by using port 5001 on the host.
- Verified running containers and checked port usage.