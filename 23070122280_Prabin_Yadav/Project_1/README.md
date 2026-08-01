# Project 1: Dockerizing Jenkins Pipeline

## Objective
The objective of this project is to automate the build and deployment of the React application (built in Project 2) using a Jenkins Pipeline. Rather than manually running `docker build` and `docker run` every time the source code changes, Jenkins is configured to pull the latest code from GitHub, rebuild the Docker image, remove the old container, and deploy the new one automatically.

This project builds on Project 2 — it assumes the React app and its Dockerfile already exist in the Git repository.

---

## Technologies Used

| Technology | Purpose |
|---|---|
| Jenkins | CI/CD automation server |
| Docker | Containerization / running Jenkins itself |
| Docker CLI | Building and running images from inside Jenkins |
| Git & GitHub | Version control and source of the pipeline |
| Jenkinsfile (Declarative Pipeline) | Defines the automated build/deploy stages |

---

## Step 1 — Run Jenkins Inside Docker with Docker CLI Access
Jenkins itself was run as a Docker container. However, the official Jenkins image does **not** include the Docker CLI, so running `docker build` from inside a Jenkins pipeline normally fails with an error like:

```
docker: command not found
```

**Solution:** a custom Jenkins image was built on top of the base Jenkins image, with the Docker CLI and Git installed inside it. This allows shell steps in the pipeline to call `docker build`, `docker run`, etc., directly.

In addition, the host machine's Docker socket was mounted into the Jenkins container:

```
/var/run/docker.sock
```

Mounting this socket lets the Jenkins container send Docker commands to the **host's** Docker daemon instead of trying to run its own nested Docker engine. Without this, Docker commands inside Jenkins would either fail to find a daemon to talk to, or fail with:

```
permission denied
```

With the custom image and the socket mounted, Jenkins can build and run containers on the same Docker engine as the host machine.

---

## Step 2 — Create a Jenkins Pipeline Project
A new Jenkins item named `ReactDockerPipeline` was created and configured as a **Pipeline** project (rather than a Freestyle project), since Pipeline projects support defining multiple ordered stages via a `Jenkinsfile`.

**Screenshot — Creating a new Pipeline item**
Shows the **New Item** screen with the item name `ReactDockerPipeline` entered and **Pipeline** selected as the job type.

![New Pipeline item](<screenshots/Screenshot 2026-08-01 145433.png>)

---

## Step 3 — Configure Source Code Management
The Pipeline job was configured to pull its `Jenkinsfile` directly from the GitHub repository.

- **SCM:** Git
- **Repository URL:** `https://github.com/Prabin-yadav/Devops-Lab-L1_2023-27.git`
- **Branch Specifier:** `*/Devops_LabL1_2023-27`
- **Script Path:** `23070122280_Prabin_Yadav/Project_1_Dockerizing_Jenkins_Pipeline/react-docker-app/Jenkinsfile`

**Screenshot — Source Code Management configuration**
Shows the SCM section set to Git, with the repository URL and branch specifier (`*/Devops_LabL1_2023-27`) entered. Since the repository is public, no credentials were required for this pipeline.

![Jenkins SCM configuration](<screenshots/Screenshot 2026-08-01 141638.png>)

---

## Step 4 — The Jenkinsfile
The pipeline is defined as a declarative Jenkinsfile with four main stages, stored inside the React app's folder in the repository.

```groovy
pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t react-docker-app .'
            }
        }

        stage('Remove Old Container') {
            steps {
                sh 'docker rm -f react-app'
            }
        }

        stage('Run Docker Container') {
            steps {
                sh 'docker run -d --name react-app -p 8081:80 react-docker-app'
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed successfully!'
        }
    }
}
```

**Stage 1 — Clone/Checkout Repository:** Jenkins checks out the latest code from the configured GitHub repository and branch.

**Stage 2 — Build Docker Image:** rebuilds the `react-docker-app` image from the latest source using the multi-stage Dockerfile from Project 2, so the image always reflects the newest code.

**Stage 3 — Remove Old Container:** deletes any existing container named `react-app` using `docker rm -f`. This is necessary because Docker will not let two containers share the same name, and it won't let a new container bind to a port that's already in use by the old one.

**Stage 4 — Run Docker Container:** starts a fresh container from the newly built image, exposing it on the host.

---

## Step 5 — Trigger and Verify the Build
The pipeline was triggered manually with **Build Now**.

**Screenshot — Pipeline status page**
Shows the `ReactDockerPipeline` project status page after a successful run: build **#2** completed with a green check mark, listed as the last build, last stable build, and last successful build.

![Jenkins pipeline status](<screenshots/Screenshot 2026-08-01 150541.png>)

---

## Step 6 — Review the Console Output

**Screenshot — Console output (checkout stage)**
Shows the pipeline starting, Jenkins obtaining the Jenkinsfile from the configured path in the GitHub repository (`23070122280_Prabin_Yadav/Project_1_Dockerizing_Jenkins_Pipeline/react-docker-app/Jenkinsfile`), and executing the **Checkout SCM** step — cloning the repository, fetching from `Devops-Lab-L1_2023-27.git`, and checking out the latest commit on the `Devops_LabL1_2023-27` branch.

![Jenkins console output - checkout stage](<screenshots/Screenshot 2026-08-01 150608.png>)

**Screenshot — Console output (remaining stages and result)**
Shows the remaining pipeline stages executing in order:
- **Remove Old Container** — running `docker rm -f react-app`, which successfully removes the previous container.
- **Run Docker Container** — running `docker run -d --name react-app -p 8081:80 react-docker-app`, which starts a new container and prints its container ID.
- The **Post Actions** stage then echoes `Pipeline completed successfully!`, and the log ends with **`Finished: SUCCESS`**.

![Jenkins console output - success](<screenshots/Screenshot 2026-08-01 150614.png>)

---

## Pipeline Execution Flow

```
GitHub
  │
  ▼
Jenkins Pipeline Starts
  │
  ▼
Clone/Checkout Repository
  │
  ▼
Build Docker Image (docker build)
  │
  ▼
Remove Previous Container (docker rm -f)
  │
  ▼
Run New Container (docker run)
  │
  ▼
Deployment Completed
```

---

## Problems Encountered

**Docker command not found**
The default Jenkins image doesn't ship with the Docker CLI. Solved by building a custom Jenkins image with Docker CLI and Git installed.

**Permission denied when running Docker commands**
The Jenkins container initially lacked permission to talk to the Docker daemon. Solved by mounting `/var/run/docker.sock` into the container and configuring the correct permissions.

**Port already allocated**
Port `8080` was already in use by Jenkins itself, so the pipeline's `docker run` step maps the React app to port `8081` instead.

**Container name conflict**
Re-running the pipeline without removing the old container would fail because a container named `react-app` already existed. Solved by adding the **Remove Old Container** stage before creating a new one.

---

## Final Result
After a successful pipeline run:

- Jenkins cloned the latest code from GitHub.
- Docker rebuilt the `react-docker-app` image from that code.
- The previous `react-app` container was removed.
- A new container was started from the fresh image.
- The updated React application became available at `http://localhost:8081`.

Re-running the pipeline (e.g. after pushing new code) repeats this entire process automatically, demonstrating a working CI/CD loop from source code to a running container.

---

## Learning Outcomes
After completing this project, the following concepts were understood:

- The difference between a Jenkins Freestyle project and a Pipeline project
- Writing a declarative Jenkinsfile with multiple stages
- Why the Docker CLI must be explicitly added to a custom Jenkins image
- Why and how to mount the Docker socket to let Jenkins control the host's Docker engine
- Configuring a Pipeline job's Source Code Management to pull a Jenkinsfile from a specific path in a GitHub repository
- Handling real CI/CD issues: permission errors, port conflicts, and container name conflicts
- Reading Jenkins console output to trace each pipeline stage and confirm success

## Author
Prabin Yadav