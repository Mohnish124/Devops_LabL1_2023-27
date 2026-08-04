# Assignment TW1.1: Git Workflow, Branching Strategy & Merge Conflict Resolution

**Student Name:** Mohammad Ahmad  
**PNR:** 23070122140  
**Subject:** DevOps Lab  
**Batch:** 2023-27  

---

## 1. Introduction

Version control is the cornerstone of modern DevOps practices. This assignment demonstrates essential Git operations required in enterprise software development, including repository initialization, branching strategies, commit isolation, remote GitHub synchronization, and hands-on merge conflict resolution. 

A Python Flask application (`hello-flask-app`) serves as the sample application codebase to demonstrate these Git operations step by step.

---

## 2. Objectives

- Initialize a local Git repository for a Flask application.
- Track files, stage changes, and make structured initial commits.
- Publish local repository branches to a remote GitHub repository.
- Implement branch-based feature development using `git checkout`, `git switch`, and `git branch`.
- Simulate a real-world merge conflict by concurrently altering identical lines of code across parallel branches.
- Inspect Git conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`), manually resolve the conflict, and complete the merge commit.
- Inspect and document the repository commit graph using `git log --graph --oneline --all`.

---

## 3. Folder Structure

```
Assignment_TW1.1_Git_Workflow/
├── hello-flask-app/
│   ├── app.py              # Main Flask web application
│   └── requirements.txt     # Python dependencies file
├── README.md               # Assignment documentation & CLI commands guide
└── screenshots/            # Verification screenshot requirements
    └── SCREENSHOTS_REQUIRED.md
```

---

## 4. Prerequisites

- **Git CLI** (v2.30+ installed)
- **Python** (v3.8+ installed)
- **GitHub Account** & SSH/HTTP access token
- Code Editor (e.g., VS Code or JetBrains PyCharm)

---

## 5. Installation

1. Navigate to the project folder:
   ```bash
   cd Assignment_TW1.1_Git_Workflow/hello-flask-app
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   # On Windows (PowerShell):
   .\venv\Scripts\Activate.ps1
   # On Linux/macOS:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Verify local application functionality:
   ```bash
   python app.py
   ```
   *Application will start at `http://127.0.0.1:5000`.*

---

## 6. Commands

### Task 1.1: Git Repository Initialization & Initial Commit

1. **Initialize Git Repository**:
   ```bash
   git init
   ```
2. **Configure User Identity** (if not set globally):
   ```bash
   git config user.name "Mohammad Ahmad"
   git config user.email "mohammad.ahmad@example.com"
   ```
3. **Stage Application Files**:
   ```bash
   git add hello-flask-app/app.py hello-flask-app/requirements.txt
   ```
4. **Make Initial Commit**:
   ```bash
   git commit -m "Initial commit: Add Python Flask Hello World app structure"
   ```
5. **Connect to Remote GitHub Repository**:
   ```bash
   git remote add origin https://github.com/MohammadAhmad/hello-flask-app.git
   git branch -M main
   git push -u origin main
   ```

---

### Task 1.2: Feature Branching Strategy & Isolated Changes

1. **Create and Switch to Feature Branch**:
   ```bash
   # Using traditional checkout:
   git checkout -b feature/user-auth
   
   # Alternatively using modern git switch:
   # git switch -c feature/user-auth
   ```
2. **List Active Branches**:
   ```bash
   git branch -a
   ```
3. **Modify `app.py`**:
   Add the new authentication endpoint to `app.py`:
   ```python
   @app.route('/auth')
   def auth():
       return jsonify({"status": "success", "message": "User Authentication Endpoint Operational"})
   ```
4. **Commit and Push Feature Branch**:
   ```bash
   git add hello-flask-app/app.py
   git commit -m "feat: Add authentication route to Flask app"
   git push -u origin feature/user-auth
   ```

---

### Task 1.3: Simulating & Resolving Merge Conflict

1. **Switch Back to `main` Branch**:
   ```bash
   git checkout main
   # Or: git switch main
   ```
2. **Simulate Concurrent Change on `main`**:
   Modify the return statement in `app.py` on `main` at line 8:
   ```python
   # Edit on main branch:
   return jsonify({"status": "success", "message": "Hello World from MAIN Branch Updated App!"})
   ```
3. **Commit Change on `main`**:
   ```bash
   git add hello-flask-app/app.py
   git commit -m "fix: Update home route greeting message on main branch"
   ```
4. **Trigger Merge Conflict**:
   Attempt to merge `feature/user-auth` into `main`:
   ```bash
   git merge feature/user-auth
   ```
   **Output:**
   ```text
   Auto-merging hello-flask-app/app.py
   CONFLICT (content): Merge conflict in hello-flask-app/app.py
   Automatic merge failed; fix conflicts and then commit the result.
   ```
5. **Inspect Conflict Markers**:
   Open `hello-flask-app/app.py` in editor to observe Git flags:
   ```python
   <<<<<<< HEAD
       return jsonify({"status": "success", "message": "Hello World from MAIN Branch Updated App!"})
   =======
       return jsonify({"status": "success", "message": "Hello World from Feature Auth Branch App!"})
   >>>>>>> feature/user-auth
   ```
6. **Manually Resolve Conflict**:
   Edit `app.py` to combine the logic cleanly:
   ```python
   from flask import Flask, jsonify

   app = Flask(__name__)

   @app.route('/')
   def home():
       return jsonify({
           "status": "success",
           "message": "Hello World from Flask Application! (Resolved Conflict)",
           "version": "1.0.0",
           "author": "Mohammad Ahmad (23070122140)"
       })

   @app.route('/auth')
   def auth():
       return jsonify({"status": "success", "message": "User Authentication Endpoint Operational"})

   if __name__ == '__main__':
       app.run(host='0.0.0.0', port=5000)
   ```
7. **Commit Resolved Merge & Push**:
   ```bash
   git add hello-flask-app/app.py
   git commit -m "Merge branch 'feature/user-auth' into main - Resolved conflict in app.py"
   git push origin main
   ```

---

## 7. Expected Output

Execute the following command to print the complete repository history graph:

```bash
git log --graph --oneline --all
```

**Expected Git Graph Output:**

```text
*   a1b2c3d (HEAD -> main, origin/main) Merge branch 'feature/user-auth' into main - Resolved conflict in app.py
|\  
| * e5f6g7h (origin/feature/user-auth, feature/user-auth) feat: Add authentication route to Flask app
* | 8i9j0k1 fix: Update home route greeting message on main branch
|/  
* 3m4n5o6 Initial commit: Add Python Flask Hello World app structure
```

---

## 8. Explanation

| Command | Category | Purpose |
| :--- | :--- | :--- |
| `git init` | Setup | Initializes a new empty Git repository in the working directory. |
| `git add <files>` | Staging | Moves file changes from working directory to the Git staging area. |
| `git commit -m ""` | Recording | Records a snapshot of staged changes into the local Git commit history. |
| `git checkout -b <branch>` | Branching | Creates a new branch and immediately checks it out. |
| `git switch <branch>` | Navigation | Switches the active workspace context to an existing branch. |
| `git branch -a` | Inspection | Lists all local and remote tracking branches. |
| `git merge <branch>` | Integration | Integrates commit history from a target branch into the current active branch. |
| `git status` | Inspection | Displays the status of working tree and staging area. |
| `git log --graph --all` | Visualization | Displays an interactive ASCII graph tree of all commits across all branches. |
| `git push origin <branch>` | Remote Sync | Uploads local branch commits to the remote GitHub repository. |

---

## 9. Screenshots Section

All required visual proofs are listed in [SCREENSHOTS_REQUIRED.md](./screenshots/SCREENSHOTS_REQUIRED.md).

Place image files inside `screenshots/` directory matching the designated naming conventions:
- `TW1.1_SS_01_git_init.png`
- `TW1.1_SS_04_feature_branch.png`
- `TW1.1_SS_07_merge_conflict.png`
- `TW1.1_SS_09_resolved_code.png`
- `TW1.1_SS_11_git_log_graph.png`

---

## 10. Conclusion

This assignment successfully demonstrates the end-to-end Git feature-branch workflow. By simulating parallel development on `main` and `feature/user-auth`, handling standard conflict markers, and verifying the commit graph with `git log --graph --oneline --all`, foundational DevOps version control best practices have been established.
