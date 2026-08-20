#!/bin/bash
# Simple load generator to trigger the HPA during your live demo.
# Usage: ./load-test.sh
#
# This runs many parallel requests against the backend's CPU-intensive
# /api/stress endpoint via the frontend service, so you can watch
# `kubectl get hpa -w` and `kubectl get pods -w` scale up in real time.

echo "Starting load test... press Ctrl+C to stop."
echo "In another terminal, run: kubectl get hpa -w"
echo "In a third terminal, run: kubectl get pods -w"

kubectl run load-generator --image=busybox:1.36 --restart=Never -it --rm -- \
  /bin/sh -c "while true; do wget -q -O- http://backend-service:5000/api/stress; done"
