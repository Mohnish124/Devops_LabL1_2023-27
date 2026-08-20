# Project 7: Kubernetes MongoDB & Mongo Express Deployment

This project demonstrates how to deploy MongoDB and Mongo Express in a Kubernetes cluster using Deployments, Services, ConfigMaps, and Secrets.

## Architecture

```text
Browser
   |
   | (Access via NodePort e.g., http://<node-ip>:30081)
   |
Mongo Express Service (NodePort)
   |
   | (Routes traffic to port 8081)
   |
Mongo Express Deployment
   |
   | (Reads credentials & DB URL)
   |
ConfigMap & Secret
   |
   | (Internal Routing)
   |
MongoDB Service (ClusterIP)
   |
   | (Routes traffic to port 27017)
   |
MongoDB Deployment
   |
   | (Reads credentials)
   |
Secret
```

## Files in this Project

1. `mongo-secret.yaml`: Securely stores the base64-encoded root username and password.
2. `mongo-configmap.yaml`: Stores the internal database URL (`mongodb-service`).
3. `mongo.yaml`: Contains the Deployment and ClusterIP Service for MongoDB.
4. `mongo-express.yaml`: Contains the Deployment and NodePort Service for Mongo Express.

## Deployment Steps

Run the following commands in order to deploy the resources:

```bash
# 1. Create the Secret
kubectl apply -f mongo-secret.yaml

# 2. Create the ConfigMap
kubectl apply -f mongo-configmap.yaml

# 3. Deploy MongoDB
kubectl apply -f mongo.yaml

# 4. Deploy Mongo Express
kubectl apply -f mongo-express.yaml
```

## Verification and Access

Verify your deployment with these commands:

```bash
kubectl get pods
kubectl get deployments
kubectl get services
kubectl get configmaps
kubectl get secrets
```

### Accessing the Mongo Express UI

We successfully deployed the cluster and set up a port-forwarding process to bypass virtual network limits and access the UI directly on `localhost`.

To map the NodePort service to your local machine, run:

```bash
kubectl port-forward svc/mongo-express-service 30081:8081
```

Then, open your browser and navigate to **http://localhost:30081**.

**Web UI Login:**
- **Username:** `admin`
- **Password:** `pass`

*(Note: The Mongo Express backend connects to MongoDB automatically using the `admin` / `password` root credentials we stored securely in `mongo-secret.yaml`!)*

## Expected Output

```text
NAME                                      READY   STATUS    RESTARTS   AGE
pod/mongodb-deployment-5c6d86b7c-abcd1    1/1     Running   0          2m
pod/mongo-express-847f9f9845-wxyz2        1/1     Running   0          1m

NAME                            TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
service/kubernetes              ClusterIP   10.96.0.1        <none>        443/TCP          10d
service/mongodb-service         ClusterIP   10.96.123.45     <none>        27017/TCP        2m
service/mongo-express-service   NodePort    10.96.234.56     <none>        8081:30081/TCP   1m
```

## Troubleshooting Common Issues

- **Pod CrashLoopBackOff**: `kubectl logs <pod-name>` or `kubectl logs <pod-name> --previous`
- **ImagePullBackOff**: `kubectl describe pod <pod-name>` (check Events)
- **Service not reachable**: `kubectl get endpoints mongodb-service`
- **Secret/ConfigMap not loading**: `kubectl describe pod <pod-name>`
