# Screenshot Checklist - Assignment TW1.3: Docker & Jenkins Freestyle (Minimal 3-Screenshot Set)

This document lists the **3 minimal execution screenshots** required for **Assignment TW1.3**.

---

## Required Execution Proof Screenshots

| Screenshot ID | Filename | Content / What it Contains | Why it is Sufficient Evidence |
| :--- | :--- | :--- | :--- |
| `TW1.3_SS_01` | `TW1.3_01_docker_build_run_ps.png` | Terminal output showing `docker build -t hello-flask-app:v1 .`, `docker run -d -p 5000:5000 ...`, and `docker ps`. | Proves local Docker image compilation and active container runtime. |
| `TW1.3_SS_02` | `TW1.3_02_flask_browser_output.png` | Web browser rendering `http://localhost:5000` showing active Flask JSON response. | Proves containerized application execution and port mapping. |
| `TW1.3_SS_03` | `TW1.3_03_jenkins_freestyle_config_and_console.png` | Jenkins UI window showing Freestyle job config (SCM & Execute Shell step) AND console output log (`Finished: SUCCESS`). | Proves Jenkins Freestyle job setup and automated build execution. |
