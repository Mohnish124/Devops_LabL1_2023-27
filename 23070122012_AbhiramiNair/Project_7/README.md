# Project 7 – MongoDB and Mongo Express Deployments

**Course:** DevOps Lab (TE7950)  
**Project:** 7 – Create Mongo and Mongo Express deployments, services, configmaps and secret

## Objective

Deploy MongoDB and Mongo Express on Kubernetes and demonstrate:

- Deployments
- Services
- ConfigMap
- Secret
- Environment-variable configuration
- MongoDB authentication
- Communication between Kubernetes services

The TE7950 syllabus specifies Project 7 as creating Mongo and Mongo Express deployments, services, ConfigMaps and a Secret.

## Architecture

```text
                    Kubernetes Cluster
                           |
                 namespace: mongo-demo
                           |
             +-------------+-------------+
             |                           |
             v                           v
      MongoDB Deployment          Mongo Express Deployment
             |                           |
         Mongo Pod                  Express Pod
             |                           |
      mongodb-service  <---------  mongo-express-service
             |
       MongoDB :27017
```

## Files

```text
Project_7_Mongo_MongoExpress_Kubernetes/
├── k8s/
│   ├── namespace.yaml
│   ├── configmap.yaml
│   ├── secret.yaml
│   ├── mongo-deployment.yaml
│   ├── mongo-service.yaml
│   ├── mongo-express-deployment.yaml
│   ├── mongo-express-service.yaml
│   └── kustomization.yaml
├── scripts/
│   ├── deploy.sh
│   ├── status.sh
│   ├── access.sh
│   └── cleanup.sh
└── docs/
    ├── setup.md
    ├── journal-writeup.md
    └── viva.md
```

## Prerequisites

- Docker
- Minikube or another Kubernetes cluster
- kubectl

Start Minikube:

```bash
minikube start
```

## Deploy

```bash
kubectl apply -k k8s/
```

Check:

```bash
kubectl get all -n mongo-demo
kubectl get configmap -n mongo-demo
kubectl get secret -n mongo-demo
```

Wait for both deployments:

```bash
kubectl rollout status deployment/mongo -n mongo-demo
kubectl rollout status deployment/mongo-express -n mongo-demo
```

## Access Mongo Express

With Minikube:

```bash
minikube service mongo-express-service -n mongo-demo --url
```

Open the returned URL in a browser.

The Mongo Express login credentials are stored in the Kubernetes Secret.

## Test MongoDB Connectivity

The Mongo Express Deployment connects to:

```text
mongodb://mongodb-service:27017
```

The hostname is resolved by Kubernetes DNS through the MongoDB Service.

## Inspect Configuration

```bash
kubectl get configmap mongo-config -n mongo-demo -o yaml
kubectl get secret mongo-secret -n mongo-demo
```

The Secret is intentionally not printed decoded in the normal workflow.

## Cleanup

```bash
kubectl delete -k k8s/
```

Or:

```bash
./scripts/cleanup.sh
```

## Important Security Note

The included Secret contains lab/demo credentials so the project is immediately runnable. For a real production deployment, do not commit real passwords to Git. Use a secret manager or your institution's approved Kubernetes secret-management approach.
