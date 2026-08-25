# Task 1 - Git Workflow & Collaboration

## Objective

To initialize a Git repository for a simple Python Flask "Hello World" application, create a feature branch, make changes, simulate a merge conflict, resolve the conflict, and push the changes to a remote GitHub repository.

## Task 1.1 - Initialize Git Repository

### Application

A simple Python Flask application was created to display:

Hello World

### Source Files

- `app.py`
- `requirements.txt`
- `.gitignore`

### Commands Used

```bash
git init
git status
git add .
git commit -m "Initial Flask Hello World application"
git branch -M main
git remote add origin <repository-url>
git push -u origin main