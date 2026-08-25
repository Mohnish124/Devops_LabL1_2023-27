#!/usr/bin/env bash
set -e

echo "Forwarding host port 8080 to Apache2 service port 80."
echo "Open http://127.0.0.1:8080 in your browser."
echo "Press Ctrl+C to stop."

kubectl port-forward -n apache-demo service/apache2-service 8080:80
