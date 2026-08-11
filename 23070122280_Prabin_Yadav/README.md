# DevOps Lab Submission

This repository contains the current DevOps lab submission. Each assignment and project has its own README with commands, explanations, and screenshots placed in the relevant folder.

## Repository Structure

```text
23070122280_Prabin_Yadav/
├── Assignment_1.1_(Git_Workflow_&_Collaboration)/
├── Assignment_1.2_(Jira_Project_&_Issue_Tracking)/
├── Assignment_1.3_(Basic_Containerization_(Docker)_&_Jenkins_Freestyle_Project)/
├── Project_1/
├── Project_2/
└── Project_3/
```

## Assignments and Projects

- [Assignment 1.1 - Git Workflow & Collaboration](Assignment_1.1_(Git_Workflow_&_Collaboration)/README.md)
- [Assignment 1.2 - Jira Project & Issue Tracking](Assignment_1.2_(Jira_Project_&_Issue_Tracking)/README.md)
- [Assignment 1.3 - Basic Containerization (Docker) & Jenkins Freestyle Project](Assignment_1.3_(Basic_Containerization_(Docker)_&_Jenkins_Freestyle_Project)/README.md)
- [Project 1 - Dockerizing Jenkins Pipeline](Project_1/README.md)
- [Project 2 - Deploy React Application in Docker Container](Project_2/README.md)
- [Project 3 - Distributed Jenkins Pipeline](Project_3/README.md)

## What Each Folder Contains

- Assignment 1.1 documents Git repository initialization, branching, remote push, and merge conflict resolution.
- Assignment 1.2 documents Jira Scrum project creation, issue tracking, and board movement.
- Assignment 1.3 documents Docker packaging for Flask and Jenkins Freestyle execution.
- Project 1 documents a Jenkins Pipeline that builds and deploys the React app with Docker.
- Project 2 documents React deployment in Docker with Vite and Nginx.
- Project 3 documents a distributed Jenkins pipeline using two Maven agents.

## Technologies Used

- Python
- Flask
- Git and GitHub
- Jira Cloud
- Docker
- Jenkins
- React
- Vite
- Nginx
- Maven
- Java
- JUnit 5

## Common Commands Used

```bash
git init
git checkout -b feature/user-auth
git add .
git commit -m "..."
git push -u origin feature/user-auth
git merge feature/user-auth
docker build -t flask-hello .
docker run -d -p 5000:5000 --name flask-container flask-hello
docker build -t react-docker-app .
docker run -d -p 8080:80 --name react-app react-docker-app
mvn clean
mvn compile
mvn test
mvn package
```

## Learning Outcomes

- understood Git branching and merge conflict resolution
- created and managed Jira Scrum issues and boards
- containerized Flask and React applications with Docker
- configured Jenkins Freestyle and Pipeline jobs
- set up a distributed Jenkins pipeline using multiple agents

## Notes

- Each folder contains its own screenshots and detailed explanation.
- Project 1 and Project 2 are documented in separate folders now, matching the current workspace layout.
- Project 3 documentation is stored directly in [Project_3/README.md](Project_3/README.md).
