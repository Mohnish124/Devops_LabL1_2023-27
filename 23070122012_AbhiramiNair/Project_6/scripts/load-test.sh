#!/usr/bin/env bash
set -e

echo "Starting load generator."
echo "Stop with Ctrl+C."

kubectl run load-generator   --rm   -i   --restart=Never   --image=busybox:1.36   -- /bin/sh -c   'while true; do wget -q -O- http://social-media-service/health >/dev/null; wget -q -O- http://social-media-service/api/work >/dev/null; done'
