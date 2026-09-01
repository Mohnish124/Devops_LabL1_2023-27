# Project 9: Apache2 Server Using Kubernetes

## Objective
Create an Apache2 server inside a Kubernetes Deployment and access it from the host machine using Kubernetes commands.

## Work Done
- Created an Apache Deployment using the `httpd` Docker image.
- Verified that the Apache pod was running.
- Exposed Apache using a NodePort Service.
- Accessed Apache from the host machine using Minikube.
- Verified the Apache default web page.

## Commands Used

### Create Deployment
```powershell
kubectl create deployment apache-server --image=httpd:latest
```

### Check Deployment and Pod
```powershell
kubectl get deployments
kubectl get pods
```

### Expose Apache
```powershell
kubectl expose deployment apache-server --type=NodePort --port=80
```

### Check Service
```powershell
kubectl get services
```

### Access from Host Machine
```powershell
minikube service apache-server
```

## Result
The Apache2 server was successfully deployed inside Kubernetes and exposed through a NodePort Service. The Apache default web page was accessible from the host machine.

## Conclusion
This project demonstrated how to create a Kubernetes Deployment from a container image, expose it using a Service and access it externally through Minikube.
