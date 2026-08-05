# Project 4: Architecting Jenkins Pipeline for Scale

## Distributed Jenkins Pipeline for Maven Portfolio Project Using Two Agent Nodes

## Objective

The objective of this project is to design and implement a distributed Jenkins pipeline for a Maven-based Personal Portfolio Website using two different Jenkins agent nodes.

The pipeline distributes different stages of the CI process across multiple Jenkins agents to demonstrate scalable build execution.

---

## Technologies Used

- Jenkins
- Maven
- Git
- GitHub
- Java/JSP
- HTML5
- CSS3
- JavaScript
- Jenkins Pipeline

---

## Project Description

A Maven-based Personal Portfolio Website was used to demonstrate distributed Continuous Integration using Jenkins.

The Jenkins pipeline uses two separate agent nodes:

- **compile-agent** – Compiles and packages the Maven project.
- **test-agent** – Executes the Maven testing stage.

The Jenkins Controller manages and coordinates pipeline execution between both agents.

---

## Jenkins Architecture

```text
                 Jenkins Controller
                        |
              ---------------------
              |                   |
              v                   v
        compile-agent         test-agent
        Label: compile        Label: test
              |                   |
              v                   v
       Maven Compilation       Maven Tests
              |
              v
        Maven Packaging
              |
              v
          BUILD SUCCESS
```

---

## Jenkins Agent Configuration

### Compile Agent

- Node Name: `compile-agent`
- Label: `compile`
- Executors: `1`
- Purpose: Maven compilation and packaging

### Test Agent

- Node Name: `test-agent`
- Label: `test`
- Executors: `1`
- Purpose: Maven test execution

Both agents were connected to the Jenkins Controller and used separate Jenkins workspaces.

---

## Pipeline Stages

### Stage 1: Compile

Executed on the agent with label:

```text
compile
```

Maven command:

```bash
mvn clean compile
```

### Stage 2: Test

Executed on the agent with label:

```text
test
```

Maven command:

```bash
mvn test
```

### Stage 3: Package

Executed on the compile agent.

Maven command:

```bash
mvn package -DskipTests
```

This generates the deployable WAR package for the Maven web application.

---

## Pipeline Workflow

```text
GitHub Repository
       |
       v
Jenkins Controller
       |
       v
Checkout Source Code
       |
       v
Compile Stage
compile-agent
       |
       v
mvn clean compile
       |
       v
Test Stage
test-agent
       |
       v
mvn test
       |
       v
Package Stage
compile-agent
       |
       v
mvn package -DskipTests
       |
       v
BUILD SUCCESS
```

---

## Source Code Structure

```text
Project 4
│
├── README.md
│
├── Screenshots
│   ├── Jenkins Dashboard.png
│   ├── Jenkins Agents.png
│   ├── Pipeline Success.png
│   ├── Compile Agent.png
│   ├── Test agent.png
│   ├── Build Success.png
│   ├── home.png
│   ├── about.png
│   ├── technical skills.png
│   ├── featured projects.png
│   ├── experience.png
│   ├── certifications.png
│   └── contact.png
│
└── Source Code
    ├── Jenkinsfile
    ├── pom.xml
    ├── Maven_Commands.md
    ├── Pipeline_Documentation.md
    │
    └── src
        └── main
            └── webapp
                ├── index.jsp
                ├── css
                │   └── style.css
                ├── js
                │   └── script.js
                ├── images
                ├── assets
                └── WEB-INF
                    └── web.xml
```

---

## Jenkinsfile

The Jenkinsfile uses a Declarative Pipeline with `agent none`, allowing individual stages to execute on different Jenkins agents.

The Compile stage runs on the `compile` agent, the Test stage runs on the `test` agent, and the Package stage returns to the `compile` agent.

This demonstrates distributed pipeline execution across multiple Jenkins nodes.

---

## Build Result

The distributed Jenkins pipeline executed successfully.

- Source code checkout: **SUCCESS**
- Maven Compile: **SUCCESS**
- Maven Test: **SUCCESS**
- Maven Package: **SUCCESS**
- Final Pipeline Status: **BUILD SUCCESS**

---

## Screenshots

The `Screenshots` directory contains evidence of both the Jenkins distributed pipeline execution and the Maven-based Portfolio Website.

### Jenkins Pipeline Screenshots

1. Jenkins Dashboard
2. Jenkins Agent Nodes (`compile-agent` and `test-agent`)
3. Successful Distributed Pipeline
4. Compile Stage running on `compile-agent`
5. Test Stage running on `test-agent`
6. Final Build Success

### Portfolio Website Screenshots

1. Home Page
2. About Section
3. Technical Skills Section
4. Featured Projects Section
5. Experience Section
6. Certifications Section
7. Contact Section

---

## Learning Outcomes

This project provided practical experience with:

- Jenkins Controller-Agent Architecture
- Distributed Jenkins Pipelines
- Jenkins Declarative Pipeline
- Jenkins Agent Labels
- Maven Build Automation
- GitHub Integration with Jenkins
- Continuous Integration
- Distributed Build Execution
- Pipeline Scalability
- CI Pipeline Troubleshooting

---

## Conclusion

A distributed Jenkins CI pipeline was successfully implemented for a Maven-based Personal Portfolio Website.

The compilation and packaging stages were executed on the `compile-agent`, while testing was executed independently on the `test-agent`. Jenkins coordinated the complete workflow and successfully completed the Maven build.

This project demonstrates how Jenkins can distribute CI workloads across multiple agent nodes to improve scalability and separate build responsibilities.
