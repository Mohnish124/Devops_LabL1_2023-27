# Architecting a Distributed Jenkins Pipeline using Maven

## Project Title

**Project 4: Architecting Jenkins Pipeline for Scale**

**Objective:** Configure a distributed Jenkins pipeline that compiles and tests a Maven project on two different Jenkins agent nodes.

---

# Objective

The objective of this project is to demonstrate Jenkins distributed architecture by configuring multiple Jenkins agents (slave nodes) and executing different stages of a Maven pipeline on separate nodes. The project simulates a scalable Continuous Integration (CI) environment where compilation and testing are distributed across different build agents.

---

# Technologies Used

- Jenkins 2.572
- Apache Maven
- Java JDK 17
- Git
- GitHub
- Windows 11
- Visual Studio Code
- JUnit 5

---

# Project Architecture

```
                        GitHub Repository
                               │
                               ▼
                      Jenkins Controller
                               │
                 ┌─────────────┴─────────────┐
                 ▼                           ▼
          Compile Agent                 Test Agent
           (mvn compile)                 (mvn test)
                 │                           │
                 └─────────────┬─────────────┘
                               ▼
                         BUILD SUCCESS
```

---

# Project Structure

```
jenkins-distributed-pipeline/
│
├── src/
│   ├── main/
│   │   └── java/
│   │       └── com/example/
│   │           └── Calculator.java
│   │
│   └── test/
│       └── java/
│           └── com/example/
│               └── CalculatorTest.java
│
├── pom.xml
├── Jenkinsfile
└── README.md
```

---

# Software Requirements

- Jenkins
- Java JDK 17
- Apache Maven
- Git
- GitHub
- Visual Studio Code

---

# Maven Overview

Apache Maven is a build automation and dependency management tool used for Java projects.

It is responsible for:

- Managing project dependencies
- Compiling Java source code
- Running unit tests
- Packaging applications
- Automating the build process

The project configuration is stored in the **pom.xml** file.

---

# Jenkins Distributed Architecture

The project uses:

- **Jenkins Controller**
- **Compile Agent**
- **Test Agent**

### Jenkins Controller

The controller coordinates the entire pipeline but does not execute build tasks.

### Compile Agent

Responsible for compiling the Java source code using Maven.

Command executed:

```bash
mvn compile
```

### Test Agent

Responsible for executing JUnit test cases.

Command executed:

```bash
mvn test
```

---

# Jenkins Agents Configuration

Two permanent Jenkins agents were configured.

## Compile Agent

- Node Name: compile-agent
- Label: compile
- Executors: 1
- Remote Workspace:

```
C:\Jenkins\compile-agent
```

---

## Test Agent

- Node Name: test-agent
- Label: test
- Executors: 1
- Remote Workspace:

```
C:\Jenkins\test-agent
```

---

# Jenkins Pipeline

The Jenkins pipeline distributes the build process across two agents.

```groovy
pipeline {
    agent none

    stages {

        stage('Compile') {
            agent {
                label 'compile'
            }

            steps {
                bat 'mvn compile'
            }
        }

        stage('Test') {
            agent {
                label 'test'
            }

            steps {
                bat 'mvn test'
            }
        }
    }
}
```

---

# Pipeline Workflow

### Stage 1

Repository cloned from GitHub.

↓

### Stage 2

Pipeline scheduled on **compile-agent**

↓

Compile Java Project

```
mvn compile
```

↓

BUILD SUCCESS

↓

### Stage 3

Pipeline scheduled on **test-agent**

↓

Run JUnit Tests

```
mvn test
```

↓

BUILD SUCCESS

---

# Maven Commands Used

Compile

```bash
mvn compile
```

Run Tests

```bash
mvn test
```

---

# Build Output

Compilation completed successfully.

```
BUILD SUCCESS
```

JUnit Test Result

```
Tests run: 1
Failures: 0
Errors: 0
Skipped: 0
```

Overall Pipeline Result

```
Finished: SUCCESS
```

---

# Learning Outcomes

After completing this project, the following concepts were understood:

- Apache Maven
- Maven Project Structure
- pom.xml Configuration
- Jenkins Controller
- Jenkins Agents (Distributed Nodes)
- Distributed Jenkins Pipeline
- GitHub Integration with Jenkins
- Maven Compilation
- Automated Unit Testing using JUnit
- Continuous Integration (CI)

---

# Advantages of Distributed Jenkins Pipelines

- Improved scalability
- Faster build execution
- Better resource utilization
- Parallel execution capability
- Easy management of large projects
- Better fault isolation
- Supports enterprise CI/CD environments

---

# Conclusion

This project successfully demonstrates the implementation of a distributed Jenkins Pipeline using Apache Maven. Two Jenkins agents were configured to independently execute compilation and testing stages. The controller coordinated the workflow while the agents executed their assigned tasks. The Maven project compiled successfully, all JUnit test cases passed, and the pipeline completed with a **BUILD SUCCESS**, demonstrating an effective Continuous Integration workflow.

---

# Screenshots

## 1. Maven Project Structure

---

## 2. Jenkins Nodes

**Include:**

- Built-In Node
- compile-agent (Online)
- test-agent (Online)

---

## 3. Compile Agent Running

(Command Prompt showing compile-agent connected)

---

## 4. Test Agent Running

(Command Prompt showing test-agent connected)

---

## 5. Jenkins Pipeline Configuration

---

## 6. Console Output – Compile Stage



![1785608489596](image/README/1785608489596.png)

---

## 7. Console Output – Test Stage

Capture:

---

## 8. Final Pipeline Status

# References

- Jenkins Documentation
- Apache Maven Documentation
- Git Documentation
- JUnit 5 Documentation
