#!/usr/bin/env bash
set -e

echo "Opening Mongo Express through Minikube..."
minikube service mongo-express-service -n mongo-demo
