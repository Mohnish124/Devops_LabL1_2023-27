# TW1.3 – Basic Containerization (Docker) & Jenkins Freestyle Project

## Student Information

- **Name:** Mohnish Kundnani
- **PRN:** 23070122142

---

# Objective

The objective of this experiment is to understand the basics of application containerization using Docker and continuous integration using Jenkins. A simple Flask application is containerized, executed inside a Docker container, and integrated with a Jenkins Freestyle project.

---

# Project Files

```
TW1.3
│── Dockerfile
│── main.py
│── requirements.txt
│── README.md
│── Dockerfile.png
│── docker-build.png
│── docker-run.png
│── jenkins.png
│── Build-status.png
│── local-host.png
```

---

# Task 3.1 – Dockerize Flask Application

## Application

A basic Flask application was created that returns a simple **Hello World** message when accessed through a web browser.

### `main.py`

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello World from Docker!"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
```

---

## Dockerfile

```dockerfile
FROM python:3.12

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python3", "main.py"]
```

### Dockerfile Screenshot

![Dockerfile](Dockerfile.png)

---

## Build Docker Image

```bash
docker build -t hello-flask .
```

### Build Output

![Docker Build](docker-build.png)

---

## Run Docker Container

```bash
docker run -d -p 5000:5000 hello-flask
```

The container was started successfully and mapped to **port 5000**.

### Running Container

![Docker Run](docker-run.png)

### Flask Application in Browser

Access the application using:

```
http://localhost:5000
```

![Application Output](local-host.png)

---

# Task 3.2 – Jenkins Freestyle Project

A Jenkins Freestyle Project was created to clone the GitHub repository and execute shell commands for verifying the project workspace.

## Shell Commands Used

```sh
echo "Current Directory:"
pwd

echo

echo "Files in Workspace:"
ls -la
```

These commands display the current working directory along with all project files present inside the Jenkins workspace.

---

## Jenkins Configuration

![Jenkins Configuration](jenkins.png)

---

## Build Result

The repository was cloned successfully from GitHub, the shell commands executed without errors, and the build finished successfully.

![Build Status](Build-status.png)

---

# Commands Used

### Build Docker Image

```bash
docker build -t hello-flask .
```

### Run Docker Container

```bash
docker run -d -p 5000:5000 hello-flask
```

---

# Technologies Used

- Docker Desktop
- Python 3.12
- Flask
- Jenkins
- Git
- GitHub
- Visual Studio Code

---

# Learning Outcomes

- Created a Docker image using a Dockerfile.
- Executed a Flask application inside a Docker container.
- Verified the application using the localhost URL.
- Configured a Jenkins Freestyle project with a GitHub repository.
- Executed shell commands through Jenkins.
- Successfully completed the Jenkins build process.

---

# Result

The Flask application was successfully containerized using Docker and deployed locally. Jenkins was configured to fetch the project from GitHub and execute the build successfully, demonstrating the basic workflow of containerization and continuous integration.