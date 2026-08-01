# Project 4 — Architecting Jenkins Pipeline for Scale

Set up a distributed Jenkins pipeline for a Maven project ("portfolio") using two
separate agent/slave nodes (`slave1`, `slave2`).

## Setup
- Generated a Maven quickstart project named `portfolio`
- Registered two Jenkins agent nodes, `slave1` and `slave2`

![Maven project generated](./screenshots/01-maven-project-generated.png)
![Both nodes online](./screenshots/02-both-nodes-online.png)

## Pipeline
- Checkout and Build run on `slave1`
- Test runs on `slave2`

![Jenkinsfile](./screenshots/03-jenkinsfile-in-editor.png)
![Stage view showing distributed execution](./screenshots/04-stage-view.png)
![Console output - SUCCESS](./screenshots/05-console-output-success.png)