# Project 6 - Social Media Underlying Infrastructure Challenges Using Kubernetes

## Objective

Deploy a social media web application using Kubernetes and demonstrate application scalability using Horizontal Pod Autoscaling (HPA).

## Application

The application developed for this project is **LinkVerse**, a simple social media web application.

LinkVerse is containerized using Docker, served using NGINX, and deployed on a local Kubernetes cluster using Minikube.

## Technologies Used

- Docker
- Kubernetes
- Minikube
- kubectl
- NGINX
- YAML
- HTML
- Horizontal Pod Autoscaler (HPA)
- Metrics Server
- BusyBox

## Docker Containerization

The LinkVerse application is containerized using a Dockerfile based on the NGINX Alpine image.

The Docker image created for the application is:

`linkverse:1.0`

The application runs on port `80`.

## Kubernetes Deployment

The application is deployed using a Kubernetes Deployment named:

`social-media-app`

The deployment initially runs with one replica.

The container configuration includes:

- Image: `linkverse:1.0`
- Container Port: `80`
- CPU Request: `100m`
- CPU Limit: `500m`
- Image Pull Policy: `Never`

The Docker image is loaded directly into the local Minikube environment.

## Kubernetes Service

A NodePort service named `social-media-service` is used to expose the LinkVerse application outside the Kubernetes cluster.

The application can be accessed using:

```bash
minikube service social-media-service
Horizontal Pod Autoscaler

The Horizontal Pod Autoscaler is configured with:

Minimum replicas: 1
Maximum replicas: 5
Target CPU utilization: 50%

The HPA automatically increases or decreases the number of application pods based on CPU utilization.

Load Testing and Autoscaling

A BusyBox-based load generator was used to generate continuous requests to the application.

kubectl run load-generator --image=busybox:1.36 --restart=Never -- /bin/sh -c "while true; do wget -q -O- http://social-media-service; done"

The generated load increased CPU utilization and triggered the Horizontal Pod Autoscaler.

The application successfully scaled from 1 pod to 2 pods.

Project Structure
Project 6 - Social Media Underlying Infrastructure Challenges Using Kubernetes/
│
├── README.md
├── Screenshots/
│
└── Source Code/
    ├── deployment.yaml
    ├── service.yaml
    └── social-media-app/
        ├── Dockerfile
        └── index.html
Conclusion

The LinkVerse social media application was successfully containerized using Docker and deployed on Kubernetes using Minikube.

The project successfully demonstrated Kubernetes Horizontal Pod Autoscaling by generating load using BusyBox and observing the application scale from 1 pod to 2 pods. The HPA was configured with a minimum of 1 replica, a maximum of 5 replicas, and a target CPU utilization of 50%.
