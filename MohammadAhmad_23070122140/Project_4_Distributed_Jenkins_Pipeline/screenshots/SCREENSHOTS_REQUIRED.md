# Screenshot Checklist - Project 4: Distributed Jenkins Pipeline (Optimized)

This document lists the **5 essential execution screenshots** required to verify **Project 4**.

---

## Required Execution Proof Screenshots

| Screenshot ID | Filename | Content / What it Contains | Why it is Necessary |
| :--- | :--- | :--- | :--- |
| `P4_SS_01` | `P4_01_local_maven_build_success.png` | Terminal execution of `mvn clean test package` showing unit test execution and `devops-portfolio-app-1.0.0.jar` creation (`BUILD SUCCESS`). | Proves Java Maven compilation and test suite execution. |
| `P4_SS_02` | `P4_02_jenkins_nodes_management_list.png` | Jenkins UI under `Manage Jenkins -> Nodes` showing Master and agent nodes (`slave-node-1`, `slave-node-2`). | Proves distributed agent node topology setup. |
| `P4_SS_03` | `P4_03_distributed_pipeline_stage_view.png` | Jenkins Stage View UI showing stage execution across master, `slave-node-1`, and `slave-node-2`. | Proves multi-node pipeline orchestration. |
| `P4_SS_04` | `P4_04_slave_nodes_console_execution.png` | Jenkins build console output log snippet showing compilation running on `slave-node-1` and JUnit test suite running on `slave-node-2`. | Proves execution offloading to slave agent nodes. |
| `P4_SS_05` | `P4_05_archived_jar_artifact_summary.png` | Jenkins Build Summary page displaying archived artifact (`devops-portfolio-app-1.0.0.jar`) and `Finished: SUCCESS`. | Proves artifact archiving on Master. |
