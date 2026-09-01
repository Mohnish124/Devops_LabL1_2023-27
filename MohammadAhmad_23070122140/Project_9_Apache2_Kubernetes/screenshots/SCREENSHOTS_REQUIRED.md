# Screenshot Checklist - Project 9: Apache2 Server on Kubernetes

This document lists the verified execution screenshots for **Project 9: Create apache2 server within a deployment and access it using host machine using commands, learn using K8s**.

---

## Verified Execution Proof Screenshots

| Status | Screenshot ID | Filename | Description / Content | Evidence Verification |
| :---: | :--- | :--- | :--- | :--- |
| ✅ | `P9_SS_01` | `P9_01_cluster_and_deployment.png` | Terminal execution of `kubectl get nodes`, `kubectl get namespace apache-demo`, and `kubectl get deployment,pods -n apache-demo -o wide` showing cluster node readiness, isolated `apache-demo` namespace, and Apache2 pod in `Running` (1/1 Ready) state. | Proves successful deployment instantiation of the official `httpd:2.4-alpine` container image, healthy pod status, and replica management in the dedicated namespace. |
| ✅ | `P9_SS_02` | `P9_02_apache_service.png` | Terminal output of `kubectl get svc,configmap -n apache-demo` and `kubectl describe svc apache2-service -n apache-demo` showing NodePort service (`30089/TCP`) and HTML ConfigMap (`apache2-html-config`). | Demonstrates external NodePort service routing and declarative ConfigMap mounting at `/usr/local/apache2/htdocs/index.html`. |
| ✅ | `P9_SS_03` | `P9_03_host_machine_access.png` | Host PowerShell terminal executing `curl.exe -i http://localhost:8090` showing `HTTP/1.1 200 OK`, `Server: Apache/2.4.68 (Unix)`, and the rendered custom HTML payload identifying Mohammad Ahmad (23070122140). | Conclusive visual proof of direct host-machine access executing CLI commands against the Kubernetes Apache2 container runtime. |
| ✅ | `P9_SS_04` | `P9_04_apache_logs.png` | Terminal output of `kubectl logs deployment/apache2-server -n apache-demo` showing active HTTP request records generated from the host machine (`127.0.0.1 - - [19/Aug/2026:...] "GET / HTTP/1.1" 200 4874`). | Validates live request processing, Apache access logging, and bidirectional traffic flow between host and container. |
