# K8s Social — Kubernetes Autoscaling Demo

A minimal social media app (React frontend + Node/Express backend) built to
demonstrate **Horizontal Pod Autoscaling (HPA)** in Kubernetes for a DevOps
lab project.

## Project structure

```
social-k8s/
├── backend/                  # Node/Express API (in-memory posts)
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
├── frontend/                 # React app served via nginx
│   ├── src/App.js
│   ├── src/index.js
│   ├── public/index.html
│   ├── nginx.conf
│   ├── package.json
│   └── Dockerfile
└── k8s/
    ├── backend-deployment.yaml   # Backend Deployment + Service
    ├── frontend-deployment.yaml  # Frontend Deployment + Service (NodePort)
    ├── backend-hpa.yaml          # ⭐ The HorizontalPodAutoscaler
    └── load-test.sh              # Script to generate load and trigger scaling
```

## What this demonstrates

1. A working multi-tier app (frontend + backend) running as separate
   Kubernetes Deployments, communicating via a Service.
2. **Cluster autoscaling of pods** — the `backend-hpa.yaml` HPA watches CPU
   usage on the backend pods and automatically increases replicas (2 → up to
   8) when load increases, then scales back down when load drops.

---

## Prerequisites

- Docker installed
- A local Kubernetes cluster: **Minikube** (recommended for this lab) or
  Kind/Docker Desktop Kubernetes
- `kubectl` installed
- **Metrics Server** enabled (required for HPA to read CPU usage)

```bash
# Start minikube
minikube start

# Enable the metrics server addon (needed for HPA)
minikube addons enable metrics-server

# Point your Docker CLI at minikube's Docker daemon so images build
# directly into the cluster (no registry push needed)
eval $(minikube docker-env)
```

---

## Step 1: Build the Docker images

Run from the `social-k8s/` directory (with `minikube docker-env` still active
in that shell):

```bash
docker build -t social-backend:latest ./backend
docker build -t social-frontend:latest ./frontend
```

## Step 2: Deploy to Kubernetes

```bash
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/backend-hpa.yaml
```

Check everything is running:

```bash
kubectl get pods
kubectl get svc
kubectl get hpa
```

You should see 2 backend pods (from `minReplicas: 2`), 1 frontend pod, and
the HPA showing current CPU usage vs the 50% target.

## Step 3: Access the app

```bash
minikube service frontend-service --url
```

Open the printed URL in your browser. You'll see the feed, a post form, and
a **"Run Load Test"** button plus the pod name currently serving your
request (useful to show load-balancing across replicas).

## Step 4: Demonstrate autoscaling

Open **three terminals**:

**Terminal 1** — watch the HPA live:
```bash
kubectl get hpa -w
```

**Terminal 2** — watch pods scale up/down live:
```bash
kubectl get pods -w
```

**Terminal 3** — generate load (either option):
```bash
# Option A: run the provided script
./k8s/load-test.sh

# Option B: click "🔥 Run Load Test" in the browser UI repeatedly
```

Within ~30–60 seconds you should see:
- CPU usage in `kubectl get hpa -w` climb above 50%
- The HPA increase `REPLICAS` (e.g. 2 → 4 → 6)
- New backend pods appear in Terminal 2

Stop the load generator (Ctrl+C, or `kubectl delete pod load-generator`).
After the `stabilizationWindowSeconds: 60` cooldown, watch the HPA scale
back down toward `minReplicas: 2`.

## Step 5: Take screenshots for your report

Good evidence to capture for submission:
1. `kubectl get pods` — before load (2 backend pods)
2. `kubectl get hpa` — showing CPU% climbing
3. `kubectl get pods` — during load (scaled up to 4-8 pods)
4. `kubectl get hpa` — after cooldown (scaled back down)
5. The browser app itself, showing the "served by pod" name changing
   between requests (proves load balancing across replicas)

---

## How the HPA works (for your report/viva)

- Every backend pod requests `100m` CPU (`resources.requests.cpu` in
  `backend-deployment.yaml`). This is the baseline the HPA measures against.
- The `/api/stress` endpoint runs a busy loop for ~200ms to simulate a
  CPU-heavy request (e.g. image processing, feed ranking).
- The HPA (`backend-hpa.yaml`) polls average CPU utilization every ~15s via
  the Metrics Server.
- When average CPU exceeds **50%** of the requested 100m across all pods,
  Kubernetes' controller manager increases `replicas` on the Deployment,
  up to `maxReplicas: 8`.
- When load drops, it scales back down (after a 60s stabilization window,
  to avoid flapping) but never below `minReplicas: 2` (for availability).

## Cleanup

```bash
kubectl delete -f k8s/backend-hpa.yaml
kubectl delete -f k8s/frontend-deployment.yaml
kubectl delete -f k8s/backend-deployment.yaml
minikube stop
```
