#!/usr/bin/env bash
set -e

kubectl apply -k k8s/

echo
echo "=== Deployments ==="
kubectl get deployments -n mongo-demo

echo
echo "=== Pods ==="
kubectl get pods -n mongo-demo

echo
echo "=== Services ==="
kubectl get services -n mongo-demo

echo
echo "=== ConfigMap ==="
kubectl get configmap -n mongo-demo

echo
echo "=== Secret ==="
kubectl get secret -n mongo-demo
