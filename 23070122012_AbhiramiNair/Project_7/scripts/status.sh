#!/usr/bin/env bash
set -e

echo "=== All resources ==="
kubectl get all -n mongo-demo

echo
echo "=== ConfigMap ==="
kubectl get configmap mongo-config -n mongo-demo

echo
echo "=== Secret metadata ==="
kubectl get secret mongo-secret -n mongo-demo

echo
echo "=== Mongo logs ==="
kubectl logs deployment/mongo -n mongo-demo --tail=30

echo
echo "=== Mongo Express logs ==="
kubectl logs deployment/mongo-express -n mongo-demo --tail=30
