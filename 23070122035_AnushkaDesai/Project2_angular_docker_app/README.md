# Project 2: Deploy Angular Application in Docker Container

## Student Details
Name: Anushka Desai
PRN: 23070122035
Course: DevOps Lab

## Project Objective
The objective of this project is to deploy an Angular application using Docker. The application is built using Angular CLI and containerized for both **development** and **production** environments — using a lightweight Docker Compose setup for development, and a multi-stage Dockerfile with Nginx for production.

## Tools & Technologies

* Angular CLI 21.2.20
* Node.js 24.13.0
* npm 11.6.2
* Docker Desktop
* Docker Compose
* Nginx (for production serving)
* VS Code
* Git & GitHub

## Project Workflow

```
Create Angular Application
            │
            ▼
Verify Angular CLI, Node.js & npm Versions
            │
            ▼
Run Application in Development Container (Docker Compose)
            │
            ▼
Access App on localhost:4200
            │
            ▼
Build Production Image (Multi-Stage Dockerfile)
            │
            ▼
Serve Production Build via Nginx Container
            │
            ▼
Access Application on localhost:80
```

## Step 1 - Verify Environment
Verified that Node.js, npm, and Angular CLI were installed correctly before starting the project.

Commands

```
node --version
npm --version
ng version
```

Output

```
Angular CLI    : 21.2.20
Node.js        : 24.13.0
Package Manager: npm 11.6.2
Operating System: win32 x64
```

## Step 2 - Run the Development Container
Created a `Dockerfile.dev` and `docker-compose.yml` to run the Angular app in a development container with live file watching.

Command

```
docker compose up --build
```

The container started successfully, bundled the app, and served it locally.

Development URL

```
http://localhost:4200
```

## Step 3 - Build the Production Image
Created a **multi-stage Dockerfile** that first builds the Angular app, then copies the compiled output into a lightweight Nginx image for production.

Command

```
docker compose -f docker-compose.prod.yml build
```

This produced a much smaller production image compared to the development image.

## Step 4 - Run the Production Container
Ran the production image, which serves the compiled Angular app through Nginx on port 80.

Command

```
docker compose -f docker-compose.prod.yml up
```

Production URL

```
http://localhost
```

## Step 5 - Verify Everything is Running
Used `docker ps` and `docker images` to confirm both the development and production setups, alongside other containers/images on the system.

## Project Structure

```
angular_docker_app/
│
├── src/
├── public/
├── package.json
├── angular.json
├── Dockerfile.dev
├── docker-compose.yml
├── docker-compose.prod.yml
├── .dockerignore
└── README.md
```

## Docker Commands Used

```
docker compose up --build

docker compose -f docker-compose.prod.yml build

docker compose -f docker-compose.prod.yml up

docker ps

docker images

docker stop <container-id>
```

## Output
The Angular application was successfully run in a development container (with live reload) and later served through a production-ready Nginx container, accessible at:

```
Development: http://localhost:4200
Production:  http://localhost
```

## Learning Outcomes

* Set up an Angular development environment inside Docker using Docker Compose.
* Understood the difference between development and production Docker builds.
* Learned to write a multi-stage Dockerfile to reduce final image size.
* Learned how to serve a compiled Angular app using Nginx inside a container.
* Practiced verifying and managing multiple running containers with `docker ps` and `docker images`.

## Conclusion
This project successfully demonstrates deploying an Angular application using Docker in two setups: a development container for live coding with hot-reload, and a production container using a multi-stage build served via Nginx. It highlights key DevOps practices such as containerized development, multi-stage builds, and image optimization.
