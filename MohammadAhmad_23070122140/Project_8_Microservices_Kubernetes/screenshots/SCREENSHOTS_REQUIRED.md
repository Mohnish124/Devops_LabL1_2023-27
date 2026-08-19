# Screenshot Checklist - Project 8: Kubernetes Microservices Architecture (ShopSphere)

This document lists the required and verified execution screenshots for **Project 8: Create Deployments, Services, ConfigMaps, and Secrets to Containerize a Complete Microservices Application**.

---

## Required Execution Proof Screenshots

| Status | Screenshot ID | Filename | Description / Content | Evidence Verification |
| :---: | :--- | :--- | :--- | :--- |
| ✅ | `P8_SS_01` | `P8_01_kubernetes_deployments.png` | Terminal execution of `kubectl get deployments,pods -n microservices-demo -o wide` showing all 5 deployments (frontend, product-service, user-service, order-service, notification-service) and healthy pods in `Running` (1/1 Ready) state. | Proves successful containerization, declarative deployment orchestration, replica management, and pod health in the dedicated `microservices-demo` namespace. |
| ✅ | `P8_SS_02` | `P8_02_services_configmap_secret.png` | Terminal output of `kubectl get svc,configmap,secret -n microservices-demo` and `kubectl describe configmap,secret -n microservices-demo` showing internal ClusterIP and NodePort services, environment ConfigMap (`shopsphere-config`), and sensitive credentials Secret (`shopsphere-secret`). | Demonstrates decoupled service discovery via Kubernetes DNS, external NodePort routing, centralized non-sensitive environment configuration, and secure Secret injection. |
| ✅ | `P8_SS_03` | `P8_03_microservices_api_verification.png` | Terminal API verification showing successful HTTP responses from `/health` and REST endpoints (`/api/products`, `/api/users`, `/api/orders`, `/api/notifications`) including inter-service communication telemetry and pod hostname tracking. | Validates independent microservice functionality, inter-service API orchestration across the Kubernetes overlay network, and dynamic response generation. |
| ✅ | `P8_SS_04` | `P8_04_application_ui.png` | Live browser capture of the ShopSphere Web Dashboard at `http://localhost:8080` displaying the active microservices mesh health matrix (ONLINE indicators), product catalog, user directory, live orders table, and notification activity feed. | Conclusive visual evidence of a fully functional cloud-native microservices web application running inside Kubernetes and interacting with backend services in real time. |
