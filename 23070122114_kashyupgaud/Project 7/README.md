# Project 7 - Create Mongo and Mongo Express Deployments, Services, ConfigMaps, and Secret

This project demonstrates how to deploy MongoDB and Mongo Express on a Kubernetes cluster. It includes the creation of a Secret for database credentials, a ConfigMap for connection URLs, and the necessary Deployments and Services.

## Prerequisites
- A running Kubernetes cluster (e.g., Docker Desktop with Kubernetes enabled)
- `kubectl` installed and configured

---

## Step 1: Create Kubernetes Manifests

Create the following YAML files to define our Kubernetes resources.

### 1. `mongo-secret.yaml`
This Secret securely stores the root username and password for MongoDB.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: mongodb-secret
type: Opaque
stringData:
  mongo-root-username: admin
  mongo-root-password: password123
```

### 2. `mongo-config.yaml`
This ConfigMap stores the database URL so Mongo Express knows where to connect.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mongodb-configmap
data:
  database_url: mongodb-service
```

### 3. `mongo-deployment.yaml`
This file defines the MongoDB Deployment (using the `mongo:5.0` image) and its internal ClusterIP Service.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongodb-deployment
  labels:
    app: mongodb
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
        image: mongo:5.0
        ports:
        - containerPort: 27017
        env:
        - name: MONGO_INITDB_ROOT_USERNAME
          valueFrom:
            secretKeyRef:
              name: mongodb-secret
              key: mongo-root-username
        - name: MONGO_INITDB_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mongodb-secret
              key: mongo-root-password
---
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
```

### 4. `mongo-express-deployment.yaml`
This defines the Mongo Express Deployment and exposes it as a LoadBalancer Service on port `30000`.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongo-express
  labels:
    app: mongo-express
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongo-express
  template:
    metadata:
      labels:
        app: mongo-express
    spec:
      containers:
      - name: mongo-express
        image: mongo-express
        ports:
        - containerPort: 8081
        env:
        - name: ME_CONFIG_MONGODB_ADMINUSERNAME
          valueFrom:
            secretKeyRef:
              name: mongodb-secret
              key: mongo-root-username
        - name: ME_CONFIG_MONGODB_ADMINPASSWORD
          valueFrom:
            secretKeyRef:
              name: mongodb-secret
              key: mongo-root-password
        - name: ME_CONFIG_MONGODB_SERVER
          valueFrom:
            configMapKeyRef:
              name: mongodb-configmap
              key: database_url
---
apiVersion: v1
kind: Service
metadata:
  name: mongo-express-service
spec:
  selector:
    app: mongo-express
  type: LoadBalancer
  ports:
    - protocol: TCP
      port: 8081
      targetPort: 8081
      nodePort: 30000
```

---

## Step 2: Deploy to Kubernetes

Run the following command to apply all the manifests in the directory:

```bash
kubectl apply -f .
```

---

## Step 3: Verify the Deployment

Verify that the Deployments and Services are up and running:

```bash
kubectl get deployments,services
```
*(Screenshot showing successful deployment and services)*
![Deployments and Services](Screenshots/Screenshot%202026-08-19%20220243.png)

Verify that the ConfigMaps and Secrets have been created:

```bash
kubectl get configmaps,secrets
```
*(Screenshot showing configmaps and secrets)*
![ConfigMaps and Secrets](Screenshots/Screenshot%202026-08-19%20220254.png)

---

## Step 4: Access and Use Mongo Express

1. Open your browser and navigate to `http://localhost:30000`.
2. When prompted for Basic Auth, log in using the default credentials:
   - **Username:** `admin`
   - **Password:** `pass`

*(Screenshot showing the login prompt or initial access)*
![Mongo Express Login](Screenshots/Screenshot%202026-08-19%20215613.png)

3. Once logged in, you will see the Mongo Express dashboard. Create a new Database and Collection.

*(Screenshot showing database creation)*
![Database Creation](Screenshots/Screenshot%202026-08-19%20215837.png)

*(Screenshot showing Mongo Express dashboard)*
![Mongo Express Dashboard](Screenshots/Opera%20Snapshot_2026-08-19_215947_localhost.png)

4. Create a sample Document to verify that you can write data to MongoDB via Mongo Express.

*(Screenshot showing document creation)*
![Document Creation](Screenshots/Screenshot%202026-08-19%20220027.png)

*(Additional Screenshot)*
![Additional Output](Screenshots/Screenshot%202026-08-19%20220544.png)

---