#!/usr/bin/env bash
set -e

eval "$(minikube docker-env)"

docker build -t social-media-app:1.0 ./app

kubectl apply -k k8s/

echo
echo "Deployment:"
kubectl get deployment -n social-media

echo
echo "Pods:"
kubectl get pods -n social-media

echo
echo "Service:"
kubectl get service -n social-media

echo
echo "HPA:"
kubectl get hpa -n social-media
