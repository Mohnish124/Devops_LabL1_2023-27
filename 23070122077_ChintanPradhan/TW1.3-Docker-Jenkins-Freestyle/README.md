# TW1.3 — Basic Containerization (Docker) & Jenkins Freestyle Project

## Task 3.1 — Dockerize Node.js app on port 5000 (1.5 Marks)
Wrote a Dockerfile for the Node.js "Hello World" app, built the image, ran it, and
confirmed it responds on port 5000.

![Docker build output](./screenshots/01-docker-build.png)
![Docker ps - container running](./screenshots/02-docker-ps.png)
![Browser showing app on port 5000](./screenshots/03-browser-port-5000.png)

## Task 3.2 — Jenkins Freestyle project (1.5 Marks)
Set up a Jenkins Freestyle project pulling from the Git repository, with a build step
that lists the workspace contents (`ls -la`).

![Freestyle job configuration](./screenshots/04-freestyle-job-config.png)
![Freestyle console output - successful build](./screenshots/05-freestyle-console-output.png)