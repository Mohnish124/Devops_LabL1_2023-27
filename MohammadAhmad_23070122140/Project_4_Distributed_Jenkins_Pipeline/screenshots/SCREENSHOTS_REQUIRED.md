# Screenshot Checklist - Project 4: Distributed Jenkins Pipeline

This document lists all required screenshot proof for **Project 4: Architecting Distributed Jenkins Pipeline for Scale**.

---

## Required Screenshots List

| Screenshot ID | Title | Description | Expected Visual Evidence |
| :--- | :--- | :--- | :--- |
| `P4_SS_01` | **Jenkins Master Node & Agent Management UI** | Jenkins UI under `Manage Jenkins -> Nodes` showing Master node and configured agent nodes (`slave-node-1`, `slave-node-2`). | Nodes list showing active agent connectivity status (In Service / Idle). |
| `P4_SS_02` | **Agent Node Configuration (`slave-node-1`)** | Node configuration screen showing Name (`slave-node-1`), Labels (`slave-node-1`), Launch Method (SSH or JNLP). | Agent configuration page showing explicit agent label `slave-node-1`. |
| `P4_SS_03` | **Agent Node Configuration (`slave-node-2`)** | Node configuration screen showing Name (`slave-node-2`), Labels (`slave-node-2`), Launch Method. | Agent configuration page showing explicit agent label `slave-node-2`. |
| `P4_SS_04` | **Distributed Jenkinsfile Inspection** | Code editor snippet showing `agent { label 'slave-node-1' }` for compile stage and `agent { label 'slave-node-2' }` for test stage. | Groovy Jenkinsfile displaying agent label allocations. |
| `P4_SS_05` | **Pipeline Execution Stage View** | Jenkins Stage View UI showing stage progression across master, `slave-node-1`, and `slave-node-2`. | Stage View displaying execution across nodes (All Green). |
| `P4_SS_06` | **Slave Node 1 Compilation Console Output** | Build console output log showing Maven compilation step (`mvn clean compile`) executing on `slave-node-1`. | Console output line displaying `Running on slave-node-1`. |
| `P4_SS_07` | **Slave Node 2 Test Execution Console Output** | Build console output log showing JUnit test suite (`mvn test`) executing on `slave-node-2`. | Console output displaying `Running on slave-node-2` and `Tests run: 2, Failures: 0`. |
| `P4_SS_08` | **Artifact Archiving Verification** | Jenkins Build summary page showing archived JAR artifact (`devops-portfolio-app-1.0.0.jar`). | Build summary UI displaying archived artifact download link. |
| `P4_SS_09` | **Successful Distributed Build Summary** | Main project dashboard showing successful build status badge and node execution metrics. | Blue ball status indicator confirming zero build errors. |
