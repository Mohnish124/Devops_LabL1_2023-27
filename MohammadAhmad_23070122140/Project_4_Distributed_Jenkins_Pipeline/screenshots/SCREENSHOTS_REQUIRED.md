# Screenshot Checklist - Project 4: Distributed Jenkins Pipeline

This document lists the verified execution screenshots for **Project 4: Architecting Distributed Jenkins Pipeline for Scale**.

---

## Verified Execution Proof Screenshots

| Status | Screenshot ID | Filename | Content / What it Contains | Why it is Sufficient Evidence |
| :---: | :--- | :--- | :--- | :--- |
| ✅ | `P4_SS_01` | `P4_01_local_maven_build_success.png` | Terminal execution of `mvn clean test package` showing unit test execution (`12 passed`), JAR creation (`devops-portfolio-app-1.0.0.jar`), and `BUILD SUCCESS`. | Proves Java Maven source compilation, JUnit test suite execution, and local JAR artifact packaging. |
| ✅ | `P4_SS_02` | `P4_02_jenkins_nodes_and_stage_view.png` | Combined UI view showing Jenkins `Manage Nodes` dashboard (`master`, `slave-node-1`, `slave-node-2` all Online) and Pipeline Stage View showing 4 green stages (`Compile`, `Test`, `Archive`, `Success`). | Proves Master-Slave agent node topology setup and multi-node pipeline orchestration. |
| ✅ | `P4_SS_03` | `P4_03_slave_nodes_console_and_artifact.png` | Jenkins build console log showing compilation running on `slave-node-1`, test execution running on `slave-node-2`, artifact archiving (`target/devops-portfolio-app-1.0.0.jar`), and `Finished: SUCCESS`. | Proves execution offloading across slave agent nodes, build artifact archiving, and overall build success. |

