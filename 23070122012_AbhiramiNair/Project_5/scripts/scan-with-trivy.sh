#!/usr/bin/env bash
set -e

IMAGE_NAME="${1:-retail-web-app:1.0.0}"

if ! command -v trivy >/dev/null 2>&1; then
  echo "Trivy is not installed."
  echo "Install it separately, then run:"
  echo "trivy image ${IMAGE_NAME}"
  exit 1
fi

trivy image --severity HIGH,CRITICAL "${IMAGE_NAME}"
