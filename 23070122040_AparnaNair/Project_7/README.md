# Project 7 – Docker Volumes & Data Persistence

## Objective

To demonstrate Docker volumes and verify that data persists even after a Docker container is stopped and removed.

## Technologies Used

- Docker
- Nginx
- Docker Volumes

## 1. Create Docker Volume

A named Docker volume was created using:

```powershell
docker volume create aparna-data

The volume was verified using:

docker volume ls

The created volume was:

aparna-data
2. Run Container with Named Volume

An Nginx container was started with the Docker volume mounted to the Nginx web directory:

docker run -d --name aparna-volume-container -p 8083:80 -v aparna-data:/usr/share/nginx/html nginx

The volume mapping was:

aparna-data → /usr/share/nginx/html
3. Write Data to the Volume

A file was created inside the mounted volume using:

docker exec aparna-volume-container sh -c "echo 'Project 7 - Docker Volume Persistence' > /usr/share/nginx/html/index.html"

The application was accessed through:

http://localhost:8083

The following message was displayed:

Project 7 - Docker Volume Persistence
4. Stop and Remove the First Container

The first container was stopped using:

docker stop aparna-volume-container

The container was then removed using:

docker rm aparna-volume-container

The Docker volume was not removed.

5. Create a New Container Using the Same Volume

A new Nginx container was created using the same Docker volume:

docker run -d --name aparna-volume-container2 -p 8083:80 -v aparna-data:/usr/share/nginx/html nginx
6. Verify Data Persistence

The application was accessed again using:

http://localhost:8083

The message was still displayed:

Project 7 - Docker Volume Persistence

This verified that the data persisted even after the original container was removed.

7. Stop and Remove the Second Container

The second container was stopped using:

docker stop aparna-volume-container2

The container was removed using:

docker rm aparna-volume-container2
8. Verify Docker Volume

The volume was verified using:

docker volume ls

The aparna-data volume was still present.

Main Commands
docker volume create aparna-data

docker volume ls

docker run -d --name aparna-volume-container -p 8083:80 -v aparna-data:/usr/share/nginx/html nginx

docker exec aparna-volume-container sh -c "echo 'Project 7 - Docker Volume Persistence' > /usr/share/nginx/html/index.html"

docker stop aparna-volume-container

docker rm aparna-volume-container

docker run -d --name aparna-volume-container2 -p 8083:80 -v aparna-data:/usr/share/nginx/html nginx

docker stop aparna-volume-container2

docker rm aparna-volume-container2

docker volume ls
Result

The Docker volume was successfully created and mounted to a container. Data was written to the volume, the original container was stopped and removed, and a new container was created using the same volume. The data remained available, demonstrating successful Docker volume persistence.