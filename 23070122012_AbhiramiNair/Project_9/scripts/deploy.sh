#!/usr/bin/env bash
set -e

kubectl apply -k k8s/

echo
echo "=== Deployment ==="
kubectl get deployment -n apache-demo

echo
echo "=== Pods ==="
kubectl get pods -n apache-demo

echo
echo "=== Service ==="
kubectl get service -n apache-demo
