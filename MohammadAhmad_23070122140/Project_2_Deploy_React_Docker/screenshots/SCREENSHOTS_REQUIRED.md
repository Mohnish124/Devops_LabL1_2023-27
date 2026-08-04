# Screenshot Checklist - Project 2: Deploy React Application using Docker

This document details all required screenshot proof for **Project 2: Deploy React Application using Docker**.

---

## Required Screenshots List

| Screenshot ID | Title | Description | Expected Visual Evidence |
| :--- | :--- | :--- | :--- |
| `P2_SS_01` | **React Source Code View** | Code editor snippet showing Vite + React source files (`App.jsx`, `package.json`). | Editor displaying modern React SPA code. |
| `P2_SS_02` | **Multi-Stage Dockerfile View** | Code editor showing multi-stage `Dockerfile` (`builder` stage Node 18 -> `runner` stage Nginx Alpine). | Complete Dockerfile showing multi-stage configuration. |
| `P2_SS_03` | **Nginx Configuration File** | Code editor displaying `nginx.conf` (`try_files $uri /index.html;` routing fallback). | Nginx configuration snippet. |
| `P2_SS_04` | **Docker Multi-Stage Build Execution** | Terminal execution of `docker build -t react-app-nginx:latest .` showing stage 1 compilation and stage 2 Nginx setup. | Terminal logs showing multi-stage build progress. |
| `P2_SS_05` | **Docker Image Inspection (`docker images`)** | Terminal execution of `docker images` showing `react-app-nginx` image size (~25MB optimized Nginx image). | Image size optimization output. |
| `P2_SS_06` | **Docker Container Execution (`docker run`)** | Terminal execution of `docker run -d -p 8080:80 --name react-app-container react-app-nginx:latest`. | Output displaying container startup ID. |
| `P2_SS_07` | **Docker Active Container Inspection (`docker ps`)** | Terminal execution of `docker ps` confirming active container on port `0.0.0.0:8080->80/tcp`. | Container status `Up X minutes`. |
| `P2_SS_08` | **Docker Compose Execution** | Terminal execution of `docker-compose up -d --build` showing service creation. | Terminal confirmation of Docker Compose stack creation. |
| `P2_SS_09` | **Browser Access (React SPA UI)** | Web browser rendering `http://localhost:8080` displaying the dark-mode React DevOps Portfolio dashboard. | Browser screenshot showcasing rich React UI, student metadata, and interactive metrics. |
| `P2_SS_10` | **Nginx Access & Error Logs** | Terminal execution of `docker logs react-app-container` showing HTTP GET requests returned with `200 OK`. | Nginx access log lines. |
