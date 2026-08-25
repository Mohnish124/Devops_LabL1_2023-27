# Project 8 – Four-Microservice Application on Kubernetes

**Course:** DevOps Lab (TE7950)  
**Project:** 8

## Objective

Create Deployments, Services, ConfigMaps and Secrets to containerize a complete application with at least four microservices.

The TE7950 syllabus specifies Project 8 as creating Deployments, Services, ConfigMaps and Secrets to containerize a complete application with at least four microservices.

## Application

This project implements a small retail/order platform with four independently deployable services:

1. `user-service` – manages user information
2. `product-service` – manages products
3. `order-service` – creates demo orders and communicates with product/user services
4. `api-gateway` – single entry point for the application

Each service has:
- Its own Dockerfile
- Its own Deployment
- Its own Service
- Health endpoint

The Kubernetes configuration also includes:
- ConfigMap for non-sensitive service configuration
- Secret for an application API key
- Namespace
- Kustomization

## Architecture

```text
                       Client
                         |
                         v
                  API Gateway :8080
                    /    |     \
                   /     |      \
                  v      v       v
             User     Product   Order
           Service    Service   Service
             :8081      :8082     :8083
                         ^          |
                         |          |
                         +----------+
                    service-to-service
                       communication
```

## Project Structure

```text
Project_8_Four_Microservices_Kubernetes/
├── services/
│   ├── user-service/
│   ├── product-service/
│   ├── order-service/
│   └── api-gateway/
├── k8s/
│   ├── namespace.yaml
│   ├── configmap.yaml
│   ├── secret.yaml
│   ├── user-service.yaml
│   ├── product-service.yaml
│   ├── order-service.yaml
│   ├── api-gateway.yaml
│   └── kustomization.yaml
├── scripts/
│   ├── build-images.sh
│   ├── deploy.sh
│   ├── status.sh
│   ├── test.sh
│   └── cleanup.sh
└── docs/
    ├── setup.md
    ├── architecture.md
    ├── journal-writeup.md
    └── viva.md
```

## Prerequisites

- Docker
- Minikube
- kubectl

Start Minikube:

```bash
minikube start
```

## Build Images

Use Minikube's Docker daemon:

```bash
eval $(minikube docker-env)
./scripts/build-images.sh
```

## Deploy

```bash
kubectl apply -k k8s/
```

Check:

```bash
kubectl get all -n retail-microservices
kubectl get configmap -n retail-microservices
kubectl get secret -n retail-microservices
```

## Access the Gateway

```bash
minikube service api-gateway-service -n retail-microservices --url
```

Then test:

```text
/health
/users
/products
/orders
```

## Service-to-Service Communication

Kubernetes DNS provides stable service names:

```text
user-service
product-service
order-service
```

The order service uses these names to communicate with the other services.

## Cleanup

```bash
kubectl delete -k k8s/
```

## Important Security Note

The included Secret uses a demo API key so the project is immediately runnable. Do not use this value in production. Real secrets should be supplied through your approved secret-management mechanism.
