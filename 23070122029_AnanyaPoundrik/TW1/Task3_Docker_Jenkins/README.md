# Task 3 - Docker & Jenkins Freestyle Project

## Objective

To containerize the Python Flask "Hello World" application using Docker and configure a Jenkins Freestyle project to pull the Git repository and execute a build step.

---

## Task 3.1 - Docker Containerization

### Dockerfile

A Dockerfile was created for the Flask application.

The Dockerfile:

- Uses a lightweight Python image
- Sets the application working directory
- Copies the application files
- Installs the required Python packages
- Exposes port 5000
- Runs the Flask application

### Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py"]