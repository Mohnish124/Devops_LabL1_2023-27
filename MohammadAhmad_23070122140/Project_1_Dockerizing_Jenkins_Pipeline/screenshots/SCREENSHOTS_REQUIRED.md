# Screenshot Checklist - Project 1: Dockerizing Jenkins Pipeline

This document details all required screenshot proof for **Project 1: Dockerizing Jenkins Pipeline**.

---

## Required Screenshots List

| Screenshot ID | Title | Description | Expected Visual Evidence |
| :--- | :--- | :--- | :--- |
| `P1_SS_01` | **Jenkinsfile Inspection** | Code editor view showing the Declarative Pipeline stages (`Checkout`, `Build Docker Image`, `Run Container`, `Test`, `Cleanup`). | Complete Groovy Jenkinsfile code snippet in editor. |
| `P1_SS_02` | **Jenkins Pipeline Job Configuration** | Job configuration screen showing Pipeline script from SCM pointing to `Jenkinsfile`. | Jenkins UI showing Pipeline SCM Git repository and script path. |
| `P1_SS_03` | **Pipeline Execution Stage View** | Jenkins Stage View UI showing green status boxes across all 5 pipeline stages. | Stage View UI: Checkout -> Build -> Run -> Test -> Cleanup (All Green). |
| `P1_SS_04` | **Build Stage Console Output** | Jenkins console log showing `docker build -t flask-pipeline-app...` execution. | Build logs displaying Docker layer building and tagging. |
| `P1_SS_05` | **Container Execution & Test Stage Logs** | Jenkins console log showing `curl -s -f http://localhost:5000/` and HTTP 200 health check verification. | Console output confirming `HEALTH CHECK PASSED: HTTP 200 OK`. |
| `P1_SS_06` | **Cleanup Stage Logs** | Console output log demonstrating container stop and removal (`docker stop`, `docker rm`). | Log messages confirming test container cleanup. |
| `P1_SS_07` | **Docker Environment State (`ps` & `images`)** | Terminal execution of `docker images` and `docker ps` showing pipeline artifacts. | Output displaying created Docker images and clean container status. |
| `P1_SS_08` | **Browser Verification** | Web browser accessing `http://localhost:5000` showing active Flask app API response. | Browser displaying `{ "status": "success", "app_name": "Flask CI/CD...", ... }`. |
| `P1_SS_09` | **Successful Build Status (Blue Ball)** | Jenkins project overview page showing Build `#1` completed successfully with duration and trend graph. | Project UI displaying successful build badge. |
