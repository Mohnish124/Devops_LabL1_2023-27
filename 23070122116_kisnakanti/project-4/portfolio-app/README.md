# portfolio-app

Minimal Spring Boot REST API used as the Maven project for the Jenkins distributed pipeline lab (Project 4).

## Endpoints

- `GET /` → "Portfolio app is running"
- `GET /health` → "OK"
- `GET /greet?name=Kisna` → "Hello, Kisna!"

## Run locally

```bash
mvn spring-boot:run
```

Then visit `http://localhost:8080/`.

## Build a jar

```bash
mvn clean package
java -jar target/portfolio-app-1.0.0.jar
```

## Run tests

```bash
mvn test
```

## Jenkins

This repo includes a `Jenkinsfile` that runs the `Build` stage on the node labeled
`agent-1` and the `Test & Package` stage on the node labeled `agent-2`, matching the
two-agent Jenkins setup from the lab. See `jenkins-distributed-pipeline-lab.md` for
the full setup walkthrough.
