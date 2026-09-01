# Project 9 — Apache2 Server on Kubernetes, Accessed from the Host Machine

Deployed Apache HTTP Server (httpd) on Kubernetes with 2 replicas, then accessed
it from the host machine using three different Kubernetes networking mechanisms.

## Cluster
![Minikube running](./screenshots/01-minikube-running.png)

## Resources
- `apache-deployment.yaml` — Deployment running `httpd:2.4`, 2 replicas
- `apache-service.yaml` — NodePort Service exposing port 80

![Deployment and service created](./screenshots/02-deployment-and-service-created.png)

## Access Method 1 — NodePort via `minikube service`
Used `minikube service apache-service --url` to tunnel the NodePort service to
the host machine, then accessed it via browser/curl.

![Method 1 - minikube service](./screenshots/03.1-method1-minikube-service.png)
![Method 1 - minikube service](./screenshots/03.2-method1-minikube-service.png)

## Access Method 2 — `kubectl port-forward`
Forwarded a local port directly to the Kubernetes Service, bypassing NodePort
entirely, and accessed Apache through that tunnel.

![Method 2 - port-forward](./screenshots/04.1-method2-port-forward.png)
![Method 2 - port-forward](./screenshots/04.2-method2-port-forward.png)

## Access Method 3 — `kubectl exec` into the pod
The `httpd:2.4` image is minimal and doesn't include `curl`, `wget`, or `ps`. Used
`kubectl debug` to attach an ephemeral `busybox` container into the pod's network
namespace, and ran `wget` from there — confirming Apache responds correctly at the
container level, independent of any external networking path.

![Method 3 - exec into pod](./screenshots/05.1-method3-exec-into-pod.png)
![Method 3 - exec into pod](./screenshots/05.2-method3-exec-into-pod.png)

## Load balancing across replicas
Confirmed requests sent to the Service were served by the pods behind it, visible
in the pod logs.

![Logs showing requests served](./screenshots/06-logs-showing-requests-served.png)
