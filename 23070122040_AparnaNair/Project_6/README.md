# Project 6 – Container Management & Networking

## Objective

To demonstrate Docker container management, port mapping, browser access, and container network inspection.

## Technologies Used

- Docker
- Nginx

## 1. Pull Nginx Image

```powershell
docker pull nginx

2. Run the Container
docker run -d --name aparna-nginx -p 8082:80 nginx

The port mapping used was:

Host Port 8082 → Container Port 80
3. Check Running Containers
docker ps
4. Access the Application

The Nginx application was accessed through:

http://localhost:8082

The Nginx welcome page was displayed successfully.

5. Inspect Container Network
docker inspect aparna-nginx

The container network configuration, including IP address, gateway, and port mapping, was inspected.

A more focused network inspection can be performed using:

docker inspect --format='{{json .NetworkSettings.Networks}}' aparna-nginx
6. Stop the Container
docker stop aparna-nginx
7. List All Containers
docker ps -a

The stopped container was displayed with an Exited status.

8. Remove the Container
docker rm aparna-nginx

Verify removal:

docker ps -a
Main Commands
docker pull nginx

docker run -d --name aparna-nginx -p 8082:80 nginx

docker ps

docker inspect aparna-nginx

docker stop aparna-nginx

docker ps -a

docker rm aparna-nginx
Result

The Nginx Docker container was successfully:

Pulled from Docker Hub.
Started with port mapping.
Accessed through the browser.
Inspected for network configuration.
Stopped and removed successfully.
Conclusion

Docker container management and networking were successfully demonstrated using an Nginx container, including port mapping, browser access, network inspection, container stopping, and container removal.