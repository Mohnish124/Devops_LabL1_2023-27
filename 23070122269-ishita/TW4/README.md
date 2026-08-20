\# TW4 - Project 4: Architecting Jenkins Pipeline for Scale



\## Objective



To set up a distributed Jenkins pipeline for a Maven project using two different Jenkins agent nodes.



\## Jenkins Architecture



\- Jenkins Controller

\- Compile-Agent

\- Test-Agent



\## Agent Labels



\- Compile-Agent: `compile`

\- Test-Agent: `test`



\## Pipeline Stages



\### 1. Compile

Runs on `Compile-Agent`:



```text

mvn clean compile

