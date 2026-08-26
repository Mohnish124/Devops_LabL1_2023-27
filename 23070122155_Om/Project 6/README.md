# Project 6: Kubernetes Autoscaling

## Objective
Demonstrate application scalability by creating a Kubernetes cluster and configuring automatic scaling.

## Work Done
- Started a Kubernetes cluster using Minikube.
- Verified the cluster and node using `kubectl`.
- Enabled the Metrics Server addon.
- Deployed `social-media-app`.
- Configured a Horizontal Pod Autoscaler (HPA).
- Set CPU target to 50%, minimum replicas to 1 and maximum replicas to 5.
- Verified deployments, pods and HPA status.

## Commands Used
```powershell
minikube start
minikube status
kubectl get nodes
minikube addons enable metrics-server
kubectl get pods
kubectl autoscale deployment social-media-app --cpu=50% --min=1 --max=5
kubectl get hpa
kubectl get deployments
kubectl get pods
```

## Result
The application was successfully deployed with horizontal autoscaling. Kubernetes can scale `social-media-app` between 1 and 5 replicas based on CPU utilization.

## Conclusion
This project demonstrated Kubernetes application scalability using a Horizontal Pod Autoscaler.
