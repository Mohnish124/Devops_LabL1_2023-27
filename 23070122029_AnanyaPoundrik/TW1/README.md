# TW1 - Continuous Evaluation: Foundational DevOps Skills

**Student:** Ananya Poundrik  
**Roll Number:** 23070122029  
**Course:** DevOps Lab

---

## Overview

This submission contains the work completed for TW1 - Continuous Evaluation: Foundational DevOps Skills.

The tasks cover:

1. Git Workflow & Collaboration
2. Jira Project & Issue Tracking
3. Docker Containerization
4. Jenkins Freestyle Project

---

## Task 1 - Git Workflow & Collaboration

**Marks: 4**

The following Git activities were completed:

- Initialized a Git repository for a Python Flask Hello World application.
- Created the initial commit on the `main` branch.
- Created the `feature/user-auth` branch.
- Added a modification to the Flask application.
- Committed and pushed the feature branch.
- Modified the same section on `main` to simulate a merge conflict.
- Merged the feature branch into `main`.
- Manually resolved the merge conflict.
- Committed and pushed the resolved changes.

### Submission

[View Task 1 - Git Workflow & Collaboration](./Task1_Git/README.md)

---

## Task 2 - Jira Project & Issue Tracking

**Marks: 3**

A Scrum project named **Hello World Application** was created in Jira.

The following issues were created:

| Issue Type | Title |
|---|---|
| Story | Implement User Authentication Feature |
| Task | Setup Flask Environment |
| Bug | Login Page Displays Error |

The **Setup Flask Environment** task was moved from **To Do** to **In Progress**.

### Submission

[View Task 2 - Jira Project & Issue Tracking](./Task2_Jira/README.md)

---

## Task 3 - Docker & Jenkins Freestyle Project

**Marks: 3**

### Docker

- Created a Dockerfile for the Flask application.
- Built the Docker image locally.
- Ran the application in a Docker container.
- Exposed the application on port `5000`.
- Verified the application by accessing `http://localhost:5000`.

### Jenkins

- Created a Jenkins Freestyle project.
- Configured Git source code management.
- Configured the project to pull the Flask repository.
- Added a Windows batch build step using `dir`.
- Successfully executed the Jenkins build.

### Submission

[View Task 3 - Docker & Jenkins](./Task3_Docker_Jenkins/README.md)

---

## Technologies Used

- Git
- GitHub
- Python
- Flask
- Docker
- Jenkins
- Jira

---

## Submission Structure

```text
23070122029_AnanyaPoundrik/
└── TW1/
    ├── README.md
    │
    ├── Task1_Git/
    │   ├── README.md
    │   ├── source/
    │   └── screenshots/
    │
    ├── Task2_Jira/
    │   ├── README.md
    │   └── screenshots/
    │
    └── Task3_Docker_Jenkins/
        ├── README.md
        ├── source/
        └── screenshots/