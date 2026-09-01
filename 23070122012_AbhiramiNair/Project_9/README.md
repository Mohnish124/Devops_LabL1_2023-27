# Project 9 – Apache2 Server Using Kubernetes

**Course:** DevOps Lab (TE7950)  
**Project:** 9

## Objective

Create an Apache2 server within a Kubernetes Deployment and access it from the host machine using Kubernetes commands.

The TE7950 syllabus specifies Project 9 as creating an Apache2 server within a Deployment and accessing it using the host machine while learning Kubernetes commands.

## Architecture

```text
                 Host Machine
                      |
              minikube service / port-forward
                      |
                      v
             Apache2 Kubernetes Service
                      |
                      v
              Apache2 Deployment
                      |
                 Apache Pod
                      |
                   :80
```

## Project Structure

```text
Project_9_Apache2_Kubernetes/
├── k8s/
│   ├── namespace.yaml
│   ├── deployment.yaml
│   ├── service.yaml
│   └── kustomization.yaml
├── web/
│   └── index.html
├── scripts/
│   ├── deploy.sh
│   ├── access.sh
│   ├── port-forward.sh
│   ├── inspect.sh
│   └── cleanup.sh
└── docs/
    ├── setup.md
    ├── journal-writeup.md
    └── viva.md
```

## Prerequisites

- Docker
- Minikube
- kubectl

Start the local cluster:

```bash
minikube start
```

## Deploy

From the project root:

```bash
kubectl apply -k k8s/
```

Check:

```bash
kubectl get all -n apache-demo
```

Wait for Apache:

```bash
kubectl rollout status deployment/apache2 -n apache-demo
```

## Access From Host Machine

### Method 1 – Minikube Service

```bash
minikube service apache2-service -n apache-demo --url
```

Open the returned URL in your browser.

### Method 2 – kubectl port-forward

```bash
kubectl port-forward -n apache-demo service/apache2-service 8080:80
```

Then open:

```text
http://127.0.0.1:8080
```

## Useful Kubernetes Commands

```bash
kubectl get nodes
kubectl get pods -n apache-demo
kubectl get deployments -n apache-demo
kubectl get services -n apache-demo
kubectl describe pod -n apache-demo -l app=apache2
kubectl logs -n apache-demo deployment/apache2
kubectl exec -it -n apache-demo deployment/apache2 -- apache2ctl -S
```

## Scaling Demonstration

```bash
kubectl scale deployment apache2 --replicas=3 -n apache-demo
kubectl get pods -n apache-demo
```

Then scale back:

```bash
kubectl scale deployment apache2 --replicas=1 -n apache-demo
```

## Cleanup

```bash
kubectl delete -k k8s/
```

## Result

An Apache2 server is deployed as a Kubernetes workload and can be accessed from the host machine through a Kubernetes Service or `kubectl port-forward`.
