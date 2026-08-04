# Screenshot Checklist - Assignment TW1.3: Docker & Jenkins Freestyle Job

This document lists all required screenshot artifacts to verify **Assignment TW1.3: Dockerizing Flask Application & Jenkins Freestyle Setup**.

---

## Required Screenshots List

| Screenshot ID | Title | Description | Expected Visual Evidence |
| :--- | :--- | :--- | :--- |
| `TW1.3_SS_01` | **Dockerfile Inspection** | Code editor displaying `Dockerfile` content using `python:3.11-slim` base image. | Editor view showing WORKDIR, COPY, RUN, EXPOSE 5000, CMD. |
| `TW1.3_SS_02` | **Docker Image Build** | Terminal execution of `docker build -t hello-flask-app:v1 .` showing layer build steps. | Terminal log ending with `Successfully tagged hello-flask-app:v1`. |
| `TW1.3_SS_03` | **Docker Image List** | Terminal execution of `docker images` showing `hello-flask-app:v1`. | Output table displaying image repository, tag, ID, and size. |
| `TW1.3_SS_04` | **Docker Container Execution** | Terminal command `docker run -d -p 5000:5000 --name flask-container hello-flask-app:v1`. | Output printing the 64-character container ID. |
| `TW1.3_SS_05` | **Running Container Verification** | Terminal execution of `docker ps` confirming active status of container. | Container status `Up X seconds`, mapping `0.0.0.0:5000->5000/tcp`. |
| `TW1.3_SS_06` | **Browser Verification** | Web browser displaying `http://localhost:5000` JSON response. | Browser rendering `{ "status": "success", "message": "Hello World...", ... }`. |
| `TW1.3_SS_07` | **Jenkins Dashboard** | Jenkins Web UI main dashboard (`http://localhost:8080`). | Dashboard displaying Freestyle Project job named `Hello-Flask-Freestyle`. |
| `TW1.3_SS_08` | **Jenkins Job UI Configuration** | Job configuration screen showing Source Code Management (Git repository URL & branch). | SCM configuration targeting GitHub repository. |
| `TW1.3_SS_09` | **Jenkins Build Step Setup** | Configuration UI showing Execute Shell build step (`pwd`, `ls -la`, Docker build/run). | Execute Shell text area displaying target shell commands. |
| `TW1.3_SS_10` | **Jenkins Build Execution & Console Output** | Console output log from Jenkins build `#1` showing shell output, `pwd`, file listing, and build status. | Console log ending with `Finished: SUCCESS` and blue ball status icon. |
