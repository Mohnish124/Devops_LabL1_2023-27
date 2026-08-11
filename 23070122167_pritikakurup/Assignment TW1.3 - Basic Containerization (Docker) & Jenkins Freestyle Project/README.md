# Assignment TW1.3 - Basic Containerization (Docker) & Jenkins Freestyle Project

## Objective

The objective of this assignment is to learn Docker containerization and Continuous Integration (CI) using Jenkins Freestyle Projects by deploying a Python Flask application.

---

## Tools Used

- Docker
- Jenkins
- Python
- Flask
- GitHub
- macOS Terminal

---

## Part 1 – Docker

### Tasks Performed

- Created a Dockerfile for the Flask application.
- Built the Docker image using Docker.
- Ran the Docker container.
- Resolved the port conflict by mapping host port **5001** to container port **5000**.
- Verified the running Docker container.
- Checked port usage using Terminal.

### Commands Used

```bash
docker build -t flask-app .

docker run -p 5000:5000 flask-app

docker run -p 5001:5000 flask-app

docker ps

lsof -i :5000
```

---

## Part 2 – Jenkins Freestyle Project

### Repository Details

Repository:
https://github.com/pritikakurup/HelloWorld-Flask.git

Branch:
main

### Execute Shell Build Step

```bash
echo ""

echo "BUILDING: ${JOB_NAME}, BUILD #${BUILD_NUMBER}"

echo "Workspace: ${WORKSPACE}"

echo ""

echo "Listing files:"

ls -la

echo ""

echo "Hello Jenkins!"
```

> **Note:** The `cat README.md` command was removed because the repository did not initially contain a `README.md` file.

---

## Folder Structure

```text
Assignment TW1.3 - Basic Containerization (Docker) & Jenkins Freestyle Project
│
├── README.md
├── Screenshots
└── Source Code
    ├── Docker
    │   ├── Dockerfile
    │   └── Docker_Commands.md
    └── Jenkins
        └── Jenkins_Freestyle_Project.md
```

---

## Contents

- Dockerfile
- Docker Commands Documentation
- Jenkins Freestyle Project Documentation
- Assignment Screenshots

---

## Learning Outcome

This assignment provided hands-on experience with:

- Docker image creation
- Running Docker containers
- Docker port mapping
- Jenkins Freestyle Project configuration
- GitHub integration with Jenkins
- Basic Continuous Integration (CI) workflow