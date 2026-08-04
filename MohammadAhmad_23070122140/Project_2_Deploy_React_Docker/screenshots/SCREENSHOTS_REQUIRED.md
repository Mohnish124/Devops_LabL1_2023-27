# Screenshot Checklist - Project 2: Deploy React Application using Docker (Optimized)

This document lists the **4 essential execution screenshots** required to verify **Project 2**.

---

## Required Execution Proof Screenshots

| Screenshot ID | Filename | Content / What it Contains | Why it is Necessary |
| :--- | :--- | :--- | :--- |
| `P2_SS_01` | `P2_01_multistage_docker_build_and_images.png` | Terminal showing `docker build -t react-app-nginx:latest .` logs and `docker images` showing ~25MB image size. | Proves multi-stage Docker build compilation and image optimization. |
| `P2_SS_02` | `P2_02_docker_run_and_ps.png` | Terminal showing `docker run -d -p 8080:80 ...` or `docker-compose up -d` and `docker ps` confirming container on port 8080. | Proves active container deployment state. |
| `P2_SS_03` | `P2_03_react_browser_portfolio_ui.png` | Web browser rendering `http://localhost:8080` displaying the dark-mode React DevOps Portfolio UI dashboard. | Proves successful React SPA deployment and browser rendering. |
| `P2_SS_04` | `P2_04_nginx_access_logs.png` | Terminal output of `docker logs react-app-container` showing HTTP GET requests returning `200 OK` from Nginx server. | Proves Nginx web server handling client requests. |
