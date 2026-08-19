# Screenshot Checklist - Project 7: Mongo and Mongo Express Deployment & Administration

This document lists the verified execution screenshots for **Project 7: Create Mongo and Mongo Express deployments, services, ConfigMaps and Secret**.

---

## Verified Execution Proof Screenshots

| Status | Screenshot ID | Filename | Content / What it Contains | Why it is Sufficient Evidence |
| :---: | :--- | :--- | :--- | :--- |
| ✅ | `P7_SS_01` | `P7_01_cluster_and_namespace.png` | Terminal execution of `kubectl get nodes`, `kubectl get namespace mongo-lab`, `kubectl get configmap -n mongo-lab`, and `kubectl get secret -n mongo-lab` showing cluster readiness, dedicated namespace, and baseline configuration objects. | Proves Kubernetes cluster availability, creation of the isolated `mongo-lab` namespace, and initialization of configuration (ConfigMap) and authentication (Secret) primitives. |
| ✅ | `P7_SS_02` | `P7_02_mongo_deployment_and_service.png` | Terminal output of `kubectl get deployment,pods,svc -n mongo-lab` and `kubectl describe svc mongo-service -n mongo-lab` showing MongoDB deployment running (1/1 Ready) and exposed via ClusterIP service on internal port `27017`. | Validates MongoDB database deployment instantiation, healthy pod readiness, internal ClusterIP service registration, and endpoint mapping. |
| ✅ | `P7_SS_03` | `P7_03_mongo_express_running.png` | Terminal output of `kubectl get deployment,pods,svc -n mongo-lab` and `kubectl logs -l app=mongo-express -n mongo-lab` showing Mongo Express running (1/1 Ready), NodePort service binding on port `8081:30081`, and successful HTTP 200 responses. | Demonstrates Mongo Express web deployment readiness, service exposure, and active request handling connecting to the backend MongoDB service. |
| ✅ | `P7_SS_04` | `P7_04_mongo_express_ui_and_mongo_connection.png` | Live browser capture of the Mongo Express Web Administration interface at `http://localhost:8081` displaying connected MongoDB databases (`admin`, `config`, `local`) and Server Status metadata (Hostname, MongoDB Version, Uptime). | Conclusive visual proof of end-to-end integration: Mongo Express successfully authenticated, connected over Kubernetes service DNS (`mongo-service:27017`), and rendering live database telemetry. |
