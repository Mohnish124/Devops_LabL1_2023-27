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
- Two Jenkins **Windows** Slave nodes configured and connected to the Master node.
  - One node should have the label `slave-1`.
  - The second node should have the label `slave-2`.
- Global Tool Configuration in Jenkins:
  - Maven installed and configured as `Maven-3.8`.
  - JDK installed and configured as `Java-25`.

## Pipeline Code (Jenkinsfile)
The following code represents our declarative distributed pipeline:

```groovy
pipeline {
    agent none

    // Define tools configured in Jenkins Global Tool Configuration
    tools {
        maven 'Maven-3.8' 
        jdk 'Java-25'
    }

    stages {
        stage('Checkout & Build') {
            // Distribute this stage to the first slave node
            agent { label 'slave-1' }
            steps {
                echo "Running Checkout and Build on Slave-1..."
                // Checkout code from source control
                checkout scm
                
                // Building the maven portfolio project
                // Note: For Windows slave nodes, use 'bat' instead of 'sh' (e.g., bat 'mvn clean compile')
                echo "Compiling the Maven project..."
                bat 'mvn clean compile'
            }
        }
        
        stage('Unit Testing') {
            agent { label 'slave-1' }
            steps {
                echo "Running Unit Tests on Slave-1..."
                bat 'mvn test'
            }
            post {
                always {
                    // Archive JUnit test results
                    junit 'target/surefire-reports/*.xml'
                }
            }
        }
        
        stage('Package & Archive Artifacts') {
            // Distribute this stage to the second slave node
            agent { label 'slave-2' }
            steps {
                echo "Running Packaging on Slave-2..."
                // Since this is a different node, we need to checkout the code again
                checkout scm
                
                // Package the application (skip tests as they were done on slave-1)
                bat 'mvn package -DskipTests'
            }
            post {
                success {
                    // Archive the built artifacts (jar/war files)
                    archiveArtifacts artifacts: 'target/*.jar, target/*.war', fingerprint: true, allowEmptyArchive: true
                }
            }
        }
        
        stage('Deploy to Staging') {
            agent { label 'slave-2' }
            steps {
                echo "Deploying portfolio to staging server from Slave-2..."
                // Simulated deployment step
                bat 'echo "Deployment successful on distributed node!"'
            }
        }
    }
}
```

## How to Run
1. Create a new **Pipeline** job in Jenkins (e.g., "Maven-Distributed-Pipeline").
2. Point the Pipeline Definition to **Pipeline script from SCM**.
3. Provide the repository URL and set the Script Path to `Project 4/Jenkinsfile`.
4. Run the build. 
5. Verify in the Jenkins console output that the stages are being executed on their respective slave nodes (`slave-1` and `slave-2`).

## Execution Flow & Screenshots

### 1. Checkout & Build Stage
Runs on `slave-1`. Checks out the source code and runs `bat 'mvn clean compile'`.
![Checkout and Build Stage](screenshots/checkout_build.png)

### 2. Unit Testing Stage
Runs on `slave-1`. Executes tests with `bat 'mvn test'` and generates JUnit reports.
![Unit Testing Stage](screenshots/unit_testing.png)

### 3. Package & Archive Stage
Runs on `slave-2`. Packages the application into a JAR/WAR file and archives it as a Jenkins artifact.
![Package and Archive Stage](screenshots/package_archive.png)

### 4. Deploy to Staging Stage
Runs on `slave-2`. A simulated deployment of the packaged application.
![Deploy to Staging Stage](screenshots/deploy_staging.png)

### 5. Final Build Status
The pipeline successfully completed all stages distributed across multiple slave nodes. Artifacts and Test Trends are captured on the build dashboard.
![Final Build Status](screenshots/build_status.png)
