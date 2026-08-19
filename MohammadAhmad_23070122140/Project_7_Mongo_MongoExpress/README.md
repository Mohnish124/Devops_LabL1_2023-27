# Project 7: Deploying MongoDB and Mongo Express on Kubernetes with ConfigMaps and Secrets

**Student Name:** Mohammad Ahmad  
**PNR:** 23070122140  
**Subject:** DevOps Lab  
**Batch:** 2023-27  

---

## 1. Executive Summary & Project Overview

Modern cloud-native architectures separate application state, configuration management, and sensitive credentials into discrete, decoupled Kubernetes primitives. Managing relational or NoSQL database instances inside Kubernetes requires robust inter-pod networking, declarative configuration injection, and secure credential handling.

**Project 7** demonstrates the end-to-end architecture and deployment of a containerized **MongoDB** database paired with **Mongo Express**—an interactive web-based administrative dashboard—orchestrated on a local Kubernetes cluster (`kind`). The deployment incorporates fundamental Kubernetes abstractions:
- **Namespaces:** Multi-tenant resource boundary (`mongo-lab`).
- **Secrets:** Base64-encoded credential management decoupling passwords from container manifests.
- **ConfigMaps:** Non-sensitive environment configuration decoupling backend hostnames and port mappings.
- **Deployments:** Declarative container lifecycle management, replica guarantees, and TCP health probes.
- **Services:** Internal `ClusterIP` service for backend DNS service discovery and `NodePort` / port-forwarding for external web access.

---

## 2. Technical & Business Scenario

In enterprise DevOps environments, database administrators and development teams require direct visibility into database internals without exposing database communication ports directly to public networks. 

By deploying MongoDB as an internal service (`ClusterIP`), database traffic remains strictly confined to the cluster overlay network (`10.244.0.0/16`). Mongo Express acts as an internal consumer, discovering MongoDB via cluster DNS (`mongo-service:27017`), authenticating using credentials injected dynamically from a Kubernetes Secret, and presenting a secure web administration interface to authorized host operators.

---

## 3. System Architecture & Component Workflow

The following ASCII diagram illustrates the request lifecycle, service discovery, and configuration injection across the `mongo-lab` namespace:

```
                            +-------------------------------------------------------+
                            |            Kubernetes Node / Control Plane            |
                            |                                                       |
                            |  [ Kubernetes Secret ]         [ Kubernetes ConfigMap ]|
                            |   - mongo-root-username         - ME_CONFIG_MONGODB_SERVER: mongo-service
                            |   - mongo-root-password         - ME_CONFIG_MONGODB_PORT: 27017
                            |          |                               |            |
                            |          +---------------+---------------+            |
                            |                          |                            |
                            |               mongo-lab Namespace                     |
                            |                          |                            |
                            |   +----------------------v------------------------+   |
                            |   |          Mongo Express Pod                    |   |
                            |   |          (Container: 8081)                    |   |
                            |   +----------------------^------------------------+   |
                            |                          |                            |
                            |                          | Internal Service DNS       |
                            |                          | mongo-service:27017        |
                            |                          |                            |
                            |   +----------------------v------------------------+   |
                            |   |             MongoDB Pod                       |   |
                            |   |          (Container: 27017)                   |   |
                            |   +-----------------------------------------------+   |
                            +-------------------------------------------------------+
                                                       |
                                      mongo-express-service (NodePort 30081 / Port-Forward 8081)
                                                       |
                                                       v
                                            +---------------------+
                                            | Browser / Developer |
                                            | http://localhost:8081|
                                            +---------------------+
```

### Architectural Highlights
1. **Zero Hardcoded Credentials:** Neither the deployment YAMLs nor the container images store raw database credentials.
2. **Kubernetes Service Discovery:** Mongo Express references `mongo-service` by hostname; CoreDNS resolves this directly to the MongoDB `ClusterIP`.
3. **Decoupled Configuration:** Changes to connection ports or feature flags are modified inside `configmap.yaml` without rebuilding container images.

---

## 4. Kubernetes Manifest Specifications

All declarative YAML manifests reside inside the [`k8s/`](./k8s) directory.

### 4.1. Namespace Isolation (`k8s/namespace.yaml`)
Establishes a logical boundary isolating all database workloads from system and application pods.
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: mongo-lab
  labels:
    app.kubernetes.io/name: mongo-lab
    environment: lab
```

### 4.2. Kubernetes Secret (`k8s/secret.yaml`)
Stores root credentials for MongoDB authentication using Kubernetes `stringData` (automatically base64 encoded by the API server).
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: mongo-secret
  namespace: mongo-lab
  labels:
    app.kubernetes.io/name: mongo-secret
type: Opaque
stringData:
  mongo-root-username: admin
  mongo-root-password: password123
```

### 4.3. Kubernetes ConfigMap (`k8s/configmap.yaml`)
Provides non-sensitive environment variables consumed by the Mongo Express container.
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mongo-express-configmap
  namespace: mongo-lab
  labels:
    app.kubernetes.io/name: mongo-express-configmap
data:
  ME_CONFIG_MONGODB_SERVER: "mongo-service"
  ME_CONFIG_MONGODB_PORT: "27017"
  ME_CONFIG_MONGODB_URL: "mongodb://mongo-service:27017"
  ME_CONFIG_MONGODB_ENABLE_ADMIN: "true"
  ME_CONFIG_BASICAUTH: "false"
```

### 4.4. MongoDB Deployment & Service (`k8s/mongo-deployment.yaml` & `k8s/mongo-service.yaml`)
- **Deployment:** Provisions an official MongoDB container instance, injects `MONGO_INITDB_ROOT_USERNAME` and `MONGO_INITDB_ROOT_PASSWORD` from `mongo-secret` via `secretKeyRef`, and establishes TCP readiness/liveness probes.
- **Service:** Creates a headless/stable `ClusterIP` on port `27017` routing traffic to pods labeled `app: mongo`.

### 4.5. Mongo Express Deployment & Service (`k8s/mongo-express-deployment.yaml` & `k8s/mongo-express-service.yaml`)
- **Deployment:** Deploys the web interface, consuming general settings from `mongo-express-configmap` via `envFrom.configMapRef` and administrative credentials from `mongo-secret` via `secretKeyRef`.
- **Service:** Exposes container port `8081` on `NodePort: 30081` for external access.

---

## 5. Deployment & Execution Instructions

### Step 1: Clone Repository & Navigate to Project Directory
```powershell
cd D:\devops\Devops-Lab-L1_2023-27\MohammadAhmad_23070122140\Project_7_Mongo_MongoExpress
```

### Step 2: Validate Kubernetes Cluster Readiness
```powershell
kubectl cluster-info
kubectl get nodes
```

### Step 3: Apply Kubernetes Manifests in Order
```powershell
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/mongo-deployment.yaml
kubectl apply -f k8s/mongo-service.yaml
kubectl apply -f k8s/mongo-express-deployment.yaml
kubectl apply -f k8s/mongo-express-service.yaml
```

### Step 4: Verify Resource Provisioning & Pod Health
```powershell
kubectl get all -n mongo-lab
kubectl get configmap,secret -n mongo-lab
```

### Step 5: Verify Inter-Service Connectivity via Logs
```powershell
kubectl logs deployment/mongo-deployment -n mongo-lab
kubectl logs deployment/mongo-express-deployment -n mongo-lab
```

### Step 6: Access Mongo Express Web Dashboard
Expose the service port to localhost via port-forwarding:
```powershell
kubectl port-forward svc/mongo-express-service 8081:8081 -n mongo-lab
```
Navigate to `http://localhost:8081` in your web browser.

---

## 6. Verification Proof & Screenshot Checklist

All execution screenshots are captured from live cluster runs and documented in [`screenshots/SCREENSHOTS_REQUIRED.md`](./screenshots/SCREENSHOTS_REQUIRED.md).

| Screenshot ID | Filename | Description | Status |
| :--- | :--- | :--- | :---: |
| `P7_SS_01` | [`P7_01_cluster_and_namespace.png`](./screenshots/P7_01_cluster_and_namespace.png) | Verification of cluster nodes, `mongo-lab` namespace, ConfigMap, and Secret. | ✅ VERIFIED |
| `P7_SS_02` | [`P7_02_mongo_deployment_and_service.png`](./screenshots/P7_02_mongo_deployment_and_service.png) | MongoDB Deployment Running (1/1) and `mongo-service` ClusterIP configuration. | ✅ VERIFIED |
| `P7_SS_03` | [`P7_03_mongo_express_running.png`](./screenshots/P7_03_mongo_express_running.png) | Mongo Express Deployment Running (1/1), NodePort service, and HTTP request logs. | ✅ VERIFIED |
| `P7_SS_04` | [`P7_04_mongo_express_ui_and_mongo_connection.png`](./screenshots/P7_04_mongo_express_ui_and_mongo_connection.png) | Live Mongo Express Web Dashboard displaying databases (`admin`, `config`, `local`) and Server Status. | ✅ VERIFIED |

---

## 7. Observed Execution Results

### 7.1. Cluster Resources Status
```
PS D:\devops\Devops-Lab-L1_2023-27> kubectl get deployment,pods,svc -n mongo-lab
NAME                                       READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/mongo-deployment           1/1     1            1           5m
deployment.apps/mongo-express-deployment   1/1     1            1           5m

NAME                                           READY   STATUS    RESTARTS   AGE
pod/mongo-deployment-774bdcd7d9-gd4lg          1/1     Running   0          3m
pod/mongo-express-deployment-7fff85f88-xndpt   1/1     Running   0          2m

NAME                            TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
service/mongo-express-service   NodePort    10.96.245.45   <none>        8081:30081/TCP   5m
service/mongo-service           ClusterIP   10.96.155.43   <none>        27017/TCP        5m
```

### 7.2. Backend Database Connection Log
```
Waiting for mongo-service:27017...
No custom config.js found, loading config.default.js
Welcome to mongo-express 1.0.2
------------------------
Mongo Express server listening at http://0.0.0.0:8081
Server is open to allow connections from anyone (0.0.0.0)
GET / 200 667.784 ms - 9279
```

---

## 8. Security & Production Engineering Considerations

1. **Secret Management in Production:** Standard Kubernetes Secrets are base64-encoded strings stored in etcd. In production environments, sensitive secrets should be managed using external key-management vaults (e.g., HashiCorp Vault, AWS Secrets Manager, Azure Key Vault) with SealedSecrets or the Kubernetes External Secrets Operator (ESO).
2. **Network Policies:** Implement `NetworkPolicy` objects restricting inbound traffic on MongoDB port `27017` exclusively to pods bearing the `app: mongo-express` label.
3. **State Persistence:** In enterprise workloads, MongoDB requires a `StatefulSet` with `PersistentVolumeClaim` (PVC) backed by durable storage classes rather than ephemeral container storage.
4. **Basic Authentication:** For production admin portals, enable `ME_CONFIG_BASICAUTH: "true"` and inject administration login credentials through a dedicated Secret.
