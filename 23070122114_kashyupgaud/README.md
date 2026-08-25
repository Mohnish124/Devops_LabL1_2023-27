# DevOps Lab Assignments - PRN 23070122114 (Kashyup Gaud)

This repository contains the assignments and projects for the DevOps Lab.

## Directory Structure

- `Assignment TW1.1/`: Contains the Git practice files (Assignment TW1.1 & TW1.2)
- `Assignment TW1.2/`: Contains the Jira Project & Issue Tracking files
- `Assignment TW1.3/`: Contains the Docker & Jenkins setup, PDF documentation, and Python Flask application
- `Project 1/`: Dockerizing Jenkins Pipeline
- `Project 2/`: Deploy Angular/React Application in Docker Container
- `Project 4/`: Architecting Jenkins Pipeline for Scale
- `Project 5/`: Persistent Volumes (PV) and PVCs
- `Project 6/`: WordPress + MySQL on Kubernetes
- `Project 7/`: Prometheus & Grafana Monitoring
- `Project 8/`: Online Student Management System Microservices
- `Project 9/`: Apache2 Server on Kubernetes

## Assignments & Projects

### Assignment TW1.1: Git Workflow & Collaboration
- **Task 1.1:** Initialized Git repository for Python Flask application and committed to `main`.
- **Task 1.2:** Created branch `feature/user-auth`, added modifications, committed, and pushed.
- **Task 1.3:** Simulated a merge conflict, resolved it manually, and pushed the updated `main` branch.

### Assignment TW1.2: Jira Project & Issue Tracking
- **Task 2.1:** Created a new "Scrum" project for the "Hello World" application in Jira Cloud.
- **Task 2.2:** Created issues: Story ("Implement User Authentication Feature"), Task ("Setup Flask Environment"), and Bug ("Login Page Displays Error").
- **Task 2.3:** Moved "Setup Flask Environment" task to "In Progress".

### Assignment TW1.3: Basic Containerization (Docker) & Jenkins
- **Task 3.1:** Created `Dockerfile` for the Python Flask application to run on port 5000. Built and verified the image locally.
- **Task 3.2:** Set up a Jenkins Freestyle project to pull the Git repository and list workspace contents.

### Project 1: Dockerizing Jenkins Pipeline
*(Details for Project 1)*

### Project 2: Deploy Angular/React Application in Docker Container
- Containerized an Angular application using Docker.
- Created `docker-compose.yml` for orchestration.

### Project 4: Architecting Jenkins Pipeline for Scale
- Designed a distributed Jenkins pipeline.
- Configured tasks to run across multiple Jenkins slave nodes (`slave-1` and `slave-2`) for a Maven portfolio project.

### Project 8: Containerize a Complete Application with 4 Microservices
- Containerized an Online Student Management System across 4 microservices (Frontend, Auth Service, Student API Backend, and MongoDB).
- Implemented Kubernetes Deployments, Services (LoadBalancer & ClusterIP for service discovery), ConfigMaps, and Secrets.
- Demonstrated dynamic pod scaling and full end-to-end inter-service communication.

### Project 9: Apache2 Server on Kubernetes
- Deployed an Apache HTTP Server (`httpd`) inside a Kubernetes cluster using a Deployment.
- Used a ConfigMap to inject a custom HTML web page into the Apache container.
- Exposed the web server to the host machine using a LoadBalancer Service.
