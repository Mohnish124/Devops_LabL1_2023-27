#!/usr/bin/env bash
set -e

URL="$(minikube service api-gateway-service -n retail-microservices --url | head -n 1)"

echo "Gateway URL: ${URL}"

echo
echo "Health:"
curl -fsS "${URL}/health"
echo

echo
echo "Users:"
curl -fsS "${URL}/users"
echo

echo
echo "Products:"
curl -fsS "${URL}/products"
echo

echo
echo "Orders:"
curl -fsS "${URL}/orders"
echo
