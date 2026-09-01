# Project 3 – Branching Development Model

**Course:** DevOps Lab (TE7950)  
**Project:** 3 – Branching Development Model

## Objective
Build and demonstrate a Git branching model that helps a development team integrate work faster and safely.

This project demonstrates a Gitflow-style workflow with:
- `main` – production-ready code
- `develop` – integration branch
- `feature/*` – new features
- `release/*` – release preparation
- `hotfix/*` – urgent production fixes

The course outline describes Project 3 as a branching model for understanding Git workflow and faster work integration.

## Sample Application
A small Python task-management API is included so that branch changes can be demonstrated on real source code.

## Requirements
- Git
- Python 3.9+
- No external Python packages are required

## Run
```bash
python app.py
```

Then open:
- http://127.0.0.1:8000/
- http://127.0.0.1:8000/health
- http://127.0.0.1:8000/tasks

## Branching Workflow

### 1. Start from develop
```bash
git checkout develop
git pull origin develop
```

### 2. Create a feature branch
```bash
git checkout -b feature/add-task-api
```

Make changes, test them, and commit:
```bash
python test_app.py
git add .
git commit -m "feat: add task API"
```

### 3. Merge feature into develop
```bash
git checkout develop
git merge --no-ff feature/add-task-api
git branch -d feature/add-task-api
```

### 4. Prepare a release
```bash
git checkout develop
git checkout -b release/1.0.0
```

After final testing:
```bash
git checkout main
git merge --no-ff release/1.0.0
git tag -a v1.0.0 -m "Release 1.0.0"

git checkout develop
git merge --no-ff release/1.0.0
git branch -d release/1.0.0
```

### 5. Handle a hotfix
```bash
git checkout main
git checkout -b hotfix/1.0.1
```

Fix, test and commit:
```bash
python test_app.py
git add .
git commit -m "fix: correct task validation"
```

Merge into both branches:
```bash
git checkout main
git merge --no-ff hotfix/1.0.1
git tag -a v1.0.1 -m "Hotfix 1.0.1"

git checkout develop
git merge --no-ff hotfix/1.0.1
git branch -d hotfix/1.0.1
```

## Team Workflow

1. Every developer pulls the latest `develop`.
2. New work is developed only on a `feature/*` branch.
3. Features are tested before merging.
4. Feature branches are merged into `develop`.
5. `develop` is used for integration testing.
6. A `release/*` branch is created when a version is ready.
7. Stable releases are merged into `main` and tagged.
8. Production bugs use `hotfix/*`.
9. Hotfixes are merged into both `main` and `develop`.

## Useful Commands

```bash
git branch
git status
git log --oneline --graph --all
git switch develop
git switch -c feature/example
git merge --no-ff feature/example
git branch -d feature/example
git tag
```

## Suggested Viva Points

### What is a branching model?
A branching model defines how a team creates, merges and manages Git branches during software development.

### Why use branches?
Branches isolate work, reduce conflicts, allow parallel development and protect production code.

### Why use `develop`?
`develop` acts as the integration branch where completed features are combined before release.

### Why use `main`?
`main` contains stable, production-ready versions.

### Feature vs release vs hotfix
- Feature: development of a new capability.
- Release: final stabilization and preparation for deployment.
- Hotfix: urgent correction to a production version.

### Why `--no-ff`?
It preserves the branch history and makes feature/release merges easy to identify in `git log --graph`.

## Project Demonstration

The repository can be demonstrated with:
```bash
git log --oneline --graph --decorate --all
```

A typical history should show:
```text
*   Merge hotfix/1.0.1
|\
| * fix: correct task validation
|/
*   Merge release/1.0.0
|\
| * release preparation
|/
*   Merge feature/add-task-api
|\
| * feat: add task API
|/
* Initial project setup
```
