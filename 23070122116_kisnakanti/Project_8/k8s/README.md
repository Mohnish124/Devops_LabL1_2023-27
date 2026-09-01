# Kubernetes deployment

Build the five local images first so a local cluster such as Minikube or Docker Desktop can use them:

```bash
docker build --build-arg SERVICE=user-service -f Dockerfile.service -t ecommerce-user-service:latest .
docker build --build-arg SERVICE=product-service -f Dockerfile.service -t ecommerce-product-service:latest .
docker build --build-arg SERVICE=order-service -f Dockerfile.service -t ecommerce-order-service:latest .
docker build --build-arg SERVICE=payment-service -f Dockerfile.service -t ecommerce-payment-service:latest .
docker build -t ecommerce-frontend:latest ./frontend
kubectl apply -f k8s/
```

For Minikube, run `eval $(minikube docker-env)` before the build commands.

