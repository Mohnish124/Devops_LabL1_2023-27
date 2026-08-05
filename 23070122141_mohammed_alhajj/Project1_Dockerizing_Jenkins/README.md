# Project 1 - Dockerizing Jenkins

**Name:** Mohammed Al-Hajj

**PRN:** 23070122141

## Objective
This project demonstrates how to dockerize Jenkins and run it using Docker containers. The main goal is to show how Jenkins can be containerized for easier setup, portability, and deployment.

## What was done
- Installed and configured Docker
- Pulled the Jenkins image from Docker Hub
- Ran Jenkins in a Docker container
- Verified the running container
- Checked the Jenkins dashboard and pipeline execution

## Step 1: Pull Jenkins Docker image
<img src="./Screenshot%202026-08-02%20164613.png" alt="Docker pull screenshot" width="700">

This step shows the Docker image being pulled from the Docker Hub repository. Pulling the image is the first requirement before running Jenkins in a container.

## Step 2: Run Jenkins container
<img src="./Screenshot%202026-08-02%20164953.png" alt="Docker run screenshot" width="700">

This step shows the Jenkins container being started with Docker. Running the container makes Jenkins available through a web interface.

## Step 3: Verify running containers
<img src="./Screenshot%202026-08-02%20165013.png" alt="Docker ps screenshot" width="700">

This screenshot confirms that the Jenkins container is running. The `docker ps` command is used to verify the active containers and their status.

## Step 4: Access Jenkins dashboard
<img src="./Screenshot%202026-08-02%20165020.png" alt="Jenkins dashboard screenshot" width="700">

This step shows the Jenkins dashboard, which is the main web interface used to manage jobs, pipelines, and configuration.

## Step 5: Create or check pipeline job
<img src="./Screenshot%202026-08-02%20165024.png" alt="Pipeline configuration screenshot" width="700">

This screenshot demonstrates the Jenkins pipeline setup process. It shows how a pipeline job can be created or viewed inside Jenkins.

## Step 6: Build and monitor pipeline
<img src="./Screenshot%202026-08-02%20165033.png" alt="Pipeline build screenshot" width="700">

This step shows the pipeline running and being monitored. It helps demonstrate that Jenkins is executing the build steps successfully.

## Step 7: View build console output
<img src="./Screenshot%202026-08-02%20165043.png" alt="Console output screenshot" width="700">

This screenshot shows the console output from the Jenkins build. It is useful for reviewing the exact steps that were executed and detecting errors if any occur.

## Step 8: Final verification
<img src="./Screenshot%202026-08-02%20165048.png" alt="Final verification screenshot" width="700">

This final screenshot shows the completed workflow and confirms that the Jenkins setup and pipeline execution were successfully observed.

## Conclusion
This project helped in understanding how Docker and Jenkins work together in a DevOps environment. Docker provides the containerized environment, while Jenkins automates the build and deployment workflow.
