\# Lab 2 – Project 2: Deploy Angular Application in Docker Container



\*\*Name:\*\* Ananya Poundrik

\*\*Roll No.:\*\* 23070122029

\*\*Project:\*\* Deploy Angular Application in Docker Container



\## Objective



To create an Angular application using Angular CLI and deploy it using Docker. The project demonstrates Docker deployment for development and production environments using Docker Compose.



\## Technologies Used



\* Angular CLI

\* Angular

\* Node.js

\* Docker

\* Docker Compose

\* Nginx



\## Project Structure



```text

Project2\_Angular\_Docker/

├── angular-app/

│   ├── Dockerfile

│   ├── package.json

│   ├── package-lock.json

│   ├── angular.json

│   ├── src/

│   └── ...

├── docker-compose.yml

├── docker-compose.prod.yml

├── screenshots/

│   ├── 01\_angular\_app\_running.png

│   ├── 02\_angular\_docker\_running.png

│   ├── 03\_compose\_development.png

│   └── 04\_compose\_production.png

└── README.md

```



\## 1. Angular Application Creation



Angular CLI was installed using:



```bash

npm install -g @angular/cli

```



The Angular application was created using:



```bash

ng new angular-app

```



The application was tested locally using:



```bash

ng serve

```



The application was accessed at:



```text

http://localhost:4200

```



\## 2. Angular Production Build



The production build was generated using:



```bash

npm run build

```



The generated build was available inside:



```text

dist/angular-app/browser

```



\## 3. Dockerfile



The Angular application uses a multi-stage Docker build.



The first stage uses Node.js to install dependencies and build the Angular application. The second stage uses Nginx to serve the generated production files.



Docker image was built using:



```bash

docker build -t angular-docker-app .

```



The Docker container was run using:



```bash

docker run -d -p 8081:80 --name angular-docker-container angular-docker-app

```



The Dockerized application was accessed at:



```text

http://localhost:8081

```



\## 4. Docker Compose – Development



The development Compose configuration is provided in:



```text

docker-compose.yml

```



It builds the Angular Docker image and maps port 8081 on the host to port 80 inside the container.



The development environment was started using:



```bash

docker compose up -d

```



The running services were checked using:



```bash

docker compose ps

```



Application URL:



```text

http://localhost:8081

```



\## 5. Docker Compose – Production



The production Compose configuration is provided in:



```text

docker-compose.prod.yml

```



The production environment uses port 8082 on the host.



It was started using:



```bash

docker compose -f docker-compose.prod.yml up -d

```



The services were checked using:



```bash

docker compose -f docker-compose.prod.yml ps

```



Production application URL:



```text

http://localhost:8082

```



\## 6. Screenshots / Evidence



\### Angular Application Running



`01\_angular\_app\_running.png`



Shows the Angular application running using the Angular development server.



\### Angular Application in Docker



`02\_angular\_docker\_running.png`



Shows the Angular application successfully deployed inside a Docker container.



\### Development Docker Compose



`03\_compose\_development.png`



Shows the Angular application running using Docker Compose for the development environment.



\### Production Docker Compose



`04\_compose\_production.png`



Shows the Angular application running using Docker Compose for the production environment.



\## Result



The Angular application was successfully created using Angular CLI, containerized using Docker, and deployed using Docker Compose for both development and production environments.



