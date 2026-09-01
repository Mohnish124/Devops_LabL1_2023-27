# Project 7 - MongoDB and Mongo Express Kubernetes

## 📌 Project Description
This project demonstrates the deployment of MongoDB and Mongo Express on a Kubernetes cluster using Minikube.

The project includes:
- MongoDB Deployment
- MongoDB Service
- Mongo Express Deployment
- Mongo Express Service
- Kubernetes Secret
- Kubernetes ConfigMap

MongoDB is used as the database, while Mongo Express provides a web-based user interface to manage and interact with MongoDB.

## 🛠️ Technologies Used
- Docker
- Kubernetes
- Minikube
- kubectl
- MongoDB
- Mongo Express

## ⚙️ Kubernetes Resources

### 🔐 MongoDB Secret
A Kubernetes Secret is used to securely store the MongoDB root username and password. These credentials are used by both MongoDB and Mongo Express.

### 🗄️ MongoDB Deployment
The MongoDB Deployment creates and manages the MongoDB container.
- Port: 27017
- Uses credentials from the Kubernetes Secret.

### 🌐 MongoDB Service
A ClusterIP Service enables internal communication with MongoDB.
- Service Name: mongo-service
- Port: 27017

### ⚙️ Mongo Express ConfigMap
A Kubernetes ConfigMap stores the MongoDB service information required by Mongo Express.

### 🖥️ Mongo Express Deployment
Mongo Express provides a web-based interface for managing MongoDB. It uses:
- MongoDB username from Secret
- MongoDB password from Secret
- MongoDB service name from ConfigMap
- Port: 8081

### 🌍 Mongo Express Service
A NodePort Service exposes Mongo Express outside the Kubernetes cluster.
- Service Name: mongo-express-service
- Port: 8081

Mongo Express can be accessed using:
```
minikube service mongo-express-service
```
Login with username `admin` and password `pass`.

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
4. Deploy MongoDB and Mongo Express
```
kubectl apply -f mongo-mongoexpress.yaml
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
9. Access Mongo Express
```
minikube service mongo-express-service
```

## 🔄 Project Architecture
```
                    Kubernetes Cluster
                           │
                           ▼
                    ┌──────────────┐
                    │   MongoDB    │
                    │  Deployment  │
                    └──────┬───────┘
                           │
                    MongoDB Service
                           │
                           ▼
                    ┌──────────────┐
                    │Mongo Express │
                    │  Deployment  │
                    └──────┬───────┘
                           │
               Mongo Express Service
                     (NodePort)
                           │
                           ▼
                        Browser
```
MongoDB credentials are securely managed using a Kubernetes Secret, while the MongoDB service information required by Mongo Express is provided using a Kubernetes ConfigMap.

## ✅ Project Status
The project was successfully deployed and verified using Minikube.

The following resources were successfully created:
- MongoDB Pod
- Mongo Express Pod
- MongoDB Deployment
- Mongo Express Deployment
- MongoDB Service
- Mongo Express Service
- MongoDB Secret
- MongoDB ConfigMap

Both MongoDB and Mongo Express pods are running successfully, and Mongo Express is accessible through the Kubernetes service.