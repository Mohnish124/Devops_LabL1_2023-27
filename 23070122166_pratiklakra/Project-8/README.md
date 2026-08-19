# Project 7: MongoDB and Mongo Express Deployment on Kubernetes

## Project Description

This project demonstrates deploying **MongoDB** and **Mongo Express** on Kubernetes using:

- Deployments
- Services
- ConfigMaps
- Secrets

MongoDB acts as the database, while Mongo Express provides a browser-based administration interface for managing the MongoDB database.

Kubernetes manages container deployment, networking, service discovery, and configuration securely within the cluster.

## Objective

The objective is to:

- Deploy MongoDB on Kubernetes
- Deploy Mongo Express
- Secure credentials using Kubernetes Secrets
- Configure database connection using ConfigMaps
- Expose Mongo Express through a NodePort Service
- Verify successful communication between Mongo Express and MongoDB

## Technologies Used

| Technology | Purpose |
|---|---|
| Kubernetes | Container orchestration |
| Minikube | Local Kubernetes cluster |
| kubectl | Kubernetes command-line tool |
| Docker | Container runtime |
| MongoDB | Database |
| Mongo Express | MongoDB administration interface |
| YAML | Kubernetes configuration |

## Prerequisites

- Docker Desktop
- Minikube
- kubectl
- Kubernetes Cluster
- MongoDB Image
- Mongo Express Image

## Project Structure

```text
Project-7/
│
├── mongodb-secret.yaml
├── mongodb-configmap.yaml
├── mongodb-deployment.yaml
├── mongodb-service.yaml
├── mongo-express-deployment.yaml
├── mongo-express-service.yaml
│
├── Screenshots/
│
├── README.md
│
└── .gitignore
```

| File | Description |
|---|---|
| `mongodb-secret.yaml` | Defines MongoDB credentials using a Kubernetes Secret |
| `mongodb-configmap.yaml` | Stores the MongoDB service configuration |
| `mongodb-deployment.yaml` | Defines the MongoDB Deployment |
| `mongodb-service.yaml` | Provides internal MongoDB networking using ClusterIP |
| `mongo-express-deployment.yaml` | Defines the Mongo Express Deployment and environment variables |
| `mongo-express-service.yaml` | Exposes Mongo Express using NodePort |
| `Screenshots/` | Contains screenshots captured during implementation |
| `README.md` | Project documentation |
| `.gitignore` | Specifies files ignored by Git |

## Kubernetes Architecture

```text
                         User Browser
                              │
                              ▼
                 Mongo Express Service
                       (NodePort)
                              │
                              ▼
                 Mongo Express Deployment
                              │
                              ▼
                    MongoDB Service
                       (ClusterIP)
                              │
                              ▼
                    MongoDB Deployment
                              │
                              ▼
                         MongoDB Pod


                         Secret
                            │
                            ▼
                   MongoDB Credentials


                       ConfigMap
                            │
                            ▼
                   MongoDB Service Name
```

The Secret provides MongoDB credentials, while the ConfigMap provides the MongoDB Service name required for internal communication.

# Implementation Steps

## Step 1: Verify Kubernetes Cluster

The Kubernetes cluster was verified using Minikube and `kubectl` before deploying the application resources.

```bash
minikube status
```

![Step 1 - Cluster Running](Screenshots/02_cluster_running.png)

The Minikube cluster is running successfully and is ready for Kubernetes deployments.

```bash
kubectl get all
```

![Step 1 - Existing Cluster Resources](Screenshots/03_existing_cluster_resources.png)

Existing Kubernetes resources were checked before starting the MongoDB and Mongo Express deployment.

## Step 2: Create MongoDB Secret

Kubernetes Secrets are used to store sensitive information such as MongoDB usernames and passwords separately from application configuration.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: mongodb-secret
type: Opaque
data:
  mongodb-user: YWRtaW4=
  mongodb-password: cGFzc3dvcmQ=
```

![Step 2 - MongoDB Secret YAML](Screenshots/04_mongodb_secret_yaml.png)

The Secret manifest defines the credentials required for authenticated MongoDB access.

## Step 3: Create ConfigMap

A ConfigMap stores non-sensitive configuration separately from the application deployment. The MongoDB Service name is stored here for service discovery.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mongodb-configmap
data:
  database_url: mongodb-service
```

![Step 3 - ConfigMap YAML](Screenshots/05_configmap_yaml.png)

The ConfigMap defines `mongodb-service` as the internal MongoDB endpoint.

## Step 4: Create MongoDB Deployment

A Deployment manages the MongoDB Pod and ensures that the MongoDB container remains available in the Kubernetes cluster.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongodb-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongodb
  template:
    metadata:
      labels:
        app: mongodb
    spec:
      containers:
        - name: mongodb
          image: mongo:latest
          ports:
            - containerPort: 27017
          env:
            - name: MONGO_INITDB_ROOT_USERNAME
              valueFrom:
                secretKeyRef:
                  name: mongodb-secret
                  key: mongodb-user
            - name: MONGO_INITDB_ROOT_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: mongodb-secret
                  key: mongodb-password
```

![Step 4 - MongoDB Deployment YAML](Screenshots/06_mongodb_deployment_yaml.png)

The MongoDB Deployment creates the database Pod and retrieves its credentials from the Kubernetes Secret.

## Step 5: Create MongoDB Service

A ClusterIP Service provides stable internal networking for MongoDB. Mongo Express can communicate with MongoDB through the Service name instead of using a Pod IP.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: mongodb-service
spec:
  selector:
    app: mongodb
  ports:
    - protocol: TCP
      port: 27017
      targetPort: 27017
  type: ClusterIP
```

![Step 5 - MongoDB Service YAML](Screenshots/07_mongodb_service_yaml.png)

