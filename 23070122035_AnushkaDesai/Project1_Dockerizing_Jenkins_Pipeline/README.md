# Project 1: Dockerizing Jenkins Pipeline

## Student Details
Name: Anushka Desai
PRN: 23070122035
Course: DevOps Lab

## Project Objective
The objective of this project is to containerize a simple Flask application using Docker and automate its build & deployment process using a Jenkins pipeline. Jenkins itself is run inside a Docker container, and the pipeline builds a Docker image of the Flask app and runs it as a container.

## Tools & Technologies

* Python (Flask)
* Docker Desktop
* Jenkins (LTS, running via Docker)
* Jenkins Pipeline (Groovy / Declarative)
* Git & GitHub

## Project Workflow

```
Create Flask Application
            │
            ▼
Write Dockerfile for the App
            │
            ▼
Write Jenkinsfile (Pipeline as Code)
            │
            ▼
Run Jenkins inside a Docker Container
            │
            ▼
Create a Jenkins Pipeline Job
            │
            ▼
Jenkins Checks Out Code
            │
            ▼
Jenkins Builds Docker Image
            │
            ▼
Jenkins Runs Docker Container
            │
            ▼
Access Application on localhost:5001
```

## Step 1 - Create the Flask Application
Created a simple Flask app (`app.py`) along with a `requirements.txt` listing its dependencies.

## Step 2 - Write the Dockerfile
Created a `Dockerfile` that installs the app's dependencies, copies the source code, and runs `app.py` inside the container.

## Step 3 - Write the Jenkinsfile
Created a `Jenkinsfile` defining a 3-stage declarative pipeline:

* **Checkout** – Checks out the source code.
* **Build Docker Image** – Builds a Docker image tagged `flask-app`.
* **Run Docker Container** – Removes any existing `flask-container`, then runs a new container mapping port `5000` (container) to `5001` (host).

## Step 4 - Run Jenkins in Docker
Ran the official Jenkins LTS image as a container and completed the setup wizard (unlock key, plugin install, admin user creation).

Command

```
docker run -d -p 8080:8080 -p 50000:50000 --name myjenkins jenkins/jenkins:lts-jdk17
```

Jenkins Dashboard URL

```
http://localhost:8080
```

## Step 5 - Create a Jenkins Pipeline Job
Created a new Pipeline job named `Dockerized-Flask-Pipeline`, with:

* Definition: `Pipeline script from SCM`
* SCM: This GitHub repository
* Script Path: `Jenkinsfile`

## Step 6 - Push Code to GitHub
Committed and pushed the Dockerfile, Jenkinsfile, app.py, and requirements.txt to GitHub so Jenkins could pull them via SCM.

## Step 7 - Run the Pipeline
Triggered a build in Jenkins. The pipeline ran through all 3 stages successfully, built the Docker image, and started the container.

## Project Structure

```
my-flask-app/
│
├── app.py
├── requirements.txt
├── Dockerfile
├── Jenkinsfile
└── README.md
```

## Docker Commands Used

```
docker build -t flask-app .

docker run -d -p 5001:5000 --name flask-container flask-app

docker ps -a

docker rm -f flask-container

docker start myjenkins

docker stop <container-id>
```

## Output
The Flask application was successfully built and deployed inside a Docker container through the Jenkins pipeline, and accessed through:

```
http://localhost:5001
```

Displaying:

> "Hello World from Main Branch"

## Learning Outcomes

* Created and containerized a Flask application using Docker.
* Wrote a declarative Jenkinsfile with multiple pipeline stages.
* Ran Jenkins itself as a Docker container.
* Configured a Jenkins Pipeline job to pull code from GitHub (Pipeline script from SCM).
* Learned how Jenkins automates Docker image build & container deployment.
* Understood Docker port mapping and container lifecycle commands.

## Conclusion
This project successfully demonstrates how to containerize a Flask application using Docker and automate its build and deployment through a Jenkins pipeline. The pipeline checks out code, builds a Docker image, and runs it as a container, all triggered with a single Jenkins build. The project provides a practical understanding of CI/CD concepts using Jenkins and Docker.
