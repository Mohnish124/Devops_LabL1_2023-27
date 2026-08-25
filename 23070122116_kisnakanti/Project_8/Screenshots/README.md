# Project 8 Evidence Screenshots

These screenshots were captured from the running local frontend at `http://localhost:8080`.

| File | Evidence |
|---|---|
| `01-homepage-catalogue.png` | Frontend landing page and product catalogue entry point |
| `02-catalogue.png` | Product catalogue with seeded products |
| `03-cart.png` | Shopping cart containing a MacBook Air |
| `04-login-modal.png` | Login and registration interface |
| `07-terminal-minikube.svg` | Terminal-style reproduction of Minikube startup and node verification |
| `08-terminal-docker-build.svg` | Terminal-style reproduction of Docker image builds |
| `09-terminal-kubernetes.svg` | Terminal-style reproduction of Kubernetes deployment output and ordering fix |

The SVG terminal files are formatted reproductions based on the terminal output supplied in the task; they are not direct captures of the user’s Terminal window.

Run these commands in Terminal for the infrastructure/API evidence screenshots:

```bash
docker compose ps
docker compose logs --tail=30 postgres product-service order-service payment-service
curl http://localhost:8080/api/products
curl http://localhost:8080/health
kubectl get deployments,pods,services,pvc -n ecommerce
```
