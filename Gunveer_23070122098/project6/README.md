# SocialConnect - Cloud Native Social Media Platform

SocialConnect is a modern, premium social media web application designed explicitly to demonstrate cloud-native architecture, Kubernetes scalability, load balancing, and autoscaling concepts. 

It features a full suite of standard social platform features alongside dedicated administrator dashboards that visualize live infrastructure metrics.

## 🚀 Technology Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, Framer Motion (for animations)
- **Data Visualization:** Recharts (for Grafana-style monitoring dashboards)
- **Containerization:** Docker (Multi-stage build with Nginx)
- **Orchestration:** Kubernetes (K8s)

## 🏗️ Project Architecture & Features

### Core Application
- **Landing Page**: Cloud-native architecture showcase with animated components.
- **Authentication**: Modern Login and Registration flows.
- **Main Dashboard**: 3-column layout featuring user profile summary, infinite-scroll mock feed, and trending topics.
- **Profile & Explore**: Dedicated user details tabbed view and search discovery layouts.

### Admin & Infrastructure Simulation
- **Cluster Autoscaling Simulation**: Interactive dashboard using Framer Motion to visualize traffic spikes causing pods to dynamically scale from 2 → 4 → 8.
- **Monitoring Dashboard**: Grafana-inspired charts displaying CPU Utilization, Memory Allocation, and Ingress Network Traffic.
- **Architecture Flow**: A live animated diagram depicting the request journey: `End User -> Load Balancer -> K8s Pods -> PostgreSQL Database`.

---

## ☸️ Kubernetes Implementation

This project includes fully configured Kubernetes manifests for deploying the application into a real K8s cluster.

### 1. Dockerization
The app is containerized using a multi-stage `Dockerfile`:
- **Stage 1**: Builds the Vite/React application using `node:22-alpine`.
- **Stage 2**: Serves the static compiled bundle using a lightweight `nginx:alpine` web server.

### 2. Deployment (`deployment.yaml`)
Deploys the application with robust production guardrails:
- Starts with **2 Replicas**.
- Configures precise **Resource Requests & Limits** to ensure stable cluster scheduling and enable accurate autoscaling metrics:
  ```yaml
  resources:
    requests:
      cpu: "100m"
      memory: "128Mi"
    limits:
      cpu: "500m"
      memory: "512Mi"
  ```

### 3. Service Exposing (`service.yaml`)
Exposes the pods to external traffic using a **LoadBalancer** service on port `80`, ensuring incoming requests are evenly distributed across all active pods.

### 4. Horizontal Pod Autoscaler (HPA)
The deployment is configured to automatically scale up or down based on traffic load. The HPA targets a **50% average CPU utilization**:
```bash
kubectl autoscale deployment socialconnect --cpu-percent=50 --min=2 --max=10
```

### 5. Load Generation Testing
To verify the autoscaling behavior, a dummy pod can be used to spam the LoadBalancer service, artificially driving up CPU utilization to trigger the HPA scaling from 2 up to 10 pods:
```bash
kubectl run load-generator --image=busybox --restart=Never -- /bin/sh -c "while true; do wget -q -O- http://socialconnect-service; done"
```

## 🛠️ How to Run Locally

### Run via npm (Development)
```bash
npm install
npm run dev
```
Access the application at `http://localhost:5173`.

### Run via Docker
```bash
docker build -t socialconnect .
docker run -d -p 8080:80 socialconnect
```
Access the application at `http://localhost:8080`.

### Deploy to Kubernetes
Ensure you have a running cluster (e.g., Minikube, Docker Desktop K8s, EKS) and your image is accessible.
```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```
