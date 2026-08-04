# Project 4: Architecting Jenkins Pipeline for Scale

## Overview
This project demonstrates how to architect a Jenkins Pipeline for scale by setting up a distributed pipeline. The pipeline automates the build, test, and deployment process of a Maven project (portfolio) using two different Jenkins slave nodes.

## Architecture
The pipeline is designed to execute tasks in a distributed manner across the Jenkins infrastructure:
1. **Node `slave-1`**: Handles the compute-intensive tasks such as Source Code Checkout, Maven Compilation, and Unit Testing.
2. **Node `slave-2`**: Handles the subsequent tasks like Packaging the application, Archiving the Artifacts, and Simulating the Deployment to the staging environment.

This distributed architecture ensures that a single node does not become a bottleneck, allowing for better resource utilization and scalability as the project grows.

## Prerequisites
- Jenkins Master node installed and running.
- Two Jenkins Slave nodes configured and connected to the Master node.
  - One node should have the label `slave-1`.
  - The second node should have the label `slave-2`.
- Global Tool Configuration in Jenkins:
  - Maven installed and configured as `Maven-3.8`.
  - JDK installed and configured as `Java-11`.

## Files Included
- `Jenkinsfile`: The declarative pipeline script defining the distributed stages.
- `pom.xml`: A dummy Maven Project Object Model file serving as the portfolio project.
- `README.md`: This documentation file.

## How to Run
1. Create a new **Pipeline** job in Jenkins.
2. Point the Pipeline Definition to **Pipeline script from SCM**.
3. Provide the repository URL and set the Script Path to `Project 4/Jenkinsfile`.
4. Run the build. 
5. Verify in the Jenkins console output that the stages are being executed on their respective slave nodes (`slave-1` and `slave-2`).

## Execution Flow
- **Stage 1 (Checkout & Build):** Runs on `slave-1`. Compiles the source code (`mvn clean compile`).
- **Stage 2 (Unit Testing):** Runs on `slave-1`. Executes tests and generates JUnit reports.
- **Stage 3 (Package & Archive):** Runs on `slave-2`. Packages the application into a JAR/WAR file and archives it as a Jenkins artifact.
- **Stage 4 (Deploy to Staging):** Runs on `slave-2`. A simulated deployment of the packaged application.
