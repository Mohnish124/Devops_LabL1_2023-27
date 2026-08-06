# Distributed Jenkins Pipeline Documentation

## Objective

To execute a Maven Portfolio project using a distributed Jenkins pipeline with two Jenkins slave nodes.

## Pipeline Workflow

```text
GitHub Repository
        ↓
Jenkins Master
        ↓
Compile Stage (Slave Node 1)
        ↓
Test Stage (Slave Node 2)
        ↓
Build Successful
```

## Learning Outcome

- Configured distributed Jenkins architecture.
- Executed compile and test stages on different nodes.
- Automated Maven project build using Jenkins.