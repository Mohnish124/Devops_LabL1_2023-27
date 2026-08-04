# Screenshot Checklist - Project 1: Dockerizing Jenkins Pipeline (Minimal 3-Screenshot Set)

This document lists the **3 minimal execution screenshots** required for **Project 1**.

---

## Required Execution Proof Screenshots

| Screenshot ID | Filename | Content / What it Contains | Why it is Sufficient Evidence |
| :--- | :--- | :--- | :--- |
| `P1_SS_01` | `P1_01_jenkins_pipeline_stage_view.png` | Jenkins Stage View UI showing all 5 stages green (`Checkout` -> `Build` -> `Run` -> `Test` -> `Cleanup`). | Proves Declarative Pipeline multi-stage execution. |
| `P1_SS_02` | `P1_02_jenkins_pipeline_console_success.png` | Jenkins build console log showing HTTP health test (`HEALTH CHECK PASSED: HTTP 200 OK`) and container teardown. | Proves automated container testing phase and cleanup. |
| `P1_SS_03` | `P1_03_flask_health_browser_output.png` | Web browser displaying `http://localhost:5000/health` showing healthy API JSON payload. | Proves Flask application deployment verification. |
