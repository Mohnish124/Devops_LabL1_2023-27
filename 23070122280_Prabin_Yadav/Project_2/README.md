# Project 2: Deploy React Application in Docker Container

## Objective
The objective of this project is to build a React application and package it inside a Docker container so that it can be built once and run consistently on any machine, without needing Node.js or npm installed on the host. The production build of the app is served using Nginx inside the container.

---

## Technologies Used

| Technology | Purpose |
|---|---|
| React | Frontend framework |
| Vite | React project scaffolding & build tool |
| Docker | Containerization |
| Nginx | Serving the production build |
| Docker CLI | Building and running images/containers |

---

## Step 1 — Create the React Application
The React project was scaffolded using Vite:

```bash
npm create vite@latest react-docker-app -- --template react
```

This generated the standard Vite + React project structure (`src/`, `public/`, `package.json`, `vite.config.js`, etc.).

## Step 2 — Run the Application Locally (Development Mode)
Before containerizing anything, the app was installed and run locally to confirm it worked correctly:

```bash
npm install
npm run dev
```

This starts Vite's development server, by default on port `5173`.

**Screenshot — App running in development mode**
Shows the default Vite + React starter page open in the browser at `localhost:5173`, confirming the project builds and runs correctly before any Docker work begins.

![React app running locally with Vite dev server](<screenshots/Screenshot 2026-08-01 135653.png>)

---

## Step 3 — Dockerize the Application
Rather than running the Vite dev server inside a container (which is meant for development, not production), the app is compiled into static files and served with Nginx. This is done using a **multi-stage Dockerfile**.

### Why a multi-stage build?
A React project only needs Node.js to *compile* the source code into static HTML/CSS/JS. Once that's done, Node.js is no longer needed to *serve* the app — a lightweight web server like Nginx is enough. Building in two stages means the final image only contains the compiled static files and Nginx, not the entire Node.js toolchain and `node_modules`. This gives:

- a much smaller final image
- faster deployments
- a smaller attack surface (less software = fewer vulnerabilities)

### Dockerfile

```dockerfile
# ---- Stage 1: Build ----
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ---- Stage 2: Serve ----
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
```

**Stage 1 (`node:20`)** installs dependencies with `npm install` and compiles the app with `npm run build`, producing a `dist/` folder containing the production-ready static files.

**Stage 2 (`nginx:alpine`)** starts from a minimal Nginx image and copies only the compiled `dist/` folder from Stage 1 into Nginx's default web root (`/usr/share/nginx/html`). Nginx then serves these static files on port 80 by default.

---

## Step 4 — Build the Docker Image
The image was built from the project directory using:

```bash
docker build -t react-docker-app .
```

**Screenshot — Docker build output**
Shows the multi-stage build running: loading the Dockerfile, pulling the `nginx:alpine` and `node:20` base images, and building `[build 1/6]` from the `node:20` image, downloading and extracting the required layers.

![Docker build output](<screenshots/Screenshot 2026-08-01 135931.png>)

The build was verified with:

```bash
docker images
```

**Screenshot — Docker images list**
Shows `react-docker-app:latest` now present locally with a content size of only **26.2 MB**, noticeably smaller than other images on the machine — a direct result of the multi-stage build discarding the Node.js build tools from the final image.

![Docker images list](<screenshots/Screenshot 2026-08-01 135945.png>)

---

## Step 5 — Run the Container
The image was run as a container, mapping host port `8080` to container port `80` (the port Nginx listens on):

```bash
docker run -d -p 8080:80 --name react-app react-docker-app
docker ps
```

- `-d` — runs the container in detached (background) mode.
- `-p 8080:80` — maps host port 8080 to container port 80.
- `--name react-app` — names the container for easy reference.

**Screenshot — `docker run` and `docker ps` output**
Shows the container being created (`06414793fb21...`) and then confirmed as running via `docker ps`: image `react-docker-app`, command `/docker-entrypoint...` (Nginx's startup script), status `Up 5 seconds`, ports `0.0.0.0:8080->80/tcp`, named `react-app`.

![docker run and docker ps output](<screenshots/Screenshot 2026-08-01 140006.png>)

---

## Step 6 — Verify in the Browser
With the container running, the app was accessed at `http://localhost:8080`.

**Screenshot — Application served from the container**
Shows the React app rendering correctly at `localhost:8080`, served entirely from the Nginx container rather than a local dev server — confirming the production build was containerized successfully.

![React app served from Docker container](<screenshots/Screenshot 2026-08-01 140019.png>)

---

## Problems Encountered

**Large image size when not using multi-stage builds**
Building the image with only the `node` base image (installing dependencies and running the dev server) would keep the entire Node.js toolchain and `node_modules` in the final image, making it much larger than necessary. Solved by splitting the Dockerfile into a build stage and a serve stage, keeping only the compiled `dist/` output in the final Nginx-based image.

**Port conflicts**
Port `8080` had to be chosen carefully since other services (e.g. Jenkins, used in Project 1) were already occupying commonly used ports on the same machine.

---

## Learning Outcomes
After completing this project, the following concepts were understood:

- Scaffolding a React project using Vite
- The difference between a development server and a production build
- Writing and understanding a multi-stage Dockerfile
- Why multi-stage builds reduce final image size
- Using Nginx as a lightweight production web server for static assets
- Building, listing, and running Docker images/containers
- Mapping container ports to host ports and verifying the result in a browser

## Author
Prabin Yadav