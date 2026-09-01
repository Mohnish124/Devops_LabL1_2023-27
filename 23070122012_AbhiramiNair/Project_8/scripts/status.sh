#!/usr/bin/env bash
set -e

kubectl get all -n retail-microservices
echo
kubectl get configmap -n retail-microservices
echo
kubectl get secret -n retail-microservices
