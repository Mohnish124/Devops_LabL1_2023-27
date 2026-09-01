# Project 1 — Dockerizing Jenkins Pipeline

**Student:** Aayush Joshi | **PRN:** 23070122008

---

## Overview

This project sets up a **Jenkins declarative pipeline** that uses Docker as its build agent. The pipeline automatically builds a Docker image for the Flask "Hello World" application and deploys it.

---

## Architecture

```
GitHub Repo
    │
    ▼
Jenkins Pipeline (Jenkinsfile)
    │
    ├── Stage: Checkout
    ├── Stage: Install Dependencies  (inside Docker container)
    ├── Stage: Test
    ├── Stage: Build Docker Image
    └── Stage: Deploy
```

---

## Jenkinsfile Pipeline Stages

| Stage | Description |
|-------|-------------|
| Checkout | Pulls source code from GitHub |
| Install Dependencies | Runs `pip install` inside Docker agent |
| Test | Runs pytest (skips if no tests) |
| Build Docker Image | Builds `hello-world-flask:latest` |
| Deploy | Stops old container, starts new one on port 5000 |

---

## How to Run

1. Ensure Jenkins is running with the **Docker plugin** installed
2. Create a new **Pipeline** job in Jenkins
3. Set **Pipeline Definition** = "Pipeline script from SCM"
4. Set SCM = Git, point to this repo
5. Set **Script Path** = `23070122008_AayushJoshi/Project1-Dockerized-Jenkins-Pipeline/Jenkinsfile`
6. Click **Build Now**

---

## Screenshots

![Jenkins pipeline job creation](./screenshots/01-pipeline-job-creation.png)
![Pipeline configuration SCM](./screenshots/02-pipeline-scm-config.png)
![Pipeline stages view](./screenshots/03-pipeline-stages.png)
![Build Docker Image stage](./screenshots/04-build-docker-stage.png)
![Deploy stage success](./screenshots/05-deploy-success.png)
![App running at localhost:5000](./screenshots/06-app-running.png)
