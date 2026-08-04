# Screenshot Checklist - Assignment TW1.1: Git Workflow

This document lists all required screenshot artifacts for verifying the successful completion of **Assignment TW1.1: Git Workflow**.

---

## Required Screenshots List

| Screenshot ID | Title | Description | Expected Visual Evidence |
| :--- | :--- | :--- | :--- |
| `TW1.1_SS_01` | **Git Initialization** | Terminal output showing `git init` command, directory initialization message, and `git status`. | Output displaying `Initialized empty Git repository in ...` |
| `TW1.1_SS_02` | **Initial Commit** | Execution of `git add .` and `git commit -m "Initial commit"`. | Terminal showing files staged and initial commit hash created. |
| `TW1.1_SS_03` | **GitHub Repo Setup & Push** | Terminal output of `git remote add origin <url>` and initial push to GitHub `main` branch. | Push confirmation log showing objects created on remote origin. |
| `TW1.1_SS_04` | **Feature Branch Creation** | Terminal output for `git checkout -b feature/user-auth` or `git switch -c feature/user-auth`. | Switch confirmation: `Switched to a new branch 'feature/user-auth'`. |
| `TW1.1_SS_05` | **Feature Branch Commit & Push** | Modifying `app.py` on `feature/user-auth`, committing changes, and pushing branch to GitHub using `git push origin feature/user-auth`. | Terminal log confirming commit and branch pushed to GitHub. |
| `TW1.1_SS_06` | **Main Branch Concurrent Modification** | Switching back to `main` (`git checkout main`), modifying the same line in `app.py`, committing on `main`. | Terminal output showing `main` branch updated with conflicting change. |
| `TW1.1_SS_07` | **Merge Conflict Trigger** | Executing `git merge feature/user-auth` while on `main` branch. | Git alert showing `CONFLICT (content): Merge conflict in hello-flask-app/app.py. Automatic merge failed`. |
| `TW1.1_SS_08` | **Conflict Marker Inspection** | VS Code / Text editor snippet showing standard Git conflict markers (`<<<<<<< HEAD`, `=======`, `>>>>>>> feature/user-auth`). | Code editor displaying unmerged conflict sections clearly. |
| `TW1.1_SS_09` | **Manual Conflict Resolution** | Editor view after cleanly merging code, removing conflict markers, saving file, and executing `git status`. | Clean code preview and `git status` showing modified file ready for commit. |
| `TW1.1_SS_10` | **Merge Commit & Final Push** | Executing `git add hello-flask-app/app.py`, `git commit -m "Merge branch 'feature/user-auth' - Resolved conflict in app.py"`, and `git push origin main`. | Terminal output confirming successful merge commit and push. |
| `TW1.1_SS_11` | **Git Commit Log Graph** | Terminal output of `git log --graph --oneline --all` displaying commit history and branch merge visualization. | Complete ASCII graph visualization showing branching, conflict resolution, and merge. |
| `TW1.1_SS_12` | **GitHub Repository Branch View** | Browser screenshot of the GitHub repository page showing branch list (`main` and `feature/user-auth`) and commit history. | GitHub UI showing both branches and commit activity. |
