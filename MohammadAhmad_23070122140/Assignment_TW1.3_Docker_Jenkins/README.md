# Assignment TW1.3: Dockerizing Flask Application & Jenkins Freestyle Project

**Student Name:** Mohammad Ahmad  
**PNR:** 23070122140  
**Subject:** DevOps Lab  
**Batch:** 2023-27  

---

## 1. Introduction

Containerization and Continuous Integration (CI) are central pillars of modern DevOps workflows. Containerizing applications ensures environment consistency across development, testing, and production environments, while CI automation tools like Jenkins automate application build and testing workflows.

This assignment demonstrates containerizing the Python Flask application introduced in TW1.1 using a lightweight Docker image (`python:3.11-slim`) and building a **Jenkins Freestyle Project** configured via the Jenkins Web UI to execute automated shell builds.

---

## 2. Objectives

- Write a production-grade `Dockerfile` using the lightweight `python:3.11-slim` base image.
- Configure working directories, dependency installation caching, port exposure (5000), and entrypoint commands.
- Build and run the container locally using Docker CLI (`docker build`, `docker run`, `docker ps`).
- Verify container accessibility via `http://localhost:5000`.
- Create and configure a **Jenkins Freestyle Project** (`Hello-Flask-Freestyle`).
- Configure Source Code Management (Git repository integration) in the Jenkins UI.
- Configure build steps using **Execute Shell** commands (`pwd`, `ls -la`, `docker build`).
- Verify build console output logs and document screenshot requirements.

---

## 3. Folder Structure

```
Assignment_TW1.3_Docker_Jenkins/
├── hello-flask-app/
│   ├── app.py              # Flask application codebase
│   └── requirements.txt     # Python dependencies
├── Dockerfile              # Docker container build specification
├── README.md               # Complete Docker & Jenkins Freestyle guide
└── screenshots/            # Verification screenshot requirements
    └── SCREENSHOTS_REQUIRED.md
```

---

## 4. Prerequisites

- **Docker Desktop** / Docker Engine (v20.10+ installed and running)
- **Jenkins Server** (v2.400+ running locally on port 8080 or remote server)
- **Git CLI** and active GitHub Repository containing application files

---

## 5. Installation

1. Navigate to directory:
   ```bash
   cd Assignment_TW1.3_Docker_Jenkins
   ```
2. Build Docker image:
   ```bash
   docker build -t hello-flask-app:v1 .
   ```
3. Run container:
   ```bash
   docker run -d -p 5000:5000 --name flask-app-container hello-flask-app:v1
   ```
4. Verify execution:
   ```bash
   docker ps
   ```

---

## 6. Commands

### Local Docker Commands:
```bash
# Build image
docker build -t hello-flask-app:v1 .

# List images
docker images

# Run container
docker run -d -p 5000:5000 --name flask-app-container hello-flask-app:v1

# Inspect active container
docker ps

# Inspect logs
docker logs flask-app-container
```

### Jenkins Freestyle Job Build Shell Script:
```bash
#!/bin/bash
echo "=== Jenkins Build Job Started ==="
echo "Current Workspace Directory:"
pwd

echo "Directory Listing:"
ls -la

echo "Building Docker Image..."
docker build -t hello-flask-freestyle:${BUILD_NUMBER} .

echo "Verifying Docker Image Creation..."
docker images | grep hello-flask-freestyle

echo "=== Jenkins Build Job Finished Successfully ==="
```

---

## 7. Expected Output

```text
Started by user Mohammad Ahmad
Running as SYSTEM
Building in workspace /var/jenkins_home/workspace/Hello-Flask-Freestyle
+ echo '=== Jenkins Build Job Started ==='
=== Jenkins Build Job Started ===
+ pwd
/var/jenkins_home/workspace/Hello-Flask-Freestyle
+ ls -la
total 24
drwxr-xr-x 4 jenkins jenkins 4096 Aug  4 09:20 .
drwxr-xr-x 3 jenkins jenkins 4096 Aug  4 09:20 ..
-rw-r--r-- 1 jenkins jenkins  345 Aug  4 09:20 Dockerfile
-rw-r--r-- 1 jenkins jenkins 1850 Aug  4 09:20 README.md
drwxr-xr-x 2 jenkins jenkins 4096 Aug  4 09:20 hello-flask-app
+ docker build -t hello-flask-freestyle:1 .
Successfully tagged hello-flask-freestyle:1
+ echo '=== Jenkins Build Job Finished Successfully ==='
=== Jenkins Build Job Finished Successfully ===
Finished: SUCCESS
```

---

## 8. Explanation

| Command / Term | Purpose |
| :--- | :--- |
| `FROM python:3.11-slim` | Base Docker image providing minimal Python runtime environment (~140MB). |
| `WORKDIR /app` | Sets working directory path inside container filesystem for subsequent directives. |
| `COPY <src> <dest>` | Copies files from host build context into container image filesystem. |
| `RUN pip install ...` | Executes package installation command during container image build step. |
| `EXPOSE 5000` | Documents container runtime listening port for network mapping. |
| `docker build -t` | Builds Docker image from Dockerfile and tags image with repository/name. |
| `docker run -d -p` | Runs container in background (detached mode) and maps host port to container port. |
| `Jenkins Freestyle Project` | Configurable Jenkins build item managed via graphical web UI without writing Groovy DSL scripts. |
| `Execute Shell` | Jenkins build step component executing arbitrary bash commands in agent workspace. |

---

## 9. Screenshots Section

All required visual proofs are detailed in [SCREENSHOTS_REQUIRED.md](./screenshots/SCREENSHOTS_REQUIRED.md).

Place screenshot files inside `screenshots/` directory:
- `TW1.3_SS_02_docker_build.png`
- `TW1.3_SS_05_docker_ps.png`
- `TW1.3_SS_06_browser_5000.png`
- `TW1.3_SS_08_jenkins_freestyle_config.png`
- `TW1.3_SS_10_jenkins_console_output.png`

---

## 10. Conclusion

This assignment successfully establishes containerization and CI automation foundations. The Flask application was encapsulated into a portable Docker image, built and executed locally via Docker CLI, and integrated into a **Jenkins Freestyle Project** that automates workspace directory verification and image compilation upon code checkout.
