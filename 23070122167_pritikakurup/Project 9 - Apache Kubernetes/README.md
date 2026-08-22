# Project 9 - Apache2 Server using Kubernetes

## Project Description

This project demonstrates how to deploy an Apache2 web server inside a Kubernetes Deployment and access it from the host machine.

Apache HTTP Server is deployed as a Kubernetes Pod using a Deployment. A NodePort Service exposes the Apache server, allowing it to be accessed from the host machine using Minikube.

## Technologies Used

- Docker
- Kubernetes
- Minikube
- kubectl
- Apache HTTP Server

## Kubernetes Resources

The following Kubernetes resources were created:

- Apache2 Deployment
- Apache2 Pod
- Apache2 NodePort Service

## Accessing Apache2

The Apache2 server was accessed from the host machine using:

```bash
minikube service apache2-service
```

The Apache server successfully displayed the default:

```text
It works!
```

## Project Structure

```text
Project 9 - Apache Kubernetes/
│
├── README.md
├── Source Code/
│   └── apache2.yaml
└── Screenshots/
    ├── 01_apache_pod_running.png
    ├── 02_apache_service.png
    └── 03_apache_access.png
```
