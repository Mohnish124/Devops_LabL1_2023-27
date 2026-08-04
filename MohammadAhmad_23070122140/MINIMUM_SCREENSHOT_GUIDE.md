# Minimum Screenshot Submission Guide

**Student Name:** Mohammad Ahmad  
**PNR:** 23070122140  
**Subject:** DevOps Lab  
**Batch:** 2023-27  
**Strategy:** Minimal Execution Proof Set (17 Screenshots Total)

---

## 1. Executive Summary Table

| Assignment / Project | Minimum Screenshots Required | Purpose & Scope |
| :--- | :---: | :--- |
| **Assignment TW1.1: Git Workflow** | **3** | Proves Git repository setup, branching (`feature/user-auth`), simulated merge conflict, manual resolution, and commit history graph tree. |
| **Assignment TW1.2: Jira Project** | **2** | Proves Jira Scrum project setup (`HWF`), issue backlog creation (`HWF-1`, `HWF-2`, `HWF-3`), and Scrum board status transition to `DONE`. |
| **Assignment TW1.3: Docker & Jenkins Freestyle** | **3** | Proves local Docker image compilation, container execution, browser access, and Jenkins Freestyle UI setup & build console output. |
| **Project 1: Dockerizing Jenkins Pipeline** | **3** | Proves 5-stage Declarative Pipeline execution, automated health testing console logs, test container teardown, and live endpoint verification. |
| **Project 2: Deploy React Application using Docker** | **3** | Proves multi-stage Docker compilation, image optimization (~25MB), container runtime port mapping (8080:80), Nginx access logs, and React SPA browser UI. |
| **Project 4: Distributed Jenkins Pipeline for Scale** | **3** | Proves Maven JAR build (`devops-portfolio-app-1.0.0.jar`), Jenkins slave nodes setup (`slave-node-1`, `slave-node-2`), multi-node stage execution, and artifact archiving. |
| **TOTAL** | **17 Screenshots** | **100% Complete Execution Evidence for Full Marks** |

---

## 2. Complete List of 17 Required Execution Screenshots

### Assignment TW1.1: Git Workflow (3 Screenshots)
1. **`TW1.1_01_git_init_branch_push.png`**
   - **Belongs to:** Assignment TW1.1 (Task 1.1 & Task 1.2)
   - **Exactly what should appear:** Single terminal window showing `git init`, initial commit, `git checkout -b feature/user-auth`, feature branch commit, and `git push origin feature/user-auth`.
   - **Why sufficient evidence:** Combines repo setup, initial commit, branching, and remote feature push into one clear proof screenshot.

2. **`TW1.1_02_merge_conflict_resolution.png`**
   - **Belongs to:** Assignment TW1.1 (Task 1.3)
   - **Exactly what should appear:** Single terminal window showing `git merge feature/user-auth` conflict alert message, manual resolution commit (`git commit -m "Merge..."`), and `git push origin main`.
   - **Why sufficient evidence:** Demonstrates the entire merge conflict simulation and resolution lifecycle.

3. **`TW1.1_03_git_log_graph.png`**
   - **Belongs to:** Assignment TW1.1 (Task 1.3)
   - **Exactly what should appear:** Terminal window output of `git log --graph --oneline --all` displaying the commit history graph.
   - **Why sufficient evidence:** Verifies branch topology, commit history integrity, and merge resolution lineage.

---

### Assignment TW1.2: Jira Project (2 Screenshots)
4. **`TW1.2_01_jira_backlog_all_issues.png`**
   - **Belongs to:** Assignment TW1.2
   - **Exactly what should appear:** Jira Backlog view displaying created Story (`HWF-1`), Task (`HWF-2`), and Bug (`HWF-3`).
   - **Why sufficient evidence:** Proves Scrum project configuration (`Hello World Flask` / Key: `HWF`) and issue generation.

5. **`TW1.2_02_scrum_board_done.png`**
   - **Belongs to:** Assignment TW1.2
   - **Exactly what should appear:** Scrum Board view showing active sprint columns (`TO DO`, `IN PROGRESS`, `DONE`) with task `HWF-2 (Setup Flask Environment)` moved to `DONE`.
   - **Why sufficient evidence:** Proves board setup, sprint workflow, and status transition completion.

---

### Assignment TW1.3: Docker & Jenkins Freestyle (3 Screenshots)
6. **`TW1.3_01_docker_build_run_ps.png`**
   - **Belongs to:** Assignment TW1.3
   - **Exactly what should appear:** Terminal window showing `docker build -t hello-flask-app:v1 .`, `docker run -d -p 5000:5000 --name flask-container hello-flask-app:v1`, and `docker ps`.
   - **Why Sufficient Evidence:** Combines image compilation, container execution, and active container verification.

7. **`TW1.3_02_flask_browser_output.png`**
   - **Belongs to:** Assignment TW1.3
   - **Exactly what should appear:** Web browser rendering `http://localhost:5000` showing Flask JSON output response.
   - **Why sufficient evidence:** Proves application container runtime execution and port mapping.

8. **`TW1.3_03_jenkins_freestyle_config_and_console.png`**
   - **Belongs to:** Assignment TW1.3
   - **Exactly what should appear:** Jenkins UI window showing Freestyle job configuration (SCM & Execute Shell step) AND build `#1` console output log ending with `Finished: SUCCESS`.
   - **Why sufficient evidence:** Proves Jenkins Freestyle job setup and automated build execution.

---

### Project 1: Dockerizing Jenkins Pipeline (3 Screenshots)
9. **`P1_01_jenkins_pipeline_stage_view.png`**
   - **Belongs to:** Project 1
   - **Exactly what should appear:** Jenkins Stage View UI showing green status boxes across all 5 pipeline stages (`Checkout` → `Build` → `Run` → `Test` → `Cleanup`).
   - **Why sufficient evidence:** Proves complete 5-stage Declarative Pipeline execution.

10. **`P1_02_jenkins_pipeline_console_success.png`**
    - **Belongs to:** Project 1
    - **Exactly what should appear:** Jenkins build console log showing HTTP health test output (`HEALTH CHECK PASSED: HTTP 200 OK`), container teardown (`docker stop` / `docker rm`), and `Finished: SUCCESS`.
    - **Why sufficient evidence:** Proves automated health assertion tests and post-build cleanup.

11. **`P1_03_flask_health_browser_output.png`**
    - **Belongs to:** Project 1
    - **Exactly what should appear:** Web browser displaying `http://localhost:5000/health` showing healthy API JSON response.
    - **Why sufficient evidence:** Verifies application endpoint deployment.

---

### Project 2: Deploy React Application using Docker (3 Screenshots)
12. **`P2_01_multistage_docker_build_and_ps.png`**
    - **Belongs to:** Project 2
    - **Exactly what should appear:** Terminal window showing `docker build -t react-app-nginx:latest .` compilation logs, `docker images` (~25MB size), and `docker ps` confirming active container mapping `8080:80`.
    - **Why sufficient evidence:** Proves multi-stage compilation (`node:18-alpine` → `nginx:alpine`), image optimization, and container runtime.

13. **`P2_02_react_browser_portfolio_ui.png`**
    - **Belongs to:** Project 2
    - **Exactly what should appear:** Web browser rendering `http://localhost:8080` displaying the dark-mode React DevOps Portfolio dashboard UI.
    - **Why sufficient evidence:** Proves successful React SPA production deployment.

14. **`P2_03_nginx_access_logs.png`**
    - **Belongs to:** Project 2
    - **Exactly what should appear:** Terminal window displaying `docker logs react-app-container` showing HTTP GET requests returning `200 OK` from Nginx server.
    - **Why sufficient evidence:** Proves Nginx web server handling client requests via reverse proxy.

---

### Project 4: Distributed Jenkins Pipeline for Scale (3 Screenshots)
15. **`P4_01_local_maven_build_success.png`**
    - **Belongs to:** Project 4
    - **Exactly what should appear:** Terminal execution of `mvn clean test package` showing unit test execution and `devops-portfolio-app-1.0.0.jar` creation (`BUILD SUCCESS`).
    - **Why sufficient evidence:** Proves Java Maven compilation, unit testing, and JAR packaging.

16. **`P4_02_jenkins_nodes_and_stage_view.png`**
    - **Belongs to:** Project 4
    - **Exactly what should appear:** Jenkins UI window showing Nodes management list (`master`, `slave-node-1`, `slave-node-2`) AND Stage View UI showing multi-node stage execution.
    - **Why sufficient evidence:** Proves master-agent topology setup and multi-node pipeline execution.

17. **`P4_03_slave_nodes_console_and_artifact.png`**
    - **Belongs to:** Project 4
    - **Exactly what should appear:** Jenkins build console log snippet showing compilation on `slave-node-1`, JUnit testing on `slave-node-2`, and archived JAR artifact (`devops-portfolio-app-1.0.0.jar`).
    - **Why sufficient evidence:** Proves work offloading to slave agents and build artifact archiving.
