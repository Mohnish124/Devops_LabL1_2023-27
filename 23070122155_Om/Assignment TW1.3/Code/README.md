# DevOps CI/CD Project

A simple microservice app with:
- Frontend served by Nginx
- Flask backend API
- Redis as the database dependency

## Structure
- frontend/ - HTML page and Nginx config
- backend/ - Flask app
- k8s/ - Kubernetes deployment files
- Jenkinsfile - basic CI/CD pipeline

## Run locally with Docker
```bash
docker build -t yourdockerhub/frontend:v1 ./frontend
docker build -t yourdockerhub/backend:v1 ./backend
```

## Deploy to Kubernetes
```bash
kubectl apply -f k8s/
```
