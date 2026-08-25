#!/usr/bin/env bash
set -e

IMAGE_NAME="${1:-retail-web-app:1.0.0}"

echo "Building ${IMAGE_NAME}"
docker build -t "${IMAGE_NAME}" .

echo
echo "Image created:"
docker image inspect "${IMAGE_NAME}" --format '{{.RepoTags}}'
