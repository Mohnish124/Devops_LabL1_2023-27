# Project 2 — Deploy React Application in Docker Container

**Student:** Aayush Joshi | **PRN:** 23070122008

---

## Overview

This project containerizes a **React web application** using a **multi-stage Docker build**:
- **Stage 1**: Node.js image builds the React app (`npm run build`)
- **Stage 2**: Nginx Alpine serves the production build on port 80

---

## Architecture

```
React Source Code
    │
    ▼
Docker Multi-Stage Build
    ├── Stage 1: node:18-alpine  →  npm run build
    └── Stage 2: nginx:alpine    →  Serve /build at port 80
```

---

## Files

| File | Purpose |
|------|---------|
| `Dockerfile` | Multi-stage build: Node build → Nginx serve |
| `nginx.conf` | Custom Nginx config with SPA routing support |
| `docker-compose.yml` | Easy one-command deployment |

---

## How to Run

```bash
# Option 1: Using docker-compose (recommended)
docker-compose up --build -d

# Option 2: Manual build + run
docker build -t react-devops-app:latest .
docker run -d -p 80:80 --name react-app react-devops-app:latest

# Verify
docker ps
# Open browser: http://localhost
```

---

## Screenshots

![React app source code structure](./screenshots/01-source-structure.png)
![Docker build multi-stage output](./screenshots/02-docker-build.png)
![Docker run output and ps](./screenshots/03-docker-run.png)
![React app in browser at localhost:80](./screenshots/04-app-in-browser.png)
![Docker container logs](./screenshots/05-container-logs.png)
