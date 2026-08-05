# Screenshot Checklist - Assignment TW1.3: Docker & Jenkins Freestyle

This document lists the required execution screenshots for **Assignment TW1.3: Dockerizing Flask Application & Jenkins Freestyle Setup**.

---

## Required Execution Proof Screenshots

| Status | Screenshot ID | Filename | Content / What it Contains | Why it is Sufficient Evidence |
| :---: | :--- | :--- | :--- | :--- |
| ✅ | `TW1.3_SS_01` | `TW1.3_01_docker_run_jenkins_ps.png` | Terminal output showing `docker pull jenkins/jenkins:lts`, container execution on port 8080 (`docker run -d ...`), `docker ps`, and initial admin secret retrieval. | Proves Docker CLI container image pull, volume setup, container execution, and active runtime status. |
| ✅ | `TW1.3_SS_02` | `TW1.3_02_jenkins_dashboard_ui.png` | Web browser rendering `http://localhost:8080` displaying the active Jenkins main dashboard UI ("Welcome to Jenkins!"). | Proves successful containerized Jenkins server deployment and web UI accessibility. |
| ✅ | `TW1.3_SS_03` | `TW1.3_03_jenkins_freestyle_console_output.png` | Jenkins build console log from Build `#1` (`Started by user Mohammad Ahmad`) showing Git repository cloning, workspace setup, and build execution. | Proves Jenkins Freestyle job creation, Git SCM integration, and automated build execution. |
| ✅ | `TW1.3_SS_04` | `TW1.3_04_jenkins_plugin_management.png` | Jenkins UI under `Manage Jenkins -> Plugins` showing active Git plugin installation. | Proves Jenkins plugin environment configuration. |
