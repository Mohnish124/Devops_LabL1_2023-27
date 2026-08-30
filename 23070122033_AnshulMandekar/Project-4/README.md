# Project 4 — Distributed Jenkins CI Pipeline for a Maven-Based Java Application

Name: Anshul Mandekar  
prn:23070122033

---
## 📖 Project Description

This project demonstrates a scalable Continuous Integration (CI) pipeline using Jenkins. A Maven-based Java application is stored in GitHub, and Jenkins distributes the Build, Test, and Package stages across two separate agent nodes. This architecture improves scalability, workload distribution, and build efficiency while demonstrating a distributed Jenkins Pipeline.

---

## 🎯 Objective

To design and implement a distributed Jenkins CI pipeline that:
- Pulls a Maven-based Java application from a GitHub repository
- Distributes pipeline stages across multiple Jenkins agent nodes
- Automates the Build → Test → Package lifecycle
- Produces a verifiable, reproducible build artifact

---

## ✅ Prerequisites

| Requirement | Details |
|---|---|
| Jenkins | Controller installed and running locally |
| JDK | JDK 24 (used by Maven and Jenkins agents) |
| Maven | Installed on agent nodes for build/test/package |
| Git | Installed for source control operations |
| GitHub account | Hosts the portfolio-app repository |
| Two Jenkins Agent nodes | Agent-1 and Agent-2, connected to the controller |

---

## 🛠️ Technologies Used

- **Jenkins** — CI orchestration (Controller + Distributed Agents)
- **Maven** — Build automation and dependency management
- **Java (JDK 24)** — Application runtime/language
- **Git & GitHub** — Version control and source hosting
- **JUnit** — Automated testing framework (executed via `mvn test`)

---

## 🚀 Project Setup

The Maven project was generated using the standard archetype, and an initial build was run to confirm the setup was working before Jenkins integration.

![Archetype Selection](screenshots/01_archetype_selection.png)

![Project Created and Initial Build Success](screenshots/02_project_created_build_success.png)

![Maven Clean Package Success](screenshots/03_maven_clean_package_success.png)

![Maven Clean Package Success](screenshots/03_maven_clean_package_success_2.png)

---

## 🗂️ Project Structure

```
Project-4/
├── portfolio-app/
│   └── src/
│       └── main/java/...
│       └── test/java/...
├── screenshots/
├── Jenkinsfile
├── pom.xml
└── README.md
```

![Project Structure](screenshots/04_project_structure.png)

---

## 🏗️ Jenkins Architecture

```
                GitHub Repository
                        │
                        ▼
               Jenkins Controller
                        │
          ┌─────────────┴─────────────┐
          │                           │
          ▼                           ▼
      Agent-1                     Agent-2
     (Build & Package)              (Test)
          │                           │
          └─────────────┬─────────────┘
                        ▼
                 Build Artifacts
```

The Jenkins Controller orchestrates the pipeline and delegates work to two dedicated agent nodes: **Agent-1** handles the Build and Package stages, while **Agent-2** independently handles the Test stage. This separation of responsibilities demonstrates horizontal workload distribution in a CI system.

### Agent Node Setup

A new node was created in Jenkins for each agent, configured, and connected to the controller.

![New Node Creation](screenshots/04_new_node_creation.png)

![Agent-1 Configuration](screenshots/04_agent1_configuration.png)

![Agent-1 Connection Page](screenshots/05_agent1_connection_page.png)

![Agent-2 Connection Page](screenshots/06_agent2_connection_page.png)

![Agent-1 Connected](screenshots/07_agent1_connected.png)

![Agent-2 Connected](screenshots/08_agent2_connected.png)

![Both Nodes Online](screenshots/09_nodes_online.png)

---

## 🔁 Pipeline Workflow

```
GitHub Repository
        │
        ▼
Jenkins Pipeline Trigger
        │
        ▼
Checkout Source Code
        │
        ▼
Build Stage (Agent-1)
        │
        ▼
Test Stage (Agent-2)
        │
        ▼
Package Stage (Agent-1)
        │
        ▼
BUILD SUCCESS
```

---

## 📋 Pipeline Stages

### Stage 1 – Build
- Executes on **Agent-1**
- Clones the GitHub repository
- Compiles the Maven project

**Command:**
```bash
mvn clean compile
```

### Stage 2 – Test
- Executes on **Agent-2**
- Runs the JUnit test cases

**Command:**
```bash
mvn test
```

### Stage 3 – Package
- Executes on **Agent-1**
- Packages the application into a JAR

**Command:**
```bash
mvn package
```

---

## 💻 Commands Used

**Maven**
```bash
mvn archetype:generate
mvn clean package
mvn clean compile
mvn test
mvn package
```

**Git**
```bash
git init
git add .
git commit -m "Initial Maven Portfolio Project"
git branch -M main
git remote add origin https://github.com/pratiklakra38/portfolio-app.git
git push -u origin main
```

---

## 📜 Jenkinsfile

```groovy
pipeline {
    agent none
    stages {
        stage('Checkout') {
            agent any
            steps {
                git branch: 'main', url: 'https://github.com/pratiklakra38/portfolio-app.git'
            }
        }
        stage('Build') {
            agent { label 'agent-1' }
            steps {
                sh 'mvn clean compile'
            }
        }
        stage('Test') {
            agent { label 'agent-2' }
            steps {
                sh 'mvn test'
            }
        }
        stage('Package') {
            agent { label 'agent-1' }
            steps {
                sh 'mvn package'
            }
        }
    }
}
```

---

## 🔗 GitHub Repository & Pipeline Job Setup

The portfolio application was pushed to GitHub, and a new Jenkins pipeline job was created and configured to pull the Jenkinsfile directly from the repository.

![GitHub Repository](screenshots/10_github_repository.png)

![New Pipeline Created](screenshots/11_new_pipeline.png)

![Pipeline Configuration](screenshots/12_pipeline_configuration.png)

---

## 🏁 Build Result

The pipeline was executed, with each stage running on its assigned agent as defined in the Jenkinsfile.

![Pipeline Success](screenshots/13_pipeline_success.png)

![Build Details](screenshots/14_build_details.png)

### Console Output — Build Stage (Agent-1)

![Console Output Build](screenshots/15_console_output_build.png)

![Console Output Build](screenshots/15_console_output_build_1.png)

![Console Output Build](screenshots/15_console_output_build_2.png)

### Console Output — Test Stage (Agent-2)

![Console Output Test](screenshots/16_console_output_test_1.png)

![Console Output Test](screenshots/16_console_output_test_2.png)

### Console Output — Package Stage (Agent-1)

![Console Output Package](screenshots/17_console_output_package_1.png)

![Console Output Package](screenshots/17_console_output_package_2.png)

![Console Output Package](screenshots/17_console_output_package_3.png)

### Full Pipeline Overview

![Pipeline Overview](screenshots/18_pipeline_overview.png)

The distributed Jenkins pipeline executed successfully across both agent nodes.

```
✓ Source Code Checkout : SUCCESS
✓ Maven Compile        : SUCCESS
✓ Maven Test           : SUCCESS
✓ Maven Package        : SUCCESS

Final Pipeline Status  : BUILD SUCCESS
```

---

## 🧩 Architecture Summary

| Component | Purpose |
|---|---|
| GitHub | Stores the Maven project source code |
| Jenkins Controller | Orchestrates the CI pipeline |
| Agent-1 | Executes Build and Package stages |
| Agent-2 | Executes Test stage |
| Maven | Builds, tests, and packages the Java application |
| Git | Version control |
| JDK 24 | Java runtime used by Maven |

---

## 🔚 Conclusion

This project successfully demonstrates a distributed Jenkins CI pipeline for a Maven-based Java application. By splitting the Build/Package and Test responsibilities across two separate agent nodes, the pipeline shows how Jenkins can scale horizontally to distribute workload, reduce single-node bottlenecks, and improve overall build efficiency. The pipeline consistently produced a `BUILD SUCCESS` result, validating both the correctness of the application code and the reliability of the distributed CI setup.
