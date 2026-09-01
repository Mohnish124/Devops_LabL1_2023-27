# Project 8 - Microservices Kubernetes

## Project Description

This project demonstrates the deployment of a complete microservices-based application on Kubernetes using Minikube.

The application consists of four microservices:

- Frontend Service
- Orders Service
- Products Service
- Users Service

The project uses Kubernetes Deployments and Services to deploy and expose the microservices. A ConfigMap is used for application configuration, and a Secret is used for storing sensitive MongoDB credentials.

## Technologies Used

- Docker
- Kubernetes
- Minikube
- kubectl
- Nginx
- MongoDB

## Kubernetes Resources

The following Kubernetes resources were created:

- 4 Microservice Deployments
- 4 Microservice Services
- ConfigMap
- Secret

### Microservices

| Microservice | Service Type |
|---|---|
| Frontend | NodePort |
| Orders Service | ClusterIP |
| Products Service | ClusterIP |
| Users Service | ClusterIP |

## Project Structure

```text
Project 8 - Microservices Kubernetes/
│
├── README.md
├── Source Code/
│   └── microservices.yaml
└── Screenshots/
```
