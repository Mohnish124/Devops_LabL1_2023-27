# Screenshot Checklist - Assignment TW1.3: Docker & Jenkins Freestyle (Optimized)

This document lists the **4 essential execution screenshots** required to verify **Assignment TW1.3**.

---

## Required Execution Proof Screenshots

| Screenshot ID | Filename | Content / What it Contains | Why it is Necessary |
| :--- | :--- | :--- | :--- |
| `TW1.3_SS_01` | `TW1.3_01_docker_build_run_ps.png` | Terminal window showing `docker build -t hello-flask-app:v1 .`, `docker run -d ...`, and `docker ps`. | Proves Docker CLI container image compilation and container launch. |
| `TW1.3_SS_02` | `TW1.3_02_flask_browser_output.png` | Web browser rendering `http://localhost:5000` showing active Flask JSON response. | Proves containerized application execution and network port mapping. |
| `TW1.3_SS_03` | `TW1.3_03_jenkins_freestyle_config.png` | Jenkins UI job configuration screen showing Git SCM and Execute Shell build step (`pwd`, `ls -la`, `docker build`). | Proves Jenkins Freestyle job UI setup and build commands configuration. |
| `TW1.3_SS_04` | `TW1.3_04_jenkins_freestyle_success_console.png` | Jenkins build console output log showing workspace files listing and ending with `Finished: SUCCESS`. | Proves successful Jenkins Freestyle build execution. |
