# Project 2 - Deploy React Application in Docker Container

## Objective

The objective of this project is to containerize a React application using Docker and deploy it in both **development** and **production** environments.

---

## Technologies Used

* React
* Docker
* Docker Compose
* Nginx
* Node.js

---

## Tasks Performed

* Created a React application.
* Built a Docker image for the React application.
* Configured Docker Compose for container management.
* Ran the application in development mode.
* Created a production-ready Docker image.
* Deployed the production application using Nginx.

---

## Project Structure

```text
Project_2/
├── src/
├── public/
├── Dockerfile
├── Dockerfile.prod
├── docker-compose.yml
├── package.json
└── README.md
```

---

## Development Environment

The React application was configured to run inside a Docker container during development.

Docker Compose was used to simplify the process of building and running the development container.

### Build and Run

```bash
docker compose up --build
```

The React application can then be accessed through the configured local port.

To stop the containers:

```bash
docker compose down
```

---

## Production Environment

For production deployment, the React application was first built into static files and then served using **Nginx**.

The production Docker image uses Nginx as the web server to efficiently serve the compiled React application.

### Build the Production Image

```bash
docker build -f Dockerfile.prod -t react-app-prod .
```

### Run the Production Container

```bash
docker run -d -p 8080:80 --name react-production react-app-prod
```

The production application can be accessed at:

```text
http://localhost:8080
```

---

## Docker Compose

Docker Compose was used to define and manage the application container configuration.

Example command:

```bash
docker compose up --build
```

This automatically builds the required Docker image and starts the application container.

---

## Deployment Workflow

```text
React Application
       │
       ▼
   Dockerfile
       │
       ▼
 Docker Image
       │
       ├──────────────► Development
       │                 Docker Compose
       │
       ▼
 Production Build
       │
       ▼
    Nginx
       │
       ▼
   Web Browser
```

---

## Conclusion

The React application was successfully **containerized using Docker** and deployed in both development and production environments. Docker Compose was used for development, while **Nginx** was used to serve the production build efficiently.
