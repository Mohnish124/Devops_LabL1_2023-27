\# Project 4 – Architecting Jenkins Pipeline for Scale



\*\*Name:\*\* Ananya Poundrik

\*\*Roll No.:\*\* 23070122029



\## Objective



To demonstrate a distributed Jenkins pipeline that compiles and tests a Maven project using two different Jenkins agent nodes.



\## Technologies Used



\* Jenkins

\* Jenkins Pipeline

\* Maven

\* Java 21

\* Git

\* Windows Jenkins Agents



\## Project Structure



```text

Project4\_Jenkins\_Scale/

├── Jenkinsfile

├── maven-project/

│   ├── pom.xml

│   └── src/

│       ├── main/java/com/example/App.java

│       └── test/java/com/example/AppTest.java

├── .gitignore

└── screenshots/

&#x20;   ├── 01\_agent1\_online.png

&#x20;   └── 02\_distributed\_pipeline\_success.png

```



\## Maven Project



The project contains a simple Java application and a JUnit test.



The Maven project was verified locally using:



```bash

mvn clean test

```



The build completed successfully.



\## Jenkins Agents



Two Jenkins inbound agents were configured:



\### Agent 1



\* Name: `maven-agent-1`

\* Label: `maven-agent-1`

\* Remote directory: `C:\\JenkinsAgent1`



Agent 1 is responsible for compiling the Maven project.



\### Agent 2



\* Name: `maven-agent-2`

\* Label: `maven-agent-2`

\* Remote directory: `C:\\JenkinsAgent2`



Agent 2 is responsible for running the Maven tests.



\## Distributed Pipeline



The Jenkins pipeline uses:



```text

Jenkins Controller

&#x20;      │

&#x20;      ├── maven-agent-1

&#x20;      │       └── mvn clean compile

&#x20;      │

&#x20;      └── maven-agent-2

&#x20;              └── mvn test

```



Each agent independently checks out the repository before executing its assigned Maven operation.



\## Pipeline Stages



\### 1. Compile on Agent 1



The first stage runs on `maven-agent-1` and executes:



```bash

mvn clean compile

```



\### 2. Test on Agent 2



The second stage runs on `maven-agent-2` and executes:



```bash

mvn test

```



\## Evidence



\### Agent 1 Online



`01\_agent1\_online.png` shows the Jenkins agent configuration and successful connection of `maven-agent-1`.



\### Distributed Pipeline Success



`02\_distributed\_pipeline\_success.png` shows the successful execution of the compile and test stages on the two different Jenkins agents.



\## Result



A distributed Jenkins pipeline was successfully configured. The Maven project was compiled on `maven-agent-1` and tested on `maven-agent-2`, demonstrating distributed build execution and scalable Jenkins pipeline architecture.



