# Project 6 - Social Media Underlying Infrastructure Challenges Using Kubernetes

## Objective

To implement application scalability for a social media application using Kubernetes by creating a Kubernetes cluster and demonstrating automatic scaling using Horizontal Pod Autoscaler (HPA).

## Technologies Used

- Docker
- Kubernetes
- Minikube
- kubectl
- Node.js
- Express.js
- Kubernetes Metrics Server
- Horizontal Pod Autoscaler (HPA)

## Application

A simple Social Media application named SocialSphere was developed using Node.js and Express.js. The application was containerized using Docker and deployed on Kubernetes.

## Kubernetes Architecture

User
↓
Kubernetes Service
↓
Kubernetes Deployment
↓
Application Pods
↓
Horizontal Pod Autoscaler
↓
Automatic Scaling

## Autoscaling Configuration

- Minimum replicas: 2
- Maximum replicas: 10
- CPU utilization target: 50%

## Implementation

1. Created a Kubernetes cluster using Minikube.
2. Enabled Kubernetes Metrics Server.
3. Created and containerized the SocialSphere application using Docker.
4. Created a Kubernetes Deployment with 2 initial replicas.
5. Exposed the application using a Kubernetes NodePort Service.
6. Configured Horizontal Pod Autoscaler.
7. Generated workload using a Kubernetes load-generator pod.
8. Observed automatic increase in application replicas.
9. Removed the workload and observed scale-down.

## Result

The Social Media application was successfully deployed on Kubernetes. Horizontal Pod Autoscaler automatically increased the number of pods when CPU utilization increased and reduced the replicas when the workload decreased, demonstrating application scalability.