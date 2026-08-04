# Screenshot Checklist - Project 2: Deploy React Application using Docker

This document tracks the execution screenshots required for **Project 2: Deploy React Application using Docker**.

---

## Required Execution Proof Screenshots

| Status | Screenshot ID | Filename | Content / What it Contains | Why it is Sufficient Evidence |
| :---: | :--- | :--- | :--- | :--- |
| ✅ | `P2_SS_02` | `P2_02_react_browser_portfolio_ui.png` | Web browser rendering `http://localhost:5173` (or `http://localhost:8080`) displaying the dark-mode React Docker Application UI ("RUNNING SUCCESSFULLY INSIDE DOCKER"). | Proves successful React SPA production compilation, container execution, and browser rendering. |
| ⏳ Pending | `P2_SS_01` | `P2_01_multistage_docker_build_and_ps.png` | Terminal showing `docker build -t react-app-nginx:latest .` logs, `docker images` (~25MB image size), and `docker ps` confirming active container on port 8080. | Proves multi-stage compilation (`node:18-alpine` -> `nginx:alpine`), image optimization, and container runtime. |
| ⏳ Pending | `P2_SS_03` | `P2_03_nginx_access_logs.png` | Terminal output of `docker logs react-app-container` showing HTTP GET requests returning `200 OK` from Nginx server. | Proves Nginx web server handling client requests via reverse proxy. |
