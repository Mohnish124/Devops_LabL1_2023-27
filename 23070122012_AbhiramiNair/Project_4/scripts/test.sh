#!/usr/bin/env bash
set -e
echo "=== Test Agent ==="
java -version
mvn -version
mvn -B test
echo "Tests successful."
