#!/usr/bin/env bash
set -e

echo "Apache2 URL:"
minikube service apache2-service -n apache-demo --url
