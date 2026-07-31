# Project 4: Architecting Jenkins Pipeline for Scale-Use Jenkins to Set Up a Distributed Pipeline for Maven Project (Portfolio) for Two Different Slave Nodes

## Objective

The objective of this project is to design and implement a distributed Jenkins pipeline that compiles and tests a Maven-based Personal Portfolio Website using two different Jenkins slave nodes.

---

## Technologies Used

- Jenkins
- Maven
- Java JSP
- HTML5
- CSS3
- JavaScript
- GitHub

---

## Project Description

A Maven-based Personal Portfolio Website was used as the sample project for demonstrating Jenkins distributed pipeline execution.

The pipeline was configured to:

- Compile the Maven project on **Slave Node 1**
- Execute the testing stage on **Slave Node 2**
- Complete the build successfully through the Jenkins Master node

---

## Source Code

The project includes:

- `index.jsp`
- `style.css`
- `script.js`
- `Jenkinsfile`
- Maven command documentation
- Pipeline documentation

---

## Folder Structure

```text
Project 4
│
├── README.md
├── Screenshots
└── Source Code
    ├── index.jsp
    ├── style.css
    ├── script.js
    ├── Jenkinsfile
    ├── Maven_Commands.md
    └── Pipeline_Documentation.md
```

---

## Learning Outcome

This project enhanced my understanding of:

- Distributed Jenkins Pipelines
- Master-Agent Architecture
- Maven Build Automation
- Continuous Integration (CI)
- Pipeline Scalability