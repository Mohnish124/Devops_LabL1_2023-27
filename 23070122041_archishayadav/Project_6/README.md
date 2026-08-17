# Project 6 - Social Media Underlying Infrastructure Challenges Using Kubernetes

## Objective
Deploy a social media application using Kubernetes and demonstrate application scalability using Horizontal Pod Autoscaling (HPA).

The project demonstrates Kubernetes deployment, service exposure, metrics monitoring, CPU-based autoscaling, load generation, and automatic scaling of application replicas.

## Application
* The application is a web application deployed using an NGINX container.
* The application is deployed on a local Kubernetes cluster using Minikube.

## Technologies Used
* Kubernetes
* Minikube
* `kubectl`
* Docker
* NGINX
* YAML
* Horizontal Pod Autoscaler (HPA)
* Metrics Server

## Kubernetes Components

### Deployment
* The application is deployed using a Kubernetes Deployment named `social-media-app`.
* The deployment manages the application pods and allows Kubernetes to increase or decrease the number of replicas based on CPU utilization.

### Service
* A NodePort service named `social-media-service` is used to expose the application outside the Kubernetes cluster.

### Horizontal Pod Autoscaler
The HPA is configured with:
* **Minimum replicas:** 1
* **Maximum replicas:** 5
* **Target CPU utilization:** 50%

The HPA automatically increases the number of application pods when CPU utilization increases and reduces the number of pods when the load decreases.

### Metrics Server
* The Kubernetes Metrics Server is enabled in Minikube to provide CPU and memory metrics required by the HPA.
* Node metrics were verified using `kubectl top nodes`.
* Pod metrics were verified using `kubectl top pods`.

## Load Testing
A BusyBox-based load generator was used to generate continuous requests to the application.

The command used was:
```bash
kubectl run load-generator --image=busybox:1.36 --restart=Never -- /bin/sh -c "while true; do wget -q -O- http://social-media-service; done"
```

* The increased CPU load caused the HPA to scale the application from 1 replica to 2 replicas.
* The HPA was monitored using `kubectl get hpa -w`.
* The application pods were monitored using `kubectl get pods -w`.

## Verification

The following commands were used to verify the Kubernetes deployment:

```bash
kubectl get pods
kubectl get services
kubectl get hpa
kubectl get hpa -w
kubectl get pods -w
```

The application was successfully accessed through the Minikube service URL.Autoscaling ResultThe Horizontal Pod Autoscaler successfully demonstrated application scalability.ConfigurationValueMinimum replicas1Maximum replicas5Target CPU utilization50%Initial replicas1Scaled replicas observed2Scaling mechanismCPU utilizationLoad generatorBusyBoxMetrics providerMetrics ServerThe application scaled from 1 pod to 2 pods when CPU load increased.After the load generator was removed, the application scaled back toward the configured minimum of 1 pod.

## Project Structure

The project contains the following files and folders:
├── README.md
├── Screenshots/
│   └── (contains the project implementation screenshots)
└── Source Code/
    ├── deployment.yaml
    └── service.yaml
    
## Conclusion
The social media application was successfully deployed on Kubernetes using Minikube.The project successfully demonstrated Kubernetes Horizontal Pod Autoscaling by generating CPU load and observing the application scale from 1 pod to 2 pods. The HPA was configured with a minimum of 1 replica and a maximum of 5 replicas, demonstrating automatic application scalability.
