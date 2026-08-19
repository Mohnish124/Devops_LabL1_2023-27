# Screenshot Checklist - Project 6: Kubernetes Infrastructure & Application Autoscaling (HPA)

This document lists the verified execution screenshots for **Project 6: Social Media Underlying Infra Challenges - Kubernetes Horizontal Pod Autoscaler (HPA)**.

---

## Verified Execution Proof Screenshots

| Status | Screenshot ID | Filename | Content / What it Contains | Why it is Sufficient Evidence |
| :---: | :--- | :--- | :--- | :--- |
| ✅ | `P6_SS_01` | `P6_01_cluster_nodes_ready.png` | Terminal execution of `kubectl version --client`, `kubectl cluster-info`, `kubectl get nodes -o wide`, and `kubectl top nodes` showing the Kubernetes control plane and worker node in `Ready` state. | Proves local Kubernetes cluster availability, control-plane health, node readiness, and metrics-server operational status. |
| ✅ | `P6_SS_02` | `P6_02_application_deployment_running.png` | Terminal output of `docker build -t social-media-app:1.0 .`, `kubectl apply` manifests, `kubectl get deployments,pods,svc,hpa -n social-media` showing 2 initial replicas in `Running` (1/1) state. | Validates Docker image build, Kubernetes namespace isolation, deployment instantiation, NodePort service binding, and baseline HPA initialization. |
| ✅ | `P6_SS_03` | `P6_03_service_and_application_verification.png` | Live browser view of the **SocialSphere** Web Application Dashboard running on Kubernetes via NodePort/Port-Forward, displaying dynamic serving pod ID, real-time uptime, request counters, live social feed, and compute load simulation results. | Conclusive functional validation of social media REST service exposure, dynamic Kubernetes pod identity resolution, interactive `/api/compute` load testing, and active cluster health telemetry. |
| ✅ | `P6_SS_04` | `P6_04_hpa_autoscaling_under_load.png` | Terminal execution showing synthetic load generation (`load-generator`), `kubectl top pods`, `kubectl get hpa` reporting CPU spike (`464%/50%`), and `kubectl get pods` showing deployment autoscaling to 10 replicas. | Conclusive proof of dynamic Horizontal Pod Autoscaler (HPA) activation, CPU threshold detection, and horizontal scaling to accommodate spike traffic. |
| ✅ | `P6_SS_05` | `P6_05_hpa_scale_down.png` | Terminal execution showing load generator termination (`replicas=0`), CPU utilization returning to baseline (`1%/50%`), pod termination events, and stabilization back to minimum 2 replicas. | Proves automatic scale-down capability, resource reclamation, and cluster stabilization during low-traffic periods. |
