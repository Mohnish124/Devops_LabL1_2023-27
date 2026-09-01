#!/usr/bin/env bash
set -e

kubectl delete -k k8s/ --ignore-not-found=true

echo "Apache2 Kubernetes resources removed."
