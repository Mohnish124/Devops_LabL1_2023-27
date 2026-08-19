# Project 4 — Architecting Jenkins Pipeline for Scale (Distributed Maven Build)

**Student:** Aayush Joshi | **PRN:** 23070122008

---

## Overview

This project configures **Jenkins with a distributed build architecture** using a master node and **two slave nodes** to build a Maven-based portfolio project across different stages.

---

## Architecture

```
Jenkins Master
    │
    ├── Slave Node 1 (slave-1)   ← Build + Package stages
    └── Slave Node 2 (slave-2)   ← Test stage
```

### Why Distributed?
- **Parallelism**: Different stages run on different machines
- **Resource optimization**: Heavy builds don't block the master
- **Scalability**: Easy to add more slave nodes

---

## Pipeline Stages

| Stage | Node | Action |
|-------|------|--------|
| Checkout | master | Pull code, stash source |
| Build | slave-1 | `mvn clean compile` |
| Test | slave-2 | `mvn test` |
| Package | slave-1 | `mvn package`, archive JAR |

---

## Slave Node Setup

**For each slave node:**
1. Go to Jenkins → Manage Jenkins → Nodes → New Node
2. Create a permanent agent with label `slave-1` or `slave-2`
3. Set Remote root directory (e.g., `/home/jenkins/agent`)
4. Launch via SSH or JNLP

---

## How to Run

1. Set up Jenkins master + 2 slave agents (labeled `slave-1` and `slave-2`)
2. Ensure Maven and Java are installed on both slaves
3. Create a **Pipeline** job pointing to this `Jenkinsfile`
4. Click **Build Now** — watch stages distribute across nodes

---

## Screenshots

![Jenkins nodes overview (master + 2 slaves)](./screenshots/01-jenkins-nodes.png)
![Slave-1 node configuration](./screenshots/02-slave1-config.png)
![Slave-2 node configuration](./screenshots/03-slave2-config.png)
![Pipeline job configuration](./screenshots/04-pipeline-config.png)
![Pipeline running - stages visible](./screenshots/05-pipeline-stages.png)
![Build on slave-1 console](./screenshots/06-slave1-build-log.png)
![Test on slave-2 console](./screenshots/07-slave2-test-log.png)
![Package + archive artifacts](./screenshots/08-artifacts-archived.png)
![Final pipeline success](./screenshots/09-pipeline-success.png)
