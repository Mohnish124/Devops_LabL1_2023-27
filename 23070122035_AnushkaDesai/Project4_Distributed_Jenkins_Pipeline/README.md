# Project 4: Architecting Jenkins Pipeline for Scale

## Objective
To set up a **distributed Jenkins pipeline** that compiles and tests a Maven project across **two separate Jenkins agent nodes**, demonstrating how build work can be split and scaled across multiple machines instead of running on a single node.

## Technologies Used

* Jenkins (Controller + Permanent Agents)
* Apache Maven
* Jenkins Declarative Pipeline
* Windows (Controller and Agent OS)
* Jenkins Agent CLI (WebSocket connection)

## Project Description
The Maven project used for this lab is my existing **Personal Portfolio Website**, which is already hosted on GitHub. A `pom.xml` was added to the project so it could be handled as a Maven build, allowing `mvn` commands (`validate`, `compile`, `test`) to run against it. No additional Maven folder structure (e.g. `src/main/webapp`) was created, since the goal of this project was purely to demonstrate **distributed pipeline execution**, not to restructure the portfolio itself. Maven setup was verified locally using `mvn validate` before configuring the pipeline.

## Jenkins Architecture
A single Jenkins Controller was configured with two Permanent Agent nodes, each dedicated to a specific stage of the build.

```
Jenkins Controller
            │
            ├────────────────────┐
            ▼                    ▼
     compile-agent          test-agent
     Label: compile         Label: test
     Maven Compilation      Maven Testing
```

## Agent Configuration

| Agent          | Label     | Purpose             | Status    |
|----------------|-----------|---------------------|-----------|
| compile-agent  | compile   | Maven compilation   | Connected |
| test-agent     | test      | Maven testing       | Connected |

Both agents run on Windows, each with its own separate Jenkins workspace, and connect to the controller using the Jenkins Agent CLI over WebSocket.

## Pipeline Stages
The pipeline is written as a **Declarative Pipeline** using `agent none` at the top level, so that each stage can be routed to a specific labeled agent rather than running on a single fixed node.

1. **Compile** – Runs on the agent labeled `compile`. Executes `mvn clean compile` against the project's `pom.xml`.
2. **Test** – Runs on the agent labeled `test`. Executes `mvn test` against the project's `pom.xml`.

Since the pipeline was configured as a direct Pipeline Script in Jenkins (not "Pipeline script from SCM"), each stage references the local `pom.xml` path directly with Maven instead of using `checkout scm`.

## Pipeline Workflow

```
Jenkins Job Triggered
            │
            ▼
Stage: Compile (runs on compile-agent)
mvn clean compile
            │
            ▼
Stage: Test (runs on test-agent)
mvn test
            │
            ▼
Finished: SUCCESS
```

## Jenkinsfile

```groovy
pipeline {
    agent none

    stages {
        stage('Compile') {
            agent {
                label 'compile'
            }
            steps {
                bat 'mvn -f "C:\\Users\\anushka\\OneDrive\\Desktop\\Devops-Lab-L1_2023-27\\23070122035_AnushkaDesai\\Project4_Distributed_Jenkins_Pipeline\\pom.xml" clean compile'
            }
        }

        stage('Test') {
            agent {
                label 'test'
            }
            steps {
                bat 'mvn -f "C:\\Users\\anushka\\OneDrive\\Desktop\\Devops-Lab-L1_2023-27\\23070122035_AnushkaDesai\\Project4_Distributed_Jenkins_Pipeline\\pom.xml" test'
            }
        }
    }

    post {
        success {
            echo 'Distributed Jenkins Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed.'
        }
    }
}
```

## Build Result
Both stages executed successfully on their respective agents:

* **Compile stage** ran on `compile-agent` — console output confirmed `Running on compile-agent`.
* **Test stage** ran on `test-agent` — console output confirmed `Running on test-agent`.

Final pipeline status: **BUILD SUCCESS / Finished: SUCCESS**, confirming that the two stages were genuinely executed on two different, independently connected Jenkins nodes.

## Learning Outcomes

* Configured multiple Jenkins Permanent Agents and connected them to a controller using the Agent CLI over WebSocket.
* Used agent labels to route specific pipeline stages to specific nodes.
* Wrote a Declarative Pipeline using `agent none` to enable per-stage agent assignment.
* Understood how distributed builds reduce load on a single node by splitting compile and test responsibilities across separate machines.
* Verified distributed execution directly from Jenkins console output.

## Conclusion
This project demonstrates a distributed Jenkins pipeline in which Maven compilation and testing are executed on two independent agent nodes rather than a single controller. By labeling agents and using `agent none` at the pipeline level, each stage was routed to the correct node, and the console output confirmed genuine distributed execution. This provides a practical understanding of how Jenkins can scale build workloads across multiple machines.
