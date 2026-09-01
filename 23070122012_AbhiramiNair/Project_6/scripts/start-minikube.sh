#!/usr/bin/env bash
set -e

minikube start
minikube addons enable metrics-server

echo "Cluster:"
kubectl get nodes

echo "Metrics server:"
kubectl get pods -n kube-system | grep metrics || true
