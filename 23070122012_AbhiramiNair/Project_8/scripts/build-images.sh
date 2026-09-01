#!/usr/bin/env bash
set -e

eval "$(minikube docker-env)"

docker build -t user-service:1.0 services/user-service
docker build -t product-service:1.0 services/product-service
docker build -t order-service:1.0 services/order-service
docker build -t api-gateway:1.0 services/api-gateway

echo "All four images built inside the Minikube Docker environment."
