# Project 8 - Multi-Microservice Application on Kubernetes

## 📌 Project Description
This project demonstrates containerizing a complete application made up of 4 microservices on a Kubernetes cluster using Minikube.

The project includes:
- Frontend Deployment + Service
- Backend Deployment + Service
- Cache Deployment + Service
- Database Deployment + Service
- Kubernetes Secret
- Kubernetes ConfigMap

Each microservice runs as its own Deployment and is exposed through its own Service, wired together using a shared ConfigMap and Secret.

## 🛠️ Technologies Used
- Docker
- Kubernetes
- Minikube
- kubectl
- Nginx (frontend)
- httpbin (backend API)
- Redis (cache)
- MongoDB (database)

## ⚙️ Kubernetes Resources

### 🔐 Secret
`app-secret` securely stores the database username and password, used by both the backend and database microservices.

### 🗒️ ConfigMap
`app-configmap` stores shared configuration values (Redis host, DB host) used by the backend microservice.

### 🖥️ Microservice 1: Frontend
- Image: nginx
- Deployment: frontend-deployment
- Service: frontend-service (NodePort — exposed to the browser)
- Port: 80

### ⚙️ Microservice 2: Backend API
- Image: httpbin
- Deployment: backend-deployment
- Service: backend-service (ClusterIP — internal only)
- Port: 80
- Uses Redis/DB host from ConfigMap, DB credentials from Secret

### ⚡ Microservice 3: Cache
- Image: redis
- Deployment: cache-deployment
- Service: cache-service (ClusterIP — internal only)
- Port: 6379

### 🗄️ Microservice 4: Database
- Image: mongo
- Deployment: database-deployment
- Service: database-service (ClusterIP — internal only)
- Port: 27017
- Uses credentials from Secret

## 🚀 Steps to Run the Project
1. Start Docker Desktop
2. Start Minikube
```
minikube start
```
3. Verify the Kubernetes Cluster
```
kubectl get nodes
```
4. Deploy all microservices (applies every yaml file in the folder)
```
kubectl apply -f .
```
5. Verify the Pods
```
kubectl get pods
```
6. Verify the Deployments
```
kubectl get deployments
```
7. Verify the Services
```
kubectl get services
```
8. Verify Secret and ConfigMap
```
kubectl get secrets
kubectl get configmaps
```
9. Access the Frontend
```
minikube service frontend-service
```

## 🔄 Project Architecture
```
                        Browser
                           │
                           ▼
                 ┌──────────────────┐
                 │ Frontend Service │  (NodePort)
                 └────────┬─────────┘
                           │
                 ┌──────────────────┐
                 │Frontend Deployment│
                 └────────┬─────────┘
                           │
                           ▼
                 ┌──────────────────┐
                 │ Backend Service  │  (ClusterIP)
                 └────────┬─────────┘
                           │
                 ┌──────────────────┐
                 │Backend Deployment │
                 └───┬──────────┬───┘
                     │          │
             ┌───────▼──┐   ┌───▼────────┐
             │  Cache   │   │  Database  │
             │ Service  │   │  Service   │
             └────┬─────┘   └─────┬──────┘
                  │               │
             ┌────▼─────┐   ┌─────▼──────┐
             │  Cache   │   │  Database  │
             │Deployment│   │ Deployment │
             └──────────┘   └────────────┘
```
The Secret and ConfigMap feed configuration and credentials into the Backend and Database deployments.

## ✅ Project Status
The project was successfully deployed and verified using Minikube.

The following resources were successfully created:
- Frontend Deployment & Service
- Backend Deployment & Service
- Cache Deployment & Service
- Database Deployment & Service
- app-secret
- app-configmap

All 4 microservice pods are running successfully, and the frontend is accessible through the Kubernetes NodePort service.