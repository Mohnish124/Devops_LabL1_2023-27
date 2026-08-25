#!/usr/bin/env bash
set -e

kubectl apply -k k8s/

echo
echo "=== Deployments ==="
kubectl get deployments -n retail-microservices

echo
echo "=== Services ==="
kubectl get services -n retail-microservices

echo
echo "=== Pods ==="
kubectl get pods -n retail-microservices
