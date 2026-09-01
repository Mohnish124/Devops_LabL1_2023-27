# Project 7: MongoDB and Mongo Express on Kubernetes

## Objective
Create MongoDB and Mongo Express Deployments, Services, ConfigMap and Secret using Kubernetes.

## Work Done
- Created `mongo-secret` for MongoDB credentials.
- Created `mongo-config` for MongoDB configuration.
- Created a MongoDB Deployment and ClusterIP Service.
- Created a Mongo Express Deployment and NodePort Service.
- Verified pods, Deployments, Services, ConfigMap and Secret.
- Accessed Mongo Express using Minikube.

## Kubernetes Resources
- `mongo` – MongoDB Deployment
- `mongo-service` – MongoDB Service
- `mongo-express` – Mongo Express Deployment
- `mongo-express-service` – NodePort Service
- `mongo-config` – ConfigMap
- `mongo-secret` – Secret

## Commands Used
```powershell
kubectl apply -f mongo.yaml
kubectl get all
kubectl get pods
kubectl get deployments
kubectl get services
kubectl get configmap
kubectl get secrets
minikube service mongo-express-service
```

## Result
MongoDB and Mongo Express were successfully deployed and connected in Kubernetes. Mongo Express was exposed through a NodePort and accessed using Minikube.

## Conclusion
This project demonstrated the use of Kubernetes Deployments, Services, ConfigMaps and Secrets with MongoDB.
