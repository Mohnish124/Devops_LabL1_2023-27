# Project 9: Apache2 on Kubernetes

This project deploys Apache HTTP Server in a Kubernetes-managed Pod and makes
it accessible from the host machine.

## Prerequisites

- Docker Desktop, Minikube, or another local Kubernetes cluster
- `kubectl`

## Run the project

Start and verify the cluster:

```bash
minikube start
minikube status
kubectl get nodes
```

Apply the Deployment and Service:

```bash
kubectl apply -f apache-deployment.yaml
kubectl apply -f apache-service.yaml
```

Wait for Apache to become ready and inspect the resources:

```bash
kubectl rollout status deployment/apache-deployment
kubectl get deployments
kubectl get pods -l app=apache
kubectl get services
```

Access Apache from the host machine. Keep this command running in one terminal:

```bash
kubectl port-forward service/apache-service 8080:80
```

In a second terminal, verify the response:

```bash
curl http://localhost:8080
```

You can also open <http://localhost:8080> in a browser.

## Inspect the Apache container

```bash
kubectl logs deployment/apache-deployment
kubectl exec -it deployment/apache-deployment -- /bin/sh
ls /usr/local/apache2
exit
```

## Optional Minikube NodePort access

```bash
minikube service apache-service --url
```

## Remove the resources

```bash
kubectl delete -f apache-service.yaml
kubectl delete -f apache-deployment.yaml
```
