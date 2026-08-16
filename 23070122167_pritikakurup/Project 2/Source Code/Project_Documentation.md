# Project Documentation

## Project Workflow

```
React Application
        ↓
Docker Development Image
        ↓
Docker Compose
        ↓
React Container
        ↓
Production Dockerfile
        ↓
Nginx Container
        ↓
Production Deployment
```

## Final Project Structure

```
react-docker-app/
│
├── src/
├── public/
├── package.json
├── package-lock.json
├── README.md
├── Dockerfile
├── Dockerfile.prod
├── docker-compose.yml
├── docker-compose.prod.yml
└── .dockerignore
```

## Learning Outcome

- Created a React application.
- Dockerized the React application.
- Used Docker Compose for development.
- Created a production Docker image.
- Deployed the application using Nginx.