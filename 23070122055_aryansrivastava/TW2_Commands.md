# DevOps Lab TW2 Commands and Screenshot Points

Here is the simple list of commands to run in WSL and the exact points where you should take screenshots. Make sure you are in the `23070122055_aryansrivastava` folder before running these.

## 1. Docker Compose for Multi-Container App

### Task 1.1: Modify Flask App for PostgreSQL
No commands needed here, just show the code.
**Screenshot `1.1.png`**: Show your updated `app.py` and `requirements.txt`.

### Task 1.2: Create docker-compose.yml and Run
1. Build and start the containers:
   ```bash
   docker-compose up -d --build
   ```
2. Check running containers:
   ```bash
   docker-compose ps
   ```
3. Test the app:
   ```bash
   curl http://localhost:5000
   ```
**Screenshot `1.2-1.png`**: Show your `docker-compose.yml` code.
**Screenshot `1.2-2.png`**: Show the output of `docker-compose up -d` and `docker-compose ps` showing both services running.

## 2. Kubernetes Deployment & Service

### Task 2.1: Docker Image Accessibility
1. Build and tag your image (if not done yet):
   ```bash
   docker build -t aryan20s/flask-hello-world:latest .
   ```
2. Push to Docker Hub:
   ```bash
   docker push aryan20s/flask-hello-world:latest
   ```
**Screenshot `2.1.png`**: Show the `docker push` command and its successful output.

### Task 2.2: Kubernetes Deployment YAML
1. Apply the deployment:
   ```bash
   kubectl apply -f deployment.yaml
   ```
2. Verify pods are running:
   ```bash
   kubectl get pods
   ```
**Screenshot `2.2-1.png`**: Show the `deployment.yaml` code.
**Screenshot `2.2-2.png`**: Show the output of `kubectl get pods` with pods in "Running" state.

### Task 2.3: Kubernetes Service YAML
1. Apply the service:
   ```bash
   kubectl apply -f service.yaml
   ```
2. Get the service details:
   ```bash
   kubectl get svc
   ```
3. Access the application (if using Minikube):
   ```bash
   minikube service flask-app-service --url
   curl <URL_from_above>
   ```
**Screenshot `2.3-1.png`**: Show the `service.yaml` code.
**Screenshot `2.3-2.png`**: Show the output of `kubectl get svc` and the `curl` command confirming the app is accessible.

## 3. Integrated CI/CD with Jenkins & Basic IaC

### Task 3.1: Jenkins Declarative Pipeline
1. In Jenkins, create a "Pipeline" project.
2. Point it to your Git repository branch containing the `Jenkinsfile`.
3. Run the build.
**Screenshot `3.1-1.png`**: Show the `Jenkinsfile` code.
**Screenshot `3.1-2.png`**: Show the Jenkins UI with a successful pipeline execution (green stages).

### Task 3.2: Basic Infrastructure as Code (Terraform)
1. Initialize Terraform:
   ```bash
   terraform init
   ```
2. Plan the infrastructure:
   ```bash
   terraform plan
   ```
**Screenshot `3.2-1.png`**: Show the output of `terraform plan`.

3. Apply the configuration:
   ```bash
   terraform apply -auto-approve
   ```
4. Verify file creation:
   ```bash
   cat output.txt
   ```
**Screenshot `3.2-2.png`**: Show the output of `terraform apply` and the contents of `output.txt` using `cat`.
