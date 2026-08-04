# Screenshot Checklist - Project 4: Distributed Jenkins Pipeline (Minimal 3-Screenshot Set)

This document lists the **3 minimal execution screenshots** required for **Project 4**.

---

## Required Execution Proof Screenshots

| Screenshot ID | Filename | Content / What it Contains | Why it is Sufficient Evidence |
| :--- | :--- | :--- | :--- |
| `P4_SS_01` | `P4_01_local_maven_build_success.png` | Terminal output of `mvn clean test package` showing unit test execution and `devops-portfolio-app-1.0.0.jar` creation (`BUILD SUCCESS`). | Proves Java Maven compilation, unit testing, and JAR artifact packaging. |
| `P4_SS_02` | `P4_02_jenkins_nodes_and_stage_view.png` | Jenkins UI window showing Nodes management list (`master`, `slave-node-1`, `slave-node-2`) AND Stage View UI showing multi-node execution across stages. | Proves Master-Slave agent topology and multi-node pipeline orchestration. |
| `P4_SS_03` | `P4_03_slave_nodes_console_and_artifact.png` | Jenkins build console log snippet showing compilation on `slave-node-1`, testing on `slave-node-2`, and archived JAR artifact (`devops-portfolio-app-1.0.0.jar`). | Proves work offloading to slave agents and build artifact archiving. |
