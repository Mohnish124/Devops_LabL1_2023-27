# Project 4 – Architecting Jenkins Pipeline for Scale

**Course:** DevOps Lab (TE7950)  
**Project:** 4 – Architecting Jenkins Pipeline for Scale

## Objective

Set up a distributed Jenkins pipeline that compiles and tests a Maven project on two different Jenkins agent nodes.

The pipeline uses:
- Jenkins controller
- Agent 1 for compilation
- Agent 2 for testing
- Maven
- Git
- Parallel Jenkins stages

## Project Structure

```text
Project_4_Architecting_Jenkins_Pipeline_for_Scale/
├── Jenkinsfile
├── pom.xml
├── src/
│   ├── main/java/com/devops/project4/App.java
│   └── test/java/com/devops/project4/AppTest.java
├── docker-compose.yml
├── jenkins/
│   ├── Dockerfile
│   └── README.md
├── scripts/
│   ├── compile.sh
│   └── test.sh
└── docs/
    ├── setup.md
    ├── journal-writeup.md
    └── viva.md
```

## Important Jenkins Setup

Create two Jenkins agents with these labels:

```text
maven-compile
maven-test
```

The Jenkinsfile expects these labels.

The controller should only orchestrate the pipeline. The actual Maven work is assigned to the two agent nodes.

## Pipeline Design

```text
                    Jenkins Controller
                           |
                    Checkout Source
                           |
                    +------+------+
                    |             |
              Compile Agent   Test Agent
              maven-compile   maven-test
                    |             |
                 mvn compile   mvn test
                    |             |
                    +------+------+
                           |
                     Publish Results
```

## Pipeline Stages

1. Checkout
2. Parallel Build
   - Compile on `maven-compile`
   - Test on `maven-test`
3. Archive build/test artifacts

> In a real dependency-aware pipeline, tests normally run after a successful compile/package. This lab intentionally demonstrates the distributed/parallel architecture requested by Project 4. Both agents independently check out the source and run their assigned Maven task.

## Run Locally

Install Java 17 and Maven, then:

```bash
mvn clean compile
mvn test
```

## Jenkins

1. Install Jenkins.
2. Install the Git and Pipeline plugins.
3. Configure two agents.
4. Give them labels:
   - `maven-compile`
   - `maven-test`
5. Create a Pipeline job.
6. Point the job at this Git repository, or paste/use the included `Jenkinsfile`.
7. Run Build Now.
8. Open Stage View / Blue Ocean to see the distributed stages.

## Expected Result

The console should show both agent labels being allocated and successful Maven execution.

Expected final status:

```text
Finished: SUCCESS
```
