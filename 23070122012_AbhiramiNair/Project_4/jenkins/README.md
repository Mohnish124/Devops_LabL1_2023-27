# Jenkins Controller Setup

This Docker image provides Jenkins with Java 17, Maven and Git.

## Start

From the project root:

```bash
docker compose up -d --build
```

Open:

```text
http://localhost:8080
```

Get the initial password:

```bash
docker exec project4-jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

## Important

The course project requires a distributed pipeline using two different Jenkins agent nodes. The controller container alone is not the two-agent architecture.

For the actual lab demonstration, create two agents and assign:

```text
Agent 1 -> maven-compile
Agent 2 -> maven-test
```

The Jenkinsfile then schedules the Maven stages on those labels.
