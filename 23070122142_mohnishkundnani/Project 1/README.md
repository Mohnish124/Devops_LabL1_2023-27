# Lab 1: Project 1 – Dockerizing Jenkins Pipeline

> **Assignment:** Demonstrate Continuous Integration and Continuous Delivery by Dockerizing Jenkins Pipeline.

---

## 📌 Project Overview

This project demonstrates the implementation of a **CI/CD pipeline using Jenkins and Docker**.

The main objective is to containerize a Python-based application using Docker and integrate the Dockerized application with a **Jenkins Pipeline**. Jenkins is used to automate the process of obtaining the source code, building the Docker environment, running the application, and performing tests.

By combining Jenkins and Docker, the project demonstrates how software development and delivery tasks can be automated instead of being performed manually.

### Technologies Used

- **Python** – Application development
- **Docker** – Application containerization
- **Docker Compose** – Container orchestration
- **Jenkins** – CI/CD automation
- **Jenkins Pipeline** – Pipeline automation
- **Git/GitHub** – Source code management

---

# 🎯 Objectives

The objectives of this project are:

1. Understand the concept of Continuous Integration and Continuous Delivery.
2. Containerize a Python application using Docker.
3. Create a Docker image using a `Dockerfile`.
4. Run the application inside a Docker container.
5. Use Docker Compose to manage the application.
6. Create a Jenkins Pipeline using a `Jenkinsfile`.
7. Automate the application build and testing process using Jenkins.
8. Verify the successful execution of the Dockerized application.

---

# 🏗️ Project Architecture

The overall workflow of the project is:

```text
                  ┌──────────────────┐
                  │     Developer    │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │   Git / GitHub   │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │     Jenkins      │
                  │    Pipeline      │
                  └────────┬─────────┘
                           │
                    Build / Execute
                           │
                           ▼
                  ┌──────────────────┐
                  │      Docker      │
                  │  Build Image     │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │ Docker Container │
                  │ Python Application│
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │ Application Test │
                  └──────────────────┘
