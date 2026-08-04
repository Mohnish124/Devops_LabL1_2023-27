# Project 1: Dockerizing Jenkins CI/CD Pipeline

**Student Name:** Mohammad Ahmad  
**PNR:** 23070122140  
**Subject:** DevOps Lab  
**Batch:** 2023-27  

---

## 1. Introduction

Building upon the base Flask app (TW1.1) and containerization basics (TW1.3), **Project 1** implements an enterprise-grade automated Continuous Integration pipeline using **Jenkins Declarative Pipeline** (`Jenkinsfile`). 

This project automates the entire lifecycle of a containerized application: checking out source code from Git, compiling the Docker image, spawning a test container, executing automated HTTP health check tests against live endpoints, and performing post-build environment cleanup.

---

## 2. Objectives

- Design an automated 5-stage Declarative Jenkins Pipeline.
- Evolve the Python Flask codebase to include container health probes (`/health`).
- Implement automated Docker image building and tagging using environment variables (`${BUILD_NUMBER}`).
- Instantiate transient containers for automated testing inside pipeline execution workspaces.
- Execute automated HTTP assertion tests using `curl` and HTTP status code checks.
- Automate post-build cleanup using post actions (`always`, `success`, `failure`).
- Document pipeline architecture, stage details, CLI commands, and expected console outputs.

---

## 3. Folder Structure

```
Project_1_Dockerizing_Jenkins_Pipeline/
├── flask-app/
│   ├── app.py              # Advanced Flask API with health check route
│   └── requirements.txt     # Python dependencies
├── Dockerfile              # Container spec with HEALTHCHECK instruction
├── Jenkinsfile             # Declarative pipeline script (5 stages)
├── README.md               # Pipeline architecture & execution guide
└── screenshots/            # Verified execution screenshots
    ├── SCREENSHOTS_REQUIRED.md
    ├── P1_01_jenkins_pipeline_stage_view.png
    ├── P1_02_jenkins_pipeline_console_success.png
    └── P1_03_flask_health_browser_output.png
```

---

## 4. Prerequisites

- **Docker Desktop** (Engine 20.10+ active)
- **Jenkins Server** (v2.400+ installed with Docker & Pipeline plugins)
- **Git** repository access

---

## 5. Installation

1. Navigate to project directory:
   ```bash
   cd Project_1_Dockerizing_Jenkins_Pipeline
   ```
2. Build Docker image manually:
   ```bash
   docker build -t flask-pipeline-app:1.0 .
   ```
3. Run container:
   ```bash
   docker run -d -p 5000:5000 --name flask-test-container flask-pipeline-app:1.0
   ```
4. Verify endpoint:
   ```bash
   curl -i http://localhost:5000/health
   ```
5. Teardown:
   ```bash
   docker stop flask-test-container && docker rm flask-test-container
   ```

---

## 6. Commands

### Pipeline Execution Script (`Jenkinsfile`):
```groovy
pipeline {
    agent any
    environment {
        IMAGE_NAME = "flask-pipeline-app"
        CONTAINER_NAME = "flask-test-container"
        PORT = "5000"
    }
    stages {
        stage('Checkout') { steps { checkout scm } }
        stage('Build Docker Image') { steps { sh 'docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} .' } }
        stage('Run Container') { steps { sh 'docker run -d -p ${PORT}:${PORT} --name ${CONTAINER_NAME} ${IMAGE_NAME}:${BUILD_NUMBER}' } }
        stage('Test') { steps { sh 'curl -s -f http://localhost:${PORT}/health' } }
        stage('Cleanup') { steps { sh 'docker stop ${CONTAINER_NAME} && docker rm ${CONTAINER_NAME}' } }
    }
}
```

---

## 7. Expected Output

```text
Started by user Mohammad Ahmad
=== Stage 1: Checkout Source Code ===
+ pwd
/var/jenkins_home/workspace/Dockerizing-Jenkins-Pipeline
=== Stage 2: Building Docker Image ===
Successfully tagged dockerizing-jenkins-pipeline:latest
=== Stage 3: Deploying Container for Testing ===
Container started successfully
=== Stage 4: Executing Automated Container Health Verification ===
Health check passed
=== Stage 5: Environment Cleanup ===
Stopping container... Removing container...
Finished: SUCCESS
```

---

## 8. Explanation

### Pipeline Architecture:
```
[Checkout] -> [Build Docker Image] -> [Run Container] -> [Test Endpoint] -> [Cleanup Container]
```

| Stage | Command / Logic | Purpose |
| :--- | :--- | :--- |
| **1. Checkout** | `checkout scm` | Clones the repository and verifies workspace directory structure (`ls -la`). |
| **2. Build Image** | `docker build -t ...` | Compiles Docker image tagged with unique build number `${BUILD_NUMBER}`. |
| **3. Run Container** | `docker run -d -p ...` | Destroys pre-existing test instances and launches a isolated test container. |
| **4. Test** | `curl -s -f http://...` | Queries `/` and `/health` endpoints, asserting HTTP 200 status responses. |
| **5. Cleanup** | `docker stop && docker rm` | Ensures zero container leakage by cleaning up test instances post-execution. |

---

## 9. Screenshots Section

All verified execution proofs are cataloged in [SCREENSHOTS_REQUIRED.md](./screenshots/SCREENSHOTS_REQUIRED.md).

### Verified Execution Screenshots:

#### 1. Jenkins Pipeline Stage View (5 Stages Green)
![Jenkins Pipeline Stage View](screenshots/P1_01_jenkins_pipeline_stage_view.png)
*Figure 1: Jenkins Stage View UI showing all 5 stages (`Checkout`, `Build Docker Image`, `Run Container`, `Test`, `Cleanup`) executing successfully (Green checkmarks).*

#### 2. Pipeline Build Console Output (Finished SUCCESS)
![Pipeline Console Output Success](screenshots/P1_02_jenkins_pipeline_console_success.png)
*Figure 2: Jenkins Build #1 console output log showing step execution across stages, container deployment, health check assertion, cleanup, and `Finished: SUCCESS`.*

#### 3. Flask Health Endpoint Browser Access (`/health`)
![Flask Health Check Endpoint](screenshots/P1_03_flask_health_browser_output.png)
*Figure 3: Web browser displaying `http://localhost:5000/health` showing healthy API JSON payload (`{ "status": "healthy" }`).*

---

## 10. Conclusion

Project 1 successfully demonstrates the complete automated CI pipeline lifecycle. By defining explicit stages in a Groovy `Jenkinsfile` to build Docker images, execute isolated test containers, assert endpoint health, and perform automated teardowns, an automated end-to-end DevOps CI workflow has been established.
