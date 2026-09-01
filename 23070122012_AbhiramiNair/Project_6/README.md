# Project 6 – Social Media Infrastructure Challenges Using Kubernetes

**Course:** DevOps Lab (TE7950)  
**Project:** 6

## Objective

Demonstrate application scalability using Kubernetes by creating a cluster, deploying a containerized social-media-style application, exposing it with a Service, and configuring Horizontal Pod Autoscaling (HPA).

The course syllabus specifies Project 6 as using Kubernetes to demonstrate application scalability and creation of a cluster with autoscale capability.

## Technology

- Docker
- Kubernetes
- Minikube
- kubectl
- Metrics Server
- Horizontal Pod Autoscaler

## Project Structure

```text
Project_6_Kubernetes_Scalability_Autoscaling/
├── app/
│   ├── app.py
│   ├── Dockerfile
│   └── requirements.txt
├── k8s/
│   ├── namespace.yaml
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── hpa.yaml
│   └── kustomization.yaml
├── scripts/
│   ├── start-minikube.sh
│   ├── deploy.sh
│   ├── load-test.sh
│   └── cleanup.sh
└── docs/
    ├── setup.md
    ├── journal-writeup.md
    └── viva.md
```

## Architecture

```text
                    Kubernetes Cluster
                           |
                    Social Media Service
                           |
              +------------+------------+
              |            |            |
            Pod 1        Pod 2        Pod 3
              |            |            |
              +------------+------------+
                           |
                         HPA
                           |
                CPU utilization target
                           |
             scale replicas up/down
```

## Prerequisites

Install:

- Docker
- Minikube
- kubectl

Start Minikube:

```bash
minikube start
minikube addons enable metrics-server
```

Check:

```bash
kubectl get nodes
kubectl get pods -A
```

## Build and Deploy

Use the Minikube Docker environment:

```bash
eval $(minikube docker-env)
docker build -t social-media-app:1.0 ./app
```

Apply Kubernetes resources:

```bash
kubectl apply -k k8s/
```

Check:

```bash
kubectl get pods
kubectl get deployments
kubectl get services
kubectl get hpa
```

Wait for metrics:

```bash
kubectl top pods
kubectl top nodes
```

## Access Application

For Minikube:

```bash
minikube service social-media-service --url
```

Open the returned URL.

Health endpoint:

```text
/health
```

API endpoint:

```text
/api/feed
```

## Demonstrate Autoscaling

Watch HPA:

```bash
kubectl get hpa -w
```

In another terminal, run:

```bash
./scripts/load-test.sh
```

Or manually:

```bash
kubectl run load-generator --rm -it --image=busybox:1.36 -- /bin/sh
```

Inside the shell:

```sh
while true; do wget -q -O- http://social-media-service/health; done
```

In another terminal:

```bash
kubectl get hpa -w
kubectl get pods -w
```

The HPA should increase replicas when the configured CPU target is exceeded, provided Metrics Server is functioning and the load is sufficient.

Stop the load generator with:

```text
Ctrl+C
```

The HPA can later reduce replicas toward the configured minimum after the workload falls.

## Important

Autoscaling is based on Kubernetes resource metrics. The deployment therefore includes CPU requests, which are important for CPU-based HPA calculations.

If the HPA shows `<unknown>` for metrics, check:

```bash
kubectl get pods -n kube-system
kubectl top pods
kubectl describe hpa social-media-hpa
```

## Cleanup

```bash
kubectl delete -k k8s/
minikube stop
```
