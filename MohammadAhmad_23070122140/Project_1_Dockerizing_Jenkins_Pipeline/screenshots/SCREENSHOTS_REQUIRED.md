# Screenshot Checklist - Project 1: Dockerizing Jenkins Pipeline (Optimized)

This document lists the **4 essential execution screenshots** required to verify **Project 1**.

---

## Required Execution Proof Screenshots

| Screenshot ID | Filename | Content / What it Contains | Why it is Necessary |
| :--- | :--- | :--- | :--- |
| `P1_SS_01` | `P1_01_jenkins_pipeline_stage_view.png` | Jenkins Stage View UI showing green status boxes across all 5 stages (`Checkout` -> `Build` -> `Run` -> `Test` -> `Cleanup`). | Proves complete Declarative Pipeline execution. |
| `P1_SS_02` | `P1_02_jenkins_pipeline_console_success.png` | Jenkins console log showing HTTP health test output (`HEALTH CHECK PASSED: HTTP 200 OK`) and `Finished: SUCCESS`. | Proves automated testing phase and build success. |
| `P1_SS_03` | `P1_03_docker_state_and_cleanup.png` | Terminal output showing `docker ps` and container cleanup logs (`docker stop` / `docker rm`). | Proves test container cleanup and host environment hygiene. |
| `P1_SS_04` | `P1_04_flask_health_browser_output.png` | Web browser displaying `http://localhost:5000/health` showing healthy API JSON payload. | Proves Flask application deployment verification. |
