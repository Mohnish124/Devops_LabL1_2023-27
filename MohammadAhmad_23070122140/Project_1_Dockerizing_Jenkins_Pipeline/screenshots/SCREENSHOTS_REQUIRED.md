# Screenshot Checklist - Project 1: Dockerizing Jenkins Pipeline

This document lists the verified execution screenshots for **Project 1: Dockerizing Jenkins Pipeline**.

---

## Verified Execution Proof Screenshots

| Status | Screenshot ID | Filename | Content / What it Contains | Why it is Sufficient Evidence |
| :---: | :--- | :--- | :--- | :--- |
| ✅ | `P1_SS_01` | `P1_01_jenkins_pipeline_stage_view.png` | Jenkins Stage View UI showing all 5 stages green (`Checkout` -> `Build Docker Image` -> `Run Container` -> `Test` -> `Cleanup`) for build `#1 SUCCESS`. | Proves complete Declarative Pipeline multi-stage execution. |
| ✅ | `P1_SS_02` | `P1_02_jenkins_pipeline_console_success.png` | Jenkins build console log for Build `#1` showing container startup, HTTP health check verification (`Health check passed`), container teardown, and `Finished: SUCCESS`. | Proves automated container health testing phase, container cleanup, and build success. |
| ✅ | `P1_SS_03` | `P1_03_flask_health_browser_output.png` | Web browser displaying `http://localhost:5000/health` showing healthy API JSON payload (`{ "status": "healthy" }`). | Proves Flask application deployment verification on port 5000. |
