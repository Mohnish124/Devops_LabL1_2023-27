#!/usr/bin/env bash
set -e

echo "=== Nodes ==="
kubectl get nodes

echo
echo "=== Pods ==="
kubectl get pods -n apache-demo -o wide

echo
echo "=== Deployment ==="
kubectl get deployment apache2 -n apache-demo

echo
echo "=== Service ==="
kubectl get service apache2-service -n apache-demo

echo
echo "=== Pod description ==="
kubectl describe pod -n apache-demo -l app=apache2

echo
echo "=== Apache logs ==="
kubectl logs deployment/apache2 -n apache-demo
