# Docker Commands Used

## Check Docker Version

```bash
docker --version
```

## Pull Jenkins Image

```bash
docker pull jenkins/jenkins:lts
```

## Run Jenkins Container

```bash
docker run -d \
-p 8080:8080 \
-p 50000:50000 \
-v jenkins_home:/var/jenkins_home \
--name jenkins \
jenkins/jenkins:lts
```

## Check Running Containers

```bash
docker ps
```

## Get Jenkins Initial Password

```bash
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

## Build Flask Docker Image

```bash
docker build -t flask-app .
```

## Run Flask Container

```bash
docker run -p 5001:5000 flask-app
```