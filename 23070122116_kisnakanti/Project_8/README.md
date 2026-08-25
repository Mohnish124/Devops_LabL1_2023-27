# Project 8 — Containerized E-Commerce Microservices

A demonstration e-commerce platform composed of a frontend and four Node.js microservices backed by PostgreSQL.

## Components

- `frontend`: static catalogue, cart, login, and checkout UI
- `user-service`: registration and login
- `product-service`: catalogue and product administration
- `order-service`: order creation and history
- `payment-service`: simulated payment processing
- PostgreSQL: shared persistent database

## Run locally with Docker Compose

```bash
docker compose up --build
```

Open http://localhost:8080. Seed products are inserted automatically on the first database startup.

## Run on Kubernetes

```bash
kubectl apply -f k8s/
kubectl get pods,services,pvc
kubectl port-forward service/frontend-service 8080:80
```

The manifests use a `postgres-pvc`, `app-config`, and `postgres-secret`. The default secret values are for classroom/demo use only; replace them before any real deployment.

## API smoke checks

```bash
curl http://localhost:8080/api/products
curl http://localhost:8080/health
```

