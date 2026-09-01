# Kubernetes Autoscale Workflow

This project demonstrates application scalability with a Node.js social-feed frontend/API, a Kubernetes Service, and a CPU-based Horizontal Pod Autoscaler (HPA).

## Prerequisites

Install Docker Desktop, `kubectl`, and Minikube. Then run:

```bash
minikube start --driver=docker
minikube addons enable metrics-server
docker build -t social-feed:2.2 ./app
minikube image load social-feed:2.2
kubectl apply -f kubernetes/
kubectl rollout status deployment/social-feed
```

After changing application files, rebuild and reload the image:

```bash
docker build -t social-feed:2.2 ./app
minikube image load social-feed:2.2
kubectl apply -f kubernetes/deployment.yaml
kubectl rollout restart deployment/social-feed
kubectl rollout status deployment/social-feed
```

Open the frontend in your browser:

```bash
minikube service social-feed-service
```

This opens the Social Media Feed page. The page shows the posts and the Pod that served the request.

Verify the deployment:

```bash
kubectl get nodes
kubectl get pods
kubectl get svc social-feed-service
kubectl get hpa
kubectl top pods
minikube service social-feed-service --url
```

## Demonstrate autoscaling

In one terminal, start an in-cluster request generator. This reliably creates CPU load without needing a Minikube tunnel:

```bash
kubectl run load-generator \
  --image=busybox:1.36 \
  --restart=Never \
  -- sh -c 'while true; do wget -q -O- http://social-feed-service/feed >/dev/null; done'
```

In separate terminals, watch the HPA and Pods:

```bash
kubectl get hpa -w
kubectl get pods -w
```

The HPA should increase replicas as CPU rises, up to five Pods. Stop the request loop with `Ctrl+C`, then wait for the 30-second scale-down stabilization window.

To show Service load balancing, get the URL in a separate terminal with `minikube service social-feed-service --url`, leave that command running, and then run:

```bash
for i in {1..20}; do curl -s "$URL/feed"; echo; done
```

The `pod` field identifies which replica served each response.

## Screenshot proof for your submission

Capture these states with the commands visible in a terminal or with the Minikube dashboard:

1. **Cluster and application:** `kubectl get nodes`, `kubectl get deployment`, and `kubectl get pods` showing one Running Pod.
2. **Frontend:** the browser showing the Social Media Feed and its `Served by Pod` value.
3. **HPA before load:** `kubectl get hpa` showing `1` current replica and a CPU target such as `0%/50%`.
4. **Scale-up under load:** run the request loop, then capture `kubectl get hpa` showing CPU above 50% and replicas greater than 1.
5. **Multiple Pods:** capture `kubectl get pods -o wide` showing several `social-feed` Pods in `Running` state.
6. **Scale-down:** stop the load loop, wait for the HPA to reduce replicas, and capture `kubectl get hpa` showing the replica count returning to 1.

For stronger evidence, use live watch commands during the demo:

```bash
kubectl get hpa -w
kubectl get pods -w
```

Take screenshots after the output changes from `1` replica to `2+` replicas. HPA metrics can take one or two minutes to appear, and scale-down is intentionally delayed by the stabilization window.

## Cleanup

```bash
kubectl delete -f kubernetes/
minikube stop
```
