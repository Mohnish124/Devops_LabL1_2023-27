# Project 9 – Kubernetes Pod & Deployment

## Objective

To deploy an Nginx application on a local Kubernetes cluster using a Kubernetes Deployment and expose it using a NodePort Service.

## Technologies Used

- Kubernetes
- kubectl
- Docker Desktop Kubernetes
- Nginx

## 1. Verify Kubernetes Cluster

Kubernetes was verified using:

```powershell
kubectl config use-context docker-desktop
kubectl cluster-info
kubectl get nodes

The Docker Desktop Kubernetes cluster was successfully started and the node was in the Ready state.

2. Create Kubernetes Deployment

A Kubernetes Deployment was created using web-deployment.yaml.

The Deployment uses the Nginx Docker image and creates 2 replicas.

apiVersion: apps/v1
kind: Deployment
metadata:
  name: aparna-nginx-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: aparna-nginx
  template:
    metadata:
      labels:
        app: aparna-nginx
    spec:
      containers:
        - name: nginx
          image: nginx:latest
          ports:
            - containerPort: 80
3. Apply the Deployment
kubectl apply -f web-deployment.yaml
4. Verify the Deployment
kubectl get deployments

The Deployment was successfully created with 2 replicas.

5. Verify Kubernetes Pods
kubectl get pods

Two Nginx Pods were created and reached the Running state with 1/1 containers ready.

6. Create Kubernetes Service

A NodePort Service was created using web-service.yaml.

apiVersion: v1
kind: Service
metadata:
  name: aparna-nginx-service
spec:
  selector:
    app: aparna-nginx
  ports:
    - port: 80
      targetPort: 80
  type: NodePort
7. Apply the Service
kubectl apply -f web-service.yaml
8. Verify the Service
kubectl get service

The Service was created as a NodePort service.

The assigned NodePort was 30112.

9. Access the Application

Because the Kubernetes cluster uses Kind, port forwarding was used to access the Service from the local browser.

kubectl port-forward service/aparna-nginx-service 8085:80

The application was then accessed using:

http://localhost:8085

The Nginx Welcome page was displayed successfully.

Main Commands
kubectl config use-context docker-desktop
kubectl cluster-info
kubectl get nodes

kubectl apply -f web-deployment.yaml
kubectl get deployments
kubectl get pods

kubectl apply -f web-service.yaml
kubectl get service

kubectl port-forward service/aparna-nginx-service 8085:80
Screenshots

The following screenshots provide evidence of the implementation:

Kubernetes cluster running in Docker Desktop
kubectl get nodes showing the node as Ready
Deployment successfully created
Two Pods running
Kubernetes Service showing NodePort 30112
Nginx Welcome page accessed through localhost:8085
Result

The Nginx application was successfully deployed on a local Kubernetes cluster using a Deployment with 2 replicas. A NodePort Service was created to expose the application, and port forwarding was used to access the application through the local browser.