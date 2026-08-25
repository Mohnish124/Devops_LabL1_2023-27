#!/usr/bin/env bash
set -e
echo "=== Compile Agent ==="
java -version
mvn -version
mvn -B -DskipTests clean compile
echo "Compilation successful."
