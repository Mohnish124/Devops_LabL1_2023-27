# Screenshot Checklist - Project 5: Containerizing Spring Boot Application & DTR Scanning

This document lists the verified execution screenshots for **Project 5: Containerizing Application and Scanning its Docker Image with DTR**.

---

## Verified Execution Proof Screenshots

| Status | Screenshot ID | Filename | Content / What it Contains | Why it is Sufficient Evidence |
| :---: | :--- | :--- | :--- | :--- |
| ✅ | `P5_SS_01` | `P5_01_spring_boot_maven_build_success.png` | Terminal execution of `mvn clean test package` showing unit test execution (`RetailappApplicationTests`), executable JAR creation (`target/retailapp-1.0.0.jar`), and `BUILD SUCCESS`. | Proves Spring Boot Java compilation, JUnit 5 test suite execution, and Maven executable JAR packaging. |
| ✅ | `P5_SS_02` | `P5_02_docker_build_run_verification.png` | Terminal execution of `docker build -t retailapp:1.0.0 .`, `docker run -d -p 8080:8080`, `docker ps` showing running container on port 8080, and `docker logs` showing Spring Boot startup banner. | Proves Docker container image build, container instantiation, port binding, and live application startup. |
| ✅ | `P5_SS_03` | `P5_03_application_endpoint_verification.png` | Terminal/Browser execution showing HTTP response outputs for Home Portal (`GET /`), Product Catalog Service (`GET /retail/products`), and Order Management Service (`GET /retail/orders`). | Functional validation of multi-app retail HTTP REST web application endpoints. |
| ✅ | `P5_SS_04` | `P5_04_docker_image_security_scan.png` | Terminal output demonstrating image tagging for registry deployment (`docker tag retailapp:1.0.0 dtr.example.com/retail/retailapp:1.0.0`) and local Docker image security inspection / vulnerability scanning workflow. | Proves container image registry tagging, security scanning workflow, and vulnerability audit policy compliance. |
