# DevOps Lab Submission

**Student Name:** Mohammad Ahmad  
**PNR:** 23070122140  
**Subject:** DevOps Lab  
**Batch:** 2023-27  

---

## 1. Executive Summary & Overview

Welcome to the comprehensive DevOps Lab submission repository for **Mohammad Ahmad** (PNR: `23070122140`). This repository contains all completed assignments and lab projects covering modern DevOps practices, including Version Control with Git/GitHub, Agile Project Management with Jira, Containerization with Docker, Web Server Configuration with Nginx, and Continuous Integration & Continuous Deployment (CI/CD) automation using Jenkins (Freestyle, Pipeline, and Scalable Distributed Master-Agent Architectures).

Every task is structured into an independent, fully self-contained folder equipped with production-grade application code, build configurations, step-by-step setup guides, verification commands, expected outputs, and dedicated screenshot checklists.

---

## 2. Master Navigation Table

| Assignment / Project | Description | Folder Link |
| :--- | :--- | :--- |
| **Assignment TW1.1** | Git Workflow, Branching Strategy, & Merge Conflict Resolution | [Assignment_TW1.1_Git_Workflow](./Assignment_TW1.1_Git_Workflow) |
| **Assignment TW1.2** | Jira Scrum Project Setup, Issue Tracking & Workflow Management | [Assignment_TW1.2_Jira_Project](./Assignment_TW1.2_Jira_Project) |
| **Assignment TW1.3** | Dockerizing Flask App & Jenkins Freestyle CI Configuration | [Assignment_TW1.3_Docker_Jenkins](./Assignment_TW1.3_Docker_Jenkins) |
| **Project 1** | End-to-End Dockerized Jenkins Declarative CI/CD Pipeline | [Project_1_Dockerizing_Jenkins_Pipeline](./Project_1_Dockerizing_Jenkins_Pipeline) |
| **Project 2** | Production React SPA Deployment with Multi-Stage Docker & Nginx | [Project_2_Deploy_React_Docker](./Project_2_Deploy_React_Docker) |
| **Project 4** | Architecting Scalable Distributed Jenkins Pipeline across Agent Nodes | [Project_4_Distributed_Jenkins_Pipeline](./Project_4_Distributed_Jenkins_Pipeline) |
| **Project 5** | Containerizing Spring Boot Retail Application & DTR Security Scanning | [Project_5_Containerizing_DTR](./Project_5_Containerizing_DTR) |
| **Project 6** | Social Media Infra Scalability & Kubernetes Horizontal Pod Autoscaling | [Project_6_Kubernetes_Autoscaling](./Project_6_Kubernetes_Autoscaling) |
| **Project 7** | Mongo & Mongo Express Kubernetes Deployments, Services, ConfigMaps & Secrets | [Project_7_Mongo_MongoExpress](./Project_7_Mongo_MongoExpress) |
| **Project 8** | Multi-Tier E-Commerce Microservices Mesh with Kubernetes Deployments, Services, ConfigMaps & Secrets | [Project_8_Microservices_Kubernetes](./Project_8_Microservices_Kubernetes) |

---

## 3. Submission Workflow & Repository Layout

This repository has been structured in strict compliance with the prescribed naming convention (`MohammadAhmad_23070122140`). The workflow strategy ensures isolated execution, modular evolution of applications, and easy evaluation by faculty:

```
MohammadAhmad_23070122140/
│
├── README.md                                  # Top-level portfolio documentation & index
│
├── Assignment_TW1.1_Git_Workflow/             # Git repository initialization, branching & conflict handling
│   ├── hello-flask-app/                       # Python Flask Web Application base
│   ├── README.md                              # Detailed Git CLI & workflow documentation
│   └── screenshots/                           # Required screenshot checklist & proof
│       └── SCREENSHOTS_REQUIRED.md
│
├── Assignment_TW1.2_Jira_Project/             # Agile Scrum project management & issue tracking
│   ├── README.md                              # Jira project key, board structure & workflow transitions
│   └── screenshots/
│       └── SCREENSHOTS_REQUIRED.md
│
├── Assignment_TW1.3_Docker_Jenkins/           # Containerization & Jenkins Freestyle build
│   ├── hello-flask-app/                       # Containerized Flask web app
│   ├── Dockerfile                             # Container image build configuration
│   ├── README.md                              # Docker CLI & Jenkins Freestyle setup guide
│   └── screenshots/
│       └── SCREENSHOTS_REQUIRED.md
│
├── Project_1_Dockerizing_Jenkins_Pipeline/    # Advanced automated Docker CI/CD Pipeline
│   ├── flask-app/                             # Evolved Flask application codebase
│   ├── Dockerfile                             # Production Dockerfile
│   ├── Jenkinsfile                            # Declarative pipeline script (Checkout -> Build -> Run -> Test -> Clean)
│   ├── README.md                              # Complete pipeline execution breakdown
│   └── screenshots/
│       └── SCREENSHOTS_REQUIRED.md
│
├── Project_2_Deploy_React_Docker/             # Enterprise frontend container deployment
│   ├── react-app/                             # Modern React SPA built with Vite
│   ├── Dockerfile                             # Multi-stage Dockerfile (Node builder -> Nginx server)
│   ├── nginx.conf                             # Production Nginx reverse proxy configuration
│   ├── docker-compose.yml                     # Multi-container orchestration config
│   ├── README.md                              # Deployment guide & docker management commands
│   └── screenshots/
│       └── SCREENSHOTS_REQUIRED.md
│
├── Project_4_Distributed_Jenkins_Pipeline/    # Scalable Master-Agent Jenkins Pipeline
│   ├── portfolio/                             # Java Maven Portfolio Application (pom.xml & tests)
│   ├── Jenkinsfile                            # Distributed pipeline assigning tasks to slave nodes
│   ├── README.md                              # Master/Slave architecture diagram & documentation
│   └── screenshots/
│       └── SCREENSHOTS_REQUIRED.md
│
├── Project_5_Containerizing_DTR/              # Containerized Spring Boot Application & DTR Security Scanning
│   ├── src/                                   # Spring Boot Retail REST Application
│   ├── Dockerfile                             # Production Dockerfile (eclipse-temurin:17-jre-alpine)
│   ├── pom.xml                                # Maven build descriptor
│   ├── README.md                              # End-to-end containerization & security scanning guide
│   └── screenshots/
│       └── SCREENSHOTS_REQUIRED.md
│
├── Project_6_Kubernetes_Autoscaling/          # Social Media Infra & Kubernetes Horizontal Pod Autoscaler (HPA)
│   ├── app/                                   # Node.js Express Social Media Service & UI
│   ├── Dockerfile                             # Production Dockerfile (node:18-alpine)
│   ├── k8s/                                   # Kubernetes Manifests (Namespace, Deployment, Service, HPA, Load Generator)
│   ├── README.md                              # Complete architecture & autoscaling execution guide
│   └── screenshots/
│       └── SCREENSHOTS_REQUIRED.md
│
├── Project_7_Mongo_MongoExpress/              # Mongo & Mongo Express Deployments, Services, ConfigMaps & Secret
│   ├── k8s/                                   # Declarative Manifests (Namespace, Secret, ConfigMap, Deployments, Services)
│   ├── README.md                              # End-to-end architecture, DNS discovery & verification guide
│   └── screenshots/
│       └── SCREENSHOTS_REQUIRED.md
│
└── Project_8_Microservices_Kubernetes/        # 4 Microservices & Frontend Orchestration with Deployments, Services, ConfigMaps & Secrets
    ├── frontend/                              # ShopSphere Web Dashboard & API Proxy Gateway
    ├── services/                              # Product, User, Order & Notification Microservices
    ├── k8s/                                   # Declarative Kubernetes Manifests (Namespace, ConfigMap, Secret, Deployments, Services)
    ├── README.md                              # Comprehensive microservices architecture & verification guide
    └── screenshots/
        └── SCREENSHOTS_REQUIRED.md
```

---

## 4. Evaluation Checklist & Key Highlights

- **Modular Applications**: Python Flask microservices, Vite + React modern web applications, and Maven Java Portfolio projects.
- **Infrastructure as Code (IaC)**: Standardized Dockerfiles using slim base images, multi-stage builds, custom Nginx web server settings, and `docker-compose.yml`.
- **Pipeline Automation**: Full spectrum coverage from simple Jenkins Freestyle UI jobs to advanced Groovy Declarative Pipelines and Distributed Multi-Node Agent orchestration (`slave-node-1`, `slave-node-2`).
- **Comprehensive Documentation**: Every sub-folder includes a standard 10-section `README.md` and a dedicated `SCREENSHOTS_REQUIRED.md` checklist file inside its `screenshots/` directory.

---

## 5. Contact & Student Information

For any inquiries or evaluation feedback regarding this submission:
- **Student:** Mohammad Ahmad
- **PNR:** `23070122140`
- **Batch:** 2023-27
- **Course:** DevOps Lab (B.Tech Computer Science & Engineering)
