# Screenshot Checklist - Project 2: Deploy React Application using Docker (Minimal 3-Screenshot Set)

This document lists the **3 minimal execution screenshots** required for **Project 2**.

---

## Required Execution Proof Screenshots

| Screenshot ID | Filename | Content / What it Contains | Why it is Sufficient Evidence |
| :--- | :--- | :--- | :--- |
| `P2_SS_01` | `P2_01_multistage_docker_build_and_ps.png` | Terminal showing `docker build -t react-app-nginx:latest .` logs, `docker images` (~25MB image size), and `docker ps` confirming active container on port 8080. | Proves multi-stage compilation, image optimization, and container runtime. |
| `P2_SS_02` | `P2_02_react_browser_portfolio_ui.png` | Web browser rendering `http://localhost:8080` displaying the dark-mode React DevOps Portfolio UI. | Proves successful React SPA deployment and rendering. |
| `P2_SS_03` | `P2_03_nginx_access_logs.png` | Terminal output of `docker logs react-app-container` showing HTTP GET requests returning `200 OK` from Nginx. | Proves Nginx web server handling client requests. |
