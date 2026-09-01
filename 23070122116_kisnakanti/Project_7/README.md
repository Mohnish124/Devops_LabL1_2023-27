# Project 7 — MongoDB and Mongo Express on Kubernetes

This project demonstrates Kubernetes Deployments, Services, a ConfigMap, and a Secret by running MongoDB with the Mongo Express web interface.

## Architecture

```text
Browser ──► mongo-express-service (NodePort 30081)
                    │
                    ▼
           Mongo Express Pod
                    │
                    ▼
          mongodb-service (ClusterIP)
                    │
                    ▼
              MongoDB Pod

mongodb-secret      ──► credentials for both applications
mongodb-configmap   ──► database_url: mongodb-service
```

## Prerequisites

- A running Kubernetes cluster
- `kubectl` configured for that cluster
- Minikube is recommended for local browser access

## Deploy

Apply all resources in dependency order:

```bash
kubectl apply -f mongodb-secret.yaml
kubectl apply -f mongodb-configmap.yaml
kubectl apply -f mongodb-deployment.yaml
kubectl apply -f mongo-express-deployment.yaml
```

Or apply the complete Kustomize configuration:

```bash
kubectl apply -k .
```

Wait for both Deployments:

```bash
kubectl rollout status deployment/mongodb-deployment
kubectl rollout status deployment/mongo-express-deployment
kubectl get all
```

## Open Mongo Express

With Minikube:

```bash
minikube service mongo-express-service --url
```

Open the printed URL in a browser. With another local cluster, use the node IP and port `30081`:

```text
http://<node-ip>:30081
```

## Verification commands

```bash
kubectl get nodes
kubectl get secrets mongodb-secret
kubectl describe configmap mongodb-configmap
kubectl get deployments
kubectl get pods -o wide
kubectl get services
kubectl get endpoints mongodb-service
kubectl logs deployment/mongo-express-deployment
```

The MongoDB Service is internal (`ClusterIP`); only Mongo Express is exposed externally (`NodePort`). The password is deliberately a lab value. Replace it before using this setup anywhere beyond a classroom exercise.

## Cleanup

```bash
kubectl delete -k .
```
